import { Label } from "components/Label";
import { LogoComponent } from "components/LogoComponent";
import Image from "next/image";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import Header from "../components/HeaderPage";
import { Input } from "../components/Input";
import { DataScript, DataScriptTypes } from "../types/DataScriptTypes";
import { createScriptUser, executeScriptUser } from "../util/createScriptUser";

import {
    useGetQueryApiFaq,
    useGetQueryEmail,
    useGetQueryHasScreenshotButton,
    useGetQueryInstagram,
    useGetQueryOpen,
    useGetQueryTheme,
    useGetQueryTitle,
    useGetQueryWhatsapp as getWhatsapp,
} from "../util/getQueryUrl";

export default function Home() {
    const [selectedTheme, setSelectedTheme] = useState(useGetQueryTheme());
    const [title, setTitle] = useState(useGetQueryTitle());
    const [email, setEmail] = useState(useGetQueryEmail());
    const [whatsapp, setWhatsapp] = useState(getWhatsapp());
    const [instagram, setInstagram] = useState(useGetQueryInstagram());
    const [apiFaq, setApiFaq] = useState(useGetQueryApiFaq());

    const [open, setOpen] = useState(useGetQueryOpen());
    const [hasScreenshotButton, setHasScreenshotButton] = useState(
        useGetQueryHasScreenshotButton()
    );

    // const [dataOptionsWidget, setDataOptionWidget] = useState<DataScriptTypes>()

    const [data, setData] = useState<DataScriptTypes>(DataScript);

    const [scriptUser, setScriptUser] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            executeScriptUser({
                theme: String(selectedTheme),
                title: title ?? "",
                email: email ?? "",
                open: String(open),
                screenshot: String(hasScreenshotButton),
                whatsapp: whatsapp ?? "",
                instagram: instagram ?? "",
                apiFaq: apiFaq ?? "",
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

    useEffect(() => {
        const script = createScriptUser({
            theme: String(selectedTheme),
            title: title ?? "",
            email: email ?? "",
            open: String(open),
            whatsapp: whatsapp ?? "",
            instagram: instagram ?? "",
            screenshot: String(hasScreenshotButton),
            apiFaq: String(apiFaq),
        });
        setScriptUser(script);
    }, [
        apiFaq,
        email,
        hasScreenshotButton,
        instagram,
        open,
        selectedTheme,
        title,
        whatsapp,
    ]);

    return (
        <div className="bg-slate-100">
            <Header />

            <div className="container max-w-3xl px-4 mx-auto bg-white sm:px-8 ">
                <div className="flex items-center justify-center py-4 pt-8 mt-4 ">
                    <LogoComponent
                        className={`fill-theme-${selectedTheme}`}
                        maxWidth={350}
                    />
                </div>
                <div className="py-4">
                    <h1 className="px-4 text-2xl rounded-lg">
                        <div className="leading-8 tracking-widest text-center">
                            Instale um WidgetDev no seu site ou blog
                        </div>
                    </h1>
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="flex flex-col gap-3 p-4 rounded-xl">
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
                                <Label htmlFor="title">Título do Widge</Label>
                                <Input
                                    id="title"
                                    maxLength={85}
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title ?? ""}
                                    placeholder="Feedback, Contato, Fale Conosco... "
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">
                                    {data.email.label} -{" "}
                                    {data.email.description}
                                </Label>
                                <Input
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder={data.email.placeholder}
                                />
                            </div>

                            <div>
                                <Label htmlFor="whatsapp">
                                    {data.whatsapp.label} -{" "}
                                    {data.whatsapp.description}
                                </Label>
                                <Input
                                    id="whatsapp"
                                    placeholder={data.whatsapp.placeholder}
                                    onChange={(e) =>
                                        setWhatsapp(
                                            e.target.value.replace(/\D/gim, "")
                                        )
                                    }
                                    value={whatsapp}
                                />
                            </div>

                            {/* // INSTAGRAM */}
                            <div>
                                <Label htmlFor="instagram">
                                    {data.instagram.label} -
                                    {data.instagram.description}
                                </Label>

                                <Input
                                    id="instagram"
                                    placeholder={data.instagram.placeholder}
                                    onChange={(e) =>
                                        setInstagram(e.target.value)
                                    }
                                    value={instagram}
                                />
                            </div>

                            {/* //API HELP */}
                            <label className="p-1 text-sm font-bold text-zinc-800">
                                {data.apiFaq.label}
                                <div className="p-1 text-sm font-normal">
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
                                <div className="text-sm font-normal">
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
                                <span className="p-1 text-sm font-normal">
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
                            {scriptUser}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
