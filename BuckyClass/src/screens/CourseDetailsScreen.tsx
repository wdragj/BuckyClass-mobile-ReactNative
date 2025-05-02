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
import { getAuth } from "firebase/auth"; // Firebase Auth 가져오기
import Ionicons from "react-native-vector-icons/Ionicons"; // 별점을 위한 아이콘

type CourseDetailsScreenRouteProp = RouteProp<
    RootStackParamList,
    "CourseDetails"
>;
type CourseDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CourseDetails"
>;

// API 응답 형식에 맞게 인터페이스 업데이트
interface CourseDetailData {
    course: {
        id: string;
        name: string;
        number: number;
        views: number;
        subject_abbreviation?: string;
    };
    grade: {
        course_id: string;
        total: number;
        a_per: string | number;
        ab_per: string | number;
        b_per: string | number;
        bc_per: string | number;
        c_per: string | number;
        d_per: string | number;
        f_per: string | number;
        other_per: string | number;
    };
    averageGpa: string;
    instructors: string[];
}

interface Review {
    course_id: string;
    user_id: string;
    rating: string | number;
    comment: string;
    edited: boolean;
    created_at: string;
    like_count: number | null;
    username: string | null;
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
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // 강의 상세 정보와 리뷰를 별도로 가져오기
        const fetchCourseData = async () => {
            setLoading(true);
            setReviewsLoading(true);

            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                setLoading(false);
                setReviewsLoading(false);
                setError("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
                return;
            }

            try {
                // Firebase ID 토큰 가져오기
                const idToken = await currentUser.getIdToken(true);
                setAuthenticated(true);

                // 1. 강의 상세 정보 가져오기
                const courseResponse = await fetch(
                    `https://grow-ruddy.vercel.app/api/courses/${course.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    }
                );

                if (!courseResponse.ok) {
                    throw new Error(
                        `강의 정보 API 요청 실패: ${courseResponse.status}`
                    );
                }

                const courseData = await courseResponse.json();
                setCourseDetail(courseData);
                setLoading(false);

                // 2. 강의 리뷰 정보 가져오기
                const reviewsResponse = await fetch(
                    `https://grow-ruddy.vercel.app/api/reviews/${course.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    }
                );

                if (!reviewsResponse.ok) {
                    console.warn(
                        `리뷰 API 요청 실패: ${reviewsResponse.status}`
                    );
                    setReviews([]);
                } else {
                    const reviewsData = await reviewsResponse.json();
                    setReviews(Array.isArray(reviewsData) ? reviewsData : []);
                }
            } catch (err) {
                console.error("Error fetching course data:", err);
                setError("강의 정보를 불러오는데 실패했습니다.");
                setReviews([]);
            } finally {
                setReviewsLoading(false);
            }
        };

        fetchCourseData();
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

                                {/* 로그인 필요 시 로그인 버튼 표시 */}
                                {!authenticated && error.includes("로그인") && (
                                    <TouchableOpacity
                                        style={styles.loginButton}
                                        onPress={() =>
                                            navigation.navigate("SignIn")
                                        }
                                    >
                                        <Text style={styles.loginButtonText}>
                                            로그인하러 가기
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
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
    const allZeroGrades = courseDetail
        ? parseFloat(courseDetail.grade.a_per as string) === 0 &&
          parseFloat(courseDetail.grade.ab_per as string) === 0 &&
          parseFloat(courseDetail.grade.b_per as string) === 0 &&
          parseFloat(courseDetail.grade.bc_per as string) === 0 &&
          parseFloat(courseDetail.grade.c_per as string) === 0 &&
          parseFloat(courseDetail.grade.d_per as string) === 0 &&
          parseFloat(courseDetail.grade.f_per as string) === 0 &&
          parseFloat(courseDetail.grade.other_per as string) === 0
        : true;

    // 차트 데이터 생성
    const chartData =
        !courseDetail || allZeroGrades
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
                      population: parseFloat(
                          courseDetail.grade.a_per as string
                      ),
                      color: "#4CAF50",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                  },
                  {
                      name: "AB",
                      population: parseFloat(
                          courseDetail.grade.ab_per as string
                      ),
                      color: "#8BC34A",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                  },
                  {
                      name: "B",
                      population: parseFloat(
                          courseDetail.grade.b_per as string
                      ),
                      color: "#CDDC39",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                  },
                  {
                      name: "BC",
                      population: parseFloat(
                          courseDetail.grade.bc_per as string
                      ),
                      color: "#FFEB3B",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                  },
                  {
                      name: "C",
                      population: parseFloat(
                          courseDetail.grade.c_per as string
                      ),
                      color: "#FFC107",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                  },
                  {
                      name: "D",
                      population: parseFloat(
                          courseDetail.grade.d_per as string
                      ),
                      color: "#FF9800",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                  },
                  {
                      name: "F",
                      population: parseFloat(
                          courseDetail.grade.f_per as string
                      ),
                      color: "#F44336",
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                  },
                  {
                      name: "Other",
                      population: parseFloat(
                          courseDetail.grade.other_per as string
                      ),
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

    // 날짜 포맷팅 함수
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

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
                                {courseDetail?.course.name}
                            </Text>
                            <View style={styles.courseInfoRow}>
                                <Text style={styles.courseInfoText}>
                                    Course: {course.subject_abbreviation}{" "}
                                    {courseDetail?.course.number}
                                </Text>
                                <Text style={styles.courseInfoText}>
                                    Views: {courseDetail?.course.views}
                                </Text>
                            </View>

                            {/* 강사 정보 표시 */}
                            {courseDetail?.instructors &&
                                courseDetail.instructors.length > 0 && (
                                    <View style={styles.sectionContainer}>
                                        <Text style={styles.sectionTitle}>
                                            Instructors
                                        </Text>
                                        {courseDetail.instructors.map(
                                            (instructor, idx) => (
                                                <Text
                                                    key={idx}
                                                    style={
                                                        styles.instructorName
                                                    }
                                                >
                                                    • {instructor}
                                                </Text>
                                            )
                                        )}
                                        {courseDetail.averageGpa && (
                                            <Text style={styles.averageGpa}>
                                                Average GPA:{" "}
                                                {courseDetail.averageGpa}
                                            </Text>
                                        )}
                                    </View>
                                )}

                            {/* 등급 분포 섹션 */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>
                                    Grade Distribution
                                </Text>
                                <Text style={styles.totalStudents}>
                                    Total Students: {courseDetail?.grade.total}
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
                                        A: {courseDetail?.grade.a_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        AB: {courseDetail?.grade.ab_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        B: {courseDetail?.grade.b_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        BC: {courseDetail?.grade.bc_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        C: {courseDetail?.grade.c_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        D: {courseDetail?.grade.d_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        F: {courseDetail?.grade.f_per}%
                                    </Text>
                                    <Text style={styles.gradeDetail}>
                                        Others: {courseDetail?.grade.other_per}%
                                    </Text>
                                </View>
                            </View>

                            {/* 리뷰 섹션 */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Reviews</Text>
                                {reviewsLoading ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#8863e4"
                                    />
                                ) : reviews.length > 0 ? (
                                    reviews.map((review, index) => (
                                        <View
                                            key={`${review.user_id}-${index}`}
                                            style={styles.reviewItem}
                                        >
                                            <View style={styles.reviewHeader}>
                                                <View
                                                    style={
                                                        styles.ratingContainer
                                                    }
                                                >
                                                    {/* 별점 표시 */}
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <Ionicons
                                                                key={`star-${star}-${index}`}
                                                                name={
                                                                    star <=
                                                                    parseFloat(
                                                                        review.rating as string
                                                                    )
                                                                        ? "star"
                                                                        : "star-outline"
                                                                }
                                                                size={16}
                                                                color="#FFD700"
                                                                style={
                                                                    styles.starIcon
                                                                }
                                                            />
                                                        )
                                                    )}
                                                    <Text
                                                        style={
                                                            styles.ratingText
                                                        }
                                                    >
                                                        {parseFloat(
                                                            review.rating as string
                                                        ).toFixed(1)}
                                                    </Text>
                                                </View>
                                                <Text style={styles.reviewDate}>
                                                    {formatDate(
                                                        review.created_at
                                                    )}
                                                    {review.edited &&
                                                        " (edited)"}
                                                </Text>
                                            </View>
                                            {review.username && (
                                                <Text
                                                    style={
                                                        styles.reviewUsername
                                                    }
                                                >
                                                    {review.username}
                                                </Text>
                                            )}
                                            <Text style={styles.reviewComment}>
                                                {review.comment}
                                            </Text>
                                            <View style={styles.reviewFooter}>
                                                <View
                                                    style={styles.likeContainer}
                                                >
                                                    <Ionicons
                                                        name="heart"
                                                        size={14}
                                                        color="#F97CBD"
                                                    />
                                                    <Text
                                                        style={styles.likeCount}
                                                    >
                                                        {review.like_count || 0}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.emptyText}>
                                        No reviews yet!
                                    </Text>
                                )}

                                {/* 리뷰 작성 버튼 */}
                                <TouchableOpacity
                                    style={styles.writeReviewButton}
                                    onPress={() => {
                                        // 리뷰 작성 화면으로 이동하는 로직 (향후 구현)
                                        alert(
                                            "리뷰 작성 기능은 준비 중입니다."
                                        );
                                    }}
                                >
                                    <Text style={styles.writeReviewButtonText}>
                                        Write a Review
                                    </Text>
                                </TouchableOpacity>
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
        paddingBottom: 0,
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
    courseInfoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    courseInfoText: {
        fontSize: 14,
        color: "#777",
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
        marginBottom: 12,
    },
    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    starIcon: {
        marginRight: 2,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    reviewDate: {
        fontSize: 12,
        color: "#999",
        fontStyle: "italic",
    },
    reviewComment: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
        marginBottom: 8,
    },
    reviewFooter: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    likeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeCount: {
        marginLeft: 4,
        fontSize: 12,
        color: "#666",
    },
    emptyText: {
        fontStyle: "italic",
        color: "#999",
    },
    errorText: {
        color: "#F97CBD",
        fontSize: 16,
        fontFamily: "Nunito-Bold",
        textAlign: "center",
        marginBottom: 20,
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
    loginButton: {
        backgroundColor: "#F97CBD",
        borderRadius: 24,
        padding: 12,
        marginTop: 20,
        alignItems: "center",
        alignSelf: "center",
        paddingHorizontal: 40,
    },
    loginButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Nunito-Bold",
    },
    averageGpa: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4CAF50",
        marginTop: 16,
        fontFamily: "Nunito-Bold",
    },
    instructorName: {
        fontSize: 14,
        marginBottom: 8,
        color: "#555",
        fontFamily: "Nunito",
    },
    reviewUsername: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
        marginBottom: 4,
        fontFamily: "Nunito-Bold",
    },
    writeReviewButton: {
        backgroundColor: "#F97CBD",
        borderRadius: 20,
        padding: 10,
        marginTop: 16,
        alignItems: "center",
    },
    writeReviewButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Nunito-Bold",
    },
});

export default CourseDetailsScreen;
