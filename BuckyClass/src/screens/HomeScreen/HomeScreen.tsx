import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./HomeScreen_CSS";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

// 예시 데이터: 인기 강의
const popularCourses = [
    {
        label: "New",
        imagePath: "Image Path",
        name: "Programming III",
        details: "Details",
    },
    {
        label: "Trending",
        imagePath: "Image Path",
        name: "React Native",
        details: "Details",
    },
    {
        label: "Recommended",
        imagePath: "Image Path",
        name: "User Experience Design",
        details: "Details",
    },
    {
        label: "New",
        imagePath: "Image Path",
        name: "Programming III",
        details: "Details",
    },
    {
        label: "Trending",
        imagePath: "Image Path",
        name: "React Native",
        details: "Details",
    },
    {
        label: "Recommended",
        imagePath: "Image Path",
        name: "User Experience Design",
        details: "Details",
    },
];

// 예시 데이터: 최근 채팅
const latestChats = [
    {
        user: "User1",
        rating: 5,
        text: "Great course, highly recommended!",
    },
    {
        user: "User2",
        rating: 4,
        text: "Enjoyed the content, but lots of assignment.",
    },
    {
        user: "User3",
        rating: 5,
        text: "Very comprehensive and well structured!",
    },
];

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

// 예시 데이터: 핫 코스 (10일치 채팅 데이터 추가)
const hotCourses = [
    {
        name: "COMP SCI 400",
        top: "Top 1",
        chatData: [25, 24, 28, 32, 36, 40, 35, 30, 35, 42], // 10일치 채팅 데이터
    },
    {
        name: "STAT 240",
        top: "Top 2",
        chatData: [15, 18, 20, 20, 22, 19, 26, 28, 24, 30],
    },
    {
        name: "MATH 535",
        top: "Top 3",
        chatData: [10, 11, 12, 14, 31, 15, 18, 16, 20, 19],
    },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
    // 그래프 설정 - 모든 배경 관련 속성을 투명하게 수정
    const chartConfig = {
        backgroundGradientFrom: "transparent",
        backgroundGradientTo: "transparent",
        backgroundGradientFromOpacity: 0, // 시작 그라데이션 완전 투명
        backgroundGradientToOpacity: 0, // 끝 그라데이션 완전 투명
        color: (opacity = 1) => "#8863E4",
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        propsForDots: {
            r: "0",
        },
        fillShadowGradientOpacity: 0,
        decimalPlaces: 0,
    };

    // 작은 차트 너비 설정
    const miniChartWidth = 80;
    const miniChartHeight = 50;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.gradientBackground}>
                <LinearGradient
                    colors={[
                        "rgba(230, 224, 252, 0.40)",
                        "rgba(235, 218, 255, 0.40)",
                    ]}
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.20)",
                    }}
                >
                    {/* 메인 콘텐츠 영역 */}
                    <View style={styles.blurOverlay}>
                        <ScrollView
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.topBar}>
                                <Text style={styles.appName}>GROW</Text>
                            </View>

                            {/* 사용자 정보 - 수정된 부분 */}
                            <View style={styles.userInfoContainer}>
                                <View style={styles.userTextContainer}>
                                    <Text style={styles.userGreeting}>
                                        Hello,
                                    </Text>
                                    <Text style={styles.userName}>
                                        User Name
                                    </Text>
                                    <Text style={styles.userType}>
                                        Class of 2026
                                    </Text>
                                </View>
                                <View style={styles.userPhoto} />
                            </View>

                            {/* Hot Courses 섹션 */}
                            <View style={styles.hotCoursesContainer}>
                                <Text style={styles.hotCoursesTitle}>
                                    GROWing Chat of the Day
                                </Text>
                                {hotCourses.map((course, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.hotCourseCard}
                                    >
                                        <View style={styles.hotCourseLeft}>
                                            <Image
                                                source={
                                                    index === 0
                                                        ? require("../../../assets/csIcon.png")
                                                        : index === 1
                                                        ? require("../../../assets/statIcon.png")
                                                        : require("../../../assets/mathIcon.png")
                                                }
                                                style={
                                                    styles.hotCourseImagePlaceholder
                                                }
                                            />
                                            <View
                                                style={
                                                    styles.hotCourseTextContainer
                                                }
                                            >
                                                <Text
                                                    style={styles.hotCourseName}
                                                >
                                                    {course.name}
                                                </Text>
                                                <Text
                                                    style={styles.hotCourseRank}
                                                >
                                                    {course.top}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* 미니 차트와 통계 정보 */}
                                        <View style={styles.rightContainer}>
                                            {/* 미니 라인 차트 추가 */}
                                            <View
                                                style={[
                                                    styles.miniChartContainer,
                                                    {
                                                        backgroundColor:
                                                            "transparent",
                                                    },
                                                ]}
                                            >
                                                <LineChart
                                                    data={{
                                                        labels: [], // 레이블 없음
                                                        datasets: [
                                                            {
                                                                data: course.chatData,
                                                                color: () =>
                                                                    "#8863E4", // 색상 직접 지정
                                                                strokeWidth: 2,
                                                            },
                                                        ],
                                                    }}
                                                    width={miniChartWidth}
                                                    height={miniChartHeight}
                                                    chartConfig={chartConfig}
                                                    bezier
                                                    withVerticalLines={false}
                                                    withHorizontalLines={false}
                                                    withDots={false}
                                                    withInnerLines={false}
                                                    withOuterLines={false}
                                                    withShadow={false}
                                                    withScrollableDot={false}
                                                    yAxisLabel=""
                                                    yAxisSuffix=""
                                                    style={{
                                                        ...styles.miniChart,
                                                        backgroundColor:
                                                            "transparent",
                                                    }}
                                                    backgroundColor="transparent" // 완전히 투명하게
                                                />
                                            </View>

                                            {/* 추가: 순위 및 변화량 정보 */}
                                            <View style={styles.statsContainer}>
                                                {/* 순위 정보 */}
                                                <Text style={styles.rankText}>
                                                    {index === 0
                                                        ? "1st"
                                                        : index === 1
                                                        ? "2nd"
                                                        : "3rd"}
                                                </Text>

                                                {/* 채팅수 변화량 */}
                                                <View
                                                    style={
                                                        styles.changeContainer
                                                    }
                                                >
                                                    {(() => {
                                                        // 최근 채팅수 변화 계산 (10일째와 9일째 비교)
                                                        const latestValue =
                                                            course.chatData[
                                                                course.chatData
                                                                    .length - 1
                                                            ];
                                                        const previousValue =
                                                            course.chatData[
                                                                course.chatData
                                                                    .length - 2
                                                            ];
                                                        const change =
                                                            latestValue -
                                                            previousValue;
                                                        const isIncrease =
                                                            change > 0;

                                                        return (
                                                            <>
                                                                <Ionicons
                                                                    name={
                                                                        isIncrease
                                                                            ? "triangle"
                                                                            : "triangle"
                                                                    }
                                                                    style={[
                                                                        styles.changeIcon,
                                                                        {
                                                                            color: isIncrease
                                                                                ? "#4CAF50"
                                                                                : "#F44336",
                                                                            transform:
                                                                                [
                                                                                    {
                                                                                        rotate: isIncrease
                                                                                            ? "0deg"
                                                                                            : "180deg",
                                                                                    },
                                                                                ],
                                                                        },
                                                                    ]}
                                                                />
                                                                <Text
                                                                    style={[
                                                                        styles.changeText,
                                                                        {
                                                                            color: isIncrease
                                                                                ? "#4CAF50"
                                                                                : "#F44336",
                                                                        },
                                                                    ]}
                                                                >
                                                                    {Math.abs(
                                                                        change
                                                                    )}
                                                                </Text>
                                                            </>
                                                        );
                                                    })()}
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.scrollContainer}>
                                {/* 인기 강의 섹션 - 별도의 sectionContainer로 감싸기 */}
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>
                                        Popular Courses
                                    </Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.horizontalScroll}
                                    >
                                        {popularCourses.map((course, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() =>
                                                    navigation.navigate(
                                                        "CourseDetails",
                                                        {
                                                            course: {
                                                                id: course.name,
                                                                name: course.name,
                                                                views: 0,
                                                            },
                                                        }
                                                    )
                                                }
                                                style={styles.popularCourseCard}
                                            >
                                                {/* courseLabel을 내부로 이동 */}
                                                <View
                                                    style={
                                                        styles.courseImagePlaceholder
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.courseLabel
                                                        }
                                                    >
                                                        {course.label}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.courseImageText
                                                        }
                                                    >
                                                        {course.imagePath}
                                                    </Text>
                                                </View>
                                                <Text style={styles.courseName}>
                                                    {course.name}
                                                </Text>
                                                <Text
                                                    style={styles.courseDetails}
                                                >
                                                    {course.details}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>

                                {/* 최근 리뷰 섹션 - 마지막 섹션이므로 lastSectionContainer 적용 */}
                                <View
                                    style={[
                                        styles.sectionContainer,
                                        styles.lastSectionContainer,
                                    ]}
                                >
                                    <Text style={styles.sectionTitle}>
                                        Latest Reviews
                                    </Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.horizontalScroll}
                                    >
                                        {latestReviews.map((review, idx) => (
                                            <View
                                                key={idx}
                                                style={styles.reviewCard}
                                            >
                                                <View
                                                    style={styles.reviewHeader}
                                                >
                                                    <View
                                                        style={
                                                            styles.userInfoRow
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.chatImagePlaceholder
                                                            }
                                                        />
                                                        <Text
                                                            style={
                                                                styles.reviewUser
                                                            }
                                                        >
                                                            {review.user}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.starContainer
                                                        }
                                                    >
                                                        {Array.from(
                                                            { length: 5 },
                                                            (_, i) => (
                                                                <Ionicons
                                                                    key={i}
                                                                    name={
                                                                        i <
                                                                        review.rating
                                                                            ? "star"
                                                                            : "star-outline"
                                                                    }
                                                                    style={
                                                                        styles.starIcon
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </View>
                                                </View>
                                                <Text style={styles.reviewText}>
                                                    {review.text}
                                                </Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}
