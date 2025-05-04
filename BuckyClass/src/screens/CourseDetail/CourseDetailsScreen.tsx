import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PieChart } from "react-native-chart-kit";
import { RootStackParamList } from "../../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavBar from "../../components/BottomNavBar";
import { getAuth } from "firebase/auth"; // Firebase Auth 가져오기
import Ionicons from "react-native-vector-icons/Ionicons"; // 별점을 위한 아이콘
import styles from "./CourseDetailsScreen_CSS"; // 스타일 임포트

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

interface Section {
    id: string;
    number: number;
    section_type: string;
    courseoffering_id: string;
    meeting_time: string;
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
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [sectionsLoading, setSectionsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [showSections, setShowSections] = useState(false);

    useEffect(() => {
        // 강의 상세 정보와 리뷰를 별도로 가져오기
        const fetchCourseData = async () => {
            setLoading(true);
            setReviewsLoading(true);
            setSectionsLoading(true);

            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                setLoading(false);
                setReviewsLoading(false);
                setSectionsLoading(false);
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

                // 3. 강의 섹션 정보 가져오기
                const sectionsResponse = await fetch(
                    `https://grow-ruddy.vercel.app/api/courses/sections/${course.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    }
                );

                if (!sectionsResponse.ok) {
                    console.warn(
                        `섹션 API 요청 실패: ${sectionsResponse.status}`
                    );
                    setSections([]);
                } else {
                    const sectionsData = await sectionsResponse.json();
                    setSections(
                        Array.isArray(sectionsData) ? sectionsData : []
                    );
                }
            } catch (err) {
                console.error("Error fetching course data:", err);
                setError("강의 정보를 불러오는데 실패했습니다.");
                setReviews([]);
                setSections([]);
            } finally {
                setReviewsLoading(false);
                setSectionsLoading(false);
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
                      legendFontColor: "#000",
                      legendFontSize: 15,
                  },
                  {
                      name: "AB",
                      population: parseFloat(
                          courseDetail.grade.ab_per as string
                      ),
                      color: "#8BC34A",
                      legendFontColor: "#000",
                      legendFontSize: 15,
                  },
                  {
                      name: "B",
                      population: parseFloat(
                          courseDetail.grade.b_per as string
                      ),
                      color: "#CDDC39",
                      legendFontColor: "#000",
                      legendFontSize: 15,
                  },
                  {
                      name: "BC",
                      population: parseFloat(
                          courseDetail.grade.bc_per as string
                      ),
                      color: "#FFEB3B",
                      legendFontColor: "#000",
                      legendFontSize: 15,
                  },
                  {
                      name: "C",
                      population: parseFloat(
                          courseDetail.grade.c_per as string
                      ),
                      color: "#FFC107",
                      legendFontColor: "#000",
                      legendFontSize: 15,
                  },
                  {
                      name: "D",
                      population: parseFloat(
                          courseDetail.grade.d_per as string
                      ),
                      color: "#FF9800",
                      legendFontColor: "#000",
                      legendFontSize: 15,
                  },
                  {
                      name: "F",
                      population: parseFloat(
                          courseDetail.grade.f_per as string
                      ),
                      color: "#F44336",
                      legendFontColor: "#000",
                      legendFontSize: 15,
                  },
                  {
                      name: "Other",
                      population: parseFloat(
                          courseDetail.grade.other_per as string
                      ),
                      color: "#9E9E9E",
                      legendFontColor: "#000",
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

    // 섹션 목록 렌더링
    const renderSectionItem = ({ item }: { item: Section }) => (
        <View style={styles.sectionItem}>
            <View
                style={[
                    styles.sectionTypeTag,
                    item.section_type === "LAB" && styles.labTypeTag,
                ]}
            >
                <Text style={styles.sectionTypeText}>{item.section_type}</Text>
            </View>
            <Text style={styles.sectionNumberText}>#{item.number}</Text>
            <Text style={styles.sectionTimeText}>{item.meeting_time}</Text>
        </View>
    );

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
                                    </View>
                                )}

                            {/* 섹션 드롭다운 추가 */}
                            <View style={styles.sectionsContainer}>
                                <TouchableOpacity
                                    style={styles.sectionDropdownHeader}
                                    onPress={() =>
                                        setShowSections(!showSections)
                                    }
                                >
                                    <Text style={styles.dropdownTitle}>
                                        Sections ({sections.length})
                                    </Text>
                                    <Ionicons
                                        name={
                                            showSections
                                                ? "chevron-up"
                                                : "chevron-down"
                                        }
                                        size={20}
                                        color="#8863e4"
                                        style={styles.dropdownIcon}
                                    />
                                </TouchableOpacity>

                                {showSections && (
                                    <View style={styles.sectionsListContainer}>
                                        {sectionsLoading ? (
                                            <ActivityIndicator
                                                size="small"
                                                color="#8863e4"
                                                style={{ padding: 20 }}
                                            />
                                        ) : sections.length > 0 ? (
                                            <ScrollView
                                                style={
                                                    styles.sectionsScrollContainer
                                                }
                                                nestedScrollEnabled={true}
                                            >
                                                {sections.map((item) => (
                                                    <View
                                                        key={item.id}
                                                        style={
                                                            styles.sectionItem
                                                        }
                                                    >
                                                        <View
                                                            style={[
                                                                styles.sectionTypeTag,
                                                                item.section_type ===
                                                                    "LAB" &&
                                                                    styles.labTypeTag,
                                                            ]}
                                                        >
                                                            <Text
                                                                style={
                                                                    styles.sectionTypeText
                                                                }
                                                            >
                                                                {
                                                                    item.section_type
                                                                }
                                                            </Text>
                                                        </View>
                                                        <Text
                                                            style={
                                                                styles.sectionNumberText
                                                            }
                                                        >
                                                            #{item.number}
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.sectionTimeText
                                                            }
                                                        >
                                                            {item.meeting_time}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </ScrollView>
                                        ) : (
                                            <Text style={styles.noSectionsText}>
                                                No sections available
                                            </Text>
                                        )}
                                    </View>
                                )}
                            </View>

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
                                        paddingLeft="25"
                                        absolute
                                    />
                                </View>
                                {courseDetail.averageGpa && (
                                    <Text style={styles.averageGpa}>
                                        Average GPA: {courseDetail.averageGpa}
                                    </Text>
                                )}
                            </View>

                            {/* 리뷰 섹션 - 마지막 섹션은 가로선 없음 */}
                            <View
                                style={[
                                    styles.sectionContainer,
                                    { borderBottomWidth: 0 },
                                ]}
                            >
                                <Text style={styles.sectionTitle}>
                                    Latest Reviews
                                </Text>

                                {reviewsLoading ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#8863e4"
                                    />
                                ) : reviews.length > 0 ? (
                                    <View style={styles.reviewsContainer}>
                                        {reviews.map((review, index) => (
                                            <View
                                                key={`${review.user_id}-${index}`}
                                                style={[
                                                    styles.reviewCard,
                                                    index ===
                                                        reviews.length - 1 && {
                                                        marginBottom: 0,
                                                    },
                                                ]}
                                            >
                                                <View
                                                    style={
                                                        styles.reviewCardHeader
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.reviewUser
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.reviewUserAvatar
                                                            }
                                                        >
                                                            <Text
                                                                style={
                                                                    styles.reviewUserAvatarText
                                                                }
                                                            >
                                                                {review.username
                                                                    ? review.username
                                                                          .charAt(
                                                                              0
                                                                          )
                                                                          .toUpperCase()
                                                                    : "U"}
                                                            </Text>
                                                        </View>
                                                        <View>
                                                            <Text
                                                                style={
                                                                    styles.reviewUsername
                                                                }
                                                            >
                                                                {review.username ||
                                                                    "Anonymous User"}
                                                            </Text>
                                                            <Text
                                                                style={
                                                                    styles.reviewDate
                                                                }
                                                            >
                                                                {formatDate(
                                                                    review.created_at
                                                                )}
                                                                {review.edited &&
                                                                    " (edited)"}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.ratingContainer
                                                        }
                                                    >
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
                                                                    size={14}
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
                                                </View>

                                                <Text
                                                    style={styles.reviewComment}
                                                >
                                                    {review.comment}
                                                </Text>

                                                <View
                                                    style={styles.reviewFooter}
                                                >
                                                    <TouchableOpacity
                                                        style={
                                                            styles.reviewAction
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="heart-outline"
                                                            size={18}
                                                            color="#777"
                                                        />
                                                        <Text
                                                            style={
                                                                styles.reviewActionText
                                                            }
                                                        >
                                                            {review.like_count ||
                                                                0}
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={
                                                            styles.reviewAction
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="chatbubble-outline"
                                                            size={18}
                                                            color="#777"
                                                        />
                                                        <Text
                                                            style={
                                                                styles.reviewActionText
                                                            }
                                                        >
                                                            Reply
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <View style={styles.emptyReviewsContainer}>
                                        <Ionicons
                                            name="chatbubble-ellipses-outline"
                                            size={48}
                                            color="#ddd"
                                        />
                                        <Text style={styles.emptyText}>
                                            No reviews yet!
                                        </Text>
                                        <Text style={styles.emptySubText}>
                                            Be the first to share your
                                            experience
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* 버튼 섹션 - 수평 배치 */}
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => {
                                        // 이름 형식을 "subject_abbreviation number" 형식으로 변경
                                        const chatRoomName = `${course.subject_abbreviation} ${courseDetail.course.number}`;
                                        navigation.navigate("CourseChat", {
                                            courseId: course.id,
                                            courseName: chatRoomName, // 형식 변경
                                        });
                                    }}
                                >
                                    <Ionicons
                                        name="chatbubbles"
                                        size={20}
                                        color="#8863e4"
                                    />
                                    <Text style={styles.actionButtonText}>
                                        Chat
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.reviewButton,
                                    ]}
                                    onPress={() => {
                                        navigation.navigate("Review", {
                                            courseId: course.id,
                                            courseName:
                                                courseDetail.course.name,
                                        });
                                    }}
                                >
                                    <Ionicons
                                        name="star"
                                        size={20}
                                        color="#fff"
                                    />
                                    <Text style={styles.reviewButtonText}>
                                        Review
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
};

export default CourseDetailsScreen;
