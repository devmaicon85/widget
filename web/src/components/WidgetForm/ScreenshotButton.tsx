import { Camera, CircleNotch, Spinner, Trash } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Loading } from "../Loading";
import html2canvas from "html2canvas";
import { getTheme } from "../../util/getQueryUrl";
import { Button } from "../Button";
import { postMessageScreenshotFrameParent } from "../../util/postMessageFrameParent";

type Props = {
    setScreenshot: (img: string | null) => void;
    screenshot: string | null;
};
export function ScreenshotButton({ setScreenshot, screenshot }: Props) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);

        // screenshot é solicitado no iframe, recebido em widget.ts
        postMessageScreenshotFrameParent();

        async function displayMessage(e: MessageEvent) {
            if (e.data.base64image) {
                setScreenshot(e.data.base64image);
                setIsTakingScreenshot(false);
            }
        }

        if (window.addEventListener) {
            window.addEventListener("message", displayMessage, false);
        }
    }
    return (
        <>
            {!screenshot && (
                <Button
                    type="button"
                    title="Tirar foto da tela atual"
                    onClick={handleTakeScreenshot}
                >
                    {!isTakingScreenshot && (
                        <Camera className="w-6 h-6 " weight="light" />
                    )}
                    {isTakingScreenshot && <Loading />}
                </Button>
            )}

            {screenshot && (
                <Button
                    title="Excluir foto tirada da tela"
                    onClick={() => setScreenshot(null)}
                    className="flex-none bg-transparent p-0"
                >
                    <img
                        className="w-10 h-10 border-2 rounded-md"
                        src={screenshot}
                        alt="screenshot"
                    />
                    <Trash
                        weight="fill"
                        className="
                        text-red-300
                        hover:text-red-600
                        text-xl
                        absolute"
                    />
                </Button>
            )}
        </>
    );
}
