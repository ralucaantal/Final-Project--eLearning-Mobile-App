import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowDownTrayIcon, HeartIcon } from "react-native-heroicons/solid";
import { themeColors } from ".";
import tw from "tailwind-react-native-classnames";

export default function CourseCard({ course }) {
  const [isFavourite, setFavourite] = useState(false);

  return (
    <View style={tw`mr-4 relative`}>
      <Image source={course.image} style={tw`w-80 h-60 rounded-3xl`} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={tw`absolute p-4 h-full w-full flex justify-between rounded-3xl`}
      >
        <View style={tw`flex-row justify-end`}>
          <TouchableOpacity
            onPress={() => setFavourite(!isFavourite)}
            style={tw`p-3 rounded-full bg-white bg-opacity-30`}
          >
            <HeartIcon
              size={25}
              color={isFavourite ? themeColors.rozPal : "white"}
            />
          </TouchableOpacity>
        </View>
        <View className="space-y-1">
          {/* <StarRating
            disabled={true}
            starSize={15}
            containerStyle={{ width: 90 }}
            maxStars={5}
            rating={course.stars}
            emptyStar={require("../assets/images/emptyStar.png")}
            fullStar={require("../assets/images/fullStar.png")}
          /> */}
          <Text style={tw`text-xl font-bold text-gray-300`}>
            {course.title}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}
