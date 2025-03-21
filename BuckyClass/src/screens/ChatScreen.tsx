import React from "react";
import { View, Text } from "react-native";
import { useState } from "react";
import { TextInput, Button, StyleSheet } from "react-native";

export default function ChatScreen() {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, newMessage]);
        setNewMessage("");
    };

    return (
        <View style={styles.container}>
            <Text>Chat Screen</Text>
            {messages.map((msg, idx) => (
                <Text key={idx}>{msg}</Text>
            ))}
            <TextInput
                style={styles.input}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type a message"
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        marginTop: 8,
        marginBottom: 8,
        padding: 8,
        borderRadius: 4,
    },
});
