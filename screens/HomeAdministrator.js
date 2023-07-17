import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import IPv4 from "../index";

export default function HomeAdministrator() {
  const navigation = useNavigation();

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
            className="ml-4 text-3xl font-bold italic"
          >
            Administrare aplicație 🚀
          </Text>
        </View>
        <ScrollView
          style={{ height: "100%", marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View
            className="mx-4 p-2 mb-2 flex-column"
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              style={{
                width: "100%",
                opacity: 0.8,
                alignSelf: "flex-end",
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() => {
                navigation.navigate("Utilizatori");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Vezi Utilizatori
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              style={{
                width: "100%",
                opacity: 0.8,
                alignSelf: "flex-end",
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() => {
                navigation.navigate("CursuriAdmin");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Vezi Cursuri
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              style={{
                width: "100%",
                opacity: 0.8,
                alignSelf: "flex-end",
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() => {
                navigation.navigate("Teste");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Vezi Teste Organizate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              style={{
                width: "100%",
                opacity: 0.8,
                alignSelf: "flex-end",
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() => {
                navigation.navigate("IntrebariPropuseAdmin");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Vezi Întrebări Propuse
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              style={{
                width: "100%",
                opacity: 0.8,
                alignSelf: "flex-end",
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() => {
                navigation.navigate("IntrebariTextAdmin");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Vezi Întrebări Text Existente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              style={{
                width: "100%",
                opacity: 0.8,
                alignSelf: "flex-end",
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() => {
                navigation.navigate("IntrebariGrilaAdmin");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Vezi Întrebări Grilă Existente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              style={{
                width: "100%",
                opacity: 0.8,
                alignSelf: "flex-end",
                marginTop: 5,
                marginBottom: 5,
              }}
              onPress={() => {
                navigation.navigate("FeedbackAdmin");
              }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Vezi Feedback-uri
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
