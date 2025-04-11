import React from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";

type ChatListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ChatList"
>;

export default function ChatListScreen({
    navigation,
}: {
    navigation: ChatListScreenNavigationProp;
}) {
    // 채팅 데이터에 type 프로퍼티 추가 ("course" 또는 "private")
    const chats = [
        {
            id: "1",
            name: "General Chat",
            lastMessage: "Hello everyone!",
            type: "course",
        },
        {
            id: "2",
            name: "React Native",
            lastMessage: "React Native is amazing.",
            type: "course",
        },
        {
            id: "3",
            name: "Bucky Class Chat",
            lastMessage: "Let's start today's class.",
            type: "course",
        },
        {
            id: "4",
            name: "John Doe",
            lastMessage: "Hey, how's it going?",
            type: "private",
        },
        {
            id: "5",
            name: "Jane Smith",
            lastMessage: "Let's catch up later.",
            type: "private",
        },
        // ...existing chats...
    ];

    const courseChats = chats.filter((chat) => chat.type === "course");
    const privateChats = chats.filter((chat) => chat.type === "private");

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Chat List</Text>

                {/* Course Chats 섹션 */}
                <Text style={styles.sectionHeader}>Course Chats</Text>
                {courseChats.map((chat) => (
                    <TouchableOpacity
                        key={chat.id}
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("CourseChat", {
                                chatId: chat.id,
                            })
                        }
                    >
                        <Text style={styles.chatName}>{chat.name}</Text>
                        <Text style={styles.lastMessage}>
                            {chat.lastMessage}
                        </Text>
                    </TouchableOpacity>
                ))}

                {/* Private Chats 섹션 */}
                <Text style={[styles.sectionHeader, { marginTop: 20 }]}>
                    Private Chats
                </Text>
                {privateChats.map((chat) => (
                    <TouchableOpacity
                        key={chat.id}
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("PrivateChat", {
                                chatId: chat.id,
                            })
                        }
                    >
                        <Text style={styles.chatName}>{chat.name}</Text>
                        <Text style={styles.lastMessage}>
                            {chat.lastMessage}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    container: {
        padding: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
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
    sectionHeader: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
});
