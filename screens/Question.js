import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";

const detaliiCont = ["Zile ⚡", "Puncte 🚀", "Vieți 🤍"];

export default function Question() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["rgba(135, 125, 250, 0.9)", "rgba(180, 174, 232, 0.7)"]}
      className="w-full flex-1"
    >
      <SafeAreaView>
        <View className="container">
          <TouchableOpacity
            className="flex-row justify-between items-center px-4"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon color={themeColors.galben} size="30" />
          </TouchableOpacity>
        </View>
        <View className="mt-3 space-y-3">
          <View className="mt-3 space-y-3">
            <Text
              style={{
                color: themeColors.white,
                backgroundColor: "black",
                padding: 10,
                borderRadius: 10,
                alignSelf: "flex-start",
              }}
              className="ml-4 text-3xl font-bold"
            >
              CodeCampus
            </Text>
          </View>
          <View className="pl-4" style={{ alignItems: "flex-start" }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {detaliiCont.map((cat) => {
                return (
                  <TouchableOpacity
                    key={cat}
                    className="bg-purple-100 p-3 px-4 rounded-full mr-2"
                  >
                    <Text>{cat}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <Text
            style={{ color: themeColors.white }}
            className="ml-4 text-3xl font-bold"
          >
            Întrebarea numărul 1 🤔
          </Text>
        </View>

        <ScrollView
          style={{ height: "100%", marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        ></ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
