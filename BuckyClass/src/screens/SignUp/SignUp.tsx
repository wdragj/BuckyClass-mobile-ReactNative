import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // firebaseConfig.ts에서 auth 가져오기

const SignUp = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password); // firebase 인증 사용
            Alert.alert("Success", "Account created successfully!");
            navigation.navigate("SignIn");
        } catch (error: any) {
            console.log("SignUp error:", error); // 에러 디버깅 로그 추가
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
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button
                title="Back to Login"
                onPress={() => navigation.navigate("SignIn")}
            />
        </View>
    );
};

export default SignUp;
