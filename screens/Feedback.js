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
import {
  ArrowLeftIcon,
  HeartIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  PuzzlePieceIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

export default function Feedback() {
  const navigation = useNavigation();

  const [decodedJwt, setDecodedJwt] = useState(null);

  const [idUtilizator, setIdUtilizator] = useState(null);

  useEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        setDecodedJwt(decoded);
        setIdUtilizator(decoded.id);
      } catch (error) {
        console.log(error);
      }
    };

    decodeJwt();
  }, []);

  const [comentariu, setComentariu] = useState(null);

  const handleChangeComentariu = (inputText) => {
    setComentariu(inputText);
  };

  const [feedback, setFeedback] = useState({
    emoji: "",
    comentariu: "",
  });

  const [emoji, setEmoji] = useState(null);

  const adaugareFeedback = async () => {
    console.log(emoji);

    if (emoji != null) {
      feedback.emoji = emoji;
      feedback.comentariu = comentariu;

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions.body);
      let input = IPv4 + ":5000/adaugareFeedback";

      try {
        const response = await fetch(input, requestOptions);
        const data = await response.json();
        console.log(data);

        if (data.message === "Feedbackul s-a adaugat cu succes!") {
          console.log("Am adaugat feedback-ul");
          punctaj();
          actualizareStatistici();
          navigation.navigate("MultumireFeedback");
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Feedback invalid");
    }
  };

  const actualizareStatistici = async () => {
    const statistici = {
      idUser: decodedJwt.data.id,
      actiune: "A oferit feedback",
    };
    //console.log(decodedJwt.data.id);
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(statistici),
      headers: { "Content-Type": "application/json" },
    };

    // console.log(requestOptions);
    let input = IPv4 + ":5000/actualizareUltimaActiune";

    const response = await fetch(input, requestOptions);
    const data = await response.json();
  };

  const punctaj = async () => {
    const punctajAdaugat = {
      puncteCastigate: 25,
      idUser: decodedJwt.data.id,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(punctajAdaugat),
      headers: { "Content-Type": "application/json" },
    };

    //console.log(requestOptions);
    let input = IPv4 + ":5000/adaugarePunctajFeedback";

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
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
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
                Ajută-ne să ne îmbunătățim aplicația! 📈
              </Text>

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
                <BookmarkIcon
                  color={themeColors.galben}
                  size="30"
                  style={{ opacity: 0.8 }}
                />
                <View className="flex-1 flex justify-center pl-3 space-y-3">
                  <Text
                    style={{ color: themeColors.white, fontSize: 18 }}
                    className="font-semibold"
                  >
                    Descrie aplicația ptrintr-un simbol:
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  marginTop: 10,
                  paddingHorizontal: 10,
                  marginRight: 7,
                  marginLeft: 7,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: 10,
                    width: "48%",
                    marginBottom: 10,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                  }}
                  onPress={() =>
                    setEmoji("Îmi place foarte mult această aplicație")
                  }
                >
                  <HeartIcon
                    color={themeColors.galben}
                    size={40}
                    style={{ opacity: 0.8 }}
                  />
                  <Text
                    style={{
                      color: themeColors.white,
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    Îmi place foarte mult această aplicație
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: 10,
                    width: "48%",
                    marginBottom: 10,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                  }}
                  onPress={() => setEmoji("Aplicația este ok")}
                >
                  <FaceSmileIcon
                    color={themeColors.galben}
                    size={40}
                    style={{ opacity: 0.8 }}
                  />
                  <Text
                    style={{
                      color: themeColors.white,
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    Aplicația este ok
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: 10,
                    width: "48%",
                    marginBottom: 10,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                  }}
                  onPress={() =>
                    setEmoji("Mai este de lucrat la această aplicație")
                  }
                >
                  <PuzzlePieceIcon
                    color={themeColors.galben}
                    size={40}
                    style={{ opacity: 0.8 }}
                  />
                  <Text
                    style={{
                      color: themeColors.white,
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    Mai este de lucrat la această aplicație
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: 10,
                    width: "48%",
                    marginBottom: 10,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                  }}
                  onPress={() =>
                    setEmoji("Nu îmi place deloc ce oferă această aplicație")
                  }
                >
                  <FaceFrownIcon
                    color={themeColors.galben}
                    size={40}
                    style={{ opacity: 0.8 }}
                  />
                  <Text
                    style={{
                      color: themeColors.white,
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    Nu îmi place deloc ce oferă această aplicație
                  </Text>
                </TouchableOpacity>
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
                <ChatBubbleBottomCenterIcon
                  color={themeColors.galben}
                  size="30"
                  style={{ opacity: 0.8 }}
                />
                <View className="flex-1 flex justify-center pl-3 space-y-3">
                  <Text
                    style={{ color: themeColors.white, fontSize: 18 }}
                    className="font-semibold"
                  >
                    Adaugă un comentariu:
                  </Text>
                </View>
              </View>
              <View
                className="mx-4 p-2 mb-2 flex-row"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder="Părerea ta aici"
                  style={{
                    width: "100%",
                    opacity: 0.5,
                    height: 50,
                  }}
                  onChangeText={handleChangeComentariu}
                  value={comentariu}
                />
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
                onPress={adaugareFeedback}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  OK!
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
