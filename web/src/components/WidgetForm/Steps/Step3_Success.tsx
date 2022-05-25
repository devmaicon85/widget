import { useEffect, useState } from "react";
import {
    getQueryEmail,
    getQueryInstagram,
    getTheme,
} from "../../../util/getQueryUrl";

import imageSuccess from "../../../assets/success.svg";
import imageInstagramUrl from "../../../assets/instagram.png";
import { Header } from "../Header";
import { Button } from "../../Button";
import { CheckSquare } from "phosphor-react";

type Props = {
    onFeedbackRestartType: () => void;
};

export function Step3_Success({ onFeedbackRestartType }: Props) {
    const queryInstagram = getQueryInstagram();

    return (
        <>
            <Header>Finalizado!</Header>
            <div className="flex flex-col p-4  items-center py-10 w-full">
                <h1 className="text-xl mt-2 mb-5">
                    Agradecemos o seu contato!
                </h1>
                {queryInstagram ? (
                    <a href={getQueryInstagram()} target="_blank">
                        <img
                            src={imageInstagramUrl}
                            alt="nosso instagram"
                            title="siga nosso instagram"
                            className="h-12 w-12"
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
                    className={`py-2 px-6 mt-6 h-14`}
                >
                    Enviar outro contato
                </Button>
            </div>
        </>
    );
}
