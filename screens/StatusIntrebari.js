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

export default function StatusIntrebari() {
  const navigation = useNavigation();

  const [intrebari, setIntrebari] = useState(null);

  const [idUser, setIdUser] = useState(null);

  const [decodedJwt, setDecodedJwt] = useState(null);

  useEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        setDecodedJwt(decoded);
        setIdUser(decoded.data.id);
      } catch (error) {
        console.log(error);
      }
    };

    const statusIntrebari = async () => {
      await decodeJwt();

      try {
        const utilizator = { idUser: idUser };

        const requestOptions = {
          method: "POST",
          body: JSON.stringify(utilizator),
          headers: { "Content-Type": "application/json" },
        };

        let input = IPv4 + ":5000/statusIntrebariPropuse";

        fetch(input, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setIntrebari(data);
          });
      } catch (error) {
        console.log(error);
      }

      if (intrebari != null) console.log(intrebari);
    };

    statusIntrebari();
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
              className="ml-4 text-xl font-bold"
            >
              CodeCampus
            </Text>
          </View>
          <Text
            style={{ color: themeColors.white }}
            className="ml-4 text-4xl font-bold"
          >
            Status întrebări propuse 🧐❔
          </Text>
        </View>

       {intrebari && <ScrollView
          style={{ height: "100%", marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200 }}
        >
          
        </ScrollView>}
      </SafeAreaView>
    </LinearGradient>
  );
}
