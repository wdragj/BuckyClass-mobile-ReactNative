import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./SignIn_CSS";

type SignInScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "SignIn"
>;

interface SignInScreenProps {
    navigation: SignInScreenNavigationProp;
}

export default function SignIn({ navigation }: SignInScreenProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            setError("Please enter your email and password");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate("MainTabs");
        } catch (err: any) {
            console.error("Login error:", err.message);

            // User-friendly error messages
            if (err.code === "auth/invalid-email") {
                setError("Invalid email format");
            } else if (err.code === "auth/user-not-found") {
                setError("Email not registered");
            } else if (err.code === "auth/wrong-password") {
                setError("Incorrect password");
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

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
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.keyboardAvoidingView}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.blurOverlay}>
                                <View style={styles.logoContainer}>
                                    <Image
                                        source={require("../../../assets/grow.png")}
                                        style={styles.logo}
                                        resizeMode="contain"
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons
                                            name="mail-outline"
                                            size={20}
                                            color="#8863e4"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email"
                                            placeholderTextColor="#999"
                                            value={email}
                                            onChangeText={setEmail}
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                        />
                                    </View>

                                    <View style={styles.inputWrapper}>
                                        <Ionicons
                                            name="lock-closed-outline"
                                            size={20}
                                            color="#8863e4"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            placeholderTextColor="#999"
                                            secureTextEntry={!showPassword}
                                            value={password}
                                            onChangeText={setPassword}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            <Ionicons
                                                name={
                                                    showPassword
                                                        ? "eye-off-outline"
                                                        : "eye-outline"
                                                }
                                                size={20}
                                                color="#8863e4"
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {error ? (
                                        <Text style={styles.errorText}>
                                            {error}
                                        </Text>
                                    ) : null}

                                    <TouchableOpacity
                                        style={styles.forgotPassword}
                                    >
                                        <Text style={styles.forgotPasswordText}>
                                            Forgot password?
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.button,
                                            loading && styles.buttonDisabled,
                                        ]}
                                        onPress={handleSignIn}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <ActivityIndicator
                                                size="small"
                                                color="#fff"
                                            />
                                        ) : (
                                            <Text style={styles.buttonText}>
                                                Sign In
                                            </Text>
                                        )}
                                    </TouchableOpacity>

                                    <View style={styles.signupContainer}>
                                        <Text style={styles.signupText}>
                                            Don't have an account?
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate("SignUp")
                                            }
                                        >
                                            <Text style={styles.signupLink}>
                                                Sign Up
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}
