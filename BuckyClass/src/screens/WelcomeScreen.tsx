import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av"; // or use react-native-video if preferred
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

type WelcomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "WelcomeScreen"
>;

export default function WelcomeScreen({
    navigation,
}: {
    navigation: WelcomeScreenNavigationProp;
}) {
    useEffect(() => {
        // Auto-navigate after playback finishes
    }, []);

    return (
        <View style={styles.container}>
            <Video
                source={require("../../assets/start.mp4")}
                style={styles.video}
                resizeMode="cover"
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                        navigation.replace("SignIn");
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    video: {
        flex: 1,
    },
});
