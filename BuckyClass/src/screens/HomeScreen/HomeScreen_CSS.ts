import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    // 그라데이션 배경 스타일 업데이트
    gradientBackground: {
        flex: 1,
        backgroundColor: "rgba(232, 221, 253, 0.60)", // 두 그라데이션 색상의 중간값
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.20)",
        borderRadius: 30,
    },
    // 블러 오버레이 컨테이너 업데이트 - 패딩 적용 (하단 제외)
    blurOverlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)", // 배경이 살짝 투명하게 - 블러 효과 비슷하게
        // 그림자 효과 강화
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 8, // Android 그림자 강화
        paddingTop: 20, // 상단 패딩
        paddingHorizontal: 20, // 좌우 패딩
        paddingBottom: 70, // 하단 패딩 (네비게이션 바 높이 + 여유공간)
    },
    // 콘텐츠 영역 컨테이너 - 패딩 축소
    contentContainer: {
        flexGrow: 1,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 12,
        // backgroundColor: "#f9f9f9",
    },
    appName: {
        alignSelf: "stretch",
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "100",
        fontFamily: "Nunito-ExtraBold", // 변경: Nunito를 굵기별 폰트 패밀리로 지정
        fontStyle: "normal",
        color: "#F97CBD",
        textAlign: "center",
    },

    userInfoContainer: {
        flexDirection: "row", // 가로 방향 레이아웃
        justifyContent: "space-between", // 양쪽 정렬
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10,

        borderRadius: 12,
    },

    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ccc",
        marginLeft: 0, // 오른쪽에 위치하므로 왼쪽 마진 제거
    },

    userTextContainer: {
        flexDirection: "column", // 세로 방향 레이아웃
        alignItems: "flex-start", // 왼쪽 정렬
    },

    userGreeting: {
        fontSize: 16,
        fontWeight: "600",
        color: "#555",
        fontFamily: "Nunito-ExtraBold",
    },

    userName: {
        fontSize: 21.5,
        fontWeight: "600",
        color: "#333",
        marginTop: 2,
        fontFamily: "Nunito-ExtraBold",
    },

    userType: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
        fontFamily: "Nunito-ExtraBold",
    },

    iconRow: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 0,
        alignItems: "flex-start",
        alignSelf: "stretch",
    },
    iconContainer: {
        flex: 1,
        flexBasis: 0,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        marginHorizontal: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.10)",
        borderStyle: "solid",
    },
    icon: {
        display: "flex",
        width: 48,
        flexDirection: "column",
        justifyContent: "center",
        flexShrink: 0,
        aspectRatio: 1,
        overflow: "hidden",
        textAlign: "center",
        fontSize: 30,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 48 /* 160% */,
    },
    iconLabel: {
        fontSize: 14,
        color: "#333",
        textAlign: "center",
    },
    // 스크롤 컨테이너 패딩 줄이기
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 12,
        paddingBottom: 20, // 40에서 20으로 줄임
    },
    // 섹션 컨테이너 추가 - 각 섹션에 대한 컨테이너
    sectionContainer: {
        marginBottom: 40, // 섹션 간의 여백 증가
    },
    horizontalScroll: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 21.5,
        fontWeight: "800",
        color: "#171717",
        marginVertical: 15,
        fontFamily: "Nunito-ExtraBold",
        lineHeight: 24,
    },
    popularCoursesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    popularCourseCard: {
        width: 175,
        height: 175,
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 0,
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: "#ddd",
        marginRight: 12, // 간격 증가

        // 그림자 효과 추가로 구분감 향상
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 3,
    },
    courseLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#000", // 글자색 변경
        padding: 5, // 패딩 추가
        backgroundColor: "rgba(0, 0, 0, 0.05)", // 핑크 배경색 추가
        borderRadius: 6, // 모서리 둥글게
        position: "absolute",
        top: 1, // 위치 조정해서 card 안에 완전히 포함되도록
        left: 2, // 위치 조정
        overflow: "hidden", // 내용이 경계를 벗어나지 않도록
        zIndex: 1, // 다른 요소 위에 표시
    },
    courseImagePlaceholder: {
        width: "100%",
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        height: 112,
        position: "relative",
        overflow: "hidden", // 이미지 컨테이너 넘치는 콘텐츠 제한
    },
    courseImageText: {
        color: "#000",
        fontSize: 14,
    },
    courseName: {
        fontSize: 14,
        color: "#000",
        textAlign: "left",
        marginLeft: 8,
        fontFamily: "Nunito-ExtraBold",
    },
    courseDetails: {
        fontSize: 12,
        fontWeight: "500",
        color: "#333",
        marginBottom: 0,
        padding: 8,
        textAlign: "left",
        fontFamily: "Nunito-regular",
    },
    chatCard: {
        width: 220,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 10,
        marginRight: 15,
    },
    chatHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    chatImagePlaceholder: {
        width: 24,
        height: 24,
        borderRadius: 24,
        backgroundColor: "#ccc",
        marginRight: 8,
    },
    chatUser: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    starContainer: {
        flexDirection: "row",
    },
    starIcon: {
        fontSize: 18,
        color: "#FFD700",
        marginRight: 2,
    },
    chatText: {
        fontSize: 14,
        color: "#555",
        lineHeight: 18,
    },

    reviewCard: {
        width: 220,
        backgroundColor: "#fff", // 배경색 변경
        borderRadius: 24,
        padding: 15,
        marginRight: 15,
        marginBottom: 8, // 하단 여백 추가
        // 그림자 효과 추가
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 2,
    },
    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    userInfoRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    reviewUser: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    starContainer: {
        flexDirection: "row",
    },
    starIcon: {
        fontSize: 18,
        color: "#FFD700",
        marginRight: 2,
    },
    reviewText: {
        fontSize: 14,
        color: "#555",
        lineHeight: 18,
    },
    // 네비게이션 바 스타일 업데이트
    bottomNavBar: {
        // 피그마 layout 속성
        flexDirection: "row",
        width: "100%", // 화면 너비에 맞춤 (402px 대신)
        height: 50,
        alignItems: "flex-start",

        // 피그마 position 속성
        position: "absolute",
        bottom: -1,

        // 피그마 style 속성
        borderRadius: 30,
        backgroundColor: "#FFF",

        // 그림자 효과 (React Native 방식)
        shadowColor: "rgba(0, 0, 0, 0.12)",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation: 4, // Android 그림자

        // 추가 스타일
        paddingVertical: 8,
        justifyContent: "space-around",
    },
    bottomNavItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    bottomNavIcon: {
        fontSize: 24,
        color: "#8863e4",
        marginBottom: 0,
    },
    bottomNavLabel: {
        fontSize: 12,
        color: "#333",
    },
    majorContainer: {
        marginTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
    },
    majorSectionTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000",
        marginBottom: 4,
        lineHeight: 20,
    },

    hotCoursesContainer: {
        paddingHorizontal: 12,
        marginTop: 16,
        marginBottom: 12,
    },
    hotCoursesTitle: {
        fontSize: 21.5,
        fontWeight: "800",
        color: "#000",
        lineHeight: 24,
        marginBottom: 8,
        fontFamily: "Nunito-ExtraBold",
    },
    hotCourseCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginBottom: 8,
    },
    hotCourseLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    hotCourseImagePlaceholder: {
        width: 27,
        height: 27,
        borderRadius: 24,
        backgroundColor: "#ccc",
        marginRight: 8,
    },
    hotCourseTextContainer: {
        justifyContent: "center",
    },
    hotCourseName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
        fontFamily: "Nunito-ExtraBold",
    },
    hotCourseRank: {
        fontSize: 12,
        color: "#777",
        fontFamily: "Nunito-ExtraBold",
    },
    hotCourseEllipsisIcon: {
        fontSize: 20,
        color: "#333",
        marginLeft: 8,
    },
    // 마지막 섹션 여백 축소
    lastSectionContainer: {
        marginBottom: 40, // 80에서 40으로 줄임
    },
});

export default styles;
