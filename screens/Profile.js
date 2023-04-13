import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon, BellIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function Profile() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["rgba(135, 125, 250, 0.9)", "rgba(180, 174, 232, 0.7)"]}
      className="w-full flex-1"
    >
      <SafeAreaView style={{ flex: 1, overflow: "hidden" }}>
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
            style={{ color: themeColors.white, textAlign: "center" }}
            className="ml-4 text-3xl font-bold"
          >
            Profil 😎
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
          <View
            style={{
              padding: 24,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
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
                marginTop: -36,
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
            <View className="mt-3 space-y-4">
              <Text
                className="ml-4 text-lg font-bold"
                style={{ color: themeColors.white, textAlign: "center" }}
              >
                @ralucaantal
              </Text>
            </View>
          </View>
        </ScrollView>
        <ScrollView
          style={{ height: 320 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: 10,
            }}
          >
             <BellIcon color={themeColors.galben} size="50" />
             <View className="flex-1 flex justify-center pl-3 space-y-3">
             <Text
                    style={{ color: themeColors.white }}
                    className="font-semibold"
                  >Incercare</Text>
             </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
