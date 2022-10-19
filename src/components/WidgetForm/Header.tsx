import { useGetQueryTheme } from "../../util/getQueryUrl";
import { ButtonArrowLeft } from "./ButtonArrowLeft";

type HeaderProps = {
    children: React.ReactNode;
    onFeedbackRestart?: () => void;
    imgUrl?: string;
    imgAlt?: string;
};
export function Header({
    children,
    onFeedbackRestart,
    imgUrl,
    imgAlt,
}: HeaderProps) {
    const theme = useGetQueryTheme();

    return (
        <header className="">
            {onFeedbackRestart && (
                <ButtonArrowLeft onClick={onFeedbackRestart} />
            )}

            <span
                className={`text-xl leading-6  w-full flex items-center text-center justify-center h-16 text-white rounded-t-xl p-9 bg-theme-${theme}`}
            >
                {imgUrl && (
                    <>
                        <img
                            className="h-8 mr-2 brightness-200 contrast-200"
                            src={imgUrl}
                            alt={imgAlt}
                        />

                        <img
                            className="absolute opacity-10  brightness-200 contrast-200 h-[75px] top-0 right-10 w-[75px]"
                            src={imgUrl}
                            alt={imgAlt}
                        />
                    </>
                )}
                <span className="font-semibold text-1xl text-ellipsis overflow-clip">
                    {children}
                </span>
            </span>
        </header>
    );
}
