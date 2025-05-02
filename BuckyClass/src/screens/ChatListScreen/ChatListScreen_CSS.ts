import { StyleSheet } from "react-native";

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
    container: {
        flex: 1,
        padding: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#171717",
        fontFamily: "Nunito-ExtraBold",
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#555",
        fontFamily: "Nunito",
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        position: "relative",
    },
    searchInput: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        fontSize: 16,
        fontFamily: "Nunito",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.3,
        elevation: 2,
        flex: 1,
    },
    clearButton: {
        position: "absolute",
        right: 16,
    },
    flatListContent: {
        paddingBottom: 80, // BottomNavBar 높이 고려
    },
    loadingText: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#777",
        fontFamily: "Nunito",
    },
    // 메인 타이틀 (My Chat) 스타일
    mainTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#171717",
        fontFamily: "Nunito-ExtraBold",
        marginTop: 8,
        marginBottom: 16,
    },
    // 하위 섹션 타이틀 (Group Chat, 1:1 Chat) 스타일
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#171717",
        fontFamily: "Nunito-Bold",
        marginTop: 8,
        marginBottom: 12,
        marginLeft: 8, // 들여쓰기 효과
    },
    chatItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 1,
        elevation: 2,
        alignItems: "center",
        marginLeft: 16, // 들여쓰기 효과
        marginRight: 8,
    },
    chatItemLeft: {
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    groupAvatar: {
        backgroundColor: "#8863e4",
    },
    personalAvatar: {
        backgroundColor: "#F97CBD",
    },
    avatarText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
    chatItemCenter: {
        flex: 1,
        justifyContent: "center",
    },
    chatName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
        fontFamily: "Nunito-Bold",
    },
    lastMessage: {
        fontSize: 14,
        color: "#777",
        fontFamily: "Nunito",
    },
    arrowIcon: {
        marginLeft: 8,
    },
    emptyText: {
        textAlign: "center",
        padding: 12,
        color: "#999",
        fontStyle: "italic",
        fontFamily: "Nunito",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 12,
        marginBottom: 16,
        marginLeft: 16, // 들여쓰기 효과
        marginRight: 8,
    },
});

export default styles;
