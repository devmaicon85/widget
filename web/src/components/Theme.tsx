import { ReactNode } from "react";
import { Footer } from "./WidgetForm/Footer";
import { Header } from "./WidgetForm/Header";

type Props = {
    children: ReactNode;
};
export function Theme({ children }: Props) {
    return (
        <>
            <Header>Titulo do FORM</Header>

            <div
                className={
                    "sd:w-auto relative mb-2 max-h-full min-h-[300px] w-[calc(100vw-2rem)] min-w-[350px] max-w-[400px] rounded-2xl rounded-tl-3xl bg-light-surface-primary text-light-text-primary shadow-md dark:bg-dark-background dark:text-dark-text-primary "
                }
            >
                <div id="main" className={" w-full"}>
                    {children}
                </div>
            </div>

            <Footer />
        </>
    );
}
