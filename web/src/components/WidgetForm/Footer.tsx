import { GitBranch } from "phosphor-react";
import { useSearchParams } from "react-router-dom";

export function Footer() {
    const [query, setQuery] = useSearchParams();

    return (
        <footer className="bottom-0 flex items-center justify-center h-12 text-xs no-underline bg-light-text-secondary bg-opacity-10 rounded-b-2xl">
            <a
                href="https://github.com/devmaicon85/widget.v2/"
                className="flex no-underline text-light-text-secondary"
                target="_blank"
            >
                <GitBranch size={18} className="ml-1 mr-1" />
                WidgetDev v2
            </a>
        </footer>
    );
}
