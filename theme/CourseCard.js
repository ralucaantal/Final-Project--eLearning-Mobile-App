import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/solid";
import { themeColors } from ".";

export default function CourseCard({ course }) {
  const [isFavourite, setFavourite] = useState(false);
  return (
    <View className="mr-4 relative">
      <Image
        source={course.image}
        className="w-80 h-60 rounded-3xl"
        style={{ width: 300, height: 200 }}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        className="absolute p-4 h-full w-full flex justify-between rounded-3xl"
      >
        <View className="flex-row justify-end">
          <TouchableOpacity
          onPress={()=> setFavourite(!isFavourite)}
            className="p-3 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <HeartIcon
              size="25"
              color={isFavourite ? themeColors.rozPal : "white"}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
