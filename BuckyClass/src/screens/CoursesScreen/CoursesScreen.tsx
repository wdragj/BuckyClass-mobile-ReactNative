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
    Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./CoursesScreen_CSS";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth"; // Firebase Auth 가져오기

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
    number: number;
    subject_abbreviation: string; // 과목 약어 필드 추가
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
    // 로딩 상태 추가
    const [loading, setLoading] = useState(true);
    // 에러 상태 추가
    const [error, setError] = useState<string | null>(null);
    // 인증 상태 추가
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // 백엔드 API로부터 강의 목록을 조회
        setLoading(true);

        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            setLoading(false);
            setError("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
            return;
        }

        // Firebase ID 토큰 가져오기
        currentUser
            .getIdToken(true)
            .then((idToken) => {
                setAuthenticated(true);

                // 토큰을 헤더에 추가하여 API 요청
                fetch("https://grow-ruddy.vercel.app/api/courses", {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `API 요청 실패: ${response.status}`
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        // API 응답이 배열인지 확인
                        if (Array.isArray(data)) {
                            setCourses(data);
                        } else {
                            console.error("API 응답이 배열이 아닙니다:", data);
                            setCourses([]);
                            setError("API 응답 형식이 잘못되었습니다.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching courses:", error);
                        setError("강의 목록을 불러오는데 실패했습니다.");
                        setCourses([]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.error("ID 토큰 가져오기 실패:", error);
                setLoading(false);
                setError(
                    "인증 토큰을 가져오는데 실패했습니다. 로그아웃 후 다시 로그인해주세요."
                );
            });
    }, []);

    // 검색 필터링 - 안전하게 처리
    const filteredCourses = Array.isArray(courses)
        ? courses.filter(
              (course) =>
                  course.name &&
                  course.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : [];

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
                            {/* 검색 입력 필드 */}
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Enter course name"
                                value={searchText}
                                onChangeText={setSearchText}
                                autoFocus={false}
                            />

                            {/* 로그인 필요 시 로그인 버튼 표시 */}
                            {!authenticated &&
                                error &&
                                error.includes("로그인") && (
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

                            {/* 로딩 중이거나 에러 발생 시 표시 */}
                            {loading && (
                                <Text style={styles.emptyResultText}>
                                    Loading courses...
                                </Text>
                            )}

                            {error && (
                                <Text
                                    style={[
                                        styles.emptyResultText,
                                        { color: "red" },
                                    ]}
                                >
                                    {error}
                                </Text>
                            )}

                            {/* 리스트 영역 */}
                            {!loading && !error && (
                                <FlatList
                                    data={filteredCourses}
                                    keyExtractor={(item) =>
                                        `${item.id}-${item.subject_abbreviation}`
                                    } // id와 과목 약어를 조합한 고유 키 생성
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
                                            <View
                                                style={styles.listItemContent}
                                            >
                                                <Text
                                                    style={styles.listItemTitle}
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {item.name}
                                                </Text>
                                                <View
                                                    style={
                                                        styles.courseInfoContainer
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.listItemSub
                                                        }
                                                    >
                                                        {
                                                            item.subject_abbreviation
                                                        }{" "}
                                                        {item.number}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Ionicons
                                                name="chevron-forward"
                                                size={24}
                                                color="#8863e4"
                                                style={styles.arrowIcon}
                                            />
                                        </TouchableOpacity>
                                    )}
                                    contentContainerStyle={
                                        styles.flatListContent
                                    }
                                    ListEmptyComponent={
                                        <Text style={styles.emptyResultText}>
                                            No courses found. Try another search
                                            term.
                                        </Text>
                                    }
                                />
                            )}
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}
