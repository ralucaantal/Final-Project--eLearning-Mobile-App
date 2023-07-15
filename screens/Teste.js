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

import avatar1 from "../assets/avatare/avatar1.jpg";
import avatar2 from "../assets/avatare/avatar2.jpg";
import avatar3 from "../assets/avatare/avatar3.jpg";
import avatar4 from "../assets/avatare/avatar4.jpg";
import avatar5 from "../assets/avatare/avatar5.jpg";
import avatar6 from "../assets/avatare/avatar6.jpg";
import avatar7 from "../assets/avatare/avatar7.jpg";
import avatar8 from "../assets/avatare/avatar8.jpg";
import avatar9 from "../assets/avatare/avatar9.jpg";

export default function Teste() {
  const navigation = useNavigation();

  const [teste, setTeste] = useState(null);

  const avatarMap = {
    1: avatar1,
    2: avatar2,
    3: avatar3,
    4: avatar4,
    5: avatar5,
    6: avatar6,
    7: avatar7,
    8: avatar8,
    9: avatar9,
  };

  useEffect(() => {
    const cereTesteOrganizate = async () => {
      try {
        let input = IPv4 + ":5000/testeOrganizate";

        fetch(input)
          .then((response) => response.json())
          .then((data) => {
            setTeste(data);
            console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    cereTesteOrganizate();
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
            className="ml-4 text-3xl font-bold italic"
          >
            Testele Organizate În Cadrul Aplicației 🌟
          </Text>
        </View>

        {teste && (
          <ScrollView
            style={{ height: "100%", marginTop: 20 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
          >
            {teste.map((test, index) => {
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
                  <Image
                    source={avatarMap[test.avatar]}
                    style={{ width: 50, height: 50, marginLeft: 10 }}
                    className="rounded-2xl"
                  />
                  <View className="flex-1 flex justify-center pl-3 space-y-3">
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Cod Test: {test.id}
                    </Text>
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Test organizat de: @{test.user_name}
                    </Text>
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Nr. Întrebări: {test.numar_intrebari}
                    </Text>
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      Materii: {test.materii}
                    </Text>
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      A început: {test.start}
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
