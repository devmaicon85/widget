import { useSearchParams } from "react-router-dom";

export function getTheme() {
    const [query] = useSearchParams();
    return query.get("theme") ?? 0;
}

export function getQueryTitle() {
    const [query] = useSearchParams();
    return query.get("title") ?? "Deixe seu Feedback";
}

export function getQueryCode() {
    const [query] = useSearchParams();
    return query.get("code") ?? "demo";
}

export function getQueryEmail() {
    const [query] = useSearchParams();
    return query.get("email") ?? "oi@widgetdev.online";
}

export function getQueryWhatsapp() {
    const [query] = useSearchParams();
    return query.get("whatsapp") ?? "";
}

export function getQueryInstagram() {
    const [query] = useSearchParams();
    return query.get("instagram") ?? "";
}

export function getQueryApiFaq(query: URLSearchParams) {
    return (
        query.get("apifaq") ??
        "https://faq.widgetdev.online/api/public/faq?key=cl3dkln4000512wbzvvmvzh7k&per_page=3&search="
    );
}

export function getQueryOpen() {
    const [query] = useSearchParams();
    return query.get("open") === "false" ? false : true; // padrao é true - abre o widget automatico
}

export function getQueryHasScreenshotButton() {
    const [query] = useSearchParams();
    return query.get("screenshot") === "true" ? true : false; // padrao é false ao iniciar nova configuração
}
