import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const UserInfoScreen = ({ navigation }: any) => {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");

  const handleGrowUpPress = () => {
    navigation.navigate("AvatarScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About You</Text>

      <Text style={styles.label}>Choose School</Text>
      <TextInput
        placeholder="Enter your School Name"
        placeholderTextColor="#999"
        value={school}
        onChangeText={setSchool}
        style={styles.input}
      />

      <Text style={styles.label}>Choose Major</Text>
      <TextInput
        placeholder="Enter your Major"
        placeholderTextColor="#999"
        value={major}
        onChangeText={setMajor}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleGrowUpPress} style={styles.buttonWrapper}>
        <LinearGradient
          colors={["#F97CBD", "#DD94F7", "#A79CFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Grow-Up</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EDFE",
    justifyContent: "center",
    paddingHorizontal: 30,
    fontFamily: "Nunito",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 50,
    color: "#3E4766",
    fontFamily: "Nunito",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#3E4766",
    fontWeight: "bold",
    fontFamily: "Nunito",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 30,
    fontSize: 16,
    fontFamily: "Nunito-SemiBold",
  },
  buttonWrapper: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Nunito",
  },
});

export default UserInfoScreen;
