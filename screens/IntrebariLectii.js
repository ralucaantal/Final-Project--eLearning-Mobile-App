import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  LightBulbIcon,
  ChatBubbleLeftIcon,
  AcademicCapIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

export default function IntrebariLectie({ route }) {
  const navigation = useNavigation();

  const [indexIntrebareCurenta, setIndexIntrebareCurenta] = useState(0);

  const texteIntrebari = route.params.lectie.map((intrebare) => {
    return [intrebare.intrebare1, intrebare.intrebare2, intrebare.intrebare3];
  });

  console.log(texteIntrebari);

  const raspunsuriCorecte = route.params.lectie.map((intrebare) => {
    return [
      intrebare.raspuns_corect1,
      intrebare.raspuns_corect2,
      intrebare.raspuns_corect3,
    ];
  });

  console.log(raspunsuriCorecte);

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
            <View className="mt-3 space-y-3">
              <Text
                style={{
                  color: themeColors.white,
                  backgroundColor: "black",
                  padding: 10,
                  borderRadius: 10,
                  alignSelf: "flex-start",
                }}
                className="ml-4 text-xl font-bold"
              >
                CodeCampus
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 15,
              color: themeColors.white,
            }}
            className="ml-4 italic text-xl font-bold"
          >
            Prin întrebările următoare se vor verifica cunoștințele dobândite
            prin parcurgerea lecției
            <Text style={{ color: themeColors.galben }}>
              {" " + (route.params && route.params.lectie[0].nume)}
            </Text>
            .
          </Text>
          <View>
            {texteIntrebari && (
              <ScrollView>
                {texteIntrebari.map(
                  (intrebare, index) =>
                    index === indexIntrebareCurenta && (
                      <View key={index}>
                        <View style={{ marginTop: 15 }}>
                          <Text
                            style={{ color: themeColors.white }}
                            className="ml-4 text-3xl font-bold"
                          >
                            Întrebarea numărul {indexIntrebareCurenta + 1} 🤔
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
                            flexDirection: "column",
                          }}
                        >
                          <AcademicCapIcon
                            color={themeColors.galben}
                            size="50"
                            style={{ opacity: 0.8, alignSelf: "center" }}
                          />
                          <View className="flex-1 flex justify-center pl-3 space-y-3">
                            <Text
                              style={{ color: themeColors.white, fontSize: 20 }}
                              className="font-semibold"
                            >
                              {intrebare[index]}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignSelf: "center" }}
                        >
                          <TouchableOpacity
                            className="py-3 rounded-xl"
                            style={{
                              width: "30%",
                              opacity: 0.8,
                              alignSelf: "flex-end",
                              marginTop: 10,
                              marginRight: 20,
                              backgroundColor: themeColors.rozPal,
                            }}
                            onPress={() => {}}
                          >
                            <Text className="font-xl font-bold text-center text-gray-700">
                              Adevărat
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            className="py-3 rounded-xl"
                            style={{
                              width: "30%",
                              opacity: 0.8,
                              alignSelf: "flex-end",
                              marginTop: 10,
                              backgroundColor: themeColors.rozPal,
                            }}
                            onPress={() => {}}
                          >
                            <Text className="font-xl font-bold text-center text-gray-700">
                              Fals
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          className="py-3 bg-yellow-400 rounded-xl"
                          style={{
                            width: "30%",
                            opacity: 0.8,
                            alignSelf: "center",
                            marginTop: 10,
                          }}
                          onPress={() => {}}
                        >
                          <Text className="font-xl font-bold text-center text-gray-700">
                            Ok!
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )
                )}
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
