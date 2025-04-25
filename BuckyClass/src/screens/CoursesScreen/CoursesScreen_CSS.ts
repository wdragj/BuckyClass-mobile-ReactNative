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
        paddingBottom: 10, // 네비게이션 바 공간 확보
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
        marginBottom: 8,
    },
    backButton: {
        padding: 4,
        marginRight: 8,
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

        padding: 12,

        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    listItemContent: {
        flex: 1,
        marginRight: 10,
    },

    listItemTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",

        maxWidth: screenWidth - 120, // 버튼 영역과 여백을 고려한 최대 너비
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
        width: 32,
        height: 32,
        borderRadius: 16, // 원형 이미지를 위해 반지름을 너비/높이의 절반으로 설정
        marginRight: 12, // 이미지와 텍스트 사이 간격
    },
});

export default styles;
