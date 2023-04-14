import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function SetariProfil() {
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
          <Text
            style={{ color: themeColors.white }}
            className="ml-4 text-3xl font-bold"
          >
            Setări profil ⚙
          </Text>
        </View>
        <View
          className="mx-4 p-2 mb-2 flex-row"
          style={{
            backgroundColor: "rgba(245, 165, 197, 0.2)",
            // backgroundColor: "rgba(180, 174, 232, 0.5)",
            borderRadius: 10,
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Image
                alt=""
                source={require("../assets/images/avatar.jpg")}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 9999,
                  borderWidth: 1,
                  borderColor: "transparent",
                  alignSelf: "center",
                  backgroundColor: "transparent",
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    right: -4,
                    bottom: -10,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: 9999,
                    backgroundColor: themeColors.rozPal,
                  }}
                >
                  <FeatherIcon
                    color={themeColors.white}
                    name="edit-3"
                    size={15}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View className="mt-3 space-y-4" style={{ alignItems: "center" }}>
              <Text
                className="ml-4 text-lg font-bold"
                style={{
                  color: themeColors.white,
                  textAlign: "center",
                }}
              >
                @ralucaantal
              </Text>
            </View>
          </View>
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
