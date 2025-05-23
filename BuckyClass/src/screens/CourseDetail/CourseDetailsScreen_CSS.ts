import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

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
    blurOverlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 8,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
    scrollContent: {
        padding: 16,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontFamily: "Nunito",
        color: "#555",
    },
    courseName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        fontFamily: "Nunito-ExtraBold",
        color: "#171717",
    },
    courseInfoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    courseInfoText: {
        fontSize: 14,
        color: "#777",
        fontFamily: "Nunito",
    },
    sectionContainer: {
        marginBottom: 8,
        borderBottomWidth: 1, // 회색 가로선 추가
        borderBottomColor: "rgba(200, 200, 200, 0.5)", // 반투명 회색
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        fontFamily: "Nunito-ExtraBold",
        color: "#171717",
    },
    totalStudents: {
        fontSize: 14,
        marginBottom: 16,
    },
    chartContainer: {
        alignItems: "center",
        marginBottom: -10,
    },
    gradeDetailsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    gradeDetail: {
        width: "48%",
        marginBottom: 8,
        fontSize: 14,
    },
    reviewItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginBottom: 12,
    },
    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    starIcon: {
        marginRight: 2,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    reviewDate: {
        fontSize: 12,
        color: "#999",
        fontStyle: "italic",
    },
    reviewComment: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
        marginBottom: 8,
    },
    reviewFooter: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    likeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeCount: {
        marginLeft: 4,
        fontSize: 12,
        color: "#666",
    },
    emptyText: {
        fontStyle: "italic",
        color: "#999",
    },
    errorText: {
        color: "#F97CBD",
        fontSize: 16,
        fontFamily: "Nunito-Bold",
        textAlign: "center",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#F97CBD",
        borderRadius: 24,
        padding: 12,
        marginTop: 20,
        alignItems: "center",
        alignSelf: "center",
        paddingHorizontal: 40,
    },
    loginButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Nunito-Bold",
    },
    averageGpa: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginTop: 16,
        fontFamily: "Nunito-Bold",
        textAlign: "center",
    },
    instructorName: {
        fontSize: 14,
        color: "#555",
        fontFamily: "Nunito",
    },
    reviewUsername: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
        marginBottom: 4,
        fontFamily: "Nunito-Bold",
    },
    reviewsContainer: {
        marginTop: 8,
    },
    reviewCard: {
        backgroundColor: "rgba(255, 255, 255, 0.4)", // 배경 반투명하게 변경
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "rgba(200, 200, 200, 0.5)",
    },
    reviewCardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    reviewUser: {
        flexDirection: "row",
        alignItems: "center",
    },
    reviewUserAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F97CBD",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    reviewUserAvatarText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
    reviewAction: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
    },
    reviewActionText: {
        marginLeft: 5,
        fontSize: 12,
        color: "#777",
        fontFamily: "Nunito",
    },
    emptyReviewsContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        backgroundColor: "rgba(255, 255, 255, 0.4)", // 반투명 배경
        borderRadius: 16,
    },
    emptySubText: {
        fontSize: 14,
        color: "#aaa",
        marginTop: 5,
        fontFamily: "Nunito",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        marginBottom: 24,
    },
    actionButton: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // 반투명 배경
        borderRadius: 24,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#8863e4",
        flex: 1,
        marginHorizontal: 6,
    },
    actionButtonText: {
        color: "#8863e4",
        fontSize: 15,
        fontWeight: "500",
        fontFamily: "Nunito-Bold",
        marginLeft: 6,
    },
    reviewButton: {
        backgroundColor: "#F97CBD",
        borderColor: "#F97CBD",
    },
    reviewButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "500",
        fontFamily: "Nunito-Bold",
        marginLeft: 6,
    },
    // 섹션 드롭다운 관련 스타일 수정
    sectionsContainer: {
        marginBottom: 16,
        position: "relative", // 상대 위치로 설정하여 내부 절대 위치 요소의 기준점 제공
        zIndex: 1000, // zIndex 값 크게 증가
    },
    sectionDropdownHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 8,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(200, 200, 200, 0.5)",
    },
    dropdownTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "Nunito-Bold",
    },
    dropdownIcon: {
        marginLeft: 8,
    },
    sectionsListContainer: {
        position: "absolute", // 절대 위치 유지
        top: 50, // 헤더 바로 아래
        left: 0,
        right: 0,
        maxHeight: 280,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        overflow: "hidden",
        zIndex: 2000, // zIndex 값 더 크게 증가
        borderWidth: 1,
        borderColor: "rgba(200, 200, 200, 0.5)",
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 8, // Android elevation 증가
    },
    sectionsScrollContainer: {
        maxHeight: 280, // 스크롤이 가능한 최대 높이
    },
    // 오버레이 스타일 추가
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.1)", // 약간 어둡게 변경
        zIndex: 900, // zIndex 값 조정 (sectionsContainer보다 낮고, 다른 요소보다 높게)
    },
    sectionItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(200, 200, 200, 0.3)",
        backgroundColor: "rgba(255, 255, 255, 0.9)", // 배경색 추가
    },
    sectionTypeTag: {
        backgroundColor: "#8863e4",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 12,
    },
    sectionTypeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
    sectionNumberText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "Nunito-Bold",
        marginRight: 8,
    },
    sectionTimeText: {
        fontSize: 14,
        color: "#555",
        fontFamily: "Nunito",
        flex: 1, // 텍스트가 끝까지 확장되도록
    },
    labTypeTag: {
        backgroundColor: "#F97CBD",
    },
    noSectionsText: {
        textAlign: "center",
        padding: 16,
        color: "#777",
        fontStyle: "italic",
        fontFamily: "Nunito",
    },
    showMoreButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        backgroundColor: "rgba(255, 255, 255, 0.8)", // 약간 더 불투명하게
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopWidth: 1,
        borderTopColor: "rgba(200, 200, 200, 0.3)",
    },
    showMoreText: {
        color: "#8863e4",
        fontSize: 14,
        fontWeight: "500",
        marginRight: 5,
        fontFamily: "Nunito-Bold",
    },
    // 가로 스크롤 리뷰 레이아웃 스타일
    horizontalScrollContainer: {
        marginTop: 8,
    },
    horizontalReviewCard: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 16,
        padding: 16,
        marginRight: 12,
        width: screenWidth * 0.7, // 화면 너비의 70%
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
    horizontalReviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    horizontalReviewUser: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    horizontalReviewUserAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#8863e4",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    horizontalReviewUserAvatarText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
    horizontalReviewUserInfo: {
        flex: 1,
    },
    horizontalReviewUsername: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "Nunito-Bold",
    },
    horizontalReviewDate: {
        fontSize: 12,
        color: "#666",
        fontFamily: "Nunito",
    },
    horizontalRatingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8,
    },
    horizontalStarIcon: {
        marginRight: 1,
    },
    horizontalRatingText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
        fontFamily: "Nunito-Bold",
    },
    horizontalReviewComment: {
        fontSize: 14,
        color: "#333",
        lineHeight: 18,
        fontFamily: "Nunito",
    },
    horizontalReviewFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "rgba(200, 200, 200, 0.3)",
    },
    horizontalReviewAction: {
        flexDirection: "row",
        alignItems: "center",
    },
    horizontalReviewActionText: {
        marginLeft: 4,
        fontSize: 12,
        color: "#777",
        fontFamily: "Nunito",
    },
});

export default styles;
