import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";
import tw from "tailwind-react-native-classnames";

const cursuriDisponibile = [
  {
    id: 1,
    image: require("../assets/images/bazeleProgramarii.png"),
  },
  {
    id: 2,
    image: require("../assets/images/POO.png"),
  },
  {
    id: 3,
    image: require("../assets/images/bd.png"),
  },
];

export default function CursuriAdmin() {
  const navigation = useNavigation();

  const [cursuri, setCursuri] = useState(null);

  useEffect(() => {
    const cursuriDisponibile = () => {
      try {
        let input = IPv4 + ":5000/cursuriDisponibile";

        fetch(input)
          .then((response) => response.json())
          .then((data) => {
            setCursuri(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    cursuriDisponibile();
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
          <View className="mt-3 space-y-3">
            <Text
              style={{ color: themeColors.white }}
              className="ml-4 text-3xl font-bold"
            >
              Cursuri disponibile 👩🏻‍💻
            </Text>
          </View>
        </View>
        <View className="mt-3 space-y-4">
          {cursuri && (
            <View className="pl-4">
              <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 350 }}
              >
                {cursuri.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={[tw`mr-4 relative`, { marginBottom: 15 }]}
                      key={item.id}
                      onPress={() =>
                        navigation.navigate("SectiuniAdministrator", {
                          cursCerut: item.titlu,
                        })
                      }
                    >
                      <Image
                        source={cursuriDisponibile[index].image}
                        // source={item.imagine}
                        style={tw`w-full h-60 rounded-3xl`}
                        resizeMode="cover"
                      />
                      <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.6)"]}
                        style={tw`absolute p-4 h-full w-full flex justify-between rounded-3xl`}
                      >
                        <View style={tw`flex-row justify-end`}></View>
                        <View className="space-y-1">
                          <Text style={tw`text-xl font-bold text-gray-300`}>
                            {item.titlu}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
