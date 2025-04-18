import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
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
                        <Text style={styles.header}>Profile</Text>
                        <View style={styles.profileContainer}>
                            <View style={styles.profileImage} />
                            <Text style={styles.userName}>User Name</Text>
                            <Text style={styles.userInfo}>Class of 2026</Text>

                            <View style={styles.statsContainer}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>12</Text>
                                    <Text style={styles.statLabel}>
                                        Courses
                                    </Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>28</Text>
                                    <Text style={styles.statLabel}>Chats</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>4</Text>
                                    <Text style={styles.statLabel}>Groups</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.settingsButton}>
                                <Text style={styles.settingsButtonText}>
                                    Edit Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
};

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
    },
    header: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#171717",
        marginBottom: 20,
        fontFamily: "Nunito-ExtraBold",
        textAlign: "center",
    },
    profileContainer: {
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 24,
        padding: 20,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 3,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#ccc",
        marginBottom: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "Nunito-ExtraBold",
        marginBottom: 4,
    },
    userInfo: {
        fontSize: 16,
        color: "#777",
        fontFamily: "Nunito",
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 20,
        justifyContent: "space-around",
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#8863e4",
        fontFamily: "Nunito-Bold",
    },
    statLabel: {
        fontSize: 14,
        color: "#666",
        fontFamily: "Nunito",
    },
    settingsButton: {
        backgroundColor: "#F97CBD",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 24,
    },
    settingsButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
});

export default ProfileScreen;
