import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { apiHelp } from "../../../lib/api";
import { getQueryApiFaq, getQueryTitle } from "../../../util/getQueryUrl";
import { postMessageFrameParent } from "../../../util/postMessageFrameParent";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { TextArea } from "../../TextArea";
import { Header } from "../Header";

type Props = {
    onFinally: () => void;
};

type DataHelpType = {
    title: string;
    description: string;
};

export function Step0_Help({ onFinally }: Props) {
    const [userQuery, setUserQuery] = useState<string | null>(null);
    const [dataHelp, setDataHelp] = useState<DataHelpType[]>([]);
    const [wasConsulted, setWasConsulted] = useState(false);
    const [messageError, setMessageError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [query] = useSearchParams();
    const urlApi = getQueryApiFaq(query);

    useEffect(() => {
        setLoading(true);
        setMessageError(null);

        if (urlApi.length < 20) {
            console.log("url da api é menor que 20 caracteres");
            onFinally();
        }

        async function consultApi() {
            try {
                if (!userQuery || userQuery.length < 4) {
                    setMessageError("digite pelo menos 4 caracteres");
                    return;
                }

                setWasConsulted(true);
                const result = await apiHelp.get(urlApi + userQuery);

                if (result.data.length > 0) {
                    setDataHelp(result?.data);
                } else {
                    setMessageError("Nenhum resultado encontrado");
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
    }, [dataHelp]);

    return (
        <>
            <Header>{getQueryTitle()}</Header>

            <div className="flex flex-col justify-center h-auto p-4 ">
                <span className="flex justify-center mb-2 text-base font-bold text-gray-700 dark:text-gray-300 ">
                    em que podemos ajudar?
                </span>

                <Input
                    placeholder="digite aqui sua dúvida em poucas palavras..."
                    onChange={(e) => setUserQuery(e.target.value)}
                    title="digite aqui sua dúvida em poucas palavras para que possamos tentar encontrar uma resposta rapidamente"
                />
                <span className="absolute flex justify-center gap-2 p-2 text-xs right-5">
                    {loading && <AiOutlineLoading className="animate-spin" />}
                </span>
                <span className="flex justify-center h-auto text-sm font-extralight">
                    <div className="p-2 text-gray-500">
                        {messageError
                            ? messageError
                            : "exemplo: horário atendimento"}
                    </div>
                </span>
            </div>

            {dataHelp && (
                <>
                    <ul className="flex flex-col w-full p-4 mb-4 overflow-auto border-0 text-wr max-h-96 ">
                        {dataHelp.map((help, index) => (
                            <li key={index} className="p-2 border-0">
                                <div className="mb-2 text-sm font-bold border-0">
                                    {help.title}
                                </div>
                                <div className="text-sm text-justify">
                                    <TextArea
                                        disabled={true}
                                        value={help.description}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <Button
                className={`flex justify-center  w-[80%] m-auto mb-4 ${
                    !wasConsulted && "invisible"
                }`}
                onClick={onFinally}
            >
                {getQueryTitle()}
            </Button>
        </>
    );
}
