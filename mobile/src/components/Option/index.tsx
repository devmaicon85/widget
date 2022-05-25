import React from "react";
import { View } from "react-native";
import { Copyright } from "../Copyright";
import { styles } from "./styles";

import {
    TouchableOpacity,
    TouchableOpacityProps,
    Image,
    ImageProps,
    Text,
} from "react-native";

interface Props extends TouchableOpacityProps {
    title: string;
    image: ImageProps;
}

export function Option({ title, image, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest} style={styles.container}>
            <Image source={image} style={styles.image} />

            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}
