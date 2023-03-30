import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDataLogin, setErrorDataLogin] = useState({ message: "" });

  const acasa = "http://192.168.1.130";
  const hotspot = "http://172.20.10.3";

  const IPv4 = acasa;

  const loginData = {
    email: "",
    password: "",
  };

  const handleLogin = async () => {
    loginData.email = email;
    loginData.password = password;

    if (loginData.email !== "" && loginData.password !== "") {
      setEmail("");
      setPassword("");

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions);
      let input = IPv4 + ":5000/login";

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Login efectuat cu succes!") {
            navigation
              .navigate("Home")
              .then(() => {
                //se navigheaza la ecranul studentului
              })
              .catch((error) => {
                console.log(error);
              });
          }

          setErrorDataLogin({ message: data.message });
        })
        .catch((error) => {
          console.log(error);
        });

      console.log("date login resetate");
      setErrorDataLogin({ message: "Te-ai logat cu succes!" });

      if (loginData.email !== "" && loginData.password !== "") {
        //se reseteaza datele completate
        console.log("Date invalide!");
        setErrorDataLogin({ message: "Date invalide!" });
        loginData.email = "";
        loginData.password = "";
      }
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value="email"
            onChangeText={setEmail}
            placeholder="Enter email"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            secureTextEntry
            value="password"
            onChangeText={setPassword}
            placeholder="Enter your password"
          />
          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700">Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            onPress={handleLogin}
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-7">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/google.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/apple.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/facebook.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
            <Text className=" text-gray-500 font-semibold">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text className="font-semibold text-yellow-500">Sign In!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}