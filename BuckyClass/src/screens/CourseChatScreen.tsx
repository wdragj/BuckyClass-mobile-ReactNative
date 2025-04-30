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
import { onValue, push, ref } from "firebase/database";
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

export default function CourseChatScreen({
    navigation,
    route,
}: {
    navigation: CourseChatScreenNavigationProp;
    route: { params: { courseId: string } };
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
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

    if (!result.assets || result.assets.length === 0) {
        console.log("사용자가 사진 선택을 취소했거나 결과가 없음");
        return;
    }

    const asset = result.assets[0];
    const uri = asset.uri;
    const name = asset.fileName || `image_${Date.now()}.jpg`;

    try {
        console.log("선택된 URI:", uri);

        const response = await fetch(uri);
        const blob = await response.blob();

        const imageRef = storageRef(storage, `courseChatImages/${Date.now()}_${name}`);
        console.log("업로드 시작");
        await uploadBytes(imageRef, blob);
        console.log("업로드 완료");

        const downloadURL = await getDownloadURL(imageRef);
        console.log("다운로드 URL:", downloadURL);

        const messageRef = ref(realtimeDB, `chats/${courseId}/messages`);
        await push(messageRef, {
            imageUrl: downloadURL,
            senderUid: currentUser.uid,
            senderName: currentUser.displayName || "Unknown",
            timestamp: Date.now(),
        });

        console.log("메시지 전송 완료");
    } catch (err) {
        console.error("이미지 전송 실패:", err);
    }
};

    useEffect(() => {
        const messageRef = ref(realtimeDB, `chats/${courseId}/messages`);
        const unsubscribe = onValue(messageRef, (snapshot) => {
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

        return () => {
            unsubscribe();
        };
    }, []);

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
                <Text style={styles.headerText}>Course Chat - {courseId}</Text>
            </View>
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
                            style={[
                                styles.messageBubble,
                                isMyMessage ? styles.myBubble : styles.otherBubble,
                            ]}
                        >
                            {!isMyMessage && (
                                <Text style={styles.sender}>{msg.senderName}</Text>
                            )}
                            {msg.text && <Text style={styles.messageText}>{msg.text}</Text>}
                            {msg.imageUrl && (
                                <Image source={{ uri: msg.imageUrl }} style={styles.image} />
                            )}
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
    header: { padding: 16, backgroundColor: "#4A90E2", alignItems: "center" },
    headerText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
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
