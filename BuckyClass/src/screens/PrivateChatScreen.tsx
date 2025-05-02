import React, { useState, useEffect, useRef } from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
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

type PrivateChatScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "PrivateChat"
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

export default function PrivateChatScreen({
    navigation,
    route,
}: {
    navigation: PrivateChatScreenNavigationProp;
    route: { params: { chatId: string } };
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [showMembers, setShowMembers] = useState(false);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [chatPartnerName, setChatPartnerName] = useState<string>(""); // 대화 상대 이름 추가
    const scrollViewRef = useRef<ScrollView>(null);
    const chatId = route.params.chatId;

    const auth = getAuth();
    const currentUser = auth.currentUser;

    // 대화 상대 정보 가져오기
    useEffect(() => {
        if (!currentUser) return;

        // 채팅 ID에서 사용자 ID 추출 (uid1_uid2 형식)
        const userIds = chatId.split("_");
        const otherUserId =
            userIds[0] === currentUser.uid ? userIds[1] : userIds[0];

        // 1:1 채팅 이름을 상대방의 ID로 임시 설정 (나중에 표시 이름 가져오기)
        setChatPartnerName(otherUserId);

        // 사용자 정보 가져오기 시도
        const userRef = ref(realtimeDB, `users/${otherUserId}`);
        const unsubscribe = onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                // 표시 이름, 이름 또는 기본값 사용
                const name =
                    userData.displayName ||
                    userData.name ||
                    `User-${otherUserId.substring(0, 5)}`;
                setChatPartnerName(name);
            }
        });

        return () => unsubscribe();
    }, [chatId, currentUser]);

    const leavePrivateChat = async () => {
        if (!currentUser) return;

        try {
            const chatRef = ref(realtimeDB, `chats/${chatId}`);
            await remove(chatRef);
            navigation.goBack();
        } catch (err) {
            console.error("Failed to exit chat:", err);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !currentUser) return;

        const messageRef = ref(realtimeDB, `chats/${chatId}/messages`);
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

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (result.canceled || !result.assets || result.assets.length === 0)
            return;

        const asset = result.assets[0];
        const uri = asset.uri;
        if (!uri) return;

        const response = await fetch(uri);
        const blob = await response.blob();

        const imageRef = storageRef(
            storage,
            `chatImages/${Date.now()}_${currentUser.uid}`
        );
        await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageRef);

        const messageRef = ref(realtimeDB, `chats/${chatId}/messages`);
        await push(messageRef, {
            imageUrl: downloadURL,
            senderUid: currentUser.uid,
            senderName: currentUser.displayName || "Unknown",
            timestamp: Date.now(),
        });
    };

    const ensureChatRoomExists = async () => {
        const chatRoomRef = ref(realtimeDB, `chats/${chatId}`);
        const snapshot = await get(chatRoomRef);

        if (!snapshot.exists()) {
            await set(chatRoomRef, {
                name: "1:1 채팅방",
                type: "private",
                createdAt: Date.now(),
                messages: {},
            });
        }
    };

    useEffect(() => {
        setLoading(true);
        ensureChatRoomExists();

        const messageRef = ref(realtimeDB, `chats/${chatId}/messages`);
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
            setLoading(false);
        });

        return () => unsubscribeMsg();
    }, []);

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

                            <View style={styles.chatPartnerContainer}>
                                <View style={styles.chatPartnerAvatar}>
                                    <Text style={styles.chatPartnerAvatarText}>
                                        {chatPartnerName
                                            ? chatPartnerName
                                                  .charAt(0)
                                                  .toUpperCase()
                                            : "?"}
                                    </Text>
                                </View>
                                <Text style={styles.headerText}>
                                    {chatPartnerName || "Private Chat"}
                                </Text>
                            </View>

                            <View style={{ width: 32 }} />
                        </View>

                        <KeyboardAvoidingView
                            style={styles.chatContainer}
                            behavior={
                                Platform.OS === "ios" ? "padding" : undefined
                            }
                            keyboardVerticalOffset={
                                Platform.OS === "ios" ? 90 : 0
                            }
                        >
                            {loading ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator
                                        size="large"
                                        color="#8863e4"
                                    />
                                    <Text style={styles.loadingText}>
                                        Loading messages...
                                    </Text>
                                </View>
                            ) : (
                                <ScrollView
                                    style={styles.messageContainer}
                                    ref={scrollViewRef}
                                    contentContainerStyle={
                                        styles.messagesContent
                                    }
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
                                                        style={
                                                            styles.timestampLeft
                                                        }
                                                    >
                                                        {formatTime(
                                                            msg.timestamp
                                                        )}
                                                    </Text>
                                                )}

                                                {!isMyMessage && (
                                                    <View
                                                        style={
                                                            styles.senderAvatar
                                                        }
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
                                                        {formatTime(
                                                            msg.timestamp
                                                        )}
                                                    </Text>
                                                )}
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                            )}

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
    chatPartnerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    chatPartnerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F97CBD",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    chatPartnerAvatarText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#171717",
        fontFamily: "Nunito-Bold",
    },
    chatContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#8863e4",
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
    messageText: {
        fontSize: 16,
        color: "#333",
        fontFamily: "Nunito",
    },
    myMessageText: {
        color: "#fff",
    },
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
