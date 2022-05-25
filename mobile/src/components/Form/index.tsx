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

import { captureScreen } from "react-native-view-shot";
import { api } from "../../libs/api";

import { readAsStringAsync } from "expo-file-system";

interface Props {
    feedbackType: FeedbackType;
    onTypeCanceled: () => void;
    onFeedbackSent: () => void;
}
export function Form({ feedbackType, onTypeCanceled, onFeedbackSent }: Props) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState("");

    async function handleSubmitFeedback() {
        if (isSendingFeedback) {
            return;
        }

        setIsSendingFeedback(true);
        const screenshotBase64 =
            screenshot &&
            (await readAsStringAsync(screenshot, { encoding: "base64" }));

        try {
            await api.post("/feedbacks", {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment,
            });

            onFeedbackSent();
            setIsSendingFeedback(false);
        } catch (error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }

    function handleScreenshot() {
        captureScreen({ format: "png", quality: 0.8 })
            .then((uri) => {
                console.log(uri);
                setScreenshot(uri);
            })
            .catch((error) => console.log(error));
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onTypeCanceled}>
                    <ArrowLeft
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                onChangeText={setComment}
                autoCorrect={false}
                multiline
                style={styles.input}
                placeholder={feedbackTypeInfo.placeholder}
                placeholderTextColor={theme.colors.text_secondary}
            />
            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <Button
                    onPress={handleSubmitFeedback}
                    isLoading={isSendingFeedback}
                />
            </View>
        </View>
    );
}
