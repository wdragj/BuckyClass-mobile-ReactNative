import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    // HomeScreen과 동일한 기본 구조 스타일
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
        paddingBottom: 0, // 네비게이션 바 공간 확보
    },
    container: {
        flex: 1,
    },

    // 반투명 오버레이 컨테이너 - 중복 배경 제거
    overlayContainer: {
        flex: 1,
        backgroundColor: "transparent",
    },

    // 기본 화면
    defaultContainer: {
        flex: 1,
        padding: 16,
    },
    searchTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#171717",
        fontFamily: "Nunito-ExtraBold",
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
        fontSize: 18,

        fontWeight: "500",
        marginBottom: 8,
    },
    myClassItem: {
        flexDirection: "row", // 가로 방향 배치
        alignItems: "center", // 세로 중앙 정렬
        backgroundColor: "#f8f8f8",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    classImagePlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 20,
        backgroundColor: "#ccc",
        marginRight: 12,
    },
    classTextContainer: {
        flex: 1,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    courseInfo: {
        fontSize: 14,
        color: "#777",
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

        flexDirection: "row", // 가로 방향으로 요소 배치
        alignItems: "center", // 세로 중앙 정렬
    },
    categoryImagePlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 20,
        backgroundColor: "#ccc",
        marginRight: 8,
    },
    categoryButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    enrollButton: {
        backgroundColor: "#000",

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
    searchHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    backButton: {
        padding: 4,
        marginRight: 8,
    },

    searchInput: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: "Nunito",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.3,
        elevation: 2,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    emptyResultText: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#777",
        fontFamily: "Nunito",
    },
    listItem: {
        borderRadius: 16,
        padding: 16,

        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 2,
        borderBottomWidth: 1, // 하단 경계선 추가
        borderBottomColor: "rgba(0, 0, 0, 0.1)", // 얇은 회색 색상
    },

    listItemContent: {
        flex: 1,
        marginRight: 10,
    },

    listItemTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        fontFamily: "Nunito-Bold",
        maxWidth: screenWidth - 140, // 버튼 영역과 여백을 고려한 최대 너비
    },
    listItemSub: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
        fontFamily: "Nunito",
    },
    listButtonGroup: {
        justifyContent: "center",
    },
    bottomNavBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        backgroundColor: "#f9f9f9",
        paddingVertical: 8,
    },
    bottomNavItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    bottomNavIcon: {
        fontSize: 24,
        color: "#4A90E2",
        marginBottom: 2,
    },
    bottomNavLabel: {
        fontSize: 12,
        color: "#333",
    },

    // 리스트 아이템 이미지 스타일 추가
    listItemImage: {
        width: 40,
        height: 40,
        borderRadius: 20, // 원형 이미지를 위해 반지름을 너비/높이의 절반으로 설정
        marginRight: 16, // 이미지와 텍스트 사이 간격
    },
});

export default styles;
