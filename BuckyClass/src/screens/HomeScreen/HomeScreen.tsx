import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./HomeScreen_CSS";

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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.topBar}>
                    <Text style={styles.appName}>GROW</Text>
                </View>

                {/* 사용자 정보 */}
                <View style={styles.userInfoContainer}>
                    <View style={styles.userPhoto} />
                    <View style={styles.userTextContainer}>
                        <Text style={styles.userName}>User Name</Text>
                        <Text style={styles.userType}>Student</Text>
                    </View>
                </View>

                {/* 전공 선택 섹션 */}
                <View style={styles.majorContainer}>
                    <Text style={styles.majorSectionTitle}>Choose Major</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.majorBox}>
                            <Text style={styles.majorText}>
                                Computer Science
                            </Text>
                        </View>
                        <View style={styles.majorBox}>
                            <Text style={styles.majorText}>Mathematics</Text>
                        </View>
                        <View style={styles.majorBox}>
                            <Text style={styles.majorText}>Physics</Text>
                        </View>
                    </ScrollView>
                    <Text style={styles.majorHelpText}>
                        Select your preferred major
                    </Text>
                </View>

                {/* Hot Courses 섹션 */}
                <View style={styles.hotCoursesContainer}>
                    <Text style={styles.hotCoursesTitle}>
                        Hot Courses of the Day
                    </Text>
                    {hotCourses.map((course, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.hotCourseCard}
                        >
                            <View style={styles.hotCourseLeft}>
                                <View
                                    style={styles.hotCourseImagePlaceholder}
                                />
                                <View style={styles.hotCourseTextContainer}>
                                    <Text style={styles.hotCourseName}>
                                        {course.name}
                                    </Text>
                                    <Text style={styles.hotCourseRank}>
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
                    {/* 인기 강의 섹션 */}
                    <Text style={styles.sectionTitle}>Popular Courses</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                    >
                        {popularCourses.map((course, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    navigation.navigate("CourseDetails", {
                                        courseId: course.name,
                                    })
                                }
                                style={styles.popularCourseCard}
                            >
                                {/* courseLabel을 내부로 이동 */}
                                <View style={styles.courseImagePlaceholder}>
                                    <Text style={styles.courseLabel}>
                                        {course.label}
                                    </Text>
                                    <Text style={styles.courseImageText}>
                                        {course.imagePath}
                                    </Text>
                                </View>
                                <Text style={styles.courseName}>
                                    {course.name}
                                </Text>
                                <Text style={styles.courseDetails}>
                                    {course.details}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* 이번주 Chat 리스트 */}
                    <Text style={styles.sectionTitle}>CHAT of the WEEK</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                    >
                        {latestChats.map((chat, idx) => (
                            <View key={idx} style={styles.chatCard}>
                                <View style={styles.hotCourseLeft}>
                                    <View style={styles.chatImagePlaceholder} />
                                    <View style={styles.chatHeader}>
                                        <Text style={styles.chatUser}>
                                            {chat.user}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.chatText}>{chat.text}</Text>
                            </View>
                        ))}
                    </ScrollView>

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
                                    <Text style={styles.reviewUser}>
                                        {review.user}
                                    </Text>
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
                                <Text style={styles.reviewText}>
                                    {review.text}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* 하단 네비게이션 바 */}
            <View style={styles.bottomNavBar}>
                <TouchableOpacity
                    style={styles.bottomNavItem}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Ionicons name="home" style={styles.bottomNavIcon} />
                    <Text style={styles.bottomNavLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomNavItem}
                    onPress={() => navigation.navigate("Courses")}
                >
                    <Ionicons name="book" style={styles.bottomNavIcon} />
                    <Text style={styles.bottomNavLabel}>Courses</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomNavItem}
                    onPress={() => navigation.navigate("ChatList")}
                >
                    <Ionicons
                        name="chatbubble-ellipses"
                        style={styles.bottomNavIcon}
                    />
                    <Text style={styles.bottomNavLabel}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomNavItem}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Ionicons name="person" style={styles.bottomNavIcon} />
                    <Text style={styles.bottomNavLabel}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
