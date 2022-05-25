import { useEffect, useState } from "react";
import { Step1_TypeFeedBack } from "./Steps/Step1_TypeFeedBack";
import { Step2_Content } from "./Steps/Step2_Content";
import { Footer } from "./Footer";
import { Step3_Success } from "./Steps/Step3_Success";
import { FeedBackType } from "../../types/FeedBackTypes";
import { Theme } from "./ButtonTheme";
import { getTheme } from "../../util/getQueryUrl";
import { postMessageFrameParent } from "../../util/postMessageFrameParent";

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedBackType | null>();
    const [feedbackSent, setFeedbackSent] = useState(false);

    useEffect(() => {
        postMessageFrameParent();
    }, [feedbackSent, feedbackType]);

    return (
        <div
            className={`
            sd:w-auto
            relative
            mb-2 
            min-h-[300px]
            w-[calc(100vw-2rem)]
            min-w-[350px]
            max-w-[400px]
            rounded-2xl
            rounded-tl-3xl
            bg-light-surface-primary
            text-light-text-primary
            shadow-md
            dark:bg-dark-background
            dark:text-dark-text-primary
           
            `}
        >
            <div
                id="main"
                className={`
                            dark:bg-theme-${getTheme()}
                            w-full
            `}
            >
                {!feedbackSent && !feedbackType && (
                    <Step1_TypeFeedBack
                        onFeedbackTypeChanged={setFeedbackType}
                    />
                )}

                {!feedbackSent && feedbackType && (
                    <Step2_Content
                        feedbackType={feedbackType}
                        onFeedbackRestartType={() => setFeedbackType(null)}
                        onFeedbackSent={() => setFeedbackSent(true)}
                    />
                )}

                {feedbackSent && (
                    <Step3_Success
                        onFeedbackRestartType={() => {
                            setFeedbackType(null), setFeedbackSent(false);
                        }}
                    />
                )}

                <Footer />
                <Theme />
            </div>
        </div>
    );
}
