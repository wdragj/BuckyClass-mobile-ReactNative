import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PieChart } from "react-native-chart-kit";
import { RootStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavBar from "../components/BottomNavBar";

type CourseDetailsScreenRouteProp = RouteProp<
    RootStackParamList,
    "CourseDetails"
>;
type CourseDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CourseDetails"
>;

interface CourseDetailData {
    course: {
        id: string;
        name: string;
        views: number;
    };
    grade: {
        course_id: string;
        total: number;
        a_per: string;
        ab_per: string;
        b_per: string;
        bc_per: string;
        c_per: string;
        d_per: string;
        f_per: string;
        other_per: string;
    };
    reviews: any[];
}

interface Props {
    route: CourseDetailsScreenRouteProp;
    navigation: CourseDetailsScreenNavigationProp;
}

const CourseDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const { course } = route.params;
    const [courseDetail, setCourseDetail] = useState<CourseDetailData | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // 강의 ID로 강의 상세 정보 가져오기
        const fetchCourseDetail = async () => {
            try {
                const response = await fetch(
                    `https://grow-ruddy.vercel.app/api/courses/${course.id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch course details");
                }
                const data = await response.json();
                setCourseDetail(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching course details:", err);
                setError("Failed to load course details");
                setLoading(false);
            }
        };

        fetchCourseDetail();
    }, [course.id]);

    if (loading) {
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
                            <View style={styles.centeredContainer}>
                                <ActivityIndicator
                                    size="large"
                                    color="#8863e4"
                                />
                                <Text style={styles.loadingText}>
                                    Loading course details...
                                </Text>
                            </View>
                        </View>
                        <BottomNavBar
                            navigation={navigation}
                            activeScreen="Courses"
                        />
                    </LinearGradient>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
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
                            <View style={styles.centeredContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        </View>
                        <BottomNavBar
                            navigation={navigation}
                            activeScreen="Courses"
                        />
                    </LinearGradient>
                </View>
            </SafeAreaView>
        );
    }

    if (!courseDetail) {
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
                            <View style={styles.centeredContainer}>
                                <Text>No data available</Text>
                            </View>
                        </View>
                        <BottomNavBar
                            navigation={navigation}
                            activeScreen="Courses"
                        />
                    </LinearGradient>
                </View>
            </SafeAreaView>
        );
    }

    // 모든 등급의 비율이 0인지 확인
    const allZeroGrades =
        parseFloat(courseDetail.grade.a_per) === 0 &&
        parseFloat(courseDetail.grade.ab_per) === 0 &&
        parseFloat(courseDetail.grade.b_per) === 0 &&
        parseFloat(courseDetail.grade.bc_per) === 0 &&
        parseFloat(courseDetail.grade.c_per) === 0 &&
        parseFloat(courseDetail.grade.d_per) === 0 &&
        parseFloat(courseDetail.grade.f_per) === 0 &&
        parseFloat(courseDetail.grade.other_per) === 0;

    // 차트 데이터 - 모든 비율이 0이면 A를 100%로 표시
    const chartData = allZeroGrades
        ? [
              {
                  name: "No Grades",
                  population: 100,
                  color: "#4CAF50",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
              },
          ]
        : [
              {
                  name: "A",
                  population: parseFloat(courseDetail.grade.a_per),
                  color: "#4CAF50",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
              },
              {
                  name: "AB",
                  population: parseFloat(courseDetail.grade.ab_per),
                  color: "#8BC34A",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
              },
              {
                  name: "B",
                  population: parseFloat(courseDetail.grade.b_per),
                  color: "#CDDC39",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
              },
              {
                  name: "BC",
                  population: parseFloat(courseDetail.grade.bc_per),
                  color: "#FFEB3B",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
              },
              {
                  name: "C",
                  population: parseFloat(courseDetail.grade.c_per),
                  color: "#FFC107",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
              },
              {
                  name: "D",
                  population: parseFloat(courseDetail.grade.d_per),
                  color: "#FF9800",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
              },
              {
                  name: "F",
                  population: parseFloat(courseDetail.grade.f_per),
                  color: "#F44336",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
              },
              {
                  name: "Other",
                  population: parseFloat(courseDetail.grade.other_per),
                  color: "#9E9E9E",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
              },
          ];

    // 빈 데이터 필터링 - 차트에서 0% 항목 제거 (시각적으로 더 깔끔)
    const filteredChartData = allZeroGrades
        ? chartData
        : chartData.filter((item) => item.population > 0);

    const screenWidth = Dimensions.get("window").width;

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
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                        >
                            <Text style={styles.courseName}>
                                {courseDetail.course.name}
                            </Text>
                            <Text style={styles.courseViews}>
                                Views: {courseDetail.course.views}
                            </Text>

                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>
                                    Cumulate GPA
                                </Text>
                                <Text style={styles.totalStudents}>
                                    Total Students: {courseDetail.grade.total}
                                </Text>
                                <View style={styles.chartContainer}>
                                    <PieChart
                                        data={filteredChartData}
                                        width={screenWidth - 60}
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: "#ffffff",
                                            backgroundGradientFrom: "#ffffff",
                                            backgroundGradientTo: "#ffffff",
                                            decimalPlaces: 2,
                                            color: (opacity = 1) =>
                                                `rgba(0, 0, 0, ${opacity})`,
                                        }}
                                        accessor="population"
                                        backgroundColor="transparent"
                                        paddingLeft="15"
                                        absolute
                                    />
                                </View>

                                <View style={styles.gradeDetailsContainer}>
                                    <Text style={styles.gradeDetail}>
                                        A: {courseDetail.grade.a_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        AB: {courseDetail.grade.ab_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        B: {courseDetail.grade.b_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        BC: {courseDetail.grade.bc_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        C: {courseDetail.grade.c_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        D: {courseDetail.grade.d_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        F: {courseDetail.grade.f_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        Others: {courseDetail.grade.other_per}%
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>
                                    Latest Reviews
                                </Text>
                                {courseDetail.reviews.length > 0 ? (
                                    courseDetail.reviews.map(
                                        (review, index) => (
                                            <View
                                                key={index}
                                                style={styles.reviewItem}
                                            >
                                                <Text>{review.content}</Text>
                                            </View>
                                        )
                                    )
                                ) : (
                                    <Text style={styles.emptyText}>
                                        No reviews yet!
                                    </Text>
                                )}
                            </View>

                            <TouchableOpacity
                                style={styles.chatButton}
                                onPress={() => {
                                    navigation.navigate("CourseChat", {
                                        courseId: course.id,
                                    });
                                }}
                            >
                                <Text style={styles.chatButtonText}>
                                    Join the Chat
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <BottomNavBar
                        navigation={navigation}
                        activeScreen="Courses"
                    />
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
        paddingBottom: 70,
    },
    scrollContent: {
        padding: 16,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontFamily: "Nunito",
        color: "#555",
    },
    courseName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        fontFamily: "Nunito-ExtraBold",
        color: "#171717",
    },
    courseViews: {
        fontSize: 14,
        color: "#777",
        marginBottom: 24,
        fontFamily: "Nunito",
    },
    sectionContainer: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 24,
        marginBottom: 12,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        fontFamily: "Nunito-ExtraBold",
        color: "#171717",
    },
    totalStudents: {
        fontSize: 14,
        marginBottom: 16,
    },
    chartContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    gradeDetailsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    gradeDetail: {
        width: "48%",
        marginBottom: 8,
        fontSize: 14,
    },
    reviewItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    emptyText: {
        fontStyle: "italic",
        color: "#999",
    },
    errorText: {
        color: "#F97CBD",
        fontSize: 16,
        fontFamily: "Nunito-Bold",
    },
    chatButton: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 10,
        marginTop: 12,
        marginBottom: 24,
        alignItems: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#8863e4",
    },
    chatButtonText: {
        color: "#8863e4",
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Nunito-Bold",
    },
});

export default CourseDetailsScreen;
