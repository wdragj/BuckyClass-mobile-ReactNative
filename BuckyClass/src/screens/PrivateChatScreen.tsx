import React, { useState, useRef, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { realtimeDB } from "../firebaseConfig";
import { ref, push, onValue, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";

type PrivateChatScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "PrivateChat"
>;

export default function PrivateChatScreen({
    navigation,
    route,
}: {
    navigation: PrivateChatScreenNavigationProp;
    route: { params: { chatId: string } };
}) {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const sendMessage = () => {
        if (!newMessage.trim() || !currentUser) return;

        const messageRef = ref(
            realtimeDB,
            `chats/${route.params.chatId}/messages`
        );
        push(messageRef, {
            text: newMessage,
            senderUid: currentUser.uid,
            senderName: currentUser.displayName || "Unknown",
            timestamp: Date.now(),
        })
            .then(() => {
                console.log("Message pushed to Firebase");
            })
            .catch((err) => {
                console.error("Failed to send message:", err);
            });

        setNewMessage("");
    };

    const ensureChatRoomExists = async () => {
        const chatRoomRef = ref(realtimeDB, `chats/${route.params.chatId}`);
        const snapshot = await get(chatRoomRef);

        if (!snapshot.exists()) {
            await set(chatRoomRef, {
                name: "1:1 채팅방",
                type: "private",
                createdAt: Date.now(),
                messages: {},
            });
            console.log(`Private chatroom created with type 'private'`);
        }
    };

    useEffect(() => {
        ensureChatRoomExists();

        const messageRef = ref(
            realtimeDB,
            `chats/${route.params.chatId}/messages`
        );
        const unsubscribe = onValue(messageRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList = Object.entries(data).map(
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

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Private Chat - {route.params.chatId}
                </Text>
            </View>
            <ScrollView
                style={styles.messageContainer}
                ref={scrollViewRef}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map((msg, index) => {
                    const isMyMessage = currentUser?.uid === msg.senderUid;
                    return (
                        <View
                            key={index}
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
                            <Text style={styles.messageText}>{msg.text}</Text>
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
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
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
    inputContainer: {
        flexDirection: "row",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        backgroundColor: "#fff",
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
    sendButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
