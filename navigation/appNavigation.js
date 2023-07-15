import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import Invata from "../screens/Invata";
import Profile from "../screens/Profile";
import Antreneaza from "../screens/Antreneaza";
import Organizeaza from "../screens/Organizeaza";
import Ajuta from "../screens/Ajuta";
import Top from "../screens/Top";
import Statistici from "../screens/Statistici";
import SetariProfil from "../screens/SetariProfil";
import InscriereQuiz from "../screens/InscriereQuiz";
import FinalQuiz from "../screens/FinalQuiz";
import StatusIntrebari from "../screens/StatusIntrebari";
import Question from "../screens/Question";
import ChooseAvatar from "../screens/ChooseAvatar";
import IntrebareGrila from "../screens/IntrebareGrila";
import SuccesPropunereIntrebare from "../screens/SuccesPropunereIntrebare";
import IntrebareText from "../screens/IntrebareText";
import Feedback from "../screens/Feedback";
import MultumireFeedback from "../screens/MultumireFeedback";
import Curs from "../screens/Curs";
import CodQuiz from "../screens/CodQuiz";
import Lectii from "../screens/Lectii";
import TextLectie from "../screens/TextLectie";
import IntrebariLectie from "../screens/IntrebariLectii";
import FinalizareLectie from "../screens/FinalizareLectie";
import QuizOrganizat from "../screens/QuizOrganizat";
import MagazinVieti from "../screens/MagazinVieti";
import HomeAdministrator from "../screens/HomeAdministrator";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Notifications"
          options={{ headerShown: false }}
          component={NotificationsScreen}
        />
        <Stack.Screen
          name="Invata"
          options={{ headerShown: false }}
          component={Invata}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile}
        />
        <Stack.Screen
          name="Antreneaza"
          options={{ headerShown: false }}
          component={Antreneaza}
        />
        <Stack.Screen
          name="Organizeaza"
          options={{ headerShown: false }}
          component={Organizeaza}
        />
        <Stack.Screen
          name="Ajuta"
          options={{ headerShown: false }}
          component={Ajuta}
        />
        <Stack.Screen
          name="Top"
          options={{ headerShown: false }}
          component={Top}
        />
        <Stack.Screen
          name="Statistici"
          options={{ headerShown: false }}
          component={Statistici}
        />
        <Stack.Screen
          name="SetariProfil"
          options={{ headerShown: false }}
          component={SetariProfil}
        />
        <Stack.Screen
          name="InscriereQuiz"
          options={{ headerShown: false }}
          component={InscriereQuiz}
        />
        <Stack.Screen
          name="Question"
          options={{ headerShown: false }}
          component={Question}
        />
        <Stack.Screen
          name="FinalQuiz"
          options={{ headerShown: false }}
          component={FinalQuiz}
        />
        <Stack.Screen
          name="StatusIntrebari"
          options={{ headerShown: false }}
          component={StatusIntrebari}
        />
        <Stack.Screen
          name="ChooseAvatar"
          options={{ headerShown: false }}
          component={ChooseAvatar}
        />
        <Stack.Screen
          name="IntrebareGrila"
          options={{ headerShown: false }}
          component={IntrebareGrila}
        />
        <Stack.Screen
          name="SuccesPropunereIntrebare"
          options={{ headerShown: false }}
          component={SuccesPropunereIntrebare}
        />
        <Stack.Screen
          name="IntrebareText"
          options={{ headerShown: false }}
          component={IntrebareText}
        />
        <Stack.Screen
          name="Feedback"
          options={{ headerShown: false }}
          component={Feedback}
        />
        <Stack.Screen
          name="MultumireFeedback"
          options={{ headerShown: false }}
          component={MultumireFeedback}
        />
        <Stack.Screen
          name="Curs"
          options={{ headerShown: false }}
          component={Curs}
        />
        <Stack.Screen
          name="CodQuiz"
          options={{ headerShown: false }}
          component={CodQuiz}
        />
        <Stack.Screen
          name="Lectii"
          options={{ headerShown: false }}
          component={Lectii}
        />
        <Stack.Screen
          name="TextLectie"
          options={{ headerShown: false }}
          component={TextLectie}
        />
        <Stack.Screen
          name="IntrebariLectie"
          options={{ headerShown: false }}
          component={IntrebariLectie}
        />
        <Stack.Screen
          name="FinalizareLectie"
          options={{ headerShown: false }}
          component={FinalizareLectie}
        />
        <Stack.Screen
          name="QuizOrganizat"
          options={{ headerShown: false }}
          component={QuizOrganizat}
        />
        <Stack.Screen
          name="MagazinVieti"
          options={{ headerShown: false }}
          component={MagazinVieti}
        />
        <Stack.Screen
          name="HomeAdministrator"
          options={{ headerShown: false }}
          component={HomeAdministrator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
