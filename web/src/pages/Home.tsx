import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import Header from "../components/HeaderPage";
import { Input } from "../components/Input";
import { DataScript, DataScriptTypes } from "../types/DataScriptTypes";
import { createScriptUser, executeScriptUser } from "../util/createScriptUser";
import {
    getQueryApiFaq,
    getQueryEmail,
    getQueryHasScreenshotButton,
    getQueryInstagram,
    getQueryOpen,
    getQueryTitle,
    getQueryWhatsapp as getWhatsapp,
    getTheme,
} from "../util/getQueryUrl";

export function Home() {
    const [query] = useSearchParams();

    const [selectedTheme, setSelectedTheme] = useState(getTheme());
    const [title, setTitle] = useState(getQueryTitle());
    const [email, setEmail] = useState(getQueryEmail());
    const [whatsapp, setWhatsapp] = useState(getWhatsapp());
    const [instagram, setInstagram] = useState(getQueryInstagram());
    const [apiFaq, setApiFaq] = useState(getQueryApiFaq(query));

    const [open, setOpen] = useState(getQueryOpen());
    const [hasScreenshotButton, setHasScreenshotButton] = useState(
        getQueryHasScreenshotButton()
    );

    // const [dataOptionsWidget, setDataOptionWidget] = useState<DataScriptTypes>()

    const [data, setData] = useState<DataScriptTypes>(DataScript);

    useEffect(() => {
        const timer = setTimeout(() => {
            executeScriptUser({
                theme: String(selectedTheme),
                title,
                email,
                open: String(open),
                screenshot: String(hasScreenshotButton),
                whatsapp,
                instagram,
                apiFaq,
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, [
        title,
        selectedTheme,
        email,
        open,
        whatsapp,
        instagram,
        hasScreenshotButton,
        apiFaq,
    ]);

    return (
        <div className="bg-slate-100">
            <Header />

            <div className="container max-w-3xl px-4 mx-auto bg-white sm:px-8 ">
                <div className="py-8">
                    <h1 className="p-4 mb-2 text-2xl rounded-lg">
                        <div className="mb-4 leading-10 tracking-widest text-center">
                            Instale Agora um{" "}
                            <label
                                className={`bg-theme-${selectedTheme} text-slate-100 text-xl rounded-md pr-5 pl-5 pt-1 pb-1 m-3`}
                            >
                                WidgetDev
                            </label>
                            no seu site
                        </div>
                    </h1>
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="flex flex-col gap-3 p-4 border rounded-xl">
                            <div className="md:m-5">
                                <label className="p-1 font-bold text-md text-zinc-800">
                                    Cor do tema do seu Widget
                                </label>

                                <div className="grid justify-between grid-cols-8 rounded-md md:grid-cols-12 ">
                                    {Array.from({ length: 21 }).map(
                                        (array, theme) => (
                                            <Button
                                                key={theme}
                                                onClick={() =>
                                                    setSelectedTheme(`${theme}`)
                                                }
                                                className={`
                                                        button
                                                        h-7 m-2 
                                                        bg-theme-${theme}
                                                        bg-opacity-100
                                                        focus:ring-2
                                                        focus:ring-offset-2
                                                        hover:bg-theme-${theme}
                                                        hover:bg-opacity-80
                                                        hover:border-black
                                                `}
                                            >
                                                {theme ===
                                                    Number(selectedTheme) && (
                                                    <Check
                                                        height={50}
                                                        width={50}
                                                        color="#FFF"
                                                    />
                                                )}
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="p-1 text-sm font-bold text-zinc-800">
                                    Título do Widget
                                </label>
                                <Input
                                    maxLength={85}
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title ?? ""}
                                    placeholder="Feedback, Contato, Fale Conosco... "
                                />
                            </div>
                            <label className="p-1 text-sm font-bold text-zinc-800">
                                {data.email.label}
                                <div className="p-1 text-sm font-thin">
                                    <pre>{data.email.description}</pre>
                                </div>
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder={data.email.placeholder}
                                />
                            </label>

                            <label className="p-1 text-sm font-bold text-zinc-800">
                                {data.whatsapp.label}
                                <div className="p-1 text-sm font-thin">
                                    {data.whatsapp.description}
                                </div>
                                <Input
                                    placeholder={data.whatsapp.placeholder}
                                    onChange={(e) =>
                                        setWhatsapp(e.target.value)
                                    }
                                    value={whatsapp}
                                />
                            </label>

                            {/* // INSTAGRAM */}
                            <label className="p-1 text-sm font-bold text-zinc-800">
                                {data.instagram.label}
                                <div className="p-1 text-sm font-thin">
                                    {data.instagram.description}
                                </div>
                                <Input
                                    placeholder={data.instagram.placeholder}
                                    onChange={(e) =>
                                        setInstagram(e.target.value)
                                    }
                                    value={instagram}
                                />
                            </label>

                            {/* //API HELP */}
                            <label className="p-1 text-sm font-bold text-zinc-800">
                                {data.apiFaq.label}
                                <div className="p-1 text-sm font-thin">
                                    {data.apiFaq.description}
                                    no link:
                                    <a
                                        href="https://faq.widgetdev.online"
                                        target="_blank"
                                        className="hover:underline"
                                        rel="noreferrer"
                                    >
                                        https://faq.widgetdev.online
                                    </a>
                                </div>
                                <Input
                                    placeholder={data.apiFaq.placeholder}
                                    onChange={(e) => setApiFaq(e.target.value)}
                                    value={apiFaq}
                                />
                            </label>

                            {/* OPEN  */}
                            <label className="font-bold text-md text-zinc-800 ">
                                {data.open.label}{" "}
                                <div className="text-sm font-thin">
                                    {data.open.description}
                                </div>
                            </label>

                            <button
                                onClick={() => setOpen(!open)}
                                className={
                                    "h-8 w-8 bg-white rounded-md border-2 text-3xl flex "
                                }
                            >
                                {open && <Check className="text-slate-900" />}
                            </button>

                            <label className="p-1 font-bold text-md text-zinc-800">
                                {data.screenshot.label}
                                <span className="p-1 text-sm font-thin">
                                    {data.screenshot.description}
                                </span>
                            </label>

                            <button
                                onClick={() =>
                                    setHasScreenshotButton(!hasScreenshotButton)
                                }
                                className={
                                    "h-8 w-8 bg-white rounded-md border-2 text-3xl flex "
                                }
                            >
                                {hasScreenshotButton && (
                                    <Check className="text-slate-900" />
                                )}
                            </button>
                        </div>
                        <div className="justify-center p-6 text-base text-center">
                            Copie e cole o código abaixo dentro do HTML do seu
                            site para implantar o WidgetDev automaticamente
                        </div>
                        <div className="w-full h-full p-4 font-mono text-sm break-words rounded-xl bg-slate-800 text-slate-300">
                            {createScriptUser({
                                theme: String(selectedTheme),
                                title,
                                email,
                                open: String(open),
                                whatsapp,
                                instagram,
                                screenshot: String(hasScreenshotButton),
                                apiFaq: String(apiFaq),
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
