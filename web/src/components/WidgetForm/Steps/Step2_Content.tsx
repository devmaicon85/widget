import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { FeedBackType, feedbackTypes } from "../../../types/FeedBackTypes";
import {
    getQueryEmail,
    getQueryHasScreenshotButton,
    getQueryTitle,
    getQueryWhatsapp,
} from "../../../util/getQueryUrl";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Loading } from "../../Loading";
import { TextArea } from "../../TextArea";
import { Header } from "../Header";
import { ScreenshotButton } from "../ScreenshotButton";

type Props = {
    feedbackType: FeedBackType;
    onFeedbackRestartType: () => void;
    onFeedbackSent: () => void;
};

export function Step2_Content({
    feedbackType,
    onFeedbackRestartType,
    onFeedbackSent,
}: Props) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [textButtonSend, setTextButtonSend] = useState("Enviar");
    const [emailReplyTo, setEmailReplyTo] = useState("");

    const title = getQueryTitle();
    const emailSendTo = getQueryEmail() ?? "";
    const [whatsApp, setWhatsApp] = useState(getQueryWhatsapp());
    const [loadingWhats, setLoadingWhats] = useState(false);

    const [hasScreenshotButton, setHasScreenshotButton] = useState(
        getQueryHasScreenshotButton()
    );

    async function openLinkWhatsApp(whats: string, message: string) {
        return new Promise<boolean>(function (resolve) {
            setTimeout(() => {
                const linkWhatsApp = encodeURI(
                    `https://api.whatsapp.com/send?phone=${whats}&text=${message}`
                );
                window.open(linkWhatsApp, "_blank");
                resolve(true);
            }, 1500);
        });
    }
    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendingFeedback(true);

        try {
            await api.post("/feedbacks", {
                type: feedbackTypes[feedbackType].title,
                emailReplyTo,
                emailSendTo,
                screenshot,
                comment,
                title,
            });

            let message =
                emailReplyTo.length > 0 ? `E-mail: ${emailReplyTo} - ` : "";
            message += comment;

            if (whatsApp) {
                setLoadingWhats(true);
                await openLinkWhatsApp(whatsApp, message);
                setLoadingWhats(false);
            }

            onFeedbackSent();
            setIsSendingFeedback(false);
        } catch (error) {
            // alert(`Erro ao enviar feed back ${error}`);
            setTextButtonSend("Ocorreu um erro. Tentar novamente");
            setIsSendingFeedback(false);
            setLoadingWhats(false);

            console.log(error);
            return;
        }
    }

    return (
        <>
            <Header
                imgUrl={feedbackTypes[feedbackType].image.src}
                imgAlt={feedbackTypes[feedbackType].image.alt}
                onFeedbackRestart={onFeedbackRestartType}
            >
                {feedbackTypes[feedbackType].title}
            </Header>

            <form onSubmit={handleSubmitFeedback} className="w-full px-4 my-4">
                <TextArea
                    title={feedbackTypes[feedbackType].placeholder}
                    placeholder={feedbackTypes[feedbackType].placeholder}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Input
                    placeholder="seu e-mail (opcional)"
                    onChange={(e) => setEmailReplyTo(e.target.value)}
                    title="digite seu email caso seja necessário que entrarmos em contato"
                />

                <footer className="flex gap-2 mt-2">
                    {hasScreenshotButton && (
                        <ScreenshotButton
                            setScreenshot={setScreenshot}
                            screenshot={screenshot}
                        />
                    )}

                    <Button
                        disabled={!comment || isSendingFeedback}
                        type="submit"
                    >
                        {isSendingFeedback ? (
                            <>
                                <Loading />{" "}
                                {loadingWhats
                                    ? "Abrindo WhatsApp..."
                                    : "Enviando..."}
                            </>
                        ) : (
                            textButtonSend
                        )}
                    </Button>
                </footer>
            </form>
        </>
    );
}
