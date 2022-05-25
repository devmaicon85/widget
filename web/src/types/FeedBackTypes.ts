const bugImageUrl = new URL("../assets/bug.svg", import.meta.url).href;
const ideaImageUrl = new URL("../assets/idea.svg", import.meta.url).href;
const outherImageUrl = new URL("../assets/outher.svg", import.meta.url).href;

export const feedbackTypes = {
    BUG: {
        title: `Problema`,
        image: {
            src: bugImageUrl,
            alt: "Imagem de um inseto",
        },
        placeholder:
            "Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...",
    },

    IDEA: {
        title: "Ideia",
        image: {
            src: ideaImageUrl,
            alt: "Imagem de um lâmpada",
        },
        placeholder:
            "Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!",
    },
    OTHER: {
        title: "Dúvida",
        image: {
            src: outherImageUrl,
            alt: "Imagem de um balão de pensamento",
        },
        placeholder: "Queremos te ouvir. Qual seria sua dúvida?",
    },
};

export type FeedBackType = keyof typeof feedbackTypes;
