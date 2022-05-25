import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ChatTeardropDots } from "phosphor-react-native";
import { theme } from "../../theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Options } from "../Options";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { Form } from "../Form";
import { Success } from "../Sucsess";

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [typeSelected, setTypeSelected] = useState<FeedbackType | null>(null);

    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleOpen() {
        bottomSheetRef.current?.expand();
    }

    return (
        <>
            <TouchableOpacity onPress={handleOpen} style={styles.button}>
                <ChatTeardropDots
                    size={24}
                    color={theme.colors.text_on_brand_color}
                    weight="bold"
                />
            </TouchableOpacity>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[1, 280]}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}
            >
                {feedbackSent ? (
                    <Success
                        onRestart={() => {
                            setFeedbackSent(false), setTypeSelected(null);
                        }}
                    />
                ) : (
                    <>
                        {typeSelected ? (
                            <Form
                                feedbackType={typeSelected}
                                onTypeCanceled={() => setTypeSelected(null)}
                                onFeedbackSent={() => setFeedbackSent(true)}
                            />
                        ) : (
                            <Options setTypeSelected={setTypeSelected} />
                        )}
                    </>
                )}
            </BottomSheet>
        </>
    );
}

export default gestureHandlerRootHOC(Widget);
