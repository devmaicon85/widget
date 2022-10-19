import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSkipPrevious } from "react-icons/bi";
import validator from "validator";
import { apiHelp } from "../../../lib/api";
import {
    useGetQueryApiFaq,
    useGetQueryTheme,
    useGetQueryTitle,
} from "../../../util/getQueryUrl";
import { postMessageFrameParent } from "../../../util/postMessageFrameParent";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { useRouter } from 'next/router';

type Props = {
    onFinally: () => void;
};

export type DataHelpType = {
    title: string;
    description: string;
};

export function Step0_Help({ onFinally }: Props) {
    const [userQuery, setUserQuery] = useState<string | null>(null);
    const [dataHelp, setDataHelp] = useState<DataHelpType[]>([]);
    const [wasConsulted, setWasConsulted] = useState(false);
    const [messageError, setMessageError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [question, setQuestion] = useState<DataHelpType | null>(null);

    const titleHeader = useGetQueryTitle();
    const urlApi = useGetQueryApiFaq();
    const theme = useGetQueryTheme();

    const router = useRouter();

    useEffect(() => {
        postMessageFrameParent();
        console.log("mudou tamanho frame");
    }, [dataHelp, question]);

    useEffect(() => {
        setMessageError(null);

     
        if (urlApi) {
            if (!validator.isURL(urlApi)) {
                console.log("url invalida: ", urlApi);
                onFinally();
            }
        }

        if (!userQuery) {
            setMessageError("ex: horario atendimento");
            setLoading(false);
            return;
        }

        if (!userQuery || userQuery.length < 4) {
            setMessageError("digite pelo menos 4 caracteres");
            setLoading(false);
            return;
        }

        setLoading(true);

        async function consultApi() {
            try {
                setWasConsulted(true);
                const result = urlApi
                    ? await apiHelp.get(urlApi + userQuery)
                    : undefined;

                if (result && result.data.length > 0) {
                    setDataHelp(result?.data);
                    setMessageError("Confira os principais resultados abaixo:");
                    setLoading(false);
                } else {
                    setMessageError("Nenhum resultado encontrado =(");
                    setDataHelp([]);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);

                setMessageError("Erro ao fazer a consulta");
                setDataHelp([]);
                setLoading(false);

                setTimeout(() => {
                    onFinally();
                }, 2000);
            }
        }

        const timer = setTimeout(() => {
            consultApi();
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [onFinally, urlApi, userQuery]);

    return (
        <div>
            {/* <Header>{titleHeader}</Header> */}

            {/* INICIO PERGUNTA */}
            {!question && (
                <div>
                    <div className="flex flex-col justify-center h-auto p-4 pb-0 ">
                        <span className="flex justify-center mb-2 text-base font-bold text-gray-700 dark:text-gray-300 ">
                            em que podemos ajudar?
                        </span>

                        <div className="flex items-center">
                            <Input
                                placeholder="digite sua dúvida em poucas palavras..."
                                onChange={(e) => setUserQuery(e.target.value)}
                                className="text-sm"
                                title="digite sua dúvida em poucas palavras para que possamos tentar encontrar uma resposta rapidamente"
                            />
                            <span className="absolute flex items-center justify-center w-8 h-8 text-xl opacity-80 right-4">
                                {loading && (
                                    <AiOutlineLoading className="animate-spin" />
                                )}
                            </span>
                        </div>
                        <span className="flex justify-center h-auto text-sm">
                            <div className="flex justify-center w-full h-6 my-2 mb-8 opacity-80">
                                {messageError}
                            </div>
                        </span>
                    </div>

                    {dataHelp && dataHelp.length > 0 && (
                        <ul className="flex flex-col w-full min-h-[200px]  list-decimal px-8 mb-4 overflow-auto text-wr  ">
                            {dataHelp.map((help, index) => (
                                <li key={index} className="p-0 mb-1">
                                    <div className="text-sm font-bold mb">
                                        <div
                                            className="opacity-75 cursor-pointer hover:underline"
                                            onClick={() => setQuestion(help)}
                                        >
                                            {help.title}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {/* FINAL PERGUNTA  */}

            {/* INICIO RESPOSTA */}
            {question && (
                <div className="">
                    <div className="max-w-full max-h-full p-4 pb-0 ">
                        <div className="p-0 mb-1">
                            <div className="mb-2 text-sm font-bold ">
                                {question.title}
                            </div>
                            <div className="overflow-auto text-sm text-justify max-h-52 ">
                                {question.description}
                            </div>
                        </div>
                    </div>
                    <div
                        className={`text-theme-${theme} font-bold my-6 cursor-pointer hover:opacity-70  flex items-center w-[6rem] `}
                        onClick={() => setQuestion(null)}
                    >
                        <BiSkipPrevious className="h-9 w-9" />
                        VOLTAR
                    </div>
                </div>
            )}
            {/* FINAL RESPOSTA */}

            <Button
                className={`flex justify-center  w-[80%] m-auto mb-4 ${
                    !wasConsulted && "invisible"
                }`}
                onClick={onFinally}
            >
                {titleHeader}
            </Button>
        </div>
    );
}
