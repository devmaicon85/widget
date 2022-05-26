import { Popover } from "@headlessui/react";
import { ChatTeardropDots } from "phosphor-react";
import { useEffect, useState } from "react";
import { CloseButton } from "../components/WidgetForm/CloseButton";
import { WidgetForm } from "../components/WidgetForm/Index";
import { getQueryOpen, getTheme } from "../util/getQueryUrl";
import { postMessageFrameParent } from "../util/postMessageFrameParent";

export function WidgetStart() {
    const [openWidget, setOpenWidget] = useState(false);

    const queryOpenWidget = getQueryOpen();

    useEffect(() => {
        postMessageFrameParent();
    }, [openWidget]);

    useEffect(() => {
        setTimeout(() => {
            setOpenWidget(queryOpenWidget);
        }, 1500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Popover
            id="popover"
            className="absolute bottom-0 right-0 flex flex-col items-end justify-end "
        >
            {() => (
                <>
                    <div className={`${!openWidget && "hidden "} `}>
                        <Popover.Panel static>
                            <WidgetForm />
                            <CloseButton onClick={() => setOpenWidget(false)} />
                        </Popover.Panel>
                    </div>

                    <Popover.Button
                        onClick={() => setOpenWidget(!openWidget)}
                        className={`
                                bg-theme-${getTheme()}
                                rounded-2xl
                                focus:brightness-110
                                outline-none
                                px-3 h-14 w-14 text-white
                                flex items-center group justify-center

                                transition
                                ease-in-out
                                delay-150
                                duration-300
                                ${!openWidget && "hover:animate-bounce "}

                                ${openWidget && "hidden "}
                            `}
                    >
                        <ChatTeardropDots className="w-8 h-8" />
                    </Popover.Button>
                </>
            )}
        </Popover>
    );
}
