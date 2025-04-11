import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Button,
    SafeAreaView,
    ScrollView,
    Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./CoursesScreen_CSS";

// 이미지 가져오기
const courseImage = require("../../../assets/1st.png");

type CoursesScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Courses"
>;

// API 응답 구조에 맞게 인터페이스 수정
interface Course {
    id: string;
    name: string;
    views: number;
}

export default function CoursesScreen({
    navigation,
}: {
    navigation: CoursesScreenNavigationProp;
}) {
    // 검색창 활성화 여부
    const [searchActive, setSearchActive] = useState(false);
    // 검색어 상태
    const [searchText, setSearchText] = useState("");
    // 강의 목록 상태
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        // 백엔드 API로부터 강의 목록을 조회
        fetch("https://grow-ruddy.vercel.app/api/courses")
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    // 강의 등록 예시 함수
    const registerCourse = (courseId: string) => {
        // 강의 등록 로직
    };

    // 검색 필터링 - name 필드로 검색
    const filteredCourses = courses.filter(
        (course) =>
            course.name &&
            course.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // 기본 화면
    const renderDefaultView = () => {
        return (
            <View style={styles.gradientBackground}>
                <View style={styles.overlayContainer}>
                    <View style={styles.defaultContainer}>
                        {/* 상단 영역 */}
                        <Text style={styles.searchTitle}>Search Courses</Text>
                        <TouchableOpacity
                            style={styles.searchBar}
                            onPress={() => setSearchActive(true)}
                        >
                            <Text style={styles.searchBarPlaceholder}>
                                Enter course name
                            </Text>
                        </TouchableOpacity>

                        {/* My Classes 섹션 */}
                        <Text style={styles.sectionTitle}>My Classes</Text>
                        <TouchableOpacity
                            style={styles.myClassItem}
                            onPress={() =>
                                navigation.navigate("CourseDetails", {
                                    course: courses.find((c) => c.id === "1"),
                                })
                            }
                        >
                            <View style={styles.classImagePlaceholder} />
                            <View style={styles.classTextContainer}>
                                <Text style={styles.courseTitle}>
                                    Course Title
                                </Text>
                                <Text style={styles.courseInfo}>
                                    Class Time
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.myClassItem}
                            onPress={() =>
                                navigation.navigate("CourseDetails", {
                                    course: courses.find((c) => c.id === "2"),
                                })
                            }
                        >
                            <View style={styles.classImagePlaceholder} />
                            <View style={styles.classTextContainer}>
                                <Text style={styles.courseTitle}>
                                    Course Title
                                </Text>
                                <Text style={styles.courseInfo}>
                                    Class Time
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* 카테고리 섹션 */}
                        <Text style={styles.sectionTitle}>
                            Course Categories
                        </Text>
                        <View style={styles.categoriesContainer}>
                            <TouchableOpacity style={styles.categoryButton}>
                                <View style={styles.categoryImagePlaceholder} />
                                <Text style={styles.categoryButtonText}>
                                    Computer Science
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.categoryButton}>
                                <View style={styles.categoryImagePlaceholder} />
                                <Text style={styles.categoryButtonText}>
                                    Mathematics
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* 등록 버튼 */}
                        <TouchableOpacity style={styles.enrollButton}>
                            <Text style={styles.enrollButtonText}>
                                Enroll Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    // 검색 활성화 시 나타날 화면
    const renderSearchView = () => {
        return (
            <View style={styles.searchContainer}>
                {/* 검색 영역 */}
                <View style={styles.searchHeader}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setSearchActive(false)}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.searchTitle}>Search Courses</Text>
                </View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter course name"
                    value={searchText}
                    onChangeText={setSearchText}
                    autoFocus
                />
                {/* 리스트 영역 */}
                <FlatList
                    data={filteredCourses}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.listItem}
                            onPress={() =>
                                navigation.navigate("CourseDetails", {
                                    course: item,
                                })
                            }
                        >
                            <Image
                                source={courseImage}
                                style={styles.listItemImage}
                            />
                            <View style={styles.listItemContent}>
                                <Text
                                    style={styles.listItemTitle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.name}
                                </Text>
                                <Text style={styles.listItemSub}>
                                    Views: {item.views}
                                </Text>
                            </View>
                            <View style={styles.listButtonGroup}>
                                <Button
                                    title="Details"
                                    onPress={() =>
                                        navigation.navigate("CourseDetails", {
                                            course: item,
                                        })
                                    }
                                    color="#000"
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {searchActive ? (
                // 검색이 활성화된 경우 - FlatList를 직접 렌더링하여 중첩 방지
                <View style={styles.container}>{renderSearchView()}</View>
            ) : (
                // 검색이 비활성화된 경우 - ScrollView 사용
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>{renderDefaultView()}</View>
                </ScrollView>
            )}

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
