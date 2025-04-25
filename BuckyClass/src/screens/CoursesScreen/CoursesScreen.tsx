import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Button,
    SafeAreaView,
    Image,
    StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./CoursesScreen_CSS";
import { LinearGradient } from "expo-linear-gradient";

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

    // 검색 필터링 - name 필드로 검색
    const filteredCourses = courses.filter(
        (course) =>
            course.name &&
            course.name.toLowerCase().includes(searchText.toLowerCase())
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
                        <View style={styles.searchContainer}>
                            {/* 상단 타이틀 영역 */}
                            <View style={styles.searchHeader}>
                                <Text style={styles.searchTitle}>
                                    Search Courses
                                </Text>
                            </View>

                            {/* 검색 입력 필드 */}
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Enter course name"
                                value={searchText}
                                onChangeText={setSearchText}
                                autoFocus={false}
                            />

                            {/* 리스트 영역 */}
                            <FlatList
                                data={filteredCourses}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.listItem}
                                        onPress={() =>
                                            navigation.navigate(
                                                "CourseDetails",
                                                {
                                                    course: item,
                                                }
                                            )
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
                                                    navigation.navigate(
                                                        "CourseDetails",
                                                        {
                                                            course: item,
                                                        }
                                                    )
                                                }
                                                color="#000"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                                contentContainerStyle={styles.flatListContent}
                                ListEmptyComponent={
                                    <Text style={styles.emptyResultText}>
                                        No courses found. Try another search
                                        term.
                                    </Text>
                                }
                            />
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}
