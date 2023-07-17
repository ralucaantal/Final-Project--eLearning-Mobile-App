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

  const [feedbackCount, setFeedbackCount] = useState({
    heart: 0,
    smile: 0,
    puzzle: 0,
    dislike: 0,
  });

  useEffect(() => {
    const cereFeedback = async () => {
      try {
        let input = IPv4 + ":5000/cereFeedback";

        fetch(input)
          .then((response) => response.json())
          .then((data) => {
            setFeedback(data);
            //console.log(data);
            let count = {
              heart: 0,
              smile: 0,
              puzzle: 0,
              dislike: 0,
            };
            data.forEach((item) => {
              switch (item.feedback_simbol) {
                case "Îmi place foarte mult această aplicație":
                  count.heart++;
                  break;
                case "Aplicația este ok":
                  count.smile++;
                  break;
                case "Mai este de lucrat la această aplicație":
                  count.puzzle++;
                  break;
                case "Nu îmi place deloc ce oferă această aplicație":
                  count.dislike++;
                  break;
                default:
                  break;
              }
            });

            setFeedbackCount(count);
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
        <View style={{ paddingLeft: 10, marginBottom: 10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ alignSelf: "center" }}
          >
            <TouchableOpacity className="bg-purple-100 p-3 px-4 rounded-full mr-2">
              <Text style={{ fontSize: 12, color: "black" }}>
                {feedbackCount.heart} ❤
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-100 p-3 px-4 rounded-full mr-2">
              <Text style={{ fontSize: 12, color: "black" }}>
                {feedbackCount.smile} 😃
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-100 p-3 px-4 rounded-full mr-2">
              <Text style={{ fontSize: 12, color: "black" }}>
                {feedbackCount.puzzle} 🧩
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-100 p-3 px-4 rounded-full mr-2">
              <Text style={{ fontSize: 12, color: "black" }}>
                {feedbackCount.dislike} 😥
              </Text>
            </TouchableOpacity>
          </ScrollView>
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
                  {feedback.feedback_simbol ===
                    "Îmi place foarte mult această aplicație" && (
                    <HeartIcon
                      color={themeColors.galben}
                      size={40}
                      style={{ opacity: 0.8, marginLeft: 10 }}
                    />
                  )}
                  {feedback.feedback_simbol === "Aplicația este ok" && (
                    <FaceSmileIcon
                      color={themeColors.galben}
                      size={40}
                      style={{ opacity: 0.8, marginLeft: 10 }}
                    />
                  )}
                  {feedback.feedback_simbol ===
                    "Mai este de lucrat la această aplicație" && (
                    <PuzzlePieceIcon
                      color={themeColors.galben}
                      size={40}
                      style={{ opacity: 0.8, marginLeft: 10 }}
                    />
                  )}
                  {feedback.feedback_simbol ===
                    "Nu îmi place deloc ce oferă această aplicație" && (
                    <FaceFrownIcon
                      color={themeColors.galben}
                      size={40}
                      style={{ opacity: 0.8, marginLeft: 10 }}
                    />
                  )}
                  <View className="flex-1 flex justify-center pl-3 space-y-3">
                    <Text
                      style={{ color: themeColors.white, fontSize: 16 }}
                      className="font-semibold"
                    >
                      {feedback.feedback_simbol}
                    </Text>
                    {feedback.comentariu && (
                      <Text
                        style={{ color: themeColors.white, fontSize: 16 }}
                        className="font-semibold italic"
                      >
                        Comentariu: {feedback.comentariu}
                      </Text>
                    )}
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
