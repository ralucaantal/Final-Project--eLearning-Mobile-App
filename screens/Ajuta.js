import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Image,
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
              marginTop: 60,
            }}
          >
            <ScrollView
              className="form space-y-2"
              style={{ width: "100%", height: "100%" }}
            >
              {/* <Text className="text-white ml-4">
                Propune o întrebare cu răspuns deschis pentru disciplina BAZE DE
                DATE:
              </Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Textul întrebării tale"
                style={{ width: "100%", opacity: 0.5 }}
              />
              <Text className="text-white ml-4">
                Cum se rezolvă această întrebare?
              </Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Textul întrebării tale"
                style={{ width: "100%", opacity: 0.5 }}
              /> */}
              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                style={{
                  width: "100%",
                  opacity: 0.8,
                  alignSelf: "flex-end",
                  marginTop: 5,
                  marginBottom: 5,
                }}
                onPress={() => {
                  console.log("se vrea propunerea unei intrebari de tip grila");
                  navigation.navigate("IntrebareGrila");
                }}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Propune o întrebare de tip grilă
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                style={{
                  width: "100%",
                  opacity: 0.8,
                  alignSelf: "flex-end",
                  marginTop: 5,
                  marginBottom: 5,
                }}
                onPress={() => {
                  console.log(
                    "se vrea propunerea unei intrebari cu raspuns deschis"
                  );
                  navigation.navigate("IntrebareText");
                }}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Propune o întrebare cu raspuns deschis
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                style={{
                  width: "100%",
                  opacity: 0.8,
                  alignSelf: "flex-end",
                  marginTop: 5,
                  marginBottom: 5,
                }}
                onPress={() => {
                  console.log("se vrea oferirea de feedback");
                  navigation.navigate("Feedback");
                }}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Lasă un feedback acestei aplicații
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/feedback.png")}
              style={{ width: 180, height: 180 }}
            />
          </View>
          <View className="mt-3 space-y-10">
            <Text
              style={{
                color: themeColors.white,
                backgroundColor: "black",
                padding: 10,
                borderRadius: 10,
                alignSelf: "center",
                marginBottom: 5,
              }}
              className="ml-4 text-3xl font-bold"
            >
              CodeCampus
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
