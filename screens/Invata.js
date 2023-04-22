import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import CourseCardV from "../theme/CourseCardV";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const cursuriDisponibile = [
  {
    id: 1,
    title: "Bazele Programării Calculatoarelor",
    image: require("../assets/images/bazeleProgramarii.png"),
    stars: 5,
  },
  {
    id: 2,
    title: "Programare Orietată Obiect (POO)",
    image: require("../assets/images/POO.png"),
    stars: 5,
  },
  {
    id: 3,
    title: "Baze De Date",
    image: require("../assets/images/bd.png"),
    stars: 5,
  },
];

export default function Invata() {
  const navigation = useNavigation();

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
        console.log(decoded);
        setUsername(decoded.data.username);
        setZile(decoded.data.zile.toString());
        setPuncte(decoded.data.puncte.toString());
        setVieti(decoded.data.vieti.toString());
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
          <View className="mt-3 space-y-3">
            <View className="pl-4">
              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {detaliiCont.map((cat) => {
                  return (
                    <TouchableOpacity
                      key={cat}
                      className="bg-purple-100 p-3 px-4 rounded-full mr-2"
                    >
                      <Text>{cat}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView> */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                      className="bg-purple-100 p-3 px-4 rounded-full mr-2"
                    >
                      <Text>{zile} Zile ⚡</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-purple-100 p-3 px-4 rounded-full mr-2"
                    >
                      <Text>{puncte} Puncte 🚀</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-purple-100 p-3 px-4 rounded-full mr-2"
                    >
                      <Text>{vieti} Vieți 🤍</Text>
                    </TouchableOpacity>
              </ScrollView>
            </View>
            <Text
              style={{ color: themeColors.white }}
              className="ml-4 text-3xl font-bold"
            >
              Alege un curs! 📚
            </Text>
          </View>
        </View>
        <View className="mt-3 space-y-4">
          <Text
            style={{ color: themeColors.white }}
            className="ml-4 text-lg font-bold"
          >
            Cursuri disponibile 👩🏻‍💻
          </Text>
          <View className="pl-4">
            <ScrollView
              vertical
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 350 }}
            >
              {cursuriDisponibile.map((item, index) => {
                return <CourseCardV key={index} course={item} />;
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
