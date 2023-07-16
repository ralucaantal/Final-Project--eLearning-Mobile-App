import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import IPv4 from "../index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

//const puncteCastigate = 50;

export default function FinalQuiz({ route }) {
  const navigation = useNavigation();

  const [puncteCastigate, setPuncteCastigate] = useState(null);

  const verificarePuncteCastigate = () => {
    setPuncteCastigate(0);
    setPuncteCastigate(route.params.punctajCastigat);
  };

  useEffect(() => {
    const punctaj = async () => {
      const finalQuiz = {
        puncteCastigate: route.params.punctajCastigat,
        idUser: route.params.idUtilizator,
      };

      console.log("finalQuiz: ", finalQuiz);

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(finalQuiz),
        headers: { "Content-Type": "application/json" },
      };

      //console.log(requestOptions);
      let input = IPv4 + ":5000/adaugarePunctajQuizIndividual";

      const response = await fetch(input, requestOptions);
      const data = await response.json();

      await AsyncStorage.setItem("jwt", data.jwt);
    };

    const actualizareStatistici = async () => {
      const statistici = {
        idUser: route.params.idUtilizator,
        actiune: "A finalizat un quiz",
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(statistici),
        headers: { "Content-Type": "application/json" },
      };

      //console.log(requestOptions);
      let input = IPv4 + ":5000/actualizareUltimaActiune";

      const response = await fetch(input, requestOptions);
      const data = await response.json();
      await AsyncStorage.setItem("jwt", data.jwt);
    };

    const actualizareStatisticiTeste = async () => {
      const statistici = {
        idUser: route.params.idUtilizator,
        corecte: route.params.corecte,
        gresite: route.params.greseli,
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(statistici),
        headers: { "Content-Type": "application/json" },
      };

      //console.log(requestOptions);
      let input = IPv4 + ":5000/actualizareStatisticiTeste";

      const response = await fetch(input, requestOptions);
      const data = await response.json();
    };

    //console.log(route.params);
    actualizareStatisticiTeste();
    punctaj();
    actualizareStatistici();
  }, []);

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
            Felicitări! Ai finalizat un quiz! 🏅
          </Text>
        </View>
        <TouchableOpacity
          className="mx-4 p-2 mb-2 flex-row"
          style={{
            backgroundColor: "rgba(255,255,255,0.4)",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <View className="flex-row space-x-1 justify-content-end">
            <Text
              className="font-semibold"
              style={{
                color: themeColors.white,
                fontSize: 20,
                marginTop: 8,
                marginLeft: 5,
              }}
            >
              Ai câștigat
            </Text>
            <View
              className="flex-row space-x-1"
              style={{ display: "flex", marginLeft: "auto" }}
            >
              <TouchableOpacity className="bg-purple-100 p-3 px-4 rounded-full mr-2">
                <Text>{route.params.punctajCastigat} Puncte 🚀</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView
          style={{ height: "100%", marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                navigation.navigate("Antreneaza");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Generează încă un quiz
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
                console.log("ne ducem la urmatoarea intrebare");
                navigation.navigate("Top");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Vezi topul utilizatorilor
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
                console.log("ne ducem la urmatoarea intrebare");
                navigation.navigate("Statistici");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Vezi statisticile tale
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
                console.log("ne ducem la urmatoarea intrebare");
                navigation.navigate("Home");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Înapoi la Home
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
