import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

type BottomNavBarProps = {
    navigation: StackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList
    >;
    activeScreen?: "Home" | "Courses" | "ChatList" | "Profile";
};

const { width } = Dimensions.get("window");

const BottomNavBar = ({
    navigation,
    activeScreen = "Home",
}: BottomNavBarProps) => {
    return (
        <View style={styles.bottomNavBarContainer}>
            <View style={styles.bottomNavBar}>
                <TouchableOpacity
                    style={styles.bottomNavItem}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Ionicons
                        name="home"
                        style={[
                            styles.bottomNavIcon,
                            activeScreen === "Home" && styles.activeIcon,
                        ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomNavItem}
                    onPress={() => navigation.navigate("Courses")}
                >
                    <Ionicons
                        name="book"
                        style={[
                            styles.bottomNavIcon,
                            activeScreen === "Courses" && styles.activeIcon,
                        ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomNavItem}
                    onPress={() => navigation.navigate("ChatList")}
                >
                    <Ionicons
                        name="chatbubble-ellipses"
                        style={[
                            styles.bottomNavIcon,
                            activeScreen === "ChatList" && styles.activeIcon,
                        ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomNavItem}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Ionicons
                        name="person"
                        style={[
                            styles.bottomNavIcon,
                            activeScreen === "Profile" && styles.activeIcon,
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNavBarContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 10, // Extra space at the bottom
        zIndex: 1000,
        pointerEvents: "box-none", // Pass touch events down to the underlying view
    },
    bottomNavBar: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "#FFF",
        shadowColor: "rgba(0, 0, 0, 0.12)",
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation: 8,
        paddingVertical: 8,
        justifyContent: "space-around",
        maxWidth: width - 40, // 20px padding on both sides
    },
    bottomNavItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    bottomNavIcon: {
        fontSize: 24,
        color: "#8863e4",
        marginBottom: 0,
    },
    activeIcon: {
        color: "#F97CBD", // Active icon color
        fontSize: 28, // Increase size of active icon
    },
});

export default BottomNavBar;
