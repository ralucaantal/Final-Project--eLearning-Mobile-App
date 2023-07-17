import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  HeartIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  PuzzlePieceIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme/index";
import IPv4 from "../index";

export default function FeedbackAdmin() {
  const navigation = useNavigation();

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const cereFeedback = async () => {
      try {
        let input = IPv4 + ":5000/cereFeedback";

        fetch(input)
          .then((response) => response.json())
          .then((data) => {
            setFeedback(data);
            console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    cereFeedback();
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
            className="ml-4 text-3xl font-bold italic"
          >
            Feedback-uri oferite de utilizatorii aplicației 🌟
          </Text>
        </View>
        {feedback && (
          <ScrollView
            style={{ height: "100%", marginTop: 20 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
          >
            {feedback.map((feedback, index) => {
              return (
                <TouchableOpacity
                  className="mx-4 p-2 mb-2 flex-row"
                  key={index}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    borderRadius: 10,
                  }}
                >
                  <View
                    className="flex-column space-x-1"
                    style={{ alignSelf: "center" }}
                  >
                    <Text
                      className="font-semibold"
                      style={{ color: themeColors.white }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
