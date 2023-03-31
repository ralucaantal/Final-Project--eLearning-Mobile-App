import { View, Text, Image, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDataRegister, setErrorDataRegister] = useState({ message: "" });
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const acasa = "http://192.168.1.130";
  const hotspot = "http://172.20.10.3";

  const IPv4 = "http://192.168.1.130";

  const handleChangeFullName = (inputText) => {
    // console.log(inputText);
    setFullName(inputText);
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
    if (email !== "" && password !== "" && fullName !== "") {
      console.log(email);
      console.log(password);
      registerData.email = email;
      registerData.password = password;
      registerData.fullName = fullName;

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
      registerData.fullName = "";
      setRegisterData({ fullName, email, password });
    }
  };

  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior={"padding"}
      style={{ flex: 1 }}
    >
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
              source={require("../assets/images/signup.png")}
              style={{ width: 165, height: 110 }}
            />
          </View>
        </SafeAreaView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={fullName}
              onChangeText={handleChangeFullName}
              placeholder="Enter Your Name"
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={email}
              onChangeText={handleChangeEmail}
              placeholder="Enter email"
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              value={password}
              onChangeText={handleChangePassword}
              placeholder="Enter your password"
            />
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              onPress={handleRegister}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Sign Up
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
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="font-semibold text-yellow-500">Login!</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-7">
              <Text className=" text-gray-500 font-semibold">
                {errorDataRegister.message}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
