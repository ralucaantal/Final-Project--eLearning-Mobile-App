import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { useState } from "react";
import IPv4 from "../index";

export default function InscriereQuiz({ route }) {
  const navigation = useNavigation();

  const [cod, setCod] = useState(null);

  const handleChangeCod = (inputText) => {
    setCod(inputText);
  };

  const incepeQuiz = async () => {
    console.log(route);
    if (cod !== null) {
      console.log(cod);

      const codTrimis = {
        cod: cod,
        idUser: route.params.id,
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(codTrimis),
        headers: { "Content-Type": "application/json" },
      };

      let input = IPv4 + ":5000/validareCod";

      try {
        const response = await fetch(input, requestOptions);
        const data = await response.json();
        console.log(data);

        if (data.message === "Nu") {
          alert("Codul nu este bun!");
        } else if (data.message === "Se poate rezolva quiz-ul.") {
          console.log("urmeaza rezolvarea quiz-ului");
          actualizareStatistici();
          // console.log(data);
          navigation.navigate("QuizOrganizat", {
            materii: data.materii,
            nrIntrebari: data.nrIntrebari,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const actualizareStatistici = async () => {
    const statistici = {
      idUser: route.params.idUser,
      actiune: "S-a inscris la un quiz",
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(statistici),
      headers: { "Content-Type": "application/json" },
    };

    console.log(requestOptions);
    let input = IPv4 + ":5000/actualizareUltimaActiune";

    const response = await fetch(input, requestOptions);
    const data = await response.json();
  };

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
            Înscrie-te la un quiz! 🧗🏻‍♀️
          </Text>
        </View>

        <ScrollView
          style={{ height: "100%", marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 250 }}
        >
          <View
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <ScrollView className="form space-y-2" style={{ width: "100%" }}>
              <Text className="text-white ml-4">Cod Quiz: </Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="000000"
                style={{ width: "100%", opacity: 0.5 }}
                value={cod}
                onChangeText={handleChangeCod}
              />
              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                style={{ width: "100%", opacity: 0.8 }}
                onPress={incepeQuiz}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Intră în quiz
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
