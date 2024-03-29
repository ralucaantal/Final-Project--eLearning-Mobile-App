import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon, CheckCircleIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

export default function SectiuniAdministrator({ route }) {
  const navigation = useNavigation();

  const [sectiuni, setSectiuni] = useState(null);

  const [indexSectiune, setIndexSectiune] = useState(0);

  useEffect(() => {
    const cereSectiuni = async () => {
      const cursCurent = {
        nume:
          route.params.cursCerut === "Baze De Date"
            ? "BD"
            : route.params.cursCerut === "Programare Orietată Obiect (POO)"
            ? "POO"
            : "BPC",
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(cursCurent),
        headers: { "Content-Type": "application/json" },
      };

      // console.log(requestOptions);
      let input = IPv4 + ":5000/afisareSectiuniAdministrator";

      // console.log(requestOptions);

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setSectiuni(data);
          setIndexSectiune(0);
        });
    };

    cereSectiuni();
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
            style={{
              color: themeColors.white,
              marginLeft: 20,
              marginRight: 20,
            }}
            className="ml-4 text-2xl font-bold"
          >
            Cursul de{" "}
            <Text style={{ fontStyle: "italic", color: themeColors.galben }}>
              {route.params.cursCerut}
            </Text>{" "}
            este împărțit în următoarele secțiuni:
          </Text>
        </View>

        {sectiuni && (
          <ScrollView
            style={{ height: "100%", marginTop: 20 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 300 }}
          >
            {sectiuni.map((sectiune, index) => {
              return (
                <TouchableOpacity
                  className="mx-4 p-2 mb-2 flex-row"
                  key={sectiune.id}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("LectiiAdmin", {
                      idSectiune: sectiune.id,
                    });
                  }}
                >
                  <CheckCircleIcon
                    color={themeColors.galben}
                    size="30"
                    style={{ opacity: 0.8, marginRight: 10 }}
                  />

                  <View
                    className="flex-row space-x-1"
                    style={{ marginRight: 10 }}
                  >
                    <Text
                      className="font-semibold"
                      style={{ color: themeColors.white, fontSize: 20 }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <View className="flex-1 flex justify-center pl-3 space-y-3">
                    <Text
                      style={{
                        color: themeColors.white,
                        fontSize: 20,
                        marginRight: 8,
                      }}
                      className="font-semibold"
                    >
                      {sectiune.nume}
                    </Text>
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
