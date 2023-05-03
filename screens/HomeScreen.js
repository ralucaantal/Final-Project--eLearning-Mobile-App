import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bars3CenterLeftIcon,
  BellIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import CourseCard from "../theme/CourseCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

const detaliiCont = ["Zile ⚡", "Puncte 🚀", "Vieți 🤍"];

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

const actiuni = [
  {
    id: 1,
    title: "Învață! 📚",
    description: "Selectează un curs și învață ceva nou!",
    image: require("../assets/images/learn.png"),
  },
  {
    id: 2,
    title: "Antrenează-te! 💡",
    description: "Exersează ceea ce ai învățaț pănă acum rezolvând quiz-uri!",
    image: require("../assets/images/antreneaza.png"),
  },
  {
    id: 3,
    title: "Organizează un quiz! 🎳",
    description:
      "Alege materiile, numărul de întrebări, și trimite-le colegilor codul generat pentru a vă antrena împreună!",
    image: require("../assets/images/organizeaza.png"),
  },
  {
    id: 4,
    title: "Înscrie-te la un quiz! 🏋🏻‍♂️",
    description:
      "Tastează codul generat de unul dintre prietenii tăi și antrenați-vă împreună în cadrul unui quiz!",
    image: require("../assets/images/inscrie.png"),
  },
  {
    id: 5,
    title: "Ajută-ne să ne îmbunătățim aplicația! 🙌🏻",
    description:
      "Propune întrebări noi pentru quiz-uri sau pur și simplu oferă-ne un review!",
    image: require("../assets/images/review.png"),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeDetail, setActiveDetail] = useState("Zile ⚡");

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

        const idUser = 
        {
          idUser: decoded.data.id
        }

        console.log("idUser: ", idUser);

        const requestOptions = {
          method: "POST",
          body: JSON.stringify(idUser),
          headers: { "Content-Type": "application/json" },
        };

        console.log(requestOptions);
        let input = IPv4 + ":5000/puncteZileVieti";

        fetch(input, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log("data: ", data);

            console.log(data[0].zile);

            setZile(data[0].zile);
            setPuncte(data[0].puncte);
            setVieti(data[0].vieti);
          });

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
          <View className="flex-row justify-between items-center px-4">
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              {/* <Bars3CenterLeftIcon color={themeColors.galben} size="32" /> */}
              <UserCircleIcon color={themeColors.galben} size="32" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <BellIcon color={themeColors.galben} size="28" />
            </TouchableOpacity>
          </View>
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

            <Text
              style={{ color: themeColors.white }}
              className="ml-4 text-2xl font-bold"
            >
              Bine ai venit,{" "}
              <Text style={{ fontStyle: "italic" }}>@{username}</Text>! ✨
            </Text>
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
          </View>
          <View className="mt-3 space-y-4">
            <Text
              style={{ color: themeColors.white }}
              className="ml-4 text-lg font-bold"
            >
              Cursuri disponibile 👩🏻‍💻
            </Text>
            <View className="pl-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {cursuriDisponibile.map((item, index) => {
                  return <CourseCard key={index} course={item} />;
                })}
              </ScrollView>
            </View>
          </View>
        </View>
        <View className="mt-3">
          <View className="flex-row justify-between mb-2">
            <Text
              style={{ color: themeColors.white }}
              className="ml-4 text-lg font-bold"
            >
              Ce poți face? 🤷🏻‍♀️
            </Text>
          </View>
          <ScrollView
            style={{ height: 320 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {actiuni.map((actiune, index) => {
              return (
                <TouchableOpacity
                  className="mx-4 p-2 mb-2 flex-row"
                  key={index}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    console.log("Ai apasat pe actiunea cu nr: ", actiune.id);
                    if (actiune.id === 1) {
                      navigation.navigate("Invata");
                    } else if (actiune.id === 2) {
                      navigation.navigate("Antreneaza");
                    } else if (actiune.id === 3) {
                      navigation.navigate("Organizeaza");
                    } else if (actiune.id === 4) {
                      navigation.navigate("InscriereQuiz");
                    } else if (actiune.id === 5) {
                      navigation.navigate("Ajuta");
                    }
                  }}
                >
                  <Image
                    source={actiune.image}
                    style={{ width: 80, height: 80, backgroundColor: "black" }}
                    className="rounded-2xl"
                  />
                  <View className="flex-1 flex justify-center pl-3 space-y-3">
                    <Text
                      style={{ color: themeColors.white }}
                      className="font-semibold"
                    >
                      {actiune.title}
                    </Text>
                    <View className="flex-row space-x-1">
                      <Text
                        // style={{ color: themeColors.galben }}
                        className="text-xs text-gray-700"
                      >
                        {actiune.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
