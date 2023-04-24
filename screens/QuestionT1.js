import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon, LightBulbIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import { cursuriCerute, nrIntrebari } from "./Antreneaza";

const detaliiCont = ["Zile ⚡", "Puncte 🚀", "Vieți 🤍"];

const intrebarePropusa = [
  {
    id: 1,
    textIntrebare:
      "Textul pentru întrebarea cu numărul 1 este acesta. Care este răspunsul corect?",
    varianta1: "Varianta 1 de răspuns",
    varianta2: "Varianta 2 de răspuns",
    varianta3: "Varianta 3 de răspuns",
    varianta4: "Varianta 4 de răspuns",
  },
];

export default function QuestionT1() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(null);

  const handlePress = (value) => {
    setSelectedValue(value);
  };

  console.log("cursuri cerute: ", cursuriCerute);
  console.log("nr intrebari", nrIntrebari);

  const [decodedJwt, setDecodedJwt] = useState(null);
  const [username, setUsername] = useState(null);
  const [zile, setZile] = useState(null);
  const [puncte, setPuncte] = useState(null);
  const [vieti, setVieti] = useState(null);

  useEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        setDecodedJwt(decoded);
        console.log("decoded: ", decoded);
        setUsername(decoded.data.username);
        setZile(decoded.data.zile.toString());
        setPuncte(decoded.data.puncte.toString());
        setVieti(decoded.data.vieti.toString());
        console.log(zile);
      } catch (error) {
        console.log(error);
      }
    };

    decodeJwt();
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
          <View className="pl-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity className="bg-purple-100 p-3 px-4 rounded-full mr-2">
                <Text>{zile} Zile ⚡</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-purple-100 p-3 px-4 rounded-full mr-2">
                <Text>{puncte} Puncte 🚀</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-purple-100 p-3 px-4 rounded-full mr-2">
                <Text>{vieti} Vieți 🤍</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View className="pl-4" style={{ alignItems: "flex-start" }}></View>
          <Text
            style={{ color: themeColors.white }}
            className="ml-4 text-3xl font-bold"
          >
            Întrebarea numărul 1 🤔
          </Text>
        </View>
        <View
          className="mx-4 p-2 mb-2 flex-row"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            // backgroundColor: "rgba(180, 174, 232, 0.5)",
            borderRadius: 10,
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <LightBulbIcon
            color={themeColors.galben}
            size="50"
            style={{ opacity: 0.8 }}
          />
          <View className="flex-1 flex justify-center pl-3 space-y-3">
            <Text
              style={{ color: themeColors.white, fontSize: 20 }}
              className="font-semibold"
            >
              {intrebarePropusa[0].textIntrebare}
            </Text>
          </View>
        </View>
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
              flexDirection: "row",
            }}
          >
            <ScrollView className="form space-y-2" style={{ width: "100%" }}>
              <Text className="text-white ml-4">Alege răspunsul corect: </Text>

              <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => handlePress("varianta1")}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <RadioButton
                    value="varianta1"
                    status={
                      selectedValue === "varianta1" ? "checked" : "unchecked"
                    }
                    onPress={() => handlePress("varianta1")}
                    color={themeColors.galben}
                  />
                  <Text style={{ color: "white", marginLeft: 10 }}>
                    {intrebarePropusa[0].varianta1}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePress("varianta2")}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <RadioButton
                    value="varianta2"
                    status={
                      selectedValue === "varianta2" ? "checked" : "unchecked"
                    }
                    onPress={() => handlePress("varianta2")}
                    color={themeColors.galben}
                  />
                  <Text style={{ color: "white", marginLeft: 10 }}>
                    {intrebarePropusa[0].varianta2}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePress("varianta3")}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <RadioButton
                    value="varianta3"
                    status={
                      selectedValue === "varianta3" ? "checked" : "unchecked"
                    }
                    onPress={() => handlePress("varianta3")}
                    color={themeColors.galben}
                  />
                  <Text style={{ color: "white", marginLeft: 10 }}>
                    {intrebarePropusa[0].varianta3}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePress("varianta4")}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <RadioButton
                    value="varianta3"
                    status={
                      selectedValue === "varianta4" ? "checked" : "unchecked"
                    }
                    onPress={() => handlePress("varianta4")}
                    color={themeColors.galben}
                  />
                  <Text style={{ color: "white", marginLeft: 10 }}>
                    {intrebarePropusa[0].varianta4}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                style={{ width: "30%", opacity: 0.8, alignSelf: "flex-end" }}
                onPress={() => {
                  console.log("ne ducem la urmatoarea intrebare");
                  navigation.navigate("QuestionT2");
                }}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Next
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
