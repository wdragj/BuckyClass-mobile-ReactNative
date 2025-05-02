import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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
        borderRadius: 30,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: -30, // 로고와 입력창 사이 간격 줄이기 위해 음수 마진 추가
    },
    logo: {
        width: 342 * 1.5,
        height: 185 * 1.5,
    },
    appTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#8863e4",
        fontFamily: "Nunito-ExtraBold",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#171717",
        marginBottom: 10,
        fontFamily: "Nunito-ExtraBold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 32,
        textAlign: "center",
        fontFamily: "Nunito",
    },
    inputContainer: {
        width: "100%",
        maxWidth: 360,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 16,
        paddingHorizontal: 12,
        marginBottom: 16,
        height: 50,
        borderWidth: 1,
        borderColor: "rgba(136, 99, 228, 0.3)",
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: "#333",
        fontFamily: "Nunito",
    },
    eyeIcon: {
        padding: 10,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: "#8863e4",
        fontSize: 14,
        fontFamily: "Nunito-Bold",
    },
    button: {
        backgroundColor: "#F97CBD",
        borderRadius: 24,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: "rgba(249, 124, 189, 0.6)",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Nunito-Bold",
    },
    errorText: {
        color: "#FF6B6B",
        fontSize: 14,
        marginBottom: 16,
        textAlign: "center",
        fontFamily: "Nunito",
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    signupText: {
        fontSize: 14,
        color: "#666",
        fontFamily: "Nunito",
    },
    signupLink: {
        fontSize: 14,
        color: "#8863e4",
        fontWeight: "bold",
        marginLeft: 8,
        fontFamily: "Nunito-Bold",
    },
});

export default styles;
