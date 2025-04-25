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
import UserInfoScreen from "./screens/SignIn/UserInfoScreen";
import AvatarScreen from "./screens/SignIn/Avatar";

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
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
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen
          name="Courses"
          component={CoursesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetailsScreen}
        />
        <Stack.Screen name="CourseChat" component={CourseChatScreen} />
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen
          name="PrivateChat"
          component={PrivateChatScreen}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfoScreen}
          options={{ headerShown: false }} // Hide header for UserInfoScreen
        />
        <Stack.Screen
          name="AvatarScreen"
          component={AvatarScreen} // Add AvatarScreen here
          options={{ headerShown: false }} // Hide header for AvatarScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
