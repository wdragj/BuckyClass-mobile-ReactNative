import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { realtimeDB } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import BottomNavBar from "../components/BottomNavBar";
import { LinearGradient } from "expo-linear-gradient";

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
            <View style={styles.gradientBackground}>
                <LinearGradient
                    colors={[
                        "rgba(230, 224, 252, 0.40)",
                        "rgba(235, 218, 255, 0.40)",
                    ]}
                    style={styles.gradientStyle}
                >
                    <View style={styles.blurOverlay}>
                        <ScrollView contentContainerStyle={styles.container}>
                            <Text style={styles.header}>Chat List</Text>

                            {/* 🎓 Course Chats */}
                            {courseChats.length > 0 && (
                                <>
                                    <Text style={styles.sectionTitle}>
                                        Course Chats
                                    </Text>
                                    {courseChats.map((chat) => (
                                        <TouchableOpacity
                                            key={chat.id}
                                            style={styles.card}
                                            onPress={() =>
                                                navigation.navigate(
                                                    "CourseChat",
                                                    {
                                                        courseId: chat.id,
                                                    }
                                                )
                                            }
                                        >
                                            <Text style={styles.chatName}>
                                                {chat.name}
                                            </Text>
                                            <Text style={styles.lastMessage}>
                                                {chat.lastMessage ||
                                                    "No messages yet"}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </>
                            )}

                            {/* 👥 Private Chats */}
                            {privateChats.length > 0 && (
                                <>
                                    <Text style={styles.sectionTitle}>
                                        Private Chats
                                    </Text>
                                    {privateChats.map((chat) => (
                                        <TouchableOpacity
                                            key={chat.id}
                                            style={styles.card}
                                            onPress={() =>
                                                navigation.navigate(
                                                    "PrivateChat",
                                                    {
                                                        chatId: chat.id,
                                                    }
                                                )
                                            }
                                        >
                                            <Text style={styles.chatName}>
                                                {chat.name}
                                            </Text>
                                            <Text style={styles.lastMessage}>
                                                {chat.lastMessage ||
                                                    "No messages yet"}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </>
                            )}
                        </ScrollView>
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
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
    container: {
        padding: 20,
        paddingBottom: 80,
    },
    header: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#171717",
        marginBottom: 20,
        fontFamily: "Nunito-ExtraBold",
    },
    sectionTitle: {
        fontSize: 21.5,
        fontWeight: "800",
        color: "#171717",
        marginTop: 20,
        marginBottom: 10,
        fontFamily: "Nunito-ExtraBold",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 20,
        marginBottom: 15,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 3,
    },
    chatName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        fontFamily: "Nunito-Bold",
    },
    lastMessage: {
        marginTop: 8,
        fontSize: 14,
        color: "#777",
        fontFamily: "Nunito",
    },
});
