export type RootStackParamList = {
    // 인증 및 온보딩 화면
    WelcomeScreen: undefined;
    SignIn: undefined;
    SignUp: undefined;
    UserInfo: undefined;
    Avatar: undefined;

    // 탭 네비게이터
    MainTabs: undefined;

    // 메인 탭 화면
    Home: undefined;
    Courses: undefined;
    ChatList: undefined;
    Profile: undefined;
    EditProfile: undefined;

    // 세부 화면들
    CourseDetails: { course: { id: string; name: string; views: number } };
    CourseChat: { courseId: string };
    PrivateChat: { chatId: string };
    ChatScreen: undefined;
};
