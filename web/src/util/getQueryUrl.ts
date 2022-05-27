import { useSearchParams } from "react-router-dom";

export function useGetQueryTheme() {
    const [query] = useSearchParams();

    const url = query.get("theme") ?? "0";
    const decode = decodeURIComponent(url);

    return decode;
}

export function useGetQueryApiFaq() {
    const [query] = useSearchParams();

    return decodeURIComponent(query.get("apiFaq") ?? "") ?? "";
}

export function useGetQueryTitle() {
    const [query] = useSearchParams();

    const url = query.get("title") ?? "Deixe seu Feedback";
    const decode = decodeURIComponent(url);

    return decode;
}

export function useGetQueryEmail() {
    const [query] = useSearchParams();

    const url = query.get("email") ?? "oi@widgetdev.online";
    const decode = decodeURIComponent(url);

    return decode;
}

export function useGetQueryWhatsapp() {
    const [query] = useSearchParams();

    const url = query.get("whatsapp") ?? "";
    const decode = decodeURIComponent(url);

    return decode;
}

export function useGetQueryInstagram() {
    const [query] = useSearchParams();

    const url = query.get("instagram") ?? "";
    const decode = decodeURIComponent(url);

    return decode;
}

export function useGetQueryOpen() {
    const [query] = useSearchParams();

    const url = query.get("open") === "false" ? false : true;
    // const decode = decodeURIComponent(url);

    return url;
}

export function useGetQueryHasScreenshotButton() {
    const [query] = useSearchParams();

    const url = query.get("screenshot") === "false" ? false : true;
    // const decode = decodeURIComponent(url);

    return url;
}
