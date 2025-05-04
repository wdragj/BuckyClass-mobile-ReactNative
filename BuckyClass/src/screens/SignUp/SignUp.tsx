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
    Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./SignUp_CSS";

type SignUpScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "SignUp"
>;

interface SignUpScreenProps {
    navigation: SignUpScreenNavigationProp;
}

export default function SignUp({ navigation }: SignUpScreenProps) {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateForm = () => {
        if (!displayName.trim()) {
            setError("Please enter your name");
            return false;
        }
        if (!email.trim()) {
            setError("Please enter your email");
            return false;
        }
        if (!password) {
            setError("Please enter a password");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleSignUp = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError("");

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Update user profile
            await updateProfile(userCredential.user, {
                displayName: displayName,
            });

            Alert.alert(
                "Registration Successful",
                "Your account has been created!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("UserInfo"),
                    },
                ]
            );
        } catch (err: any) {
            console.error("Signup error:", err.message);

            // User-friendly error messages
            if (err.code === "auth/email-already-in-use") {
                setError("Email already in use");
            } else if (err.code === "auth/invalid-email") {
                setError("Invalid email format");
            } else if (err.code === "auth/weak-password") {
                setError("Password is too weak");
            } else {
                setError("Sign up failed. Please try again.");
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
                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={24}
                                        color="#8863e4"
                                    />
                                </TouchableOpacity>

                                <Text style={styles.title}>Sign Up</Text>
                                <Text style={styles.subtitle}>
                                    Start your learning journey with GROW
                                </Text>

                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons
                                            name="person-outline"
                                            size={20}
                                            color="#8863e4"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Name"
                                            placeholderTextColor="#999"
                                            value={displayName}
                                            onChangeText={setDisplayName}
                                        />
                                    </View>

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

                                    <View style={styles.inputWrapper}>
                                        <Ionicons
                                            name="lock-closed-outline"
                                            size={20}
                                            color="#8863e4"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Confirm Password"
                                            placeholderTextColor="#999"
                                            secureTextEntry={
                                                !showConfirmPassword
                                            }
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            <Ionicons
                                                name={
                                                    showConfirmPassword
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
                                        style={[
                                            styles.button,
                                            loading && styles.buttonDisabled,
                                        ]}
                                        onPress={handleSignUp}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <ActivityIndicator
                                                size="small"
                                                color="#fff"
                                            />
                                        ) : (
                                            <Text style={styles.buttonText}>
                                                Sign Up
                                            </Text>
                                        )}
                                    </TouchableOpacity>

                                    <View style={styles.signinContainer}>
                                        <Text style={styles.signinText}>
                                            Already have an account?
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate("SignIn")
                                            }
                                        >
                                            <Text style={styles.signinLink}>
                                                Sign In
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
