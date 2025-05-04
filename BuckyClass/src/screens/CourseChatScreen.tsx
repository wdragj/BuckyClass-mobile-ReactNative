import React, { useState, useEffect, useRef } from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    ScrollView,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { realtimeDB, storage } from "../firebaseConfig";
import { ref, push, onValue, get, set, remove } from "firebase/database";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

type CourseChatScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CourseChat"
>;

type CourseChatScreenRouteProp = RouteProp<RootStackParamList, "CourseChat">;

interface Member {
    uid: string;
    displayName: string;
}

interface Message {
    id?: string;
    text?: string;
    imageUrl?: string;
    senderUid: string;
    senderName: string;
    timestamp: number;
}

export default function CourseChatScreen({
    navigation,
    route,
}: {
    navigation: CourseChatScreenNavigationProp;
    route: CourseChatScreenRouteProp;
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [memberList, setMemberList] = useState<Member[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [showMembers, setShowMembers] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const courseId = route.params.courseId;
    const courseName = route.params.courseName; // 코스 이름 받기

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

        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
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
            const imageRef = storageRef(
                storage,
                `courseChatImages/${Date.now()}_${name}`
            );
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

    const startPrivateChat = async (receiverUid: string) => {
        if (!currentUser) return;

        const uid1 = currentUser.uid;
        const uid2 = receiverUid;
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
                await fetch(
                    `grow-ruddy.vercel.app/api/chats/${courseId}/participants/${currentUser.uid}`,
                    {
                        method: "DELETE",
                    }
                );
            } else {
                const participantRef = ref(
                    realtimeDB,
                    `chats/${courseId}/participants/${currentUser.uid}`
                );
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
        // 채팅방 초기화 또는 참여
        const initializeChat = async () => {
            if (!currentUser) return;

            const chatRef = ref(realtimeDB, `chats/${courseId}`);
            const snapshot = await get(chatRef);

            if (!snapshot.exists()) {
                // 채팅방이 존재하지 않으면 새로 생성
                await set(chatRef, {
                    type: "course", // 명시적으로 "course" 타입으로 설정
                    name: courseName, // 코스 ID 대신 코스 이름 사용
                    createdAt: Date.now(),
                    messages: {},
                    participants: {
                        [currentUser.uid]: true,
                    },
                });
            } else {
                // 채팅방이 존재하면 참가자에 추가
                const participantRef = ref(
                    realtimeDB,
                    `chats/${courseId}/participants/${currentUser.uid}`
                );
                await set(participantRef, true);

                // 기존 채팅방 이름 업데이트 (혹시 이름이 ID로 설정되어 있을 경우)
                const nameRef = ref(realtimeDB, `chats/${courseId}/name`);
                await set(nameRef, courseName);

                // 기존 채팅방 타입 업데이트 (혹시 타입이 잘못 설정되어 있을 경우)
                const typeRef = ref(realtimeDB, `chats/${courseId}/type`);
                await set(typeRef, "course");
            }
        };

        initializeChat();

        const messageRef = ref(realtimeDB, `chats/${courseId}/messages`);
        const unsubscribeMsg = onValue(messageRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList: Message[] = Object.entries(data).map(
                    ([id, value]: any) => ({
                        id,
                        ...value,
                    })
                );
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
    }, [courseId, courseName, currentUser]);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.gradientBackground}>
                <LinearGradient
                    colors={[
                        "rgba(230, 224, 252, 0.40)",
                        "rgba(235, 218, 255, 0.40)",
                    ]}
                    style={styles.gradientStyle}
                >
                    <View style={styles.blurOverlay}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color="#8863e4"
                                />
                            </TouchableOpacity>

                            <Text style={styles.headerText}>{courseName}</Text>

                            <TouchableOpacity
                                style={styles.memberButton}
                                onPress={() => setShowMembers(!showMembers)}
                            >
                                <Ionicons
                                    name="people"
                                    size={24}
                                    color="#8863e4"
                                />
                            </TouchableOpacity>
                        </View>

                        {showMembers && (
                            <View style={styles.memberListWrapper}>
                                <Text style={styles.sectionTitle}>
                                    참여자 목록
                                </Text>
                                <ScrollView style={styles.memberScroll}>
                                    {memberList.map((member) => (
                                        <TouchableOpacity
                                            key={member.uid}
                                            style={styles.memberItem}
                                            onPress={() =>
                                                startPrivateChat(member.uid)
                                            }
                                        >
                                            <View style={styles.memberAvatar}>
                                                <Text
                                                    style={
                                                        styles.memberAvatarText
                                                    }
                                                >
                                                    {member.displayName
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </Text>
                                            </View>
                                            <Text style={styles.memberName}>
                                                {member.displayName}
                                            </Text>
                                            <Ionicons
                                                name="chatbubble-outline"
                                                size={18}
                                                color="#8863e4"
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}

                        <KeyboardAvoidingView
                            style={styles.chatContainer}
                            behavior={
                                Platform.OS === "ios" ? "padding" : undefined
                            }
                            keyboardVerticalOffset={
                                Platform.OS === "ios" ? 90 : 0
                            }
                        >
                            <ScrollView
                                style={styles.messageContainer}
                                ref={scrollViewRef}
                                contentContainerStyle={styles.messagesContent}
                            >
                                {messages.map((msg) => {
                                    const isMyMessage =
                                        currentUser?.uid === msg.senderUid;
                                    return (
                                        <View
                                            key={msg.id}
                                            style={[
                                                styles.messageBubbleContainer,
                                                isMyMessage
                                                    ? styles.myMessageContainer
                                                    : styles.otherMessageContainer,
                                            ]}
                                        >
                                            {/* 내 메시지일 경우 왼쪽에 타임스탬프 표시 */}
                                            {isMyMessage && (
                                                <Text
                                                    style={styles.timestampLeft}
                                                >
                                                    {formatTime(msg.timestamp)}
                                                </Text>
                                            )}

                                            {!isMyMessage && (
                                                <View
                                                    style={styles.senderAvatar}
                                                >
                                                    <Text
                                                        style={
                                                            styles.senderAvatarText
                                                        }
                                                    >
                                                        {msg.senderName
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </Text>
                                                </View>
                                            )}
                                            <View
                                                style={[
                                                    styles.messageBubble,
                                                    isMyMessage
                                                        ? styles.myBubble
                                                        : styles.otherBubble,
                                                ]}
                                            >
                                                {!isMyMessage && (
                                                    <Text style={styles.sender}>
                                                        {msg.senderName}
                                                    </Text>
                                                )}
                                                {msg.text && (
                                                    <Text
                                                        style={[
                                                            styles.messageText,
                                                            isMyMessage &&
                                                                styles.myMessageText,
                                                        ]}
                                                    >
                                                        {msg.text}
                                                    </Text>
                                                )}
                                                {msg.imageUrl && (
                                                    <Image
                                                        source={{
                                                            uri: msg.imageUrl,
                                                        }}
                                                        style={styles.image}
                                                    />
                                                )}
                                            </View>

                                            {/* 상대방 메시지일 경우 오른쪽에 타임스탬프 표시 */}
                                            {!isMyMessage && (
                                                <Text
                                                    style={
                                                        styles.timestampRight
                                                    }
                                                >
                                                    {formatTime(msg.timestamp)}
                                                </Text>
                                            )}
                                        </View>
                                    );
                                })}
                            </ScrollView>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={newMessage}
                                    onChangeText={setNewMessage}
                                    placeholder="Message..."
                                    style={styles.input}
                                    placeholderTextColor="#888"
                                    multiline={false}
                                    returnKeyType="send"
                                    onSubmitEditing={sendMessage}
                                    blurOnSubmit={false}
                                />
                                <TouchableOpacity
                                    style={styles.imageButton}
                                    onPress={sendImage}
                                >
                                    <Ionicons
                                        name="image-outline"
                                        size={24}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.sendButton}
                                    onPress={sendMessage}
                                >
                                    <Ionicons
                                        name="send"
                                        size={24}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
        backgroundColor: "rgba(232, 221, 253, 0.60)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.20)",
        borderRadius: 30,
    },
    gradientStyle: {
        flex: 1,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.20)",
    },
    blurOverlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 8,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(200, 200, 200, 0.5)",
    },
    backButton: {
        padding: 8,
    },
    memberButton: {
        padding: 8,
    },
    headerText: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: "#171717",
        textAlign: "center",
        fontFamily: "Nunito-Bold",
    },
    chatContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    memberListWrapper: {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 16,
        margin: 8,
        padding: 12,
        maxHeight: 300,
        borderWidth: 1,
        borderColor: "rgba(200, 200, 200, 0.5)",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
        fontFamily: "Nunito-Bold",
        color: "#171717",
    },
    memberScroll: {
        maxHeight: 250,
    },
    memberItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(200, 200, 200, 0.3)",
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#8863e4",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    memberAvatarText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
    memberName: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        fontFamily: "Nunito",
    },
    messageContainer: {
        flex: 1,
        padding: 16,
    },
    messagesContent: {
        paddingBottom: 8,
    },
    messageBubbleContainer: {
        flexDirection: "row",
        marginBottom: 16,
        alignItems: "flex-end",
    },
    myMessageContainer: {
        justifyContent: "flex-end",
    },
    otherMessageContainer: {
        justifyContent: "flex-start",
    },
    senderAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F97CBD",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginBottom: 4,
    },
    senderAvatarText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
    messageBubble: {
        borderRadius: 18,
        padding: 12,
        maxWidth: "70%",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 1,
        elevation: 2,
    },
    myBubble: {
        backgroundColor: "#8863e4",
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderBottomLeftRadius: 4,
    },
    sender: {
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
        fontSize: 14,
        fontFamily: "Nunito-Bold",
    },
    messageText: {
        fontSize: 16,
        color: "#333", // 상대방 메시지 텍스트는 검은색
        fontFamily: "Nunito",
    },
    myMessageText: {
        color: "#fff", // 내 메시지 텍스트는 흰색
    },
    // 타임스탬프 스타일 수정
    timestampLeft: {
        fontSize: 12,
        color: "#777",
        marginRight: 8,
        alignSelf: "flex-end",
        marginBottom: 8,
        fontFamily: "Nunito",
    },
    timestampRight: {
        fontSize: 12,
        color: "#777",
        marginLeft: 8,
        alignSelf: "flex-end",
        marginBottom: 8,
        fontFamily: "Nunito",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 12,
        marginTop: 8,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 12,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderTopWidth: 1,
        borderTopColor: "rgba(200, 200, 200, 0.5)",
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "rgba(136, 99, 228, 0.3)",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        fontFamily: "Nunito",
    },
    imageButton: {
        marginLeft: 10,
        width: 40,
        height: 40,
        backgroundColor: "#8863e4",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    sendButton: {
        marginLeft: 10,
        width: 40,
        height: 40,
        backgroundColor: "#F97CBD",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});
