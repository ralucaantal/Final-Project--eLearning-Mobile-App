import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";

export default function Ajuta() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior={"padding"}
      style={{ flex: 1 }}
    >
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
              Ajută-ne să ne îmbunătățim aplicația! 👀
            </Text>
          </View>
          <View
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              marginTop:10
            }}
          >
            <ScrollView
              className="form space-y-2"
              style={{ width: "100%",height:"100%" }}
            >
              <Text className="text-white ml-4">Propune o întrebare cu răspuns deschis:</Text>
              <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder="Textul întrebării tale"
                  style={{ width: "100%", opacity: 0.5 }}
                />
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
