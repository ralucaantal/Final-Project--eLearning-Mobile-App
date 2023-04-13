import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  Bars3CenterLeftIcon,
  BellIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { useNavigation } from "@react-navigation/native";

const notificari = [
  {
    id: 1,
    titlu: "Notificarea numarul 1",
  },
  {
    id: 2,
    titlu: "Notificarea numarul 2",
  },
  {
    id: 3,
    titlu: "Notificarea numarul 3",
  },
];

export default function NotificationsScreen() {
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
        <View className="mt-3">
          <View className="flex-row justify-between mb-2">
            <Text
              style={{ color: themeColors.white }}
              className="ml-4 text-3xl font-bold"
            >
              Notificări 📩
            </Text>
          </View>
        </View>
        <ScrollView
          style={{ height: 320 }}
          showsVerticalScrollIndicator={false}
        >
          {notificari.map((not, index) => {
            return (
              <TouchableOpacity
                className="mx-4 p-2 mb-2 flex-row"
                key={index}
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  borderRadius: 10,
                }}
              >
                <BellIcon color={themeColors.galben} size="50" />
                <View className="flex-1 flex justify-center pl-3 space-y-3">
                  <Text
                    style={{ color: themeColors.white }}
                    className="font-semibold"
                  >
                    {not.titlu}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
