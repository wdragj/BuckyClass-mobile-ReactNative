import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import styles from "./ReviewScreen_CSS";

type ReviewScreenRouteProp = RouteProp<RootStackParamList, "Review">;
type ReviewScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Review"
>;

interface Props {
    route: ReviewScreenRouteProp;
    navigation: ReviewScreenNavigationProp;
}

const ReviewScreen: React.FC<Props> = ({ route, navigation }) => {
    const { courseId, courseName } = route.params;
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // 별점 선택 핸들러
    const handleRatingSelect = (selectedRating: number) => {
        setRating(selectedRating);
    };

    // 리뷰 제출 핸들러
    const handleSubmitReview = async () => {
        // 유효성 검사
        if (rating === 0) {
            Alert.alert("Error", "Please select a rating");
            return;
        }

        if (comment.trim() === "") {
            Alert.alert("Error", "Please enter a comment");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                throw new Error("You must be logged in to submit a review");
            }

            // Firebase ID 토큰 가져오기
            const idToken = await currentUser.getIdToken(true);

            // 리뷰 데이터 준비
            const reviewData = {
                course_id: courseId,
                user_id: currentUser.uid,
                rating: rating,
                comment: comment.trim(),
            };

            console.log("Sending review data:", JSON.stringify(reviewData));

            // API 요청
            const response = await fetch(
                "https://grow-ruddy.vercel.app/api/courses/reviews",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${idToken}`,
                    },
                    body: JSON.stringify(reviewData),
                }
            );

            // 응답 상태 확인 및 개선된 에러 처리
            console.log("Response status:", response.status);

            if (!response.ok) {
                // 텍스트로 먼저 응답을 읽고
                const errorText = await response.text();
                console.log("Error response:", errorText);

                // JSON으로 파싱 시도 (가능한 경우)
                let errorMessage = "Failed to submit review";
                try {
                    if (errorText) {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.message || errorMessage;
                    }
                } catch (parseError) {
                    // JSON 파싱에 실패하면 텍스트 응답 사용
                    errorMessage = errorText || errorMessage;
                }

                throw new Error(errorMessage);
            }

            // 성공 응답을 텍스트로 읽고 JSON 파싱 시도
            const responseText = await response.text();
            console.log("Success response:", responseText);

            let responseData;
            try {
                if (responseText) {
                    responseData = JSON.parse(responseText);
                    console.log("Parsed response data:", responseData);
                }
            } catch (parseError) {
                console.warn(
                    "Could not parse success response as JSON",
                    parseError
                );
            }

            // 성공 시 처리
            Alert.alert("Success", "Your review has been submitted", [
                {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (err: any) {
            console.error("Error submitting review:", err);
            setError(
                err.message || "An error occurred while submitting your review"
            );
        } finally {
            setIsSubmitting(false);
        }
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
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.keyboardAvoidingContainer}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.header}>
                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={24}
                                        color="#8863e4"
                                    />
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>
                                    Write a Review
                                </Text>
                                <View style={{ width: 24 }} />
                            </View>

                            <View style={styles.courseNameContainer}>
                                <Text style={styles.courseNameLabel}>
                                    Course:
                                </Text>
                                <Text style={styles.courseName}>
                                    {courseName}
                                </Text>
                            </View>

                            <View style={styles.ratingContainer}>
                                <Text style={styles.sectionTitle}>
                                    Your Rating
                                </Text>
                                <View style={styles.starsContainer}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <TouchableOpacity
                                            key={star}
                                            onPress={() =>
                                                handleRatingSelect(star)
                                            }
                                            style={styles.starButton}
                                        >
                                            <Ionicons
                                                name={
                                                    star <= rating
                                                        ? "star"
                                                        : "star-outline"
                                                }
                                                size={36}
                                                color="#FFD700"
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <Text style={styles.ratingText}>
                                    {rating > 0
                                        ? `${rating}/5`
                                        : "Select a rating"}
                                </Text>
                            </View>

                            <View style={styles.commentContainer}>
                                <Text style={styles.sectionTitle}>
                                    Your Comments
                                </Text>
                                <TextInput
                                    style={styles.commentInput}
                                    multiline
                                    placeholder="Share your experience with this course..."
                                    placeholderTextColor="#999"
                                    value={comment}
                                    onChangeText={setComment}
                                    maxLength={500}
                                    textAlignVertical="top"
                                />
                                <Text style={styles.charCount}>
                                    {comment.length}/500
                                </Text>
                            </View>

                            {error && (
                                <Text style={styles.errorText}>{error}</Text>
                            )}

                            <TouchableOpacity
                                style={[
                                    styles.submitButton,
                                    (isSubmitting ||
                                        rating === 0 ||
                                        comment.trim() === "") &&
                                        styles.submitButtonDisabled,
                                ]}
                                onPress={handleSubmitReview}
                                disabled={
                                    isSubmitting ||
                                    rating === 0 ||
                                    comment.trim() === ""
                                }
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#fff"
                                    />
                                ) : (
                                    <Text style={styles.submitButtonText}>
                                        Submit Review
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
};

export default ReviewScreen;
