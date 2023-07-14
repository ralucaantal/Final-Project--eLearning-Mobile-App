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
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

export default function Question({ route }) {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(null);

  const [nrIntrebari, setNrIntrebari] = useState(0);
  const [materiiCerute, setMateriiCerute] = useState(null);

  const [indexIntrebareCurenta, setIndexIntrebareCurenta] = useState(0);

  const [punctajCastigat, setPunctajCatigat] = useState(0);

  const handlePress = (value) => {
    setSelectedValue(value);
  };

  const [decodedJwt, setDecodedJwt] = useState(null);
  const [username, setUsername] = useState(null);
  const [zile, setZile] = useState(null);
  const [puncte, setPuncte] = useState(null);
  const [vieti, setVieti] = useState(null);

  const [intrebariBD, setIntrebariBD] = useState(null);

  const [quizData, setQuizData] = useState({
    nrIntrebari: route.params.nrIntrebari,
    materiiCerute: route.params.cursuriCerute,
  });

  const [greseli, setGreseli] = useState(0);
  const [corecte, setCorecte] = useState(0);

  const [raspunsText, setRaspunsText] = useState("");
  // let counter = 0;

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

        setNrIntrebari(route.params.nrIntrebari);
        setMateriiCerute(route.params.cursuriCerute);
        // console.log("cursuri cerute: ", route.params.cursuriCerute);
        // console.log("nr intrebari", route.params.nrIntrebari);

        // console.log(quizData);

        const requestOptions = {
          method: "POST",
          body: JSON.stringify(quizData),
          headers: { "Content-Type": "application/json" },
        };

        console.log(requestOptions);
        let input = IPv4 + ":5000/trainingQuiz";

        // console.log(requestOptions);

        fetch(input, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            // console.log("data: ", data);

            setIntrebariBD(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    decodeJwt();
  }, []);

  // console.log(intrebariBD);
  const handleChangeText = (inputText) => {
    setRaspunsText(inputText);
  };

  const verificareRaspunsText = (raspuns, raspunsCorect) => {
    setRaspunsText("");
    console.log(raspuns);

    const postData = {
      raspunsText: raspuns.replace(/`/g, "'"),
      raspunsCorect: raspunsCorect,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    };

    console.log(requestOptions);
    let input = IPv4 + ":5000/verificareRaspunsText";

    fetch(input, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        if (data.message === "Raspuns corect!") {
          setPunctajCatigat(punctajCastigat + 100);
          setCorecte(corecte + 1);
        } else setGreseli(greseli + 1);
      });
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
            <View className="pl-4" style={{ marginBottom: 10 }}>
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
          {intrebariBD && (
            <ScrollView style={{ marginBottom: 200 }}>
              {intrebariBD.map(
                (intrebare, index) =>
                  index === indexIntrebareCurenta && (
                    <View key={intrebare.id}>
                      <View>
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
                            flexDirection: "row",
                          }}
                        >
                          {intrebare.tip_intrebare === "GRILA" && (
                            <LightBulbIcon
                              color={themeColors.galben}
                              size="50"
                              style={{ opacity: 0.7 }}
                            />
                          )}
                          {intrebare.tip_intrebare === "TEXT" && (
                            <ChatBubbleLeftIcon
                              color={themeColors.galben}
                              size="50"
                              style={{ opacity: 0.7 }}
                            />
                          )}
                          <View className="flex-1 flex justify-center pl-3 space-y-3">
                            <Text
                              style={{ color: themeColors.white, fontSize: 20 }}
                              className="font-semibold"
                            >
                              {intrebare.text_intrebare}
                            </Text>
                          </View>
                        </View>
                        {intrebare.tip_intrebare == "TEXT" && (
                          <ScrollView
                            style={{ marginTop: 20 }}
                            showsVerticalScrollIndicator={false}
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
                              <ScrollView
                                className="form space-y-2"
                                style={{ width: "100%" }}
                              >
                                <Text className="text-white ml-4 text-xl font-bold">
                                  Scrie rezolvarea:{" "}
                                </Text>

                                <TextInput
                                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                  placeholder="Rezolvarea ta aici"
                                  style={{
                                    width: "100%",
                                    opacity: 0.5,
                                    height: 100,
                                  }}
                                  onChangeText={handleChangeText}
                                  value={raspunsText}
                                />

                                <TouchableOpacity
                                  className="py-3 bg-yellow-400 rounded-xl"
                                  style={{
                                    width: "30%",
                                    opacity: 0.8,
                                    alignSelf: "flex-end",
                                  }}
                                  onPress={() => {
                                    verificareRaspunsText(
                                      raspunsText,
                                      intrebare.raspuns_corect
                                    );

                                    setIndexIntrebareCurenta(
                                      indexIntrebareCurenta + 1
                                    );
                                    // counter++;

                                    if (
                                      indexIntrebareCurenta + 1 ==
                                      quizData.nrIntrebari
                                    ) {
                                      navigation.navigate("FinalQuiz", {
                                        punctajCastigat: punctajCastigat,
                                        idUtilizator: decodedJwt.data.id,
                                        corecte: corecte,
                                        greseli: greseli,
                                      });
                                    }
                                  }}
                                >
                                  <Text className="font-xl font-bold text-center text-gray-700">
                                    Next
                                  </Text>
                                </TouchableOpacity>
                              </ScrollView>
                            </View>
                          </ScrollView>
                        )}
                        {intrebare.tip_intrebare == "GRILA" && (
                          <ScrollView
                            style={{ marginTop: 20 }}
                            showsVerticalScrollIndicator={false}
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
                              <ScrollView
                                className="form space-y-2"
                                style={{ width: "100%" }}
                              >
                                <Text className="text-white ml-4 text-xl font-bold">
                                  Alege răspunsul corect:{" "}
                                </Text>

                                <View style={{ marginTop: 10 }}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      handlePress(intrebare.varianta1)
                                    }
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginBottom: 20,
                                    }}
                                  >
                                    <RadioButton
                                      value={intrebare.varianta1}
                                      status={
                                        selectedValue === intrebare.varianta1
                                          ? "checked"
                                          : "unchecked"
                                      }
                                      onPress={() =>
                                        handlePress(intrebare.varianta1)
                                      }
                                      color={themeColors.galben}
                                    />
                                    <Text
                                      style={{
                                        color: "white",
                                        marginLeft: 10,
                                        flexWrap: "wrap",
                                        maxWidth: "80%",
                                      }}
                                    >
                                      {intrebare.varianta1}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      handlePress(intrebare.varianta2)
                                    }
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginBottom: 20,
                                    }}
                                  >
                                    <RadioButton
                                      value={intrebare.varianta2}
                                      status={
                                        selectedValue === intrebare.varianta2
                                          ? "checked"
                                          : "unchecked"
                                      }
                                      onPress={() =>
                                        handlePress(intrebare.varianta2)
                                      }
                                      color={themeColors.galben}
                                    />
                                    <Text
                                      style={{
                                        color: "white",
                                        marginLeft: 10,
                                        flexWrap: "wrap",
                                        maxWidth: "80%",
                                      }}
                                    >
                                      {intrebare.varianta2}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      handlePress(intrebare.varianta3)
                                    }
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginBottom: 20,
                                    }}
                                  >
                                    <RadioButton
                                      value={intrebare.varianta3}
                                      status={
                                        selectedValue === intrebare.varianta3
                                          ? "checked"
                                          : "unchecked"
                                      }
                                      onPress={() =>
                                        handlePress(intrebare.varianta3)
                                      }
                                      color={themeColors.galben}
                                    />
                                    <Text
                                      style={{
                                        color: "white",
                                        marginLeft: 10,
                                        flexWrap: "wrap",
                                        maxWidth: "80%",
                                      }}
                                    >
                                      {intrebare.varianta3}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      handlePress(intrebare.varianta4)
                                    }
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginBottom: 20,
                                    }}
                                  >
                                    <RadioButton
                                      value={intrebare.varianta4}
                                      status={
                                        selectedValue === intrebare.varianta4
                                          ? "checked"
                                          : "unchecked"
                                      }
                                      onPress={() =>
                                        handlePress(intrebare.varianta4)
                                      }
                                      color={themeColors.galben}
                                    />
                                    <Text
                                      style={{
                                        color: "white",
                                        marginLeft: 10,
                                        flexWrap: "wrap",
                                        maxWidth: "80%",
                                      }}
                                    >
                                      {intrebare.varianta4}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                  className="py-3 bg-yellow-400 rounded-xl"
                                  style={{
                                    width: "30%",
                                    opacity: 0.8,
                                    alignSelf: "flex-end",
                                  }}
                                  onPress={() => {
                                    if (
                                      selectedValue === intrebare.raspuns_corect
                                    ) {
                                      setPunctajCatigat(punctajCastigat + 50);
                                      setCorecte(corecte + 1);
                                    } else setGreseli(greseli + 1);

                                    setIndexIntrebareCurenta(
                                      indexIntrebareCurenta + 1
                                    );
                                    // counter++;
                                    console.log(
                                      "ne ducem la urmatoarea intrebare"
                                    );
                                    if (
                                      indexIntrebareCurenta + 1 ==
                                      quizData.nrIntrebari
                                    ) {
                                      console.log(intrebariBD.length);
                                      navigation.navigate("FinalQuiz", {
                                        punctajCastigat: punctajCastigat,
                                        idUtilizator: decodedJwt.data.id,
                                        corecte: corecte,
                                        greseli: greseli,
                                      });
                                    }
                                  }}
                                >
                                  <Text className="font-xl font-bold text-center text-gray-700">
                                    Next
                                  </Text>
                                </TouchableOpacity>
                              </ScrollView>
                            </View>
                          </ScrollView>
                        )}
                      </View>
                    </View>
                  )
              )}
            </ScrollView>
          )}
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
