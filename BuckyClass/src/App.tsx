import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types/navigation";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import CoursesScreen from "./screens/CoursesScreen/CoursesScreen";
import CourseDetailsScreen from "./screens/CourseDetailsScreen";
import CourseChatScreen from "./screens/CourseChatScreen";
import ChatListScreen from "./screens/ChatListScreen";
import PrivateChatScreen from "./screens/PrivateChatScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import * as Font from "expo-font";
import { View, Text } from "react-native";

const Stack = createStackNavigator<RootStackParamList>();

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
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Courses"
                    component={CoursesScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CourseDetails"
                    component={CourseDetailsScreen}
                />
                <Stack.Screen
                    name="CourseChat"
                    component={CourseChatScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ChatList"
                    component={ChatListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PrivateChat"
                    component={PrivateChatScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
