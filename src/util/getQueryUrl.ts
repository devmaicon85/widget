import { useRouter } from "next/router";
import validator from "validator";

export function useGetQueryTheme() {
    const router = useRouter();
    const query = router.query;

    const theme = query.theme;
    const decode = isNaN(Number(theme)) ? 0 : Number(theme);

    return String(decode);
}

export function useGetQueryApiFaq() {
    const router = useRouter();
    const query = router.query;

    const url = query.apiFaq;

    if (!url || url === "") {
        return "";
    }

    if(typeof url !== 'string') return;

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
    const router = useRouter();
    const query = router.query;

    const title = query.title ?? "";

    if(typeof title !== 'string') return;


    try {
        const decode = decodeURIComponent(title);
        return decode;
    } catch (error) {
        return "Fale Conosco 💭";
    }
}

export function useGetQueryEmail() {
    const router = useRouter();
    const query = router.query;

    const email = query.email ?? "oi@widgetdev.online";

    if(typeof email !== 'string') return;


    try {
        const decode = decodeURIComponent(email.trim());

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
    const router = useRouter();
    const query = router.query;

    const whatsapp = query.whatsapp ?? "";

    if(typeof whatsapp !== 'string') return;


    try {
        const decode = decodeURIComponent(whatsapp);
        const phone = decode.replace(/\D/gim, ""); // retorna apenas numeros

        return phone;
    } catch (error) {
        return "";
    }
}

export function useGetQueryInstagram() {
    const router = useRouter();
    const query = router.query;

    const instagram = query.instagram ?? "";

    if(typeof instagram !== 'string') return;

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
    const router = useRouter();
    const query = router.query;

    const open = query.open === "false" ? false : true;

    return open;
}

export function useGetQueryHasScreenshotButton() {
    const router = useRouter();
    const query = router.query;

    const screenshot =
        query.screenshot === "false" ? false : true;

    return screenshot;
}
