import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

export default function IntrebariGrilaAdmin() {
  const navigation = useNavigation();

  const [intrebari, setIntrebari] = useState(null);

  useEffect(() => {
    const cereIntrebariText = async () => {
      try {
        const tipIntrebare = {
          tipIntrebare: "GRILA",
        };

        const requestOptions = {
          method: "POST",
          body: JSON.stringify(tipIntrebare),
          headers: { "Content-Type": "application/json" },
        };

        let input = IPv4 + ":5000/cereIntrebariAdmin";

        fetch(input, requestOptions)
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

  const handleStergereIntrebare = (id) => {
    const intrebareDeSters = {
      idIntrebare: id,
      tipIntrebare: "GRILA",
    };

    console.log(intrebareDeSters);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(intrebareDeSters),
      headers: { "Content-Type": "application/json" },
    };

    console.log(requestOptions);
    let input = IPv4 + ":5000/stergeIntrebare";

    fetch(input, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
            Întrebările de tip grilă din cadrul aplicației 📃
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
                  <View className="flex-1 flex justify-center pl-3 space-y-3">
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
                      Materie: {intrebare.materie}
                    </Text>
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Text Întrebare: {intrebare.text_intrebare}
                    </Text>
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Răspuns corect: {intrebare.raspuns_corect}
                    </Text>
                  </View>
                  <View style={{ alignSelf: "center" }}>
                    <TouchableOpacity
                      className="py-3 bg-red-400 rounded-xl"
                      onPress={() => handleStergereIntrebare(intrebare.id)}
                    >
                      <Text className="font-xl font-bold text-center text-gray-700">
                        Șterge Întrebarea
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
