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

export const avatare = [
  {
    id: 1,
    sursa: require("../assets/avatare/avatar1.jpg"),
  },
  {
    id: 2,
    sursa: require("../assets/avatare/avatar2.jpg"),
  },
  {
    id: 3,
    sursa: require("../assets/avatare/avatar3.jpg"),
  },
  {
    id: 4,
    sursa: require("../assets/avatare/avatar4.jpg"),
  },
  {
    id: 5,
    sursa: require("../assets/avatare/avatar5.jpg"),
  },
  {
    id: 6,
    sursa: require("../assets/avatare/avatar6.jpg"),
  },
  {
    id: 7,
    sursa: require("../assets/avatare/avatar7.jpg"),
  },
  {
    id: 8,
    sursa: require("../assets/avatare/avatar8.jpg"),
  },
  {
    id: 9,
    sursa: require("../assets/avatare/avatar9.jpg"),
  },
];

export default function ChooseAvatar() {
  const navigation = useNavigation();

  const [decodedJwt, setDecodedJwt] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const selectAvatar = (id) => {
    setAvatar(id);
  };

  const[selectedAvatar, setSelectedAvatar]=useState(null);

  useEffect(() => {
    const decodeJwt = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        const decoded = jwtDecode(jwt);
        setDecodedJwt(decoded);
        setAvatar(decoded.data.avatar);
        setSelectedAvatar(decoded.data.avatar);

        const idUser = {
          idUser: decoded.data.id,
        };
      } catch (error) {
        console.log(error);
      }
    };

    decodeJwt();
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
            {avatare.map((avatar, index) => {
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
