/* eslint-disable @next/next/no-img-element */
import { CheckSquare } from "phosphor-react";
import imageInstagramUrl from "../../../assets/instagram.png";
import {
    useGetQueryInstagram,
    useGetQueryTheme
} from "../../../util/getQueryUrl";
import { Button } from "../../Button";

type Props = {
    onFeedbackRestartType: () => void;
};

export function Step3_Success({ onFeedbackRestartType }: Props) {
    const queryInstagram = useGetQueryInstagram();
    const theme = useGetQueryTheme();

    return (
        <>
            {/* <Header>Finalizado!</Header> */}
            <div className="flex flex-col items-center w-full p-4 py-10">
                <h1 className="mt-2 mb-5 text-xl text-center">
                    Enviado com sucesso<br/>Agradecemos o seu contato
                </h1>
                {queryInstagram ? (
                    <a href={queryInstagram} target="_blank" rel="noreferrer">
                        <img
                            src={imageInstagramUrl.src}
                            alt="nosso instagram"
                            title="siga nosso instagram"
                            className="w-12 h-12"
                        />
                    </a>
                ) : (
                    <CheckSquare
                        size={50}
                        className={`opacity-50 text-theme-${theme}`}
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
