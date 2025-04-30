import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Correcting the import path for BottomNavBar
import BottomNavBar from "../components/BottomNavBar"; // Adjusted import path

// Define the avatars (these can be stored in the assets folder)
const avatars = [
  { id: 1, image: require("../../assets/avatar_1.png") },
  { id: 2, image: require("../../assets/avatar_2.png") },
  { id: 3, image: require("../../assets/avatar_3.png") },
  { id: 4, image: require("../../assets/avatar_4.png") },
];

// Assuming your user data is the same and includes the user's selected avatarId
const userData = {
  name: "User Name",
  school: "University of Wisconsin",
  major: "Computer Science",
  avatarId: 1, // Assume the user has chosen avatar with id 1 during registration
  courses: [
    {
      title: "Introduction to Algorithms",
      professor: "Prof. Smith",
      time: "Mon/Wed 10:00-11:15",
    },
    {
      title: "Data Structures",
      professor: "Prof. Johnson",
      time: "Tue/Thu 1:00-2:15",
    },
    {
      title: "Computer Architecture",
      professor: "Prof. Williams",
      time: "Mon/Wed 3:00-4:15",
    },
    {
      title: "Operating Systems",
      professor: "Prof. Brown",
      time: "Tue/Thu 10:00-11:15",
    },
    {
      title: "Database Systems",
      professor: "Prof. Davis",
      time: "Fri 9:00-11:45",
    },
  ],
};

const ProfileScreen = ({ navigation }) => {
  // Find the avatar image based on the user's selected avatarId
  const selectedAvatar = avatars.find((avatar) => avatar.id === userData.avatarId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.gradientBackground}>
        <LinearGradient
          colors={["rgba(230, 224, 252, 0.40)", "rgba(235, 218, 255, 0.40)"]}
          style={styles.gradientStyle}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Profile Content */}
            <View style={styles.blurOverlay}>
              <Text style={styles.header}>Profile</Text>

              <View style={styles.profileContainer}>
                {/* Display the selected avatar */}
                <Image source={selectedAvatar.image} style={styles.profileImage} />
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userInfo}>{userData.school}</Text>
                <Text style={styles.userInfo}>{userData.major}</Text>

                <Text style={styles.sectionTitle}>My Classes</Text>

                {userData.courses.map((course, index) => (
                  <View key={index} style={styles.courseItem}>
                    <Text style={styles.courseNumber}>{index + 1}.</Text>
                    <View style={styles.courseDetails}>
                      <Text style={styles.courseTitle}>{course.title}</Text>
                      <Text style={styles.courseProfessor}>
                        {course.professor}
                      </Text>
                      <Text style={styles.courseTime}>{course.time}</Text>
                    </View>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.settingsButton}
                  onPress={() => navigation.navigate("EditProfile")}
                >
                  <Text style={styles.settingsButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>

      {/* Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} activeScreen="Profile" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4EDFE",
  },
  gradientBackground: {
    flex: 1,
  },
  gradientStyle: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  blurOverlay: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    color: "#171717",
    marginBottom: 30,
    fontFamily: "Nunito-ExtraBold",
    textAlign: "center",
  },
  profileContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 3,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#8863e4",
  },
  userName: {
    fontSize: 24,
    color: "#333",
    fontFamily: "Nunito-Bold",
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 16,
    color: "#777",
    fontFamily: "Nunito-Bold",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#333",
    fontFamily: "Nunito-ExtraBold",
    marginVertical: 20,
    alignSelf: "flex-start",
  },
  courseItem: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  courseNumber: {
    fontSize: 16,
    color: "#8863e4",
    fontFamily: "Nunito-Bold",
    marginRight: 12,
    minWidth: 25,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Nunito-ExtraBold",
    marginBottom: 4,
  },
  courseProfessor: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Nunito-Bold",
    marginBottom: 2,
  },
  courseTime: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Nunito-Bold",
  },
  settingsButton: {
    backgroundColor: "#F97CBD",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    marginTop: 24,
  },
  settingsButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Nunito-Bold",
  },
});

export default ProfileScreen;
