import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";

type CourseDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CourseDetails"
>;

export default function CourseDetailsScreen({
    navigation,
    route,
}: {
    navigation: CourseDetailsScreenNavigationProp;
    route: { params: { courseId: string } };
}) {
    const gradeDistribution = ["A: 50%", "B: 30%", "C: 20%"];
    const reviews = ["좋았습니다.", "듣기 어려웠어요"];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>
                Course Details: {route.params.courseId}
            </Text>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Grade Distributions:</Text>
                {gradeDistribution.map((dist, i) => (
                    <View key={i} style={styles.itemCard}>
                        <Text style={styles.itemText}>{dist}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Reviews:</Text>
                {reviews.map((review, i) => (
                    <View key={i} style={styles.itemCard}>
                        <Text style={styles.itemText}>{review}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity
                style={styles.chatButton}
                onPress={() =>
                    navigation.navigate("CourseChat", {
                        courseId: route.params.courseId,
                    })
                }
            >
                <Text style={styles.chatButtonText}>Join Course Chat</Text>
            </TouchableOpacity>
            {/* ...existing code... */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f2f2f2",
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#444",
    },
    itemCard: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        color: "#555",
    },
    chatButton: {
        backgroundColor: "#4A90E2",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    chatButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
