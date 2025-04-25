import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const SignIn = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            // await signInWithEmailAndPassword(auth, email, password); // firebase 인증 사용
            Alert.alert("Success", "Logged in successfully!");
            // 중요: Home 대신 MainTabs로 네비게이션 변경
            navigation.navigate("MainTabs");
        } catch (error: any) {
            console.log("SignIn error:", error);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Sign In" onPress={handleSignIn} />
            <Button
                title="Create an account"
                onPress={() => navigation.navigate("SignUp")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    label: {
        marginBottom: 5,
        fontFamily: "Nunito",
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingVertical: 5,
        fontFamily: "Nunito",
    },
});

export default SignIn;
