export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    WelcomeScreen: undefined;
    Home: undefined;
    ChatScreen: undefined;
    Courses: undefined;
    CourseDetails: {
        course: {
            id: string;
            name: string;
            views: number;
        };
    };
    CourseChat: { courseId: string };
    ChatList: undefined;
    PrivateChat: { chatId: string };
};
