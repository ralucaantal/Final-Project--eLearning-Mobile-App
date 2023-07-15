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

export default function StatisticiUtilizatori({ route }) {
  const navigation = useNavigation();

  console.log(route.params);

  const [statistici, setStatistici] = useState(null);

  useEffect(() => {
    const cereStatistici = async () => {
      const idUser = {
        idUser: route.params.idUser,
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(idUser),
        headers: { "Content-Type": "application/json" },
      };

      let input = IPv4 + ":5000/cereStatisticiAdmin";

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setStatistici(data);
        });
    };

    cereStatistici();
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
            onPress={() => {
              navigation.goBack();
              setStatistici(null);
            }}
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
            Statistici utilizator
          </Text>
        </View>

        {statistici && (
          <ScrollView
            style={{ height: "100%", marginTop: 20 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View>
              <TouchableOpacity
                className="mx-4 p-2 mb-2 flex-column"
                style={{
                  backgroundColor: "rgba(255,255,255,0.4)",
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <Text
                  className="font-semibold"
                  style={{
                    color: themeColors.white,
                    fontSize: 20,
                    marginTop: 8,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  👨🏻‍🎓 Utilizator:{" "}
                  <Text className="italic">@{statistici[0].user_name}</Text>
                </Text>

                <View style={{ paddingLeft: 10, marginBottom: 10 }}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgba(135, 125, 250, 0.5)",
                        padding: 5,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        marginRight: 5,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "white" }}>
                        {statistici[0].zile} Zile ⚡
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgba(135, 125, 250, 0.5)",
                        padding: 5,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        marginRight: 5,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "white" }}>
                        {statistici[0].puncte} Puncte 🚀
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgba(135, 125, 250, 0.5)",
                        padding: 5,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        marginRight: 5,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "white" }}>
                        {statistici[0].vieti} Vieți 🤍
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <Text
                  className="font-semibold"
                  style={{
                    color: themeColors.white,
                    fontSize: 20,
                    marginTop: 8,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  ⚙ Email: {" "}
                  <Text className="italic">{statistici[0].email}</Text>
                </Text>
                <Text
                  className="font-semibold"
                  style={{
                    color: themeColors.white,
                    fontSize: 20,
                    marginTop: 8,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  ⚡ Data creare cont:{" "}
                  <Text className="italic">{statistici[0].data_creare}</Text>
                </Text>
                <Text
                  className="font-semibold"
                  style={{
                    color: themeColors.white,
                    fontSize: 20,
                    marginTop: 8,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  🧗🏻‍♀️ Ultima acțiune:{" "}
                  <Text className="italic">{statistici[0].ultima_actiune}</Text>
                </Text>
                <Text
                  className="font-semibold"
                  style={{
                    color: themeColors.white,
                    fontSize: 20,
                    marginTop: 8,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  🕗 Dată ultima acțiune:{" "}
                  <Text className="italic">
                    {statistici[0].data_ultima_actiune}
                  </Text>
                </Text>
                <Text
                  className="font-semibold"
                  style={{
                    color: themeColors.white,
                    fontSize: 20,
                    marginTop: 8,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  📚 Număr lecții parcurse:{" "}
                  <Text className="italic">
                    {statistici[0].nr_lectii_parcurse}
                  </Text>
                </Text>
                <Text
                  className="font-semibold"
                  style={{
                    color: themeColors.white,
                    fontSize: 20,
                    marginTop: 8,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  🎲 Număr teste rezolvate:{" "}
                  <Text className="italic">
                    {statistici[0].nr_teste_rezolvate}
                  </Text>
                </Text>
                <Text
                  className="font-semibold"
                  style={{
                    color: themeColors.white,
                    fontSize: 20,
                    marginTop: 8,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  🏆 Număr răspunsuri corecte:{" "}
                  <Text className="italic">
                    {statistici[0].nr_raspunsuri_corecte}
                  </Text>
                </Text>
                <Text
                  className="font-semibold"
                  style={{
                    color: themeColors.white,
                    fontSize: 20,
                    marginTop: 8,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  😥 Număr greșeli:{" "}
                  <Text className="italic">{statistici[0].nr_greseli}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
