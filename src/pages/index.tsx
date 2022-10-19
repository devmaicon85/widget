import { Checkbox } from "components/Checkbox";
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
                    <LogoComponent className={`fill-theme-${selectedTheme}`} />
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
                                <Label htmlFor="title">Título do Widget</Label>
                                <Input
                                    theme={selectedTheme}
                                    id="title"
                                    maxLength={85}
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title ?? ""}
                                    placeholder="Feedback, Contato, Fale Conosco... "
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="email"
                                    description={data.email.description}
                                >
                                    {data.email.label}
                                </Label>
                                <Input
                                    theme={selectedTheme}
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder={data.email.placeholder}
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="whatsapp"
                                    description={data.whatsapp.description}
                                >
                                    {data.whatsapp.label}
                                </Label>
                                <Input
                                    theme={selectedTheme}
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
                                <Label
                                    htmlFor="instagram"
                                    description={data.instagram.description}
                                >
                                    {data.instagram.label}
                                </Label>

                                <Input
                                    theme={selectedTheme}
                                    id="instagram"
                                    placeholder={data.instagram.placeholder}
                                    onChange={(e) =>
                                        setInstagram(e.target.value)
                                    }
                                    value={instagram}
                                />
                            </div>

                            {/* //API HELP */}
                            <div>
                                <Label description={data.apiFaq.description}>
                                    {data.apiFaq.label}
                                </Label>
                                <Input
                                    theme={selectedTheme}
                                    placeholder={data.apiFaq.placeholder}
                                    onChange={(e) => setApiFaq(e.target.value)}
                                    value={apiFaq}
                                />
                            </div>

                            {/* OPEN  */}
                            <div className="flex items-center gap-4">
                                <Checkbox
                                    check={open}
                                    handleCheck={() => setOpen(!open)}
                                />
                                <Label description={data.open.description}>
                                    {data.open.label}
                                </Label>
                            </div>

                            {/* SCREENSHOT */}
                            <div className="flex items-center gap-4">
                                <Checkbox
                                    check={hasScreenshotButton}
                                    handleCheck={() =>
                                        setHasScreenshotButton(
                                            !hasScreenshotButton
                                        )
                                    }
                                />

                                <Label
                                    description={data.screenshot.description}
                                >
                                    {data.screenshot.label}
                                </Label>
                            </div>
                        </div>
                        <hr className="my-4 border-0 border-gray-300" />
                        <Label>
                            Copie e cole o código abaixo dentro do HTML do seu
                            site para implantar o WidgetDev automaticamente
                        </Label>
                        <div className="w-full h-full p-4 font-mono text-sm break-words rounded-xl bg-slate-800 text-slate-300">
                            {scriptUser}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
