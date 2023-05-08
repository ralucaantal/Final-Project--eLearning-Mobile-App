import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

export const avatare = [
  {
    id: 1,
    sursa: require("../assets/avatare/avatar1.jpg"),
  },
  {
    id: 2,
    sursa: require("../assets/avatare/avatar2.jpg"),
  },
  {
    id: 3,
    sursa: require("../assets/avatare/avatar3.jpg"),
  },
  {
    id: 4,
    sursa: require("../assets/avatare/avatar4.jpg"),
  },
  {
    id: 5,
    sursa: require("../assets/avatare/avatar5.jpg"),
  },
  {
    id: 6,
    sursa: require("../assets/avatare/avatar6.jpg"),
  },
  {
    id: 7,
    sursa: require("../assets/avatare/avatar7.jpg"),
  },
  {
    id: 8,
    sursa: require("../assets/avatare/avatar8.jpg"),
  },
  {
    id: 9,
    sursa: require("../assets/avatare/avatar9.jpg"),
  },
];

export default function ChooseAvatar() {
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
            🎞 Alege un avatar:
          </Text>
        </View>
        <ScrollView
          style={{ height: 400 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: 10,
              marginTop: 10,
            }}
          > */}
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-wrap flex-row"
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.4)",
              alignItems: "center",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            {avatare.map((avatar, index) => {
              return (
                <TouchableOpacity key={avatar.id} style={{ width: "33.33%" }}>
                  <Image
                    source={avatar.sursa}
                    style={{
                      width: 88,
                      height: 88,
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    className="rounded-2xl"
                  />
                </TouchableOpacity>
              );
            })}
          </TouchableOpacity>
          {/* </TouchableOpacity> */}
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            style={{
              width: "30%",
              opacity: 0.8,
              alignSelf: "flex-end",
              marginEnd: 15,
            }}
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              OK!
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
