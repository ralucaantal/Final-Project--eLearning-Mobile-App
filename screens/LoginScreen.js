import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IPv4 from "../index";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDataLogin, setErrorDataLogin] = useState({ message: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChangeEmail = (inputText) => {
    // console.log(inputText);
    setEmail(inputText);
  };

  const handleChangePassword = (inputText) => {
    //console.log(inputText);
    setPassword(inputText);
  };

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      console.log(email);
      console.log(password);
      loginData.email = email;
      loginData.password = password;
      //setEmail("");
      //setPassword("");

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
      };

      let input = IPv4 + ":5000/login";
      console.log("input: ", input);

      try {
        const response = await fetch(input, requestOptions);
        const data = await response.json();
        console.log(data.jwt);
        if (data.message === "Login efectuat cu succes!" && data.jwt) {


          // Salvează JWT-ul în AsyncStorage

          await AsyncStorage.setItem("jwt", data.jwt);

          setErrorDataLogin({ message: "Te-ai logat cu succes........!" });
          navigation.navigate("Home");
        } else {
          setErrorDataLogin({ message: "Date invalide" });
        }
      } catch (error) {
        console.log(error);
      }

      // console.log("date login resetate");
    } else {
      console.log("Date invalide");
      setErrorDataLogin({ message: "Date invalide" });
      alert(errorDataLogin.message);
      setLoginData({ email, password });
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
        <View className="flex-1">
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
                source={require("../assets/images/login.png")}
                style={{ width: 180, height: 180 }}
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
              <Text className="text-gray-700 ml-4">Adresă De Email</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                onChangeText={handleChangeEmail}
                placeholder="emailulTău@email.com"
                style={{ opacity: 0.5 }}
              />
              <Text className="text-gray-700 ml-4">Parolă</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                secureTextEntry
                value={password}
                onChangeText={handleChangePassword}
                placeholder="**********"
                style={{ opacity: 0.5 }}
              />
              <TouchableOpacity className="flex items-end mb-5">
                <Text className="text-gray-700">Ți-ai uitat parola?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                onPress={handleLogin}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Loghează-te
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <View className="flex-row justify-center mt-7">
                <Text className=" text-gray-500 font-semibold">
                  Nu ai un cont?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text className="font-semibold text-yellow-500">
                    Înscrie-te!
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center mt-7">
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {errorDataLogin.message}
                </Text>
              </View>
            </View>
            <View className="mt-3 space-y-10">
              <Text
                style={{
                  color: themeColors.white,
                  backgroundColor: "black",
                  padding: 10,
                  borderRadius: 10,
                  alignSelf: "center",
                  marginBottom: 5,
                }}
                className="ml-4 text-3xl font-bold"
              >
                CodeCampus
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
