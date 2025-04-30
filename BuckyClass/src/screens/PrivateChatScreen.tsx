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
import { realtimeDB, storage } from "../firebaseConfig"; // Storage import 필요!
import { ref as dbRef, push, onValue, get, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { launchImageLibrary } from "react-native-image-picker";

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

export default function PrivateChatScreen({
    navigation,
    route,
}: {
    navigation: PrivateChatScreenNavigationProp;
    route: { params: { chatId: string } };
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const sendMessage = async () => {
        if (!newMessage.trim() || !currentUser) return;

        const messageRef = dbRef(realtimeDB, `chats/${route.params.chatId}/messages`);
        await push(messageRef, {
            text: newMessage,
            senderUid: currentUser.uid,
            senderName: currentUser.displayName || "Unknown",
            timestamp: Date.now(),
        });

        setNewMessage("");
    };

    const sendImage = async () => {
        if (!currentUser) return;

        const result = await launchImageLibrary({ mediaType: "photo" });

        if (result.didCancel || !result.assets || result.assets.length === 0) {
            return;
        }

        const asset = result.assets[0];
        if (!asset.uri) return;

        const response = await fetch(asset.uri);
        const blob = await response.blob();

        const imageRef = storageRef(storage, `chatImages/${Date.now()}_${currentUser.uid}`);
        await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageRef);

        const messageRef = dbRef(realtimeDB, `chats/${route.params.chatId}/messages`);
        await push(messageRef, {
            imageUrl: downloadURL,
            senderUid: currentUser.uid,
            senderName: currentUser.displayName || "Unknown",
            timestamp: Date.now(),
        });
    };

    const ensureChatRoomExists = async () => {
        const chatRoomRef = dbRef(realtimeDB, `chats/${route.params.chatId}`);
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

        const messageRef = dbRef(realtimeDB, `chats/${route.params.chatId}/messages`);
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

        return () => unsubscribe();
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
                <Text style={styles.headerText}>
                    Private Chat - {route.params.chatId}
                </Text>
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
                    <Text style={styles.sendButtonText}>+</Text>
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
