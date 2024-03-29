export type DataScriptType = {
    theme: string;
    title: string;
    email: string;
    open: string;
    whatsapp: string;
    instagram: string;
    screenshot: string;
    apiFaq: string;
};

export const DataScript = {
    theme: {
        field: "theme",
        label: "Cor do tema do seu Widget",
        description: "",
        placeholder: "",
        default: "0",
    },
    title: {
        field: "title",
        label: "Título do Widget",
        description: "aparecerá no cabeçalho do Widget",
        placeholder: "Feedback, Fale Conosco, WhatsApp",
        default: "Deixe seu Feedback",
    },
    email: {
        field: "email",
        label: "E-mail",
        description: "que você receberá os contatos",
        placeholder: "contato@seunegocio.com",
        default: "oi@widgetdev.online",
    },
    whatsapp: {
        field: "whatsapp",
        label: "WhatsApp",
        description: "que você receberá os contatos",
        placeholder: "5511999998888",
        default: "",
    },
    instagram: {
        field: "instagram",
        label: "Instagram",
        description:
            "seu perfil no instagram. Será sugerido para usuário seguir.",
        placeholder: "@rocketseat",
        default: "",
    },
    open: {
        field: "open",
        label: "Iniciar aberto?",
        description: "ao carregar a página abrirá o widget automaticamente",
        placeholder: "",
        default: "true",
    },
    screenshot: {
        field: "screenshot",
        label: "Ativar o botão Screenshot?",
        description: "Botão para o usuário tirar um screenshot da tela",
        placeholder: "",
        default: "true",
    },

    apiFaq: {
        field: "apifaq",
        label: "URL API de Perguntas e Respostas",
        description: `Você pode criar suas perguntas e respostas públicas em https://faq.widgetdev.online`,
        placeholder: "",
        default: "",
    },
};

export type DataScriptIndexs = keyof typeof DataScript;

export type DataScriptTypes = typeof DataScript;
