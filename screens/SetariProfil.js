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
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import FeatherIcon from "react-native-vector-icons/Feather";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

export default function SetariProfil() {
  const navigation = useNavigation();

  const [decodedJwt, setDecodedJwt] = useState(null);
  const [username, setUsername] = useState(null);
  const [zile, setZile] = useState(null);
  const [email, setEmail] = useState(null);
  const [puncte, setPuncte] = useState(null);
  const [vieti, setVieti] = useState(null);
  const [idUser, setIdUser] = useState(null);

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

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
        setEmail(decoded.data.email);
        setIdUser(decoded.data.id);
        console.log(zile);
      } catch (error) {
        console.log(error);
      }
    };

    decodeJwt();
  }, []);

  const modificaEmail = async () => {
    if (idUser && newEmai1 != "") {
      const schimbareEmail = {
        idUser: idUser,
        newEmail: newEmail,
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(schimbareEmail),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions);
      let input = IPv4 + ":5000/schimbareEmail";

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          if (data.message === "s-a actualizat cu succes!") {
            //daca primesc confirmarea ca noul utilizator e bagat in bd ma trimite pe login
            navigation.navigate("Profile");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const modificaUsername = () => {
    if (idUser && newUsername != "") {
      const schimbareUsername = {
        idUser: idUser,
        newUsername: newUsername,
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(schimbareUsername),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions);
      let input = IPv4 + ":5000/schimbareUsername";

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          if (data.message === "s-a actualizat cu succes!") {
            setDecodedJwt(jwtDecode(data.jwt));
            navigation.navigate("Profile");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const modificaParola = () => {
    if (
      idUser &&
      newPassword != "" &&
      oldPassword != "" &&
      newPassword === oldPassword
    ) {
      const schimbareParola = {
        idUser: idUser,
        newPassword: newPassword,
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(schimbareParola),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions);
      let input = IPv4 + ":5000/schimbareParola";

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          if (data.message === "s-a actualizat cu succes!") {
            setDecodedJwt(jwtDecode(data.jwt));
            navigation.navigate("Profile");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChangePassword = (inputText) => {
    //console.log(inputText);
    setNewPassword(inputText);
  };

  const handleChangeEmail = (inputText) => {
    //console.log(inputText);
    setNewEmail(inputText);
  };

  const handleChangeUsername = (inputText) => {
    //console.log(inputText);
    setNewUsername(inputText);
  };

  const handleChangeOldPassword = (inputText) => {
    //console.log(inputText);
    setOldPassword(inputText);
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
            <Text
              style={{ color: themeColors.white }}
              className="ml-4 text-3xl font-bold"
            >
              Setări profil ⚙
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
            <View
              style={{
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Image
                  alt=""
                  source={require("../assets/images/avatar.jpg")}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 9999,
                    borderWidth: 1,
                    borderColor: "transparent",
                    alignSelf: "center",
                    backgroundColor: "transparent",
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
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
              </View>
              <View className="mt-3 space-y-4" style={{ alignItems: "center" }}>
                <Text
                  className="ml-4 text-lg font-bold"
                  style={{ color: themeColors.white, textAlign: "center" }}
                >
                  @<Text style={{ fontStyle: "italic" }}>{username}</Text>
                </Text>
              </View>
            </View>
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
                <Text className="text-white ml-4">Username</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder={`@${username}`}
                  style={{ width: "100%", opacity: 0.5 }}
                  onChangeText={handleChangeUsername}
                />
                <TouchableOpacity
                  className="py-3 bg-yellow-400 rounded-xl"
                  style={{ width: "100%", opacity: 0.8 }}
                  onPress={modificaUsername}
                >
                  <Text className="font-xl font-bold text-center text-gray-700">
                    Modifică username
                  </Text>
                </TouchableOpacity>
                <Text className="text-white ml-4">Adresă De Email</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder={email}
                  style={{ width: "100%", opacity: 0.5 }}
                  onChangeText={handleChangeEmail}
                />
                <TouchableOpacity
                  className="py-3 bg-yellow-400 rounded-xl"
                  style={{ width: "100%", opacity: 0.8 }}
                  onPress={modificaEmail}
                >
                  <Text className="font-xl font-bold text-center text-gray-700">
                    Modifică adresă de email
                  </Text>
                </TouchableOpacity>
                {/* <Text className="text-white ml-4">Număr de telefon</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder={`+4${User.nrTelefon}`}
                  style={{ width: "100%", opacity: 0.5 }}
                /> */}
                <Text className="text-white ml-4">Parolă veche</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder="* * * * * * * * * *"
                  style={{ width: "100%", opacity: 0.5 }}
                  onChangeText={handleChangeOldPassword}
                />
                <Text className="text-white ml-4">Parolă nouă</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder="* * * * * * * * * *"
                  style={{ width: "100%", opacity: 0.5 }}
                  onChangeText={handleChangePassword}
                />
                <TouchableOpacity
                  className="py-3 bg-yellow-400 rounded-xl"
                  style={{ width: "100%", opacity: 0.8 }}
                  onPress={modificaParola}
                >
                  <Text className="font-xl font-bold text-center text-gray-700">
                    Modifică parolă
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
