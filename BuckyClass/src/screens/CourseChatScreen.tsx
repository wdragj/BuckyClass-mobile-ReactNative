import React, { useState, useRef, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { onValue, push, ref, get, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { realtimeDB, storage } from "../firebaseConfig";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";



type CourseChatScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CourseChat"
>;

type Message = {
    id: string;
    text?: string;
    imageUrl?: string;
    senderUid: string;
    senderName: string;
    timestamp: number;
};

type Member = {
    uid: string;
    displayName: string;
};

export default function CourseChatScreen({ navigation, route }: { navigation: CourseChatScreenNavigationProp; route: { params: { courseId: string } } }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [memberList, setMemberList] = useState<Member[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [showMembers, setShowMembers] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const courseId = route.params.courseId;

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const sendMessage = async () => {
        if (!newMessage.trim() || !currentUser) return;
    
        const messageRef = ref(realtimeDB, `chats/${courseId}/messages`);
        const messageData = {
            text: newMessage,
            senderUid: currentUser.uid,
            senderName: currentUser.displayName || "Unknown",
            timestamp: Date.now(),
        };
    
        try {
            await push(messageRef, messageData);
            setNewMessage("");
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };
    
    const sendImage = async () => {
        if (!currentUser) return;
    
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("사진 접근 권한이 필요합니다.");
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: false,
        });
    
        if (!result.assets || result.assets.length === 0) return;
    
        const asset = result.assets[0];
        const uri = asset.uri;
        const name = asset.fileName || `image_${Date.now()}.jpg`;
    
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const imageRef = storageRef(storage, `courseChatImages/${Date.now()}_${name}`);
            await uploadBytes(imageRef, blob);
    
            const downloadURL = await getDownloadURL(imageRef);
            const messageRef = ref(realtimeDB, `chats/${courseId}/messages`);
            await push(messageRef, {
                imageUrl: downloadURL,
                senderUid: currentUser.uid,
                senderName: currentUser.displayName || "Unknown",
                timestamp: Date.now(),
            });
        } catch (err) {
            console.error("이미지 전송 실패:", err);
        }
    };
    
    const startPrivateChat = async (targetUid: string) => {
        if (!currentUser) return;
    
        const uid1 = currentUser.uid;
        const uid2 = targetUid;
        const sortedIds = [uid1, uid2].sort();
        const chatId = `${sortedIds[0]}_${sortedIds[1]}`;
    
        const chatRef = ref(realtimeDB, `chats/${chatId}`);
        const snapshot = await get(chatRef);
    
        if (!snapshot.exists()) {
            await set(chatRef, {
                type: "private",
                createdAt: Date.now(),
                messages: {},
            });
        }
    
        navigation.navigate("PrivateChat", { chatId });
    };
    
    const leaveCourseChat = async () => {
        if (!currentUser) return;

        try {
            const chatRef = ref(realtimeDB, `chats/${courseId}`);
            const snapshot = await get(chatRef);

            if (!snapshot.exists()) {
                navigation.goBack();
                return;
            }

            const participants = snapshot.val().participants || {};
            const participantCount = Object.keys(participants).length;

            if (participantCount <= 1) {
                await remove(chatRef);
                await fetch(`grow-ruddy.vercel.app/api/chats/${courseId}/participants/${currentUser.uid}`, {
                    method: "DELETE",
                });
            } else {
                const participantRef = ref(realtimeDB, `chats/${courseId}/participants/${currentUser.uid}`);
                await remove(participantRef);
                await fetch(`grow-ruddy.vercel.app/chats/${courseId}`, {
                    method: "DELETE",
                });
            }

            navigation.goBack();
        } catch (err) {
            console.error("Failed to exit chat:", err);
        }
    };
    
    useEffect(() => {
        const messageRef = ref(realtimeDB, `chats/${courseId}/messages`);
        const unsubscribeMsg = onValue(messageRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList: Message[] = Object.entries(data).map(([id, value]: any) => ({
                    id,
                    ...value,
                }));
                messageList.sort((a, b) => a.timestamp - b.timestamp);
                setMessages(messageList);
            } else {
                setMessages([]);
            }
        });
    
        const memberRef = ref(realtimeDB, `chats/${courseId}/participants`);
        const unsubscribeMembers = onValue(memberRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formatted = Object.keys(data).map((uid) => ({
                    uid,
                    displayName: uid,
                }));
                setMemberList(formatted);
            }
        });
    
        return () => {
            unsubscribeMsg();
            unsubscribeMembers();
        };
    }, [courseId]);
    
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);
    
    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowMembers(!showMembers)}>
                    <Text style={{ color: "#fff", fontSize: 24, marginRight: 12 }}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>{courseId}</Text>
                <TouchableOpacity onPress={leaveCourseChat}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>나가기</Text>
                </TouchableOpacity>
            </View>

            {showMembers && (
                <View style={styles.memberListWrapper}>
                    <Text style={styles.sectionTitle}>참여자 목록</Text>
                    <ScrollView style={styles.memberScroll}>
                        {memberList.map((member) => (
                            <TouchableOpacity
                                key={member.uid}
                                onPress={() => startPrivateChat(member.uid)}
                            >
                                <Text style={styles.memberName}>• {member.displayName}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            <ScrollView
                style={styles.messageContainer}
                ref={scrollViewRef}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map((msg) => {
                    const isMyMessage = currentUser?.uid === msg.senderUid;
                    return (
                        <View
                            key={msg.id}
                            style={[styles.messageBubble, isMyMessage ? styles.myBubble : styles.otherBubble]}
                        >
                            {!isMyMessage && <Text style={styles.sender}>{msg.senderName}</Text>}
                            {msg.text && <Text style={styles.messageText}>{msg.text}</Text>}
                            {msg.imageUrl && <Image source={{ uri: msg.imageUrl }} style={styles.image} />}
                            <Text style={styles.timestamp}>{formatTime(msg.timestamp)}</Text>
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                    style={styles.input}
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton} onPress={sendImage}>
                    <Text style={styles.sendButtonText}>📷</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    header: {
        padding: 16,
        backgroundColor: "#4A90E2",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: { color: "#fff", fontSize: 20, fontWeight: "bold", flex: 1, textAlign: "center" },
    sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
    memberListWrapper: {
        maxHeight: 200,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: "#f5f5f5",
    },
    memberScroll: { maxHeight: 160 },
    memberName: { fontSize: 14, color: "#333", marginBottom: 4 },
    messageContainer: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
    messagesContent: { paddingBottom: 20 },
    messageBubble: {
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        maxWidth: "80%",
    },
    myBubble: {
        alignSelf: "flex-end",
        backgroundColor: "#007AFF",
    },
    otherBubble: {
        alignSelf: "flex-start",
        backgroundColor: "#4A90E2",
    },
    sender: { fontWeight: "bold", color: "#fff", marginBottom: 4 },
    messageText: { color: "#fff", fontSize: 16 },
    timestamp: { marginTop: 4, fontSize: 12, color: "#ddd", alignSelf: "flex-end" },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginTop: 8,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        backgroundColor: "#fff",
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#f2f2f2",
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: "#4A90E2",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    imageButton: {
        marginLeft: 5,
        backgroundColor: "#4A90E2",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    sendButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
