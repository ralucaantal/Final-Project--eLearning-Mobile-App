import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";

const Utilizatori = [
  {
    id: 1,
    nume: "@ralucaantal",
    image: require("../assets/images/avatar.jpg"),
    puncte: 500,
  },
  {
    id: 2,
    nume: "@antalraluca",
    image: require("../assets/images/avatar2.jpg"),
    puncte: 450,
  },
  {
    id: 3,
    nume: "@antalraluca",
    image: require("../assets/images/avatar.jpg"),
    puncte: 400,
  },
  {
    id: 4,
    nume: "@antalraluca",
    image: require("../assets/images/avatar2.jpg"),
    puncte: 350,
  },
];

export default function Top() {
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
          <Text
            style={{ color: themeColors.white }}
            className="ml-4 text-3xl font-bold"
          >
            Top Utilizatori🌟
          </Text>
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
        </View>

        <ScrollView
          style={{ height: "100%", marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {Utilizatori.map((utilizator, index) => {
            return (
              <TouchableOpacity
                className="mx-4 p-2 mb-2 flex-row"
                key={index}
                style={{
                  backgroundColor: "rgba(255,255,255,0.4)",
                  borderRadius: 10,
                }}
              >
                <View
                  className="flex-row space-x-1"
                  style={{ marginRight: 10, marginTop: 25 }}
                >
                  <Text
                    className="font-semibold"
                    style={{ color: themeColors.white }}
                  >
                    {utilizator.id}
                  </Text>
                </View>
                <Image
                  source={utilizator.image}
                  style={{ width: 70, height: 70 }}
                  className="rounded-2xl"
                />
                <View className="flex-1 flex justify-center pl-3 space-y-3">
                  <Text
                    style={{ color: themeColors.white }}
                    className="font-semibold"
                  >
                    {utilizator.nume}
                  </Text>
                  <View className="flex-row space-x-1">
                    <TouchableOpacity className="bg-purple-100 p-3 px-4 rounded-full mr-2">
                      <Text>{utilizator.puncte} Puncte 🚀</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
