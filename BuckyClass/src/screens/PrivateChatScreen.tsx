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
import { RootStackParamList } from "../../types/navigation";

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
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, newMessage]);
        setNewMessage("");
    };

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
                {messages.map((msg, index) => (
                    <View key={index} style={styles.messageBubble}>
                        <Text style={styles.messageText}>{msg}</Text>
                    </View>
                ))}
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
        backgroundColor: "#4A90E2",
        alignSelf: "flex-start",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        maxWidth: "80%",
    },
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
