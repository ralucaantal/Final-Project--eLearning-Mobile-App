import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  BellIcon,
  AtSymbolIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import FeatherIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import base64 from "react-native-base64";

import IPv4 from "../index";

export default function Profile() {
  const navigation = useNavigation();

  const [decodedJwt, setDecodedJwt] = useState(null);
  const [username, setUsername] = useState(null);
  const [zile, setZile] = useState(null);
  const [puncte, setPuncte] = useState(null);
  const [vieti, setVieti] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [encodedImageData, setEncodedImageData] = useState("");

  useEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        setDecodedJwt(decoded);
        console.log(decoded);
        setUsername(decoded.data.username);
        console.log(decoded.data.img);
        setAvatar(decoded.data.avatar.data);

        const imageData = new Uint8Array(
          [...avatar].map((c) => c.charCodeAt(0))
        );
        const encodedImageData = base64.fromUint8Array(imageData);
        setEncodedImageData(encodedImageData);

        const idUser = {
          idUser: decoded.data.id,
        };

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

            setZile(data[0].zile);
            setPuncte(data[0].puncte);
            setVieti(data[0].vieti);
          });
      } catch (error) {
        console.log(error);
      }
    };

    decodeJwt();
  }, [puncte, zile, vieti]);

  async function removeJwtFromStorage() {
    try {
      await AsyncStorage.removeItem("jwt");
      console.log("JWT a fost șters cu succes din Async Storage.");
    } catch (error) {
      console.log(
        "Eroare la ștergerea JWT-ului din Async Storage: ",
        error.message
      );
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
            <Image
              alt=""
              source={{ uri: `data:image/jpeg;base64,${encodedImageData}` }}
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
            <TouchableOpacity
              onPress={() => {
                // handle onPress
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
          style={{ height: 400 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 10,
            }}
            onPress={() => {
              console.log("Redirectionare spre setari profil");
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
          >
            <ChartPieIcon color={themeColors.galben} size="50" />
            <View className="flex-1 flex justify-center pl-3 space-y-3">
              <Text
                style={{ color: themeColors.white }}
                className="font-semibold"
                onPress={() => {
                  console.log("se vor afisa statisticile utilizatorului.");
                  navigation.navigate("Statistici");
                }}
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
            onPress={() => navigation.navigate("StatusIntrebari")}
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
