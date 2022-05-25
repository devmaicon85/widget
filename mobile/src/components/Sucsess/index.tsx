import React, { useState } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { Copyright } from "../Copyright";
import { Option } from "../Option";
import { styles } from "./styles";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { ArrowLeft } from "phosphor-react-native";
import { theme } from "../../theme";
import { FeedbackType } from "../Widget";
import { ScreenshotButton } from "../ScreenshotButton";
import { Button } from "../Button";

import successImg from "../../assets/success.png";

type Props = {
    onRestart: () => void;
};
export function Success({ onRestart }: Props) {
    return (
        <View style={styles.container}>
            <Image source={successImg} style={styles.image} />
            <Text style={styles.title}>Agradecemos o feedback</Text>

            <TouchableOpacity style={styles.button} onPress={onRestart}>
                <Text style={styles.buttonTitle}>Quero enviar outro</Text>
            </TouchableOpacity>

            <Copyright />
        </View>
    );
}
