import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Header from "../components/HeaderPage";
import {
    getQueryEmail,
    getQueryOpen,
    getTheme,
    getQueryTitle,
    getQueryHasScreenshotButton,
    getQueryWhatsapp as getWhatsapp,
    getQueryInstagram,
} from "../util/getQueryUrl";

import { Check } from "phosphor-react";
import { createScriptUser, executeScriptUser } from "../util/createScriptUser";
import { DataScript, DataScriptTypes } from "../types/DataScriptTypes";

export function Home() {
    const [selectedTheme, setSelectedTheme] = useState(getTheme());
    const [title, setTitle] = useState(getQueryTitle());
    const [email, setEmail] = useState(getQueryEmail());
    const [whatsapp, setWhatsapp] = useState(getWhatsapp());
    const [instagram, setInstagram] = useState(getQueryInstagram());

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
    ]);

    return (
        <div className="bg-slate-100">
            <Header />

            <div className="container mx-auto px-4 sm:px-8 max-w-3xl bg-white ">
                <div className="py-8">
                    <h1 className="text-2xl mb-2 p-4 rounded-lg">
                        <div className="mb-4 text-center tracking-widest leading-10">
                            Instale Agora um{" "}
                            <label
                                className={`bg-theme-${selectedTheme} text-slate-100 text-xl rounded-md pr-5 pl-5 pt-1 pb-1 m-3`}
                            >
                                WidgetDev
                            </label>
                            no seu site
                        </div>
                    </h1>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="border p-4 flex flex-col gap-3 rounded-xl">
                            <div className="md:m-5">
                                <label className="text-md text-zinc-800 font-bold p-1">
                                    Cor do tema do seu Widget
                                </label>

                                <div className="grid grid-cols-8 md:grid-cols-12  rounded-md justify-between ">
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
                                <label className="text-sm text-zinc-800 font-bold p-1">
                                    Título do Widget
                                </label>
                                <Input
                                    maxLength={85}
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title ?? ""}
                                    placeholder="Feedback, Contato, Fale Conosco... "
                                />
                            </div>
                            <label className="text-sm text-zinc-800 font-bold p-1">
                                {data.email.label}
                                <div className="text-sm font-thin p-1">
                                    {data.email.description}
                                </div>
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder={data.email.placeholder}
                                />
                            </label>

                            <label className="text-sm text-zinc-800 font-bold p-1">
                                {data.whatsapp.label}
                                <div className="text-sm font-thin p-1">
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

                            <label className="text-sm text-zinc-800 font-bold p-1">
                                {data.instagram.label}
                                <div className="text-sm font-thin p-1">
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

                            {/* OPEN  */}
                            <label className="text-md text-zinc-800 font-bold ">
                                {data.open.label}{" "}
                                <div className="text-sm font-thin">
                                    {data.open.description}
                                </div>
                            </label>

                            <button
                                onClick={() => setOpen(!open)}
                                className={`h-8 w-8 bg-white rounded-md border-2 text-3xl flex `}
                            >
                                {open && <Check className="text-slate-900" />}
                            </button>

                            <label className="text-md text-zinc-800 font-bold p-1">
                                {data.screenshot.label}
                                <span className="text-sm font-thin p-1">
                                    {data.screenshot.description}
                                </span>
                            </label>

                            <button
                                onClick={() =>
                                    setHasScreenshotButton(!hasScreenshotButton)
                                }
                                className={`h-8 w-8 bg-white rounded-md border-2 text-3xl flex `}
                            >
                                {hasScreenshotButton && (
                                    <Check className="text-slate-900" />
                                )}
                            </button>
                        </div>
                        <div className="p-10 text-base justify-center text-center">
                            Copie o código abaixo e cole dentro do HTML do seu
                            site para implantar o Wedget automaticamente
                        </div>
                        <div className="font-mono h-full rounded-3xl break-words  w-full border-2 bg-slate-800  text-slate-300 p-3">
                            {createScriptUser({
                                theme: String(selectedTheme),
                                title,
                                email,
                                open: String(open),
                                whatsapp,
                                instagram,
                                screenshot: String(hasScreenshotButton),
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
