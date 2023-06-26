import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import IPv4 from "../index";

export default function CodQuiz({ route }) {
  const navigation = useNavigation();

  const [codQuiz, setCodQuiz] = useState(null);

  console.log(route.params);

  useEffect(() => {
    const creeazaQuiz = async () => {
      const quiz = {
        idUser: route.params.idUser,
        materii: route.params.cursuriCerute,
        nrIntrebari: route.params.nrIntrebari,
        oraStart: route.params.oraStart
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(quiz),
        headers: { "Content-Type": "application/json" },
      };

      // console.log(requestOptions);
      let input = IPv4 + ":5000/adaugareQuiz";

      // console.log(requestOptions);

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCodQuiz(data.quizId);
        });
    };

    creeazaQuiz();
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
            Tocmai ai creat un quiz! 🎊
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
              <Text
                style={{
                  color: themeColors.white,
                  fontSize: 20,
                  marginRight: 8,
                }}
                className="font-semibold"
              >
                Codul testului creat este următorul:{" "}
              </Text>
              {/* <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="000000"
                style={{ width: "100%", opacity: 0.5 }}
              /> */}
              <Text
                style={{
                  color: "black",
                  fontSize: 50,
                  textAlign: "center"
                }}
                className="font-semibold"
              >
                {codQuiz}
              </Text>
              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                style={{ width: "100%", opacity: 0.8 }}
                onPress={() => {
                  // console.log("S-au facut modificari pt utilizator");
                  navigation.navigate("Home");
                }}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Am înțeles! Înapoi la Home!
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
