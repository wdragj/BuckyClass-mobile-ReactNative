import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";

type CoursesScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Courses"
>;

interface Course {
    id: string;
    title: string;
    category: string;
}

const courses: Course[] = [
    { id: "1", title: "Course Title", category: "Professor Name" },
    { id: "2", title: "Course Title", category: "Professor Name" },
    { id: "3", title: "Course Title", category: "Professor Name" },
    { id: "4", title: "Course Title", category: "Professor Name" },
    { id: "5", title: "Course Title", category: "Professor Name" },
    { id: "6", title: "Course Title", category: "Professor Name" },
    { id: "7", title: "Course Title", category: "Professor Name" },
    { id: "8", title: "Course Title", category: "Professor Name" },
    { id: "9", title: "Course Title", category: "Professor Name" },
    { id: "10", title: "Course Title", category: "Professor Name" },
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
                <View style={styles.myClassItem}>
                    <Text style={styles.courseTitle}>Course Title</Text>
                    <Text style={styles.courseInfo}>Class Time</Text>
                </View>
                <View style={styles.myClassItem}>
                    <Text style={styles.courseTitle}>Course Title</Text>
                    <Text style={styles.courseInfo}>Class Time</Text>
                </View>

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
                                    courseId: item.id,
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
                                            courseId: item.id,
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
        <View style={styles.container}>
            {searchActive ? renderSearchView() : renderDefaultView()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    // 기본 화면
    defaultContainer: {
        flex: 1,
        padding: 16,
    },
    searchTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 8,
    },
    searchBar: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    searchBarPlaceholder: {
        color: "#999",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
    },
    myClassItem: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    courseInfo: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    categoriesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    categoryButton: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginRight: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    categoryButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    enrollButton: {
        backgroundColor: "#4A90E2",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
        marginTop: 16,
    },
    enrollButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    // 검색 화면
    searchContainer: {
        flex: 1,
        padding: 16,
    },
    searchInput: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    flatListContent: {
        paddingBottom: 16,
    },
    listItem: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    listItemSub: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    listButtonGroup: {
        justifyContent: "space-between",
        height: 70,
    },
});
