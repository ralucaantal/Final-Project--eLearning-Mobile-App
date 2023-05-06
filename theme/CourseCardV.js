import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import tw from "tailwind-react-native-classnames";

export default function CourseCardV({ course }) {
  const imageSource = { uri: course.imagine };

  return (
    <TouchableOpacity style={[tw`mr-4 relative`, { marginBottom: 15 }]}>
      <Image
        source={imageSource}
        style={tw`w-full h-60 rounded-3xl`}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={tw`absolute p-4 h-full w-full flex justify-between rounded-3xl`}
      >
        <View style={tw`flex-row justify-end`}></View>
        <View className="space-y-1">
          <Text style={tw`text-xl font-bold text-gray-300`}>
            {course.titlu}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
