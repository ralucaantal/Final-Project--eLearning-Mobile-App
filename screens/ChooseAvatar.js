import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon, CheckIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

export const avatare = [
  {
    id: 1,
    sursa: require("../assets/avatare/avatar1.jpg"),
    isSelected: false,
  },
  {
    id: 2,
    sursa: require("../assets/avatare/avatar2.jpg"),
    isSelected: false,
  },
  {
    id: 3,
    sursa: require("../assets/avatare/avatar3.jpg"),
    isSelected: false,
  },
  {
    id: 4,
    sursa: require("../assets/avatare/avatar4.jpg"),
    isSelected: false,
  },
  {
    id: 5,
    sursa: require("../assets/avatare/avatar5.jpg"),
    isSelected: false,
  },
  {
    id: 6,
    sursa: require("../assets/avatare/avatar6.jpg"),
    isSelected: false,
  },
  {
    id: 7,
    sursa: require("../assets/avatare/avatar7.jpg"),
    isSelected: false,
  },
  {
    id: 8,
    sursa: require("../assets/avatare/avatar8.jpg"),
    isSelected: false,
  },
  {
    id: 9,
    sursa: require("../assets/avatare/avatar9.jpg"),
    isSelected: false,
  },
];

export default function ChooseAvatar() {
  const navigation = useNavigation();

  const [decodedJwt, setDecodedJwt] = useState(null);
  const [avatarId, setAvatarId] = useState(null);
  const selectAvatar = (id) => {
    setAvatar(id);
  };

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        setDecodedJwt(decoded);
        setAvatarId(decoded.data.avatar);
        setSelectedAvatar(decoded.data.avatar);
      } catch (error) {
        console.log(error);
      }
    };

    decodeJwt();
  }, []);

  const schimbaAvatar = async () => {
    const schimbareAvatar = {
      idUser: decodedJwt.data.id,
      avatar: avatarId,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(schimbareAvatar),
      headers: { "Content-Type": "application/json" },
    };

    console.log(requestOptions.body);
    let input = IPv4 + ":5000/schimbareAvatar";

    const response = await fetch(input, requestOptions);
    const data = await response.json();

    await AsyncStorage.setItem("jwt", data.jwt);

    navigation.navigate("Profile");
  };

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
              className="ml-4 text-3xl font-bold"
            >
              CodeCampus
            </Text>
          </View>
          <Text
            style={{ color: themeColors.white }}
            className="ml-4 text-3xl font-bold"
          >
            🎞 Alege un avatar:
          </Text>
        </View>
        <ScrollView
          style={{ height: 400 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-row"
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: 10,
              marginTop: 10,
            }}
          > */}
          <TouchableOpacity
            className="mx-4 p-2 mb-2 flex-wrap flex-row"
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.4)",
              alignItems: "center",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            {/* {avatare.map((avatar, index) => {
              const isSelected = avatar.id === avatar;
              return (
                <TouchableOpacity
                  key={avatar.id}
                  style={{ width: "33.33%" }}
                  onPress={() => selectAvatar(avatar.id)}
                >
                  <Image
                    source={avatar.sursa}
                    style={{
                      width: 88,
                      height: 88,
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    className="rounded-2xl"
                  />
                  {isSelected && (
                    <CheckIcon
                      color={themeColors.galben}
                      size="24"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: [{ translateX: -12 }, { translateY: -12 }],
                      }}
                    />
                  )}
                </TouchableOpacity>
              );
            })} */}
            {avatarId === null &&
              avatare.map((avatar) => {
                const isSelected = avatar.id === avatarId; // Compare with selectedAvatar state
                console.log(avatarId);
                return (
                  <TouchableOpacity
                    key={avatar.id}
                    style={{ width: "33.33%" }}
                    onPress={() => setAvatarId(avatar.id)}
                  >
                    <Image
                      source={avatar.sursa}
                      style={{
                        width: 88,
                        height: 88,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      className="rounded-2xl"
                    />
                    {avatar.id === avatarId && (
                      <CheckIcon
                        color={themeColors.galben}
                        size={24} // Pass the size as a number, not a string
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: [{ translateX: -12 }, { translateY: -12 }],
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            {avatarId &&
              avatare.map((avatar) => {
                const isSelected = avatar.id === avatarId; // Compare with selectedAvatar state
                console.log(avatarId);
                return (
                  <TouchableOpacity
                    key={avatar.id}
                    style={{ width: "33.33%" }}
                    onPress={() => setAvatarId(avatar.id)}
                  >
                    <Image
                      source={avatar.sursa}
                      style={{
                        width: 88,
                        height: 88,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        opacity: avatarId === avatar.id ? 0.4 : 1,
                      }}
                      className="rounded-2xl"
                    />
                    {avatar.id === avatarId && (
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CheckIcon color={themeColors.galben} size={50} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
          </TouchableOpacity>
          {/* </TouchableOpacity> */}
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            style={{
              width: "30%",
              opacity: 0.8,
              alignSelf: "flex-end",
              marginEnd: 15,
            }}
            onPress={schimbaAvatar}
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              OK!
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
