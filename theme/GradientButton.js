import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function GradientButton(props) {
  return (
    <LinearGradient
        colors={['rgba(180, 174, 232, 0.9)', 'rgba(245, 165, 197, 0.9)']}
        end={{x:1, y:1}}
        start={{x: 0.1, y: 0.2}}
        className={`rounded-full ${props.containerClass}`}
    >
        <TouchableOpacity className={`p-3 px-4 ${props.buttonClass}`}>
            <Text className="text-white font-bold">
                {props.value}
            </Text>
        </TouchableOpacity>

    </LinearGradient>
  )
}

// "rgba(180, 174, 232, 0.9)",
// "rgba(245, 165, 197, 0.9)",
// "rgba(251, 191, 36, 0.9)",
