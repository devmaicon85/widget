import { useSearchParams } from "react-router-dom";
import validator from "validator";

export function useGetQueryTheme() {
    const [query] = useSearchParams();

    const theme = query.get("theme");
    const decode = isNaN(Number(theme)) ? 0 : Number(theme);

    return String(decode);
}

export function useGetQueryApiFaq() {
    const [query] = useSearchParams();

    const url = query.get("apiFaq");

    if (!url || url === "") {
        return "";
    }

    try {
        const decode = decodeURIComponent(url);

        if (!validator.isURL(decode)) {
            console.log("url api inválida", decode);
            return "";
        }

        return decode;
    } catch (error) {
        return "";
    }
}

export function useGetQueryTitle() {
    const [query] = useSearchParams();

    const title = query.get("title") ?? "";

    try {
        const decode = decodeURIComponent(title);
        return decode;
    } catch (error) {
        return "Fale Conosco 💭";
    }
}

export function useGetQueryEmail() {
    const [query] = useSearchParams();

    const email = query.get("email")?.trim() ?? "oi@widgetdev.online";

    try {
        const decode = decodeURIComponent(email);

        if (!validator.isEmail(decode)) {
            console.log("email fornecido é inválido", decode);
            return "";
        }

        return decode;
    } catch (error) {
        return "";
    }
}

export function useGetQueryWhatsapp() {
    const [query] = useSearchParams();

    const whatsapp = query.get("whatsapp") ?? "";

    try {
        const decode = decodeURIComponent(whatsapp);
        const phone = decode.replace(/\D/gim, ""); // retorna apenas numeros

        return phone;
    } catch (error) {
        return "";
    }
}

export function useGetQueryInstagram() {
    const [query] = useSearchParams();

    const instagram = query.get("instagram") ?? "";
    try {
        const decode = decodeURIComponent(instagram);

        const perfil = decode.trim().replace("@", "").replace("/", "");

        if (perfil === "") {
            return "";
        }

        const insta = `https://instagram.com/${perfil}`;

        if (!validator.isURL) {
            console.log("url do instagram não é válida");
            return "";
        }

        return insta;
    } catch (error) {
        console.log("instagram inválido");
        return "";
    }
}

export function useGetQueryOpen() {
    const [query] = useSearchParams();

    const open = query.get("open")?.trim() === "false" ? false : true;

    return open;
}

export function useGetQueryHasScreenshotButton() {
    const [query] = useSearchParams();

    const screenshot =
        query.get("screenshot")?.trim() === "false" ? false : true;

    return screenshot;
}
