import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  LightBulbIcon,
  ChatBubbleLeftIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";
import { StyleSheet } from "react-native";

export default function MagazinVieti({ route }) {
  const navigation = useNavigation();

  const [token, setToken] = useState(null);
  const [decodedJwt, setDecodedJwt] = useState(null);
  const [username, setUsername] = useState(null);
  const [zile, setZile] = useState(null);
  const [puncte, setPuncte] = useState(null);
  const [vieti, setVieti] = useState(null);
  const [id, setId] = useState(null);

  useFocusEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        setDecodedJwt(decoded);

        setUsername(decoded.data.username);
        setId(decoded.data.id);

        setZile(decoded.data.zile);
        setPuncte(decoded.data.puncte);
        setVieti(decoded.data.vieti);
      } catch (error) {
        console.log(error);
      }
    };

    async function fetchData() {
      if (token != (await AsyncStorage.getItem("jwt"))) {
        //decodeJwt();
        decodeJwt();
        setToken(await AsyncStorage.getItem("jwt"));
      }
      //console.log(await AsyncStorage.getItem("jwt"));
    }
    fetchData();
  });

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
              className="ml-4 text-2xl font-bold"
            >
              CodeCampus
            </Text>
          </View>
          <Text
            style={{ color: themeColors.white }}
            className="ml-4 text-4xl font-bold"
          >
            Magazin de vieți 🤍
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
      </SafeAreaView>
    </LinearGradient>
  );
}
