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

export default function TextLectie({ route }) {
  const navigation = useNavigation();
  const [decodedJwt, setDecodedJwt] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [lectie, setLectie] = useState(null);

  const [lectieCeruta, setLectieCeruta] = useState({
    idLectieCeruta: route.params.idLectie,
  });

  useEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        setDecodedJwt(decoded);
        setIdUser(decoded.data.id);

        const requestOptions = {
          method: "POST",
          body: JSON.stringify(lectieCeruta),
          headers: { "Content-Type": "application/json" },
        };

        console.log(requestOptions);
        let input = IPv4 + ":5000/cerereLectie";

        fetch(input, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            // console.log("data: ", data);
            setLectie(data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    decodeJwt();
  }, []);

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
          </View>
          {lectie && (
            <View>
              <Text
                style={{
                  color: themeColors.galben,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 15,
                }}
                className="ml-4 italic text-3xl font-bold"
              >
                {lectie[0].nume}
              </Text>
              <ScrollView className="form space-y-2" style={{ height: "70%" }}>
                <View
                  className="mx-4 p-2 mb-2 flex-row"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    // backgroundColor: "rgba(180, 174, 232, 0.5)",
                    borderRadius: 10,
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: themeColors.white,
                      marginLeft: 15,
                      marginRight: 15,
                      marginTop: 10,
                    }}
                  >
                    {lectie[0].text_lectie}
                  </Text>
                </View>
              </ScrollView>
              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                style={{
                  width: "30%",
                  opacity: 0.8,
                  alignSelf: "flex-end",
                  marginRight: 20,
                  marginTop: 10,
                }}
                onPress={() => {
                  navigation.navigate("IntrebariLectie", {
                    lectie: lectie,
                    idUser: idUser,
                  });
                }}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Ok!
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
