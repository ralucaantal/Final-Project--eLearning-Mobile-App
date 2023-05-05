import { View, Text, Image, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import IPv4 from "../index";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDataRegister, setErrorDataRegister] = useState({ message: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChangeUsername = (inputText) => {
    // console.log(inputText);
    setUsername(inputText);
  };

  const handleChangeEmail = (inputText) => {
    // console.log(inputText);
    setEmail(inputText);
  };

  const handleChangePassword = (inputText) => {
    //console.log(inputText);
    setPassword(inputText);
  };

  const handleRegister = async () => {
    if (email !== "" && password !== "" && username !== "") {
      console.log(email);
      console.log(password);
      registerData.email = email;
      registerData.password = password;
      registerData.username = username;

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions);
      let input = IPv4 + ":5000/register";

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setErrorDataRegister({ message: data.message });
          if (data.message === "s-a adaugat cu succes!") {
            //daca primesc confirmarea ca noul utilizator e bagat in bd ma trimite pe login
            navigation.navigate("Welcome");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrorDataRegister({ message: "Date invalide!" });
      registerData.email = "";
      registerData.password = "";
      registerData.username = "";
      setRegisterData({ username, email, password });
    }
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
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              className="flex-row justify-between items-center px-4"
              onPress={() => navigation.goBack()}
            >
              <ArrowLeftIcon color={themeColors.galben} size="30" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/signup.png")}
              style={{ width: 165, height: 140 }}
            />
          </View>
        </SafeAreaView>
        <View
          className="flex-1 px-8 pt-8"
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            backgroundColor: "rgba(255,255,255,0.4)",
          }}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Username</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={username}
              onChangeText={handleChangeUsername}
              placeholder="@username"
              style={{ opacity: 0.5 }}
            />
            <Text className="text-gray-700 ml-4">Adresa De Email</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={email}
              onChangeText={handleChangeEmail}
              placeholder="emailulTău@email.com"
              style={{ opacity: 0.5 }}
            />
            <Text className="text-gray-700 ml-4">Parolă</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              value={password}
              onChangeText={handleChangePassword}
              placeholder="**********"
              style={{ opacity: 0.5 }}
            />
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              onPress={handleRegister}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Înscrie-te
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View className="flex-row justify-center mt-7">
              <Text className=" text-gray-500 font-semibold">
                Ai deja un cont?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="font-semibold text-yellow-500">
                  Loghează-te!
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-7">
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: themeColors.gri,
                  textAlign: "center",
                }}
              >
                {errorDataRegister.message}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
