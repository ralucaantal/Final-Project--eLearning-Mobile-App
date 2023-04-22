import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

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

export default function Antreneaza() {
  const navigation = useNavigation();
  const [selectedCursuri, setSelectedCursuri] = useState([]);
  const [selectedValue, setSelectedValue] = useState("10");

  const [switches, setSwitches] = useState(
    cursuriDisponibile.reduce((acc, curs) => {
      acc[curs.title] = false;
      return acc;
    }, {})
  );

  const handleSwitchChange = (cursTitlu) => {
    setSwitches((prevState) => ({
      ...prevState,
      [cursTitlu]: !prevState[cursTitlu],
    }));
  };

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
          <Text
            style={{ color: themeColors.white }}
            className="ml-4 text-3xl font-bold"
          >
            Cum vrei să te antrenezi azi? 💪🏻
          </Text>
        </View>
        <View className="pl-4">
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 20 }}
          >
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
              <Text style={{ fontSize: 20, color: "white", marginLeft: 4 }}>
                Alege cursurile la care vrei să te antrenezi: 👩🏻‍🏫
              </Text>
              <View
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                {cursuriDisponibile.map((curs) => (
                  <View
                    key={curs.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    <Switch
                      value={selectedCursuri.includes(curs.title)}
                      onValueChange={(value) => {
                        if (value) {
                          setSelectedCursuri([...selectedCursuri, curs.title]);
                        } else {
                          setSelectedCursuri(
                            selectedCursuri.filter((c) => c !== curs.title)
                          );
                        }
                      }}
                    />
                    <Text style={{ color: "white", marginLeft: 8 }}>
                      {curs.title}
                    </Text>
                  </View>
                ))}
              </View>

              <Text style={{ fontSize: 20, color: "white", marginLeft: 4 }}>
                Câte întrebări să fie?
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="10"
                  status={selectedValue === "10" ? "checked" : "unchecked"}
                  onPress={() => setSelectedValue("10")}
                  color={themeColors.galben}
                  uncheckedColor="white"
                />
                <Text style={{ color: "white" }}>10</Text>

                <RadioButton
                  value="15"
                  status={selectedValue === "15" ? "checked" : "unchecked"}
                  onPress={() => setSelectedValue("15")}
                  color={themeColors.galben}
                  uncheckedColor="white"
                />
                <Text style={{ color: "white" }}>15</Text>

                <RadioButton
                  value="20"
                  status={selectedValue === "20" ? "checked" : "unchecked"}
                  onPress={() => setSelectedValue("20")}
                  color={themeColors.galben}
                  uncheckedColor={themeColors.movPastel}
                />
                <Text style={{ color: "white" }}>20</Text>
              </View>

              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                style={{ width: "100%", opacity: 0.8 }}
                onPress={() => {
                  console.log("Utilizatorul a ales cum vrea sa fie quiz-ul.");
                  navigation.navigate("QuestionT1");
                }}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Generează quiz
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
        <View className="mt-3 space-y-3">
          <Text
            style={{
              color: themeColors.white,
              backgroundColor: "black",
              padding: 10,
              borderRadius: 10,
              alignSelf: "center",
            }}
            className="ml-4 text-3xl font-bold"
          >
            CodeCampus
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
