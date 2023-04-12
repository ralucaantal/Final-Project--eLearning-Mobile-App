import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowDownTrayIcon, HeartIcon } from "react-native-heroicons/solid";
import { themeColors } from ".";
import tw from "tailwind-react-native-classnames";

export default function CourseCardV({ course }) {
    const [isFavourite, setFavourite] = useState(false);
  
    return (
      <TouchableOpacity style={[tw`mr-4 relative`, { marginBottom: 15 }]}>
        <Image
          source={course.image}
          style={tw`w-full h-60 rounded-3xl`}
          resizeMode="cover"
        />
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
            <Text style={tw`text-xl font-bold text-gray-300`}>
              {course.title}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
