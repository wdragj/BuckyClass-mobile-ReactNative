import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { realtimeDB } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

type ChatListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ChatList"
>;

type ChatItem = {
    id: string;
    name: string;
    type: "course" | "private";
    lastMessage?: string;
};

export default function ChatListScreen({
                                           navigation,
                                       }: {
    navigation: ChatListScreenNavigationProp;
}) {
    const [chats, setChats] = useState<ChatItem[]>([]);

    useEffect(() => {
        const chatsRef = ref(realtimeDB, "chats");

        const unsubscribe = onValue(chatsRef, (snapshot) => {
            const data = snapshot.val();
            const chatList: ChatItem[] = [];

            if (data) {
                for (const chatId in data) {
                    const chat = data[chatId];
                    const messages = chat.messages
                        ? Object.values(chat.messages)
                        : [];
                    const lastMessage = messages.length
                        ? messages[messages.length - 1].text
                        : "";

                    chatList.push({
                        id: chatId,
                        name: chat.name || "Unnamed Chat",
                        type: chat.type || "private", // fallback
                        lastMessage,
                    });
                }
            }

            setChats(chatList);
        });

        return () => unsubscribe();
    }, []);

    const courseChats = chats.filter((chat) => chat.type === "course");
    const privateChats = chats.filter((chat) => chat.type === "private");

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Chat List</Text>

                {/* 🎓 Course Chats */}
                {courseChats.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Course Chats</Text>
                        {courseChats.map((chat) => (
                            <TouchableOpacity
                                key={chat.id}
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate("CourseChat", { courseId: chat.id })
                                }
                            >
                                <Text style={styles.chatName}>{chat.name}</Text>
                                <Text style={styles.lastMessage}>
                                    {chat.lastMessage || "No messages yet"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </>
                )}

                {/* 👥 Private Chats */}
                {privateChats.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Private Chats</Text>
                        {privateChats.map((chat) => (
                            <TouchableOpacity
                                key={chat.id}
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate("PrivateChat", { chatId: chat.id })
                                }
                            >
                                <Text style={styles.chatName}>{chat.name}</Text>
                                <Text style={styles.lastMessage}>
                                    {chat.lastMessage || "No messages yet"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#f9f9f9" },
    container: { padding: 20 },
    header: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#555",
        marginTop: 20,
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    chatName: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
    },
    lastMessage: {
        marginTop: 8,
        fontSize: 16,
        color: "#777",
    },
});
