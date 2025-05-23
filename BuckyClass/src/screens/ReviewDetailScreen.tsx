import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

type ReviewDetailScreenRouteProp = RouteProp<
    RootStackParamList,
    "ReviewDetail"
>;
type ReviewDetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ReviewDetail"
>;

interface Props {
    route: ReviewDetailScreenRouteProp;
    navigation: ReviewDetailScreenNavigationProp;
}

const ReviewDetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const { review, courseName } = route.params;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const renderStarRating = (rating: string | number) => {
        const numRating = parseFloat(rating.toString());
        return (
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                        key={star}
                        name={star <= numRating ? "star" : "star-outline"}
                        size={24}
                        color="#FFD700"
                        style={styles.starIcon}
                    />
                ))}
                <Text style={styles.ratingText}>{numRating.toFixed(1)}</Text>
            </View>
        );
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
                    <ScrollView style={styles.container}>
                        {/* Header */}
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
                                Review Detail
                            </Text>
                            <View style={{ width: 24 }} />
                        </View>

                        {/* Course Info */}
                        <View style={styles.courseContainer}>
                            <Text style={styles.courseLabel}>Course:</Text>
                            <Text style={styles.courseName}>{courseName}</Text>
                        </View>

                        {/* Review Card */}
                        <View style={styles.reviewCard}>
                            {/* User Info */}
                            <View style={styles.userSection}>
                                <View style={styles.userAvatar}>
                                    <Text style={styles.userAvatarText}>
                                        {review.username
                                            ? review.username
                                                  .charAt(0)
                                                  .toUpperCase()
                                            : "U"}
                                    </Text>
                                </View>
                                <View style={styles.userInfo}>
                                    <Text style={styles.username}>
                                        {review.username || "Anonymous User"}
                                    </Text>
                                    <Text style={styles.reviewDate}>
                                        {formatDate(review.created_at)}
                                        {review.edited && " (edited)"}
                                    </Text>
                                </View>
                            </View>

                            {/* Rating */}
                            <View style={styles.ratingSection}>
                                <Text style={styles.ratingLabel}>Rating:</Text>
                                {renderStarRating(review.rating)}
                            </View>

                            {/* Comment */}
                            <View style={styles.commentSection}>
                                <Text style={styles.commentLabel}>Review:</Text>
                                <Text style={styles.commentText}>
                                    {review.comment}
                                </Text>
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.actionSection}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Ionicons
                                        name="heart-outline"
                                        size={20}
                                        color="#8863e4"
                                    />
                                    <Text style={styles.actionButtonText}>
                                        Like ({review.like_count || 0})
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.actionButton}>
                                    <Ionicons
                                        name="chatbubble-outline"
                                        size={20}
                                        color="#8863e4"
                                    />
                                    <Text style={styles.actionButtonText}>
                                        Reply
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.actionButton}>
                                    <Ionicons
                                        name="share-outline"
                                        size={20}
                                        color="#8863e4"
                                    />
                                    <Text style={styles.actionButtonText}>
                                        Share
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
        backgroundColor: "rgba(232, 221, 253, 0.60)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.20)",
        borderRadius: 30,
    },
    gradientStyle: {
        flex: 1,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.20)",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#171717",
        fontFamily: "Nunito-ExtraBold",
        textAlign: "center",
    },
    courseContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "rgba(200, 200, 200, 0.5)",
    },
    courseLabel: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
        fontFamily: "Nunito",
    },
    courseName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "Nunito-Bold",
    },
    reviewCard: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(200, 200, 200, 0.5)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#8863e4",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    userAvatarText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "Nunito-Bold",
    },
    reviewDate: {
        fontSize: 14,
        color: "#666",
        fontFamily: "Nunito",
        marginTop: 2,
    },
    ratingSection: {
        marginBottom: 20,
    },
    ratingLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
        fontFamily: "Nunito-Bold",
    },
    starsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    starIcon: {
        marginRight: 4,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 8,
        fontFamily: "Nunito-Bold",
    },
    commentSection: {
        marginBottom: 24,
    },
    commentLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
        fontFamily: "Nunito-Bold",
    },
    commentText: {
        fontSize: 16,
        color: "#333",
        lineHeight: 24,
        fontFamily: "Nunito",
    },
    actionSection: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderTopColor: "rgba(200, 200, 200, 0.3)",
        paddingTop: 16,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: "rgba(136, 99, 228, 0.1)",
    },
    actionButtonText: {
        fontSize: 14,
        color: "#8863e4",
        fontWeight: "600",
        marginLeft: 6,
        fontFamily: "Nunito-SemiBold",
    },
});

export default ReviewDetailScreen;
