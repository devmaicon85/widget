import { CheckSquare } from "phosphor-react";
import imageInstagramUrl from "../../../assets/instagram.png";
import { getQueryInstagram, getTheme } from "../../../util/getQueryUrl";
import { Button } from "../../Button";
import { Header } from "../Header";

type Props = {
    onFeedbackRestartType: () => void;
};

export function Step3_Success({ onFeedbackRestartType }: Props) {
    const queryInstagram = getQueryInstagram();

    return (
        <>
            <Header>Finalizado!</Header>
            <div className="flex flex-col items-center w-full p-4 py-10">
                <h1 className="mt-2 mb-5 text-xl">
                    Agradecemos o seu contato!
                </h1>
                {queryInstagram ? (
                    <a
                        href={getQueryInstagram()}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={imageInstagramUrl}
                            alt="nosso instagram"
                            title="siga nosso instagram"
                            className="w-12 h-12"
                        />
                    </a>
                ) : (
                    <CheckSquare
                        size={50}
                        className={`opacity-50 text-theme-${getTheme()}`}
                    />
                )}
                <Button
                    onClick={onFeedbackRestartType}
                    className={"py-2 px-6 mt-6 h-14"}
                >
                    Enviar outro contato
                </Button>
            </div>
        </>
    );
}
