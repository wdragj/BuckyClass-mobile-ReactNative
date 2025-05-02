import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    FlatList,
    Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import { realtimeDB } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import BottomNavBar from "../../components/BottomNavBar";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./ChatListScreen_CSS";

type ChatListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ChatList"
>;

type ChatItem = {
    id: string;
    name: string;
    type: "course" | "private";
    lastMessage?: string;
    timestamp?: number;
};

type Message = {
    text: string;
    timestamp: number;
};

export default function ChatListScreen({
    navigation,
}: {
    navigation: ChatListScreenNavigationProp;
}) {
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const chatsRef = ref(realtimeDB, "chats");

        const unsubscribe = onValue(chatsRef, (snapshot) => {
            const data = snapshot.val();
            const chatList: ChatItem[] = [];

            if (data) {
                for (const chatId in data) {
                    const chat = data[chatId];
                    const messages = chat.messages
                        ? (Object.values(chat.messages) as Message[])
                        : [];
                    let lastMessage = "";
                    let timestamp = 0;

                    if (messages.length) {
                        messages.sort(
                            (a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0)
                        );
                        const latestMessage = messages[messages.length - 1];
                        lastMessage = latestMessage?.text || "";
                        timestamp = latestMessage?.timestamp || 0;
                    }

                    chatList.push({
                        id: chatId,
                        name: chat.name || "Unnamed Chat",
                        type: chat.type || "private",
                        lastMessage,
                        timestamp,
                    });
                }
            }

            setChats(chatList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 검색 필터링
    const filteredChats = chats.filter((chat) =>
        chat.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // 채팅방 유형별 필터링
    const groupChats = filteredChats.filter((chat) => chat.type === "course");
    const privateChats = filteredChats.filter(
        (chat) => chat.type === "private"
    );

    // 채팅방 아이템 렌더링 함수
    const renderChatItem = (chat: ChatItem) => {
        let imageSource;

        if (chat.type === "course") {
            // 그룹 채팅(코스)일 경우 교과목 아이콘 선택
            // 채팅방 ID를 기준으로 세 가지 아이콘 중 하나를 결정
            const courseType = Math.abs(chat.id.charCodeAt(0) % 3);

            if (courseType === 0) {
                imageSource = require("../../../assets/csIcon.png");
            } else if (courseType === 1) {
                imageSource = require("../../../assets/statIcon.png");
            } else {
                imageSource = require("../../../assets/mathIcon.png");
            }
        } else {
            // 개인 채팅일 경우 아바타 이미지 사용
            const avatarIndex = Math.abs(chat.id.charCodeAt(0) % 4) + 1;
            imageSource = getAvatarSource(avatarIndex);
        }

        return (
            <TouchableOpacity
                key={chat.id}
                style={styles.chatItem}
                onPress={() => {
                    if (chat.type === "course") {
                        navigation.navigate("CourseChat", {
                            courseId: chat.id,
                        });
                    } else {
                        navigation.navigate("PrivateChat", { chatId: chat.id });
                    }
                }}
            >
                <View style={styles.chatItemLeft}>
                    <Image
                        source={imageSource}
                        style={
                            chat.type === "course"
                                ? styles.courseIconImage
                                : styles.avatarImage
                        }
                    />
                </View>
                <View style={styles.chatItemCenter}>
                    <Text style={styles.chatName} numberOfLines={1}>
                        {chat.name}
                    </Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {chat.lastMessage || "No messages yet"}
                    </Text>
                </View>
                <Ionicons
                    name="chevron-forward"
                    size={24}
                    color="#8863e4"
                    style={styles.arrowIcon}
                />
            </TouchableOpacity>
        );
    };

    // 아바타 이미지 소스 가져오기
    const getAvatarSource = (index: number) => {
        switch (index) {
            case 1:
                return require("../../../assets/avatar_1.png");
            case 2:
                return require("../../../assets/avatar_2.png");
            case 3:
                return require("../../../assets/avatar_3.png");
            case 4:
                return require("../../../assets/avatar_4.png");
            default:
                return require("../../../assets/avatar_1.png");
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
                    <View style={styles.blurOverlay}>
                        <View style={styles.container}>
                            {/* 헤더 텍스트 */}
                            <Text style={styles.headerTitle}>
                                You've entered the Chat-room
                            </Text>
                            <Text style={styles.headerSubtitle}>
                                Welcome to Chat Function!
                            </Text>

                            {/* 검색창 */}
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search chat rooms..."
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    autoFocus={false}
                                />
                                {searchText !== "" && (
                                    <TouchableOpacity
                                        style={styles.clearButton}
                                        onPress={() => setSearchText("")}
                                    >
                                        <Ionicons
                                            name="close-circle"
                                            size={20}
                                            color="#999"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* 스크롤 가능한 콘텐츠 */}
                            {loading ? (
                                <Text style={styles.loadingText}>
                                    Loading chats...
                                </Text>
                            ) : (
                                <FlatList
                                    data={[]} // 빈 데이터로 설정하고 헤더로 모든 콘텐츠 표시
                                    ListHeaderComponent={
                                        <>
                                            {/* My Chat 섹션 - 제목만 표시 */}
                                            <Text style={styles.mainTitle}>
                                                My Chat
                                            </Text>

                                            {/* Group Chat 섹션 */}
                                            <Text style={styles.sectionTitle}>
                                                Group Chat
                                            </Text>
                                            {groupChats.length > 0 ? (
                                                groupChats.map((chat) =>
                                                    renderChatItem(chat)
                                                )
                                            ) : (
                                                <Text style={styles.emptyText}>
                                                    No group chats available
                                                </Text>
                                            )}

                                            {/* 1:1 Chat 섹션 */}
                                            <Text style={styles.sectionTitle}>
                                                1:1 Chat
                                            </Text>
                                            {privateChats.length > 0 ? (
                                                privateChats.map((chat) =>
                                                    renderChatItem(chat)
                                                )
                                            ) : (
                                                <Text style={styles.emptyText}>
                                                    No private chats available
                                                </Text>
                                            )}
                                        </>
                                    }
                                    keyExtractor={() => "header"}
                                    contentContainerStyle={
                                        styles.flatListContent
                                    }
                                />
                            )}
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}
