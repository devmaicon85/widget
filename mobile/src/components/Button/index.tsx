import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator,
} from "react-native";
import { styles } from "./styles";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { theme } from "../../theme";

interface Props extends TouchableOpacityProps {
    isLoading: boolean;
}
export function Button({ isLoading, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest} style={styles.container}>
            {isLoading ? (
                <ActivityIndicator color={theme.colors.text_on_brand_color} />
            ) : (
                <Text style={styles.title}>Enviar Feedback</Text>
            )}
        </TouchableOpacity>
    );
}
