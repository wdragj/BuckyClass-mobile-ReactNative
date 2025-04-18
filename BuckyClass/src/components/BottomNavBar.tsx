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
        paddingBottom: 10, // 여분 공간 추가
        zIndex: 1000,
        pointerEvents: "box-none", // 컨테이너는 터치 이벤트를 하위로 전달
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
        maxWidth: width - 40, // 화면 양쪽에 20px 여백
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
        color: "#F97CBD", // 활성화된 아이콘 색상
        fontSize: 28, // 활성화된 아이콘 크기 증가
    },
});

export default BottomNavBar;
