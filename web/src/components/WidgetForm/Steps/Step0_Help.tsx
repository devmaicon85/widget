import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSkipPrevious } from "react-icons/bi";
import { apiHelp } from "../../../lib/api";
import {
    useGetQueryApiFaq,
    useGetQueryTheme,
    useGetQueryTitle,
} from "../../../util/getQueryUrl";
import { postMessageFrameParent } from "../../../util/postMessageFrameParent";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Header } from "../Header";

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

    useEffect(() => {
        setMessageError(null);

        if (urlApi.length < 20) {
            console.log("url da api é menor que 20 caracteres");
            onFinally();
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
                const result = await apiHelp.get(urlApi + userQuery);

                if (result.data.length > 0) {
                    setDataHelp(result?.data);
                    setMessageError("Confira os principais resultados abaixo:");
                } else {
                    setMessageError("Nenhum resultado encontrado =(");
                    setDataHelp([]);
                }
            } catch (error) {
                console.log(error);

                setMessageError("Erro ao fazer a consulta");
                setDataHelp([]);

                setTimeout(() => {
                    onFinally();
                }, 2000);
            }
        }

        const timer = setTimeout(() => {
            consultApi();
            setLoading(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [onFinally, urlApi, userQuery]);

    useEffect(() => {
        postMessageFrameParent();
    }, [dataHelp, question]);

    return (
        <div>
            <Header>{titleHeader}</Header>

            {/* INICIO PERGUNTA */}
            {!question && (
                <div>
                    <div className="flex flex-col justify-center h-auto p-4 pb-0 ">
                        <span className="flex justify-center mb-2 text-base font-bold text-gray-700 dark:text-gray-300 ">
                            em que podemos ajudar?
                        </span>

                        <div className="flex items-center">
                            <Input
                                placeholder="digite aqui sua dúvida em poucas palavras..."
                                onChange={(e) => setUserQuery(e.target.value)}
                                className="text-sm"
                                title="digite aqui sua dúvida em poucas palavras para que possamos tentar encontrar uma resposta rapidamente"
                            />
                            <span className=" absolute opacity-80 text-xl h-8 flex justify-center items-center w-8 right-4">
                                {loading && (
                                    <AiOutlineLoading className="animate-spin" />
                                )}
                            </span>
                        </div>
                        <span className="flex justify-center h-auto text-sm">
                            <div className="opacity-80 my-2 mb-8 h-6 w-full justify-center flex">
                                {messageError}
                            </div>
                        </span>
                    </div>

                    {dataHelp && dataHelp.length > 0 && (
                        <ul className="flex flex-col w-full min-h-[200px] list-decimal px-8 mb-4 overflow-auto text-wr max-h-96 ">
                            {dataHelp.map((help, index) => (
                                <li key={index} className="p-0 mb-1 border-0">
                                    <div className="mb text-sm font-bold border-0">
                                        <div
                                            className="cursor-pointer hover:underline opacity-75"
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
                <div>
                    <div className="flex flex-col w-full p-4 mb-2 overflow-auto border-0 text-wr max-h-96 ">
                        <div className="p-0 mb-1 border-0">
                            <div className="mb-2 text-sm font-bold border-0">
                                {question.title}
                            </div>
                            <div className="text-sm">
                                {question.description}
                            </div>

                            <div
                                className={`text-theme-${theme} font-bold cursor-pointer hover:opacity-70  flex items-center w-[6rem] mt-6`}
                                onClick={() => setQuestion(null)}
                            >
                                <BiSkipPrevious className="h-9 w-9" />
                                VOLTAR
                            </div>
                        </div>
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
