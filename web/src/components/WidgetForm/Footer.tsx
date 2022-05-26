import { GitBranch } from "phosphor-react";
import { useSearchParams } from "react-router-dom";
import { getTheme } from "../../util/getQueryUrl";
import { Theme } from "./ButtonTheme";

export function Footer() {
    const [query, setQuery] = useSearchParams();

    return (
        <footer
            className={`flex items-center justify-center w-full h-12 text-xs no-underline bg-gray-200  dark:bg-dark-surface-secondary border-b-4 border-theme-${getTheme()} rounded-b-2xl`}
        >
            <a
                href="https://github.com/devmaicon85/widget.v2/"
                className="flex no-underline text-light-text-secondary"
                target="_blank"
                rel="noreferrer"
            >
                <GitBranch size={18} className="ml-1 mr-1" />
                WidgetDev v2
            </a>
            <Theme />
        </footer>
    );
}
