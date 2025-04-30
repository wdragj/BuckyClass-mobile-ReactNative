export type RootStackParamList = {
    SignIn: undefined; // SignIn screen doesn't require any params
    SignUp: undefined; // SignUp screen doesn't require any params
    WelcomeScreen: undefined; // WelcomeScreen screen doesn't require any params
    Home: undefined; // Home screen doesn't require any params
    ChatScreen: undefined; // ChatScreen doesn't require any params
    Courses: undefined; // Courses screen doesn't require any params
    Profile: undefined;
    EditProfile: undefined;
    CourseDetails: {
      course: {
        id: string;  // Course id is a string
        name: string;  // Course name is a string
        views: number;  // Views count as a number
      };
    };
    CourseChat: { 
      courseId: string; // Passing courseId as a string to CourseChat screen
    };
    ChatList: undefined; // ChatList screen doesn't require any params
    PrivateChat: { 
      chatId: string; // chatId as a string for PrivateChat
    };
    UserInfo: undefined; // UserInfo screen doesn't require any params
    AvatarScreen: undefined; // AvatarScreen doesn't require any params
  };
  