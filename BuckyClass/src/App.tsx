import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "./types/navigation";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import UserInfoScreen from "./screens/SignIn/UserInfoScreen";
import AvatarScreen from "./screens/SignIn/Avatar";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import CoursesScreen from "./screens/CoursesScreen/CoursesScreen";
import CourseDetailsScreen from "./screens/CourseDetailsScreen";
import CourseChatScreen from "./screens/CourseChatScreen";
import ChatListScreen from "./screens/ChatListScreen";
import PrivateChatScreen from "./screens/PrivateChatScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import * as Font from "expo-font";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// 단순화된 네비게이터 (타입 제약 제거)
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 탭 네비게이터 컴포넌트 정의
function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Courses") {
                        iconName = focused ? "book" : "book-outline";
                    } else if (route.name === "ChatList") {
                        iconName = focused
                            ? "chatbubble-ellipses"
                            : "chatbubble-ellipses-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "#F97CBD",
                tabBarInactiveTintColor: "#8863e4",
                tabBarStyle: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: "#FFF",
                    shadowColor: "rgba(0, 0, 0, 0.12)",
                    shadowOffset: { width: 0, height: -2 },
                    shadowRadius: 6,
                    shadowOpacity: 1,
                    elevation: 8,
                    height: 80,
                    paddingBottom: 5,
                },
                tabBarShowLabel: false,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Courses" component={CoursesScreen} />
            <Tab.Screen name="ChatList" component={ChatListScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

// CourseDetails 화면을 위한 탭 네비게이터 - 순서 변경
function CourseDetailsTabNavigator({ route }) {
    return (
        <Tab.Navigator
            screenOptions={({ route: tabRoute }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (tabRoute.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (tabRoute.name === "Courses") {
                        iconName = focused ? "book" : "book-outline";
                    } else if (tabRoute.name === "ChatList") {
                        iconName = focused
                            ? "chatbubble-ellipses"
                            : "chatbubble-ellipses-outline";
                    } else if (tabRoute.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "#F97CBD",
                tabBarInactiveTintColor: "#8863e4",
                tabBarStyle: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: "#FFF",
                    shadowColor: "rgba(0, 0, 0, 0.12)",
                    shadowOffset: { width: 0, height: -2 },
                    shadowRadius: 6,
                    shadowOpacity: 1,
                    elevation: 8,
                    height: 80,
                    paddingBottom: 5,
                },
                tabBarShowLabel: false,
                headerShown: false,
            })}
            initialRouteName="Courses" // 초기 활성 탭을 Courses로 설정
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: "홈" }}
            />
            <Tab.Screen
                name="Courses"
                component={CourseDetailsScreen}
                initialParams={{ course: route.params.course }}
                options={{ tabBarLabel: "강의" }}
            />
            <Tab.Screen
                name="ChatList"
                component={ChatListScreen}
                options={{ tabBarLabel: "채팅" }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarLabel: "프로필" }}
            />
        </Tab.Navigator>
    );
}

const App = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Nunito: require("../assets/fonts/Nunito-Regular.ttf"),
                "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
                "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>로딩 중...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomeScreen">
                <Stack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UserInfo"
                    component={UserInfoScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AvatarScreen"
                    component={AvatarScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerTitle: "회원가입" }}
                />
                <Stack.Screen
                    name="MainTabs"
                    component={MainTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CourseDetails"
                    component={CourseDetailsTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CourseChat"
                    component={CourseChatScreen}
                    options={{ headerTitle: "강의 채팅" }}
                />
                <Stack.Screen
                    name="PrivateChat"
                    component={PrivateChatScreen}
                    options={{ headerTitle: "개인 채팅" }}
                />
                <Stack.Screen
                    name="ChatScreen"
                    component={ChatScreen}
                    options={{ headerTitle: "채팅" }}
                />
                {/* EditProfileScreen */}
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                    options={{ headerShown: false }}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
