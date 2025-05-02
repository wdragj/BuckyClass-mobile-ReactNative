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
    keyboardAvoidingContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
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
    courseNameContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "rgba(200, 200, 200, 0.5)",
    },
    courseNameLabel: {
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 12,
        fontFamily: "Nunito-Bold",
    },
    ratingContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "rgba(200, 200, 200, 0.5)",
        alignItems: "center",
    },
    starsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 12,
    },
    starButton: {
        padding: 8,
    },
    ratingText: {
        fontSize: 16,
        color: "#333",
        fontFamily: "Nunito",
    },
    commentContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "rgba(200, 200, 200, 0.5)",
    },
    commentInput: {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 12,
        padding: 12,
        minHeight: 150,
        textAlignVertical: "top",
        fontSize: 16,
        color: "#333",
        fontFamily: "Nunito",
    },
    charCount: {
        alignSelf: "flex-end",
        marginTop: 8,
        fontSize: 12,
        color: "#666",
        fontFamily: "Nunito",
    },
    errorText: {
        color: "#F97CBD",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 16,
        fontFamily: "Nunito-Bold",
    },
    submitButton: {
        backgroundColor: "#F97CBD",
        borderRadius: 24,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    submitButtonDisabled: {
        backgroundColor: "#ccc",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
});

export default styles;
