import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";


export default function IntrebareGrila() {
  const navigation = useNavigation();


  const [textIntrebare, setTextIntrebare] = useState(null);

  const [varianta1, setVarianta1] = useState(null);
  const [varianta2, setVarianta2] = useState(null);
  const [varianta3, setVarianta3] = useState(null);
  const [varianta4, setVarianta4] = useState(null);

  const [raspunsCorect, setRaspunsCorect] = useState(null);

  const [materie, setMaterie] = useState(null);

  const handleChangeTextIntrebare = (inputText) => {
    setTextIntrebare(inputText);
  };

  const handleChangeTextVarianta1 = (inputText) => {
    setVarianta1(inputText);
  };

  const handleChangeTextVarianta2 = (inputText) => {
    setVarianta2(inputText);
  };

  const handleChangeTextVarianta3 = (inputText) => {
    setVarianta3(inputText);
  };

  const handleChangeTextVarianta4 = (inputText) => {
    setVarianta4(inputText);
  };

  const handleChangeRaspunsCorect = (inputText) => {
    setRaspunsCorect(inputText);
  };

  const handleChangeMaterie = (option) => {
    setMaterie(option);
  };

  const adaugareIntrebare = () => {
    navigation.navigate("SuccesAdaugareIntrebare");
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
              Propune o întrebare nouă de tip grilă! ⚙
            </Text>
            <View
              className="mx-4 p-2 mb-2 flex-row"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                // marginTop: 60,
                height: "68%",
              }}
            >
              <ScrollView
                className="form space-y-2"
                style={{ width: "100%", height: "100%" }}
              >
                <View className="flex-1 flex justify-center pl-3 space-y-3">
                  <Text
                    style={{ color: themeColors.white, fontSize: 20 }}
                    className="font-semibold"
                  >
                    Care este textul întrebării?
                  </Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="Textul întrebării tale"
                    style={{
                      width: "97%",
                      opacity: 0.5,
                    }}
                    onChangeText={handleChangeTextIntrebare}
                    value={textIntrebare}
                  />
                  <Text
                    style={{ color: themeColors.white, fontSize: 20 }}
                    className="font-semibold"
                  >
                    Prima variantă de răspuns
                  </Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="Prima variantă de răspuns"
                    style={{
                      width: "97%",
                      opacity: 0.5,
                    }}
                    onChangeText={handleChangeTextVarianta1}
                    value={varianta1}
                  />

                  <Text
                    style={{ color: themeColors.white, fontSize: 20 }}
                    className="font-semibold"
                  >
                    A doua variantă de răspuns
                  </Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="A doua variantă de răspuns"
                    style={{
                      width: "97%",
                      opacity: 0.5,
                    }}
                    onChangeText={handleChangeTextVarianta2}
                    value={varianta2}
                  />
                  <Text
                    style={{ color: themeColors.white, fontSize: 20 }}
                    className="font-semibold"
                  >
                    A treia variantă de răspuns
                  </Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="A treia variantă de răspuns"
                    style={{
                      width: "97%",
                      opacity: 0.5,
                    }}
                    onChangeText={handleChangeTextVarianta3}
                    value={varianta3}
                  />
                  <Text
                    style={{ color: themeColors.white, fontSize: 20 }}
                    className="font-semibold"
                  >
                    A patra variantă de răspuns
                  </Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="A patra variantă de răspuns"
                    style={{
                      width: "97%",
                      opacity: 0.5,
                    }}
                    onChangeText={handleChangeTextVarianta4}
                    value={varianta4}
                  />
                  <Text
                    style={{ color: themeColors.white, fontSize: 20 }}
                    className="font-semibold"
                  >
                    Răspunsul corect
                  </Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="Răspunsul corect"
                    style={{
                      width: "97%",
                      opacity: 0.5,
                    }}
                    onChangeText={handleChangeRaspunsCorect}
                    value={raspunsCorect}
                  />
                  <Picker
                    selectedValue={materie}
                    onValueChange={handleChangeMaterie}
                    style={{
                      color: "white",
                      fontSize: 20,
                      shadowColor: themeColors.white, // Set the shadow color to white
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.6,
                      shadowRadius: 4,
                    }}
                    itemStyle={{ color: "white", fontSize: 20 }}
                  >
                    <Picker.Item
                      label="Bazele Programării Calculatoarelor"
                      value="BPC"
                    />
                    <Picker.Item label="Baze de Date" value="BD" />
                    <Picker.Item
                      label="Programare Orientată Obiect"
                      value="POO"
                    />
                  </Picker>
                </View>
              </ScrollView>
            </View>
          </View>
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            style={{
              width: "30%",
              opacity: 0.8,
              alignSelf: "flex-end",
              marginRight: 25,
              marginBottom: -70,
            }}
            onPress={adaugareIntrebare}
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              OK!
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
