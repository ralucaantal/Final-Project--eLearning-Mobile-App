import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  LightBulbIcon,
  ChatBubbleLeftIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

export default function IntrebariPropuseAdmin() {
  const navigation = useNavigation();

  const [intrebari, setIntrebari] = useState(null);

  useEffect(() => {
    const cereIntrebariText = async () => {
      try {
        let input = IPv4 + ":5000/cereIntrebariPropuse";

        fetch(input)
          .then((response) => response.json())
          .then((data) => {
            setIntrebari(data);
            //console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    cereIntrebariText();
  }, []);

  const handleAprobaIntrebare = (id) => {
    const intrebareAprobata = {
      idIntrebare: id,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(intrebareAprobata),
      headers: { "Content-Type": "application/json" },
    };

    console.log(requestOptions);
    let input = IPv4 + ":5000/aprobaIntrebare";

    fetch(input, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setIntrebari(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRespingeIntrebare = (id) => {
    const intrebareAprobata = {
      idIntrebare: id,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(intrebareAprobata),
      headers: { "Content-Type": "application/json" },
    };

    console.log(requestOptions);
    let input = IPv4 + ":5000/respingeIntrebare";

    fetch(input, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setIntrebari(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            className="ml-4 text-3xl font-bold italic"
          >
            Întrebările propuse de utilizatorii aplicației 🧐
          </Text>
        </View>
        {intrebari && (
          <ScrollView
            style={{ height: "100%", marginTop: 20 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
          >
            {intrebari.map((intrebare, index) => {
              return (
                <TouchableOpacity
                  className="mx-4 p-2 mb-2 flex-row"
                  key={index}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    borderRadius: 10,
                  }}
                  //   onPress={() =>
                  //     navigation.navigate("StatisticiUtilizatori", {
                  //       idUser: utilizator.id,
                  //     })
                  //  }
                >
                  <View
                    className="flex-column space-x-1"
                    style={{ alignSelf: "center" }}
                  >
                    <Text
                      className="font-semibold"
                      style={{ color: themeColors.white }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  {intrebare.tip_intrebare === "GRILA" && (
                    <LightBulbIcon
                      color={
                        intrebare.status === "In asteptare"
                          ? themeColors.galben
                          : intrebare.status === "Respinsa"
                          ? themeColors.rosu
                          : intrebare.status === "Aprobata"
                          ? themeColors.verde
                          : themeColors.galben // culoarea implicită
                      }
                      size="50"
                      style={{
                        opacity: 0.9,
                        alignSelf: "center",
                        marginLeft: 10,
                      }}
                    />
                  )}
                  {intrebare.tip_intrebare === "TEXT" && (
                    <ChatBubbleLeftIcon
                      color={
                        intrebare.status === "In asteptare"
                          ? themeColors.galben
                          : intrebare.status === "Respinsa"
                          ? themeColors.rosu
                          : intrebare.status === "Aprobata"
                          ? themeColors.verde
                          : themeColors.galben // culoarea implici
                      }
                      size="50"
                      style={{
                        opacity: 0.9,
                        alignSelf: "center",
                        marginLeft: 10,
                      }}
                    />
                  )}
                  <View className="flex-1 flex justify-center pl-3 space-y-3">
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Id User: {intrebare.id_utilizator}
                    </Text>
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Id Întrebare: {intrebare.id}
                    </Text>
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Tip Întrebare: {intrebare.tip_intrebare}
                    </Text>
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Text Întrebare: {intrebare.text_intrebare}
                    </Text>
                    {intrebare.tip_intrebare === "GRILA" && (
                      <View>
                        <Text
                          style={{ color: themeColors.white, fontSize: 16 }}
                          className="font-semibold"
                        >
                          Varianta 1: {intrebare.varianta1}
                        </Text>
                        <Text
                          style={{ color: themeColors.white, fontSize: 16 }}
                          className="font-semibold"
                        >
                          Varianta 2: {intrebare.varianta2}
                        </Text>
                        <Text
                          style={{ color: themeColors.white, fontSize: 16 }}
                          className="font-semibold"
                        >
                          Varianta 3: {intrebare.varianta3}
                        </Text>
                        <Text
                          style={{ color: themeColors.white, fontSize: 16 }}
                          className="font-semibold"
                        >
                          Varianta 4: {intrebare.varianta4}
                        </Text>
                      </View>
                    )}
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Răspuns corect: {intrebare.raspuns_corect}
                    </Text>
                  </View>
                  {intrebare.status === "In Asteptare" && (
                    <View style={{ alignSelf: "center" }}>
                      <TouchableOpacity
                        className="py-3 bg-green-400 rounded-xl"
                        style={{ marginBottom: 5 }}
                        onPress={() => handleAprobaIntrebare(intrebare.id)}
                      >
                        <Text className="font-xl font-bold text-center text-gray-700">
                          Aprobă
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="py-3 bg-red-400 rounded-xl"
                        style={{ marginTop: 5 }}
                        onPress={() => handleRespingeIntrebare(intrebare.id)}
                      >
                        <Text className="font-xl font-bold text-center text-gray-700">
                          Respinge
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
