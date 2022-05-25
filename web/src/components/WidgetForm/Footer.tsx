import { GitBranch } from "phosphor-react";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getQueryCode } from "../../util/getQueryUrl";

export function Footer() {
    const [query, setQuery] = useSearchParams();

    return (
        <footer className="bottom-0 no-underline text-xs h-12 bg-light-text-secondary bg-opacity-10 rounded-b-2xl flex items-center justify-center">
            <a
                href="https://widgetdev.online"
                className="flex no-underline text-light-text-secondary"
                target="_blank"
            >
                <GitBranch size={18} className="ml-1 mr-1" />
                Projeto OpenSource
            </a>
        </footer>
    );
}
