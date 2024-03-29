import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  BellIcon,
  AtSymbolIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  XMarkIcon,
  HeartIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import FeatherIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import IPv4 from "../index";

import { useIsFocused } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [decodedJwt, setDecodedJwt] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [zile, setZile] = useState(null);
  const [puncte, setPuncte] = useState(null);
  const [vieti, setVieti] = useState(null);
  const [avatar, setAvatar] = useState(1);
  const [idUser, setIdUser] = useState(null);

  const [sursaImagine, setSursaImagine] = useState(null);

  useFocusEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        setDecodedJwt(decoded);
        setUsername(decoded.data.username);
        setAvatar(decoded.data.avatar);
        setZile(decoded.data.zile);
        setPuncte(decoded.data.puncte);
        setVieti(decoded.data.vieti);
        setIdUser(decoded.data.id);

        if (avatar == 1)
          setSursaImagine(require("../assets/avatare/avatar1.jpg"));
        else if (avatar == 2)
          setSursaImagine(require("../assets/avatare/avatar2.jpg"));
        else if (avatar == 3)
          setSursaImagine(require("../assets/avatare/avatar3.jpg"));
        else if (avatar == 4)
          setSursaImagine(require("../assets/avatare/avatar4.jpg"));
        else if (avatar == 5)
          setSursaImagine(require("../assets/avatare/avatar5.jpg"));
        else if (avatar == 6)
          setSursaImagine(require("../assets/avatare/avatar6.jpg"));
        else if (avatar == 7)
          setSursaImagine(require("../assets/avatare/avatar7.jpg"));
        else if (avatar == 8)
          setSursaImagine(require("../assets/avatare/avatar8.jpg"));
        else if (avatar == 9)
          setSursaImagine(require("../assets/avatare/avatar9.jpg"));
      } catch (error) {
        console.log(error);
      }
    };

    async function fetchData() {
      //console.log("---------------------------------------------------");
      //console.log("am intrat in useFocusEffect");
      if (token != (await AsyncStorage.getItem("jwt"))) {
        //decodeJwt();
        // console.log("tokenuri diferite");
        decodeJwt();
        setToken(await AsyncStorage.getItem("jwt"));
      }
      //console.log(await AsyncStorage.getItem("jwt"));
      //console.log("---------------------------------------------------");
    }
    fetchData();
  });

  async function removeJwtFromStorage() {
    try {
      await AsyncStorage.removeItem("jwt");
      // console.log("JWT a fost șters cu succes din Async Storage.");
    } catch (error) {
      // console.log(
      //   "Eroare la ștergerea JWT-ului din Async Storage: ",
      //   error.message
      // );
    }
  }

  return (
    <LinearGradient
      colors={["rgba(135, 125, 250, 0.9)", "rgba(180, 174, 232, 0.7)"]}
      className="w-full flex-1"
    >
      <SafeAreaView style={{ flex: 1, overflow: "hidden" }}>
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
            style={{ color: themeColors.white, textAlign: "center" }}
            className="ml-4 text-3xl font-bold"
          >
            Profil 😎
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
          <View
            style={{
              padding: 24,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {sursaImagine && (
              <Image
                source={sursaImagine}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 9999,
                  borderWidth: 1,
                  borderColor: "transparent",
                  marginTop: -36,
                  alignSelf: "center",
                  backgroundColor: "transparent",
                }}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                // handle onPress
                navigation.navigate("ChooseAvatar");
              }}
            >
              <View
                style={{
                  position: "absolute",
                  right: -4,
                  bottom: -10,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: 9999,
                  backgroundColor: themeColors.rozPal,
                }}
              >
                <FeatherIcon
                  color={themeColors.white}
                  name="edit-3"
                  size={15}
                />
              </View>
            </TouchableOpacity>
            <View className="mt-3 space-y-4">
              <Text
                className="ml-4 text-lg font-bold"
                style={{ color: themeColors.white, textAlign: "center" }}
              >
                @<Text style={{ fontStyle: "italic" }}>{username}</Text>
              </Text>
            </View>
          </View>
          <View className="pl-4" style={{ alignItems: "center" }}>
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
        </ScrollView>
        <ScrollView
          style={{ height: 500 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("SetariProfil");
            }}
          >
            <AtSymbolIcon color={themeColors.galben} size="50" />
            <View className="flex-1 flex justify-center pl-3 space-y-3">
              <Text
                style={{ color: themeColors.white }}
                className="font-semibold"
              >
                Setări profil
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 10,
            }}
            onPress={() => {
              console.log("se vor afisa statisticile utilizatorului.");
              navigation.navigate("Statistici", { idUser: idUser });
            }}
          >
            <ChartPieIcon color={themeColors.galben} size="50" />
            <View className="flex-1 flex justify-center pl-3 space-y-3">
              <Text
                style={{ color: themeColors.white }}
                className="font-semibold"
              >
                Statistici utilizator
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 10,
            }}
            onPress={() => {
              console.log("se va afisa topul utilizatorilor aplicatiei.");
              navigation.navigate("Top");
            }}
          >
            <ClipboardDocumentListIcon color={themeColors.galben} size="50" />
            <View className="flex-1 flex justify-center pl-3 space-y-3">
              <Text
                style={{ color: themeColors.white }}
                className="font-semibold"
              >
                Top utilizatori
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 10,
            }}
            onPress={() => {
              if (idUser)
                navigation.navigate("StatusIntrebari", { idUser: idUser });
            }}
          >
            <ClockIcon color={themeColors.galben} size="50" />
            <View className="flex-1 flex justify-center pl-3 space-y-3">
              <Text
                style={{ color: themeColors.white }}
                className="font-semibold"
              >
                Status întrebări propuse
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("MagazinVieti");
            }}
          >
            <HeartIcon color={themeColors.galben} size="50" />

            <View className="flex-1 flex justify-center pl-3 space-y-3">
              <Text
                style={{ color: themeColors.white }}
                className="font-semibold"
              >
                Magazin de vieți
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("Welcome");
              removeJwtFromStorage();
              console.log("m-am delogat");
            }}
          >
            <XMarkIcon color={themeColors.galben} size="50" />
            <View className="flex-1 flex justify-center pl-3 space-y-3">
              <Text
                style={{ color: themeColors.white }}
                className="font-semibold"
              >
                Deloghează-te
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        {/* <View className="mt-3 space-y-3">
          <Text
            style={{
              color: themeColors.white,
              backgroundColor: "black",
              padding: 10,
              borderRadius: 10,
              alignSelf: "center",
            }}
            className="ml-4 text-xl font-bold"
          >
            CodeCampus
          </Text>
        </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
}
