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
import Ionicons from "react-native-vector-icons/Ionicons";
import PieChart from "react-native-pie-chart";

// 기존 타입에서 courseId 대신 course 객체를 받도록 수정
interface Course {
    id: string;
    title: string;
    category: string;
    professor: string;
    elective: string;
    subject: string;
    description: string;
    gradeDistribution: { [grade: string]: number };
}

type CourseDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CourseDetails"
>;

// 예시 데이터: 최근 리뷰
const latestReviews = [
    {
        user: "User1",
        rating: 5,
        text: "Great course, highly recommended!",
    },
    {
        user: "User2",
        rating: 4,
        text: "Enjoyed the content, but assessments were challenging.",
    },
    {
        user: "User3",
        rating: 5,
        text: "Very comprehensive and well structured!",
    },
];

export default function CourseDetailsScreen({
    navigation,
    route,
}: {
    navigation: CourseDetailsScreenNavigationProp;
    route: { params: { course: Course } };
}) {
    const { course } = route.params;

    // react-native-pie-chart 에 맞게 series 생성 (value와 color)
    const series = Object.entries(course.gradeDistribution).map(
        ([grade, value]) => {
            let color = "";
            if (grade === "A") color = "#EB6927";
            else if (grade === "B") color = "#2D8CFF";
            else if (grade === "C") color = "#A3A3A3";
            else color = "#888888";
            return { value, color };
        }
    );

    const reviews = ["좋았습니다.", "듣기 어려웠어요"];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Course Details: {course.title}</Text>

            {/* react-native-pie-chart 를 사용한 원형 그래프 */}
            <View style={{ alignItems: "center", marginVertical: 20 }}>
                <PieChart
                    widthAndHeight={250}
                    series={series}
                    // cover 옵션을 지정하면 도넛 형태로 표시 가능 (선택 사항)
                    // cover={0.45}
                />
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {Object.entries(course.gradeDistribution).map(
                        ([grade, value], i) => {
                            let color = "";
                            if (grade === "A") color = "#EB6927";
                            else if (grade === "B") color = "#2D8CFF";
                            else if (grade === "C") color = "#A3A3A3";
                            else color = "#888888";
                            return (
                                <View
                                    key={i}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginHorizontal: 5,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 15,
                                            height: 15,
                                            backgroundColor: color,
                                            marginRight: 3,
                                        }}
                                    />
                                    <Text>{`${grade} ${value}%`}</Text>
                                </View>
                            );
                        }
                    )}
                </View>
            </View>

            {/* 최근 리뷰 섹션 */}
            <Text style={styles.sectionTitle}>Latest Reviews</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
            >
                {latestReviews.map((review, idx) => (
                    <View key={idx} style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <Text style={styles.reviewUser}>{review.user}</Text>
                            <View style={styles.starContainer}>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Ionicons
                                        key={i}
                                        name={
                                            i < review.rating
                                                ? "star"
                                                : "star-outline"
                                        }
                                        style={styles.starIcon}
                                    />
                                ))}
                            </View>
                        </View>
                        <Text style={styles.reviewText}>{review.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.chatButton}
                onPress={() =>
                    navigation.navigate("CourseChat", {
                        courseId: course.id,
                    })
                }
            >
                <Text style={styles.chatButtonText}>Join Course Chat</Text>
            </TouchableOpacity>
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
    // HomeScreen_CSS의 최근 리뷰 섹션 스타일 추가
    reviewCard: {
        width: 220,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 10,
        marginRight: 15,
    },
    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    reviewUser: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    starContainer: {
        flexDirection: "row",
    },
    starIcon: {
        fontSize: 18,
        color: "#FFD700",
        marginRight: 2,
    },
    reviewText: {
        fontSize: 14,
        color: "#555",
        lineHeight: 18,
    },
});
