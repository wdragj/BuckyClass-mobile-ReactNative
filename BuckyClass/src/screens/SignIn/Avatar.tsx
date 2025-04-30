import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon

const { width, height } = Dimensions.get("window");
const AVATAR_WIDTH = width * 0.65;
const SPACING = (width - AVATAR_WIDTH) / 2;

const avatars = [
  { id: 1, image: require("../../../assets/avatar_1.png") },
  { id: 2, image: require("../../../assets/avatar_2.png") },
  { id: 3, image: require("../../../assets/avatar_3.png") },
  { id: 4, image: require("../../../assets/avatar_4.png") },
];

const AvatarScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Nunito-ExtraBold": require("../../../assets/fonts/Nunito-ExtraBold.ttf"),
        "Nunito-Bold": require("../../../assets/fonts/Nunito-Bold.ttf"),
        "Nunito": require("../../../assets/fonts/Nunito-Regular.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / AVATAR_WIDTH);
    const actualIndex = Math.min(index, avatars.length - 1);
    setCurrentIndex(actualIndex);
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / AVATAR_WIDTH);
    const actualIndex = Math.min(index, avatars.length - 1);
    setCurrentIndex(actualIndex);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: AVATAR_WIDTH,
    offset: AVATAR_WIDTH * index,
    index,
  });

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#3E4766" />
      </TouchableOpacity>

      <Text style={styles.title}>What GROW Are You?</Text>

      <View style={styles.avatarWrapper}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={avatars}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          snapToInterval={AVATAR_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: SPACING }}
          getItemLayout={getItemLayout}
          onMomentumScrollEnd={handleScrollEnd}
          onScroll={handleScroll}
          renderItem={({ item, index }) => {
            const isCurrent = index === currentIndex;
            return (
              <View
                style={[
                  styles.avatarContainer,
                  {
                    opacity: isCurrent ? 1 : 0.4,
                    transform: [{ scale: isCurrent ? 1 : 0.85 }],
                  },
                ]}
              >
                <Image source={item.image} style={styles.avatarImage} />
              </View>
            );
          }}
        />
      </View>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {avatars.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Save Button with Gradient */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
  // This line ensures it navigates to the Home screen
      >
        <LinearGradient
          colors={["#F97CBD", "#DD94F7", "#A79CFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EDFE",
    alignItems: "center",
    paddingTop: 60, // Increased from 40 to move everything down
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 60, // Positioned below the new paddingTop
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3E4766",
    textAlign: "center",
    marginTop: 90, // Reduced from 100 to move down less
    fontFamily: "Nunito-ExtraBold",
  },
  avatarWrapper: {
    height: 400,
    justifyContent: "center",
    marginTop: 40, // Increased from 20
  },
  avatarContainer: {
    width: AVATAR_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 330,
    height: 330,
    borderRadius: 165,
  },
  dotsContainer: {
    marginTop: -10, // Increased from 20
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40, // Increased from 20
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#3E4766",
    width: 14,
    height: 14,
  },
  inactiveDot: {
    backgroundColor: "#D1B2FF",
    opacity: 0.6,
  },
  buttonWrapper: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 0,
    alignSelf: "center",
    width: "90%",
    marginBottom: 40, // Increased from 20
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
    fontFamily: "Nunito-ExtraBold",
  },
});

export default AvatarScreen;
