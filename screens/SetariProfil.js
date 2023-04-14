import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import FeatherIcon from "react-native-vector-icons/Feather";

const User = {
  username: "ralucaantal",
  email: "ralucaantal@gmail.com",
  nrTelefon: "0754945735",
};

export default function SetariProfil() {
  const navigation = useNavigation();
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
            {/* <View className="mt-3 space-y-3">
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
            </View> */}
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
              </View>
              <View className="mt-3 space-y-4" style={{ alignItems: "center" }}>
                <Text
                  className="ml-4 text-lg font-bold"
                  style={{
                    color: themeColors.white,
                    textAlign: "center",
                  }}
                >
                  @ralucaantal
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
                  placeholder={`@${User.username}`}
                  style={{ width: "100%", opacity: 0.5 }}
                />
                <TouchableOpacity
                  className="py-3 bg-yellow-400 rounded-xl"
                  style={{ width: "100%", opacity: 0.8 }}
                  onPress={() => {
                    // console.log("S-au facut modificari pt utilizator");
                    // navigation.navigate("Profile");
                  }}
                >
                  <Text className="font-xl font-bold text-center text-gray-700">
                    Modifică username
                  </Text>
                </TouchableOpacity>
                <Text className="text-white ml-4">Adresă De Email</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder={User.email}
                  style={{ width: "100%", opacity: 0.5 }}
                />
                <TouchableOpacity
                  className="py-3 bg-yellow-400 rounded-xl"
                  style={{ width: "100%", opacity: 0.8 }}
                  onPress={() => {
                    // console.log("S-au facut modificari pt utilizator");
                    // navigation.navigate("Profile");
                  }}
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
                />
                <Text className="text-white ml-4">Parolă nouă</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  placeholder="* * * * * * * * * *"
                  style={{ width: "100%", opacity: 0.5 }}
                />
                                <TouchableOpacity
                  className="py-3 bg-yellow-400 rounded-xl"
                  style={{ width: "100%", opacity: 0.8 }}
                  onPress={() => {
                    // console.log("S-au facut modificari pt utilizator");
                    // navigation.navigate("Profile");
                  }}
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
