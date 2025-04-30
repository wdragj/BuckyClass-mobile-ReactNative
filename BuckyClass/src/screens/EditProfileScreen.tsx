import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "../components/BottomNavBar"; // Corrected path

const avatars = [
  require("../../assets/avatar_1.png"),
  require("../../assets/avatar_2.png"),
  require("../../assets/avatar_3.png"),
  require("../../assets/avatar_4.png"),
];

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [username, setUsername] = useState("User Name");
  const [school, setSchool] = useState("University of Wisconsin");
  const [major, setMajor] = useState("Computer Science");

  const handleSave = () => {
    // Save changes and navigate back to Profile screen
    navigation.goBack();
  };

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
            <View style={styles.blurOverlay}>
              <Text style={styles.header}>Edit Profile</Text>

              <View style={styles.profileContainer}>
                <Text style={styles.sectionTitle}>Choose Avatar</Text>

                <View style={styles.avatarContainer}>
                  {avatars.map((avatar, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedAvatar(avatar)}
                    >
                      <Image
                        source={avatar}
                        style={[
                          styles.avatarImage,
                          selectedAvatar === avatar && styles.selectedAvatar,
                        ]}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.sectionTitle}>Username</Text>
                <TextInput
                  style={styles.inputField}
                  value={username}
                  onChangeText={setUsername}
                />

                <Text style={styles.sectionTitle}>School</Text>
                <TextInput
                  style={styles.inputField}
                  value={school}
                  onChangeText={setSchool}
                />

                <Text style={styles.sectionTitle}>Major</Text>
                <TextInput
                  style={styles.inputField}
                  value={major}
                  onChangeText={setMajor}
                />

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>

      {/* Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} activeScreen="EditProfile" />
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
  sectionTitle: {
    fontSize: 20,
    color: "#333",
    fontFamily: "Nunito-ExtraBold",
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  avatarContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#8863e4",
  },
  selectedAvatar: {
    transform: [{ scale: 1.2 }],
  },
  inputField: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#F97CBD",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    marginTop: 24,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Nunito-Bold",
  },
});

export default EditProfileScreen;
