import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

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
});

export default styles;
