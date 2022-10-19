import { useEffect, useState } from "react";
import { FeedBackType } from "../../types/FeedBackTypes";
import { useGetQueryTitle } from "../../util/getQueryUrl";
import { postMessageFrameParent } from "../../util/postMessageFrameParent";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Step0_Help } from "./Steps/Step0_Help";
import { Step1_TypeFeedBack } from "./Steps/Step1_TypeFeedBack";
import { Step2_Content } from "./Steps/Step2_Content";
import { Step3_Success } from "./Steps/Step3_Success";

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedBackType | null>();

    const [nextStep, setNextStep] = useState(0);

    const title = useGetQueryTitle();

    useEffect(() => {
        postMessageFrameParent();
    }, [nextStep, feedbackType]);

    //max-w-[400px]  max-h-full  w-[calc(100vw-2rem)]
    return (
        <div
            className={
                "relative w-screen min-h-[300px] min-w-[320px] rounded-2xl rounded-tl-3xl bg-light-surface-primary text-light-text-primary  dark:bg-dark-background dark:text-dark-text-primary "
            }
        >
            <Header>{title}</Header>
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
            </div>
            <Footer />
        </div>
    );
}
