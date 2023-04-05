import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Bars3CenterLeftIcon, BellIcon } from "react-native-heroicons/solid";
import GradientButton from "./../theme/GradientButton";

const detaliiCont = ["Zile ⚡", "Puncte 🚀", "Vieți 🤍"];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeDetail, setActiveDetail] = useState("Zile ⚡");
  return (
    <LinearGradient
      colors={["rgba(135, 125, 250, 0.9)", "rgba(180, 174, 232, 0.7)"]}
      className="w-full flex-1"
    >
      <SafeAreaView>
        <View className="container">
          <View className="flex-row justify-between items-center px-4">
            <Bars3CenterLeftIcon color={themeColors.galben} size="30" />
            <BellIcon color={themeColors.galben} size="30" />
          </View>
          <View className="mt-3 space-y-3">
            <Text
              style={{ color: themeColors.white }}
              className="ml-4 text-3xl font-bold"
            >
              Bine ai venit! ✨
            </Text>
            <View className="pl-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {detaliiCont.map((cat) => {
                  {/* if (cat == activeDetail) {
                    // show gradient category
                    return (
                      <GradientButton
                        key={cat}
                        containerClass="rounded-full mr-2"
                        value={cat}
                      />
                    );
                  } else {
                    // show normal category
                    return (
                      <TouchableOpacity
                        onPress={() => setActiveDetail(cat)}
                        key={cat}
                        className="bg-purple-100 p-3 px-4 rounded-full mr-2"
                      >
                        <Text>{cat}</Text>
                      </TouchableOpacity>
                    );
                  } */}
                  return (
                      <TouchableOpacity
                        onPress={() => setActiveDetail(cat)}
                        key={cat}
                        className="bg-purple-100 p-3 px-4 rounded-full mr-2"
                      >
                        <Text>{cat}</Text>
                      </TouchableOpacity>
                    );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
