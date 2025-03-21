import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Button,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./CoursesScreen_CSS";

type CoursesScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Courses"
>;

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

const courses: Course[] = [
    {
        id: "1",
        title: "Course Title 1",
        category: "Category 1",
        professor: "Professor Name 1",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 50, B: 30, C: 20 },
    },
    {
        id: "2",
        title: "Course Title 2",
        category: "Category 2",
        professor: "Professor Name 2",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 60, B: 25, C: 15 },
    },
    {
        id: "3",
        title: "Course Title 3",
        category: "Category 3",
        professor: "Professor Name 3",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 70, B: 20, C: 10 },
    },
    {
        id: "4",
        title: "Course Title 4",
        category: "Category 4",
        professor: "Professor Name 4",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 80, B: 15, C: 5 },
    },
    {
        id: "5",
        title: "Course Title 5",
        category: "Category 5",
        professor: "Professor Name 5",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 90, B: 5, C: 5 },
    },
    {
        id: "6",
        title: "Course Title 6",
        category: "Category 6",
        professor: "Professor Name 6",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 40, B: 40, C: 20 },
    },
    {
        id: "7",
        title: "Course Title 7",
        category: "Category 7",
        professor: "Professor Name 7",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 30, B: 50, C: 20 },
    },
    {
        id: "8",
        title: "Course Title 8",
        category: "Category 8",
        professor: "Professor Name 8",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 20, B: 60, C: 20 },
    },
    {
        id: "9",
        title: "Course Title 9",
        category: "Category 9",
        professor: "Professor Name 9",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 10, B: 70, C: 20 },
    },
    {
        id: "10",
        title: "Course Title 10",
        category: "Category 10",
        professor: "Professor Name 10",
        elective: "Elective",
        subject: "Subject",
        description: "Course description (credit)",
        gradeDistribution: { A: 5, B: 80, C: 15 },
    },
];

export default function CoursesScreen({
    navigation,
}: {
    navigation: CoursesScreenNavigationProp;
}) {
    // 검색창 활성화 여부
    const [searchActive, setSearchActive] = useState(false);
    // 검색어 상태
    const [searchText, setSearchText] = useState("");

    // 강의 등록 예시 함수
    const registerCourse = (courseId: string) => {
        // 강의 등록 로직
    };

    // 검색 필터(실제로는 제목/교수명/카테고리 등으로 필터 가능)
    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // 기본 화면
    const renderDefaultView = () => {
        return (
            <View style={styles.defaultContainer}>
                {/* 상단 영역 */}
                <Text style={styles.searchTitle}>Search Courses</Text>
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() => setSearchActive(true)}
                >
                    <Text style={styles.searchBarPlaceholder}>
                        Find the courses you are interested in
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
                    <Text style={styles.courseTitle}>Course Title</Text>
                    <Text style={styles.courseInfo}>Class Time</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.myClassItem}
                    onPress={() =>
                        navigation.navigate("CourseDetails", {
                            course: courses.find((c) => c.id === "2"),
                        })
                    }
                >
                    <Text style={styles.courseTitle}>Course Title</Text>
                    <Text style={styles.courseInfo}>Class Time</Text>
                </TouchableOpacity>

                {/* 카테고리 섹션 */}
                <Text style={styles.sectionTitle}>Course Categories</Text>
                <View style={styles.categoriesContainer}>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryButtonText}>
                            Computer Science
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryButtonText}>
                            Mathematics
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* 등록 버튼 */}
                <TouchableOpacity style={styles.enrollButton}>
                    <Text style={styles.enrollButtonText}>Enroll Now</Text>
                </TouchableOpacity>
            </View>
        );
    };

    // 검색 활성화 시 나타날 화면
    const renderSearchView = () => {
        return (
            <View style={styles.searchContainer}>
                {/* 검색 영역 */}
                <Text style={styles.searchTitle}>Search Courses</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Find the courses you are interested in"
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
                            <View>
                                <Text style={styles.listItemTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.listItemSub}>
                                    {item.category}
                                </Text>
                            </View>
                            <View style={styles.listButtonGroup}>
                                {/* <Button
                                    title="Register"
                                    onPress={() => registerCourse(item.id)}
                                    color="#4A90E2"
                                /> */}
                                <Button
                                    title="Class Time"
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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    {searchActive ? renderSearchView() : renderDefaultView()}
                </View>
            </ScrollView>
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
