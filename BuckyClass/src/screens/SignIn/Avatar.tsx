import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const AVATAR_WIDTH = width * 0.65; // Avatar width to maintain the same proportion for the larger avatar
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

  // To limit the avatar list to only the 4 avatars (no infinite loop)
  const extendedAvatars = avatars; // No need to extend the list anymore

  // Handle scrolling and calculating the index
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / AVATAR_WIDTH);
    const actualIndex = Math.min(index, avatars.length - 1); // Ensure it doesn't scroll past the last avatar
    setCurrentIndex(actualIndex);
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / AVATAR_WIDTH);
    const actualIndex = Math.min(index, avatars.length - 1); // Ensure it doesn't scroll past the last avatar
    setCurrentIndex(actualIndex);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: AVATAR_WIDTH,
    offset: AVATAR_WIDTH * index,
    index,
  });

  return (
    <View style={styles.container}>
      {/* Adjusted title position */}
      <Text style={styles.title}>What GROW Are You?</Text>

      {/* FlatList to render avatars */}
      <FlatList
        ref={flatListRef}
        horizontal
        data={extendedAvatars}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        snapToInterval={AVATAR_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={handleScroll}
        renderItem={({ item, index }) => {
          const isCurrent =
            index === currentIndex;
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

      {/* Adjusted pagination dots position */}
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

      {/* Adjusted button position and functionality */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")} // Changed to navigate to homepage
      >
        <Text style={styles.buttonText}>Save</Text> {/* Changed text to "Save" */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EDFE",
    alignItems: "center",
    paddingTop: 40, // Reduced top padding for the title and avatar positioning
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3E4766",
    marginBottom: 60, // Increased marginBottom to bring the title lower
    textAlign: "center",
  },
  avatarContainer: {
    width: AVATAR_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 330, // 1.5 times bigger
    height: 330,
    borderRadius: 165, // 1.5 times bigger, so half of 330px is 165px
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Reduced marginTop to bring dots higher
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
  button: {
    backgroundColor: "#A79CFF",
    padding: 12,
    borderRadius: 10,
    marginTop: 20, // Reduced marginTop to bring the button higher
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AvatarScreen;
