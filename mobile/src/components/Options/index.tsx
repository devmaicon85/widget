import React from "react";
import { Text, View } from "react-native";
import { Copyright } from "../Copyright";
import { Option } from "../Option";
import { styles } from "./styles";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackType } from "../Widget";

type Props = {
    setTypeSelected: (typeSelected: FeedbackType) => void;
};
export function Options({ setTypeSelected }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deixe seu Feedback</Text>
            <View style={styles.options}>
                {Object.entries(feedbackTypes).map(([key, value]) => (
                    <Option
                        key={key}
                        title={value.title}
                        image={value.image}
                        onPress={() => {
                            setTypeSelected(key as FeedbackType);
                        }}
                    ></Option>
                ))}
            </View>
            <Copyright />
        </View>
    );
}
