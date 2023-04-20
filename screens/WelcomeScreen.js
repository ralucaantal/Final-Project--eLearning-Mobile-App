import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["rgba(135, 125, 250, 0.9)", "rgba(180, 174, 232, 0.7)"]}
      className="w-full flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 flex justify-around my-4">
          <View>
            <Text
              style={{
                color: themeColors.white,
                backgroundColor: "black",
                padding: 10,
                // borderRadius: 10,
                alignSelf: "center",
              }}
              className="ml-0 mr-0 text-5xl font-bold"
            >
              CodeCampus
            </Text>
            <Text
              className="text-white font-bold text-4xl text-center"
              style={{ marginTop: 5 }}
            >
              Să începem! 👨🏻‍🎓
            </Text>
          </View>
          <View
            className="flex-row justify-center rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              marginLeft: 25,
              marginRight: 25,
            }}
          >
            <Image
              source={require("../assets/images/welcome.png")}
              style={{
                width: 280,
                height: 280,
              }}
              // className="rounded-full"
            />
          </View>

          <View className="space-y-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              className="py-3 bg-yellow-400 mx-7 rounded-xl"
            >
              <Text className="text-xl font-bold text-center text-gray-700">
                Înscrie-te!
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center">
              <Text className="text-white font-semibold">Ai deja un cont?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="font-semibold text-yellow-400">
                  Loghează-te!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
