import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // firebaseConfig.ts에서 auth 가져오기

const SignIn = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password); // firebase 인증 사용
            Alert.alert("Success", "Logged in successfully!");
            navigation.navigate("Home");
        } catch (error: any) {
            console.log("SignIn error:", error); // 에러 디버깅 로그 추가
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <Text>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <Button title="Sign In" onPress={handleSignIn} />
            <Button
                title="Create an account"
                onPress={() => navigation.navigate("SignUp")}
            />
        </View>
    );
};

export default SignIn;
