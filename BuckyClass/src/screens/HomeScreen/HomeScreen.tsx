import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./HomeScreen_CSS";
import { LinearGradient } from "expo-linear-gradient";

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

// 예시 데이터: 핫 코스
const hotCourses = [
    { name: "CS 400", top: "Top 1" },
    { name: "Music 113", top: "Top 2" },
    { name: "ENG 100", top: "Top 3" },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
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
                                                        ? require("../../../assets/1st.png")
                                                        : index === 1
                                                        ? require("../../../assets/2nd.png")
                                                        : require("../../../assets/3rd.png")
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
                                        <Ionicons
                                            name="ellipsis-horizontal"
                                            style={styles.hotCourseEllipsisIcon}
                                        />
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
