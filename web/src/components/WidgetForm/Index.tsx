import { useEffect, useState } from "react";
import { FeedBackType } from "../../types/FeedBackTypes";
import { postMessageFrameParent } from "../../util/postMessageFrameParent";
import { Footer } from "./Footer";
import { Step0_Help } from "./Steps/Step0_Help";
import { Step1_TypeFeedBack } from "./Steps/Step1_TypeFeedBack";
import { Step2_Content } from "./Steps/Step2_Content";
import { Step3_Success } from "./Steps/Step3_Success";

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedBackType | null>();

    const [nextStep, setNextStep] = useState(0);

    useEffect(() => {
        postMessageFrameParent();
    }, [feedbackType]);

    return (
        <div
            className={
                "sd:w-auto relative mb-2 max-h-full min-h-[300px] w-[calc(100vw-2rem)] min-w-[350px] max-w-[400px] rounded-2xl rounded-tl-3xl bg-light-surface-primary text-light-text-primary shadow-md dark:bg-dark-background dark:text-dark-text-primary "
            }
        >
            <div>
                {nextStep === 0 && (
                    <Step0_Help onFinally={() => setNextStep(1)} />
                )}

                {nextStep === 1 && !feedbackType && (
                    <Step1_TypeFeedBack
                        onFeedbackTypeChanged={(e) => {
                            setFeedbackType(e), setNextStep(2);
                        }}
                        onFeedbackRestartType={() => setNextStep(0)}
                    />
                )}

                {nextStep == 2 && feedbackType && (
                    <Step2_Content
                        feedbackType={feedbackType}
                        onFeedbackRestartType={() => {
                            setFeedbackType(null), setNextStep(1);
                        }}
                        onFeedbackSent={() => setNextStep(3)}
                    />
                )}

                {nextStep === 3 && (
                    <Step3_Success
                        onFeedbackRestartType={() => {
                            setFeedbackType(null), setNextStep(0);
                        }}
                    />
                )}

                <Footer />
            </div>
        </div>
    );
}
