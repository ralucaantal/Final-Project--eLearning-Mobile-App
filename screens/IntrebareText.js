import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";
import { Alert } from "react-native";

export default function IntrebareText() {
  const navigation = useNavigation();

  const [textIntrebare, setTextIntrebare] = useState(null);

  const [varianta1, setVarianta1] = useState("");
  const [varianta2, setVarianta2] = useState("");
  const [varianta3, setVarianta3] = useState("");
  const [varianta4, setVarianta4] = useState("");
  const [idUtilizator, setIdUtilizator] = useState("");

  const [raspunsCorect, setRaspunsCorect] = useState("");

  const [materie, setMaterie] = useState("BPC");

  const [token, setToken] = useState(null);
  const [decodedJwt, setDecodedJwt] = useState(null);

  const [intrebare, setIntrebare] = useState({
    textIntrebare: "",
    raspunsCorect: "",
    materie: "",
    idUtilizator: "",
  });

  useEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        console.log(jwtDecode(jwt));
        setDecodedJwt(decoded);
        setIdUtilizator(decoded.id);
      } catch (error) {
        console.log(error);
      }
    };

    decodeJwt();
  }, []);

  const handleChangeTextIntrebare = (inputText) => {
    setTextIntrebare(inputText);
  };

  const handleChangeRaspunsCorect = (inputText) => {
    setRaspunsCorect(inputText);
  };

  const adaugareIntrebare = async () => {
    if (textIntrebare != "" && raspunsCorect != "") {
      intrebare.textIntrebare = textIntrebare;
      intrebare.raspunsCorect = raspunsCorect;
      intrebare.idUtilizator = decodedJwt.data.id;

      //console.log(decodedJwt.id);

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(intrebare),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions.body);
      let input = IPv4 + ":5000/adaugareIntrebareText";

      try {
        const response = await fetch(input, requestOptions);
        const data = await response.json();
        console.log(data);

        if (data.message === "Intrebarea s-a adaugat cu succes!") {
          console.log("Am adaugat intrebarea");
          punctaj();
          navigation.navigate("SuccesPropunereIntrebare", {
            idUser: decodedJwt.data.id,
            tipIntrebare: "text",
          });
        } else {
        }
      } catch (error) {
        console.log(error);
      }

      setTextIntrebare(null);
      setRaspunsCorect(null);
      setMaterie(null);
    } else {
      console.log("Date invalide");
      console.log(decodedJwt.data.id);
    }
  };

  const punctaj = async () => {
    const punctajAdaugat = {
      puncteCastigate: 100,
      idUser: decodedJwt.data.id,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(punctajAdaugat),
      headers: { "Content-Type": "application/json" },
    };

    //console.log(requestOptions);
    let input = IPv4 + ":5000/adaugarePunctajPropunereIntrebare";

    const response = await fetch(input, requestOptions);
    const data = await response.json();

    await AsyncStorage.setItem("jwt", data.jwt);
  };

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
                className="ml-4 text-3xl font-bold"
              >
                CodeCampus
              </Text>
            </View>
            <Text
              style={{ color: themeColors.white }}
              className="ml-4 text-3xl font-bold"
            >
              Propune o întrebare nouă de tip text! 📑
            </Text>
            <View
              className="mx-4 p-2 mb-2 flex-row"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                // marginTop: 60,
                height: "68%",
              }}
            >
              <ScrollView
                className="form space-y-2"
                style={{ width: "100%", height: "100%" }}
              >
                <View
                  className="flex-1 flex justify-center pl-3 space-y-3"
                  style={{ marginTop: 90 }}
                >
                  <Text
                    style={{ color: themeColors.white, fontSize: 20 }}
                    className="font-semibold"
                  >
                    Care este textul întrebării?
                  </Text>

                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="Textul intrebării"
                    style={{
                      width: "97%",
                      height: "50%",
                      opacity: 0.5,
                    }}
                    onChangeText={handleChangeTextIntrebare}
                    value={textIntrebare}
                  />
                  <Text
                    style={{ color: themeColors.white, fontSize: 20 }}
                    className="font-semibold"
                  >
                    Răspunsul corect
                  </Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="Răspunsul corect"
                    style={{
                      width: "97%",
                      height: "70%",
                      opacity: 0.5,
                    }}
                    onChangeText={handleChangeRaspunsCorect}
                    value={raspunsCorect}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            style={{
              width: "30%",
              opacity: 0.8,
              alignSelf: "flex-end",
              marginRight: 25,
              marginBottom: -70,
            }}
            onPress={adaugareIntrebare}
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              OK!
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
