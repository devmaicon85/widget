import { ArrowLeft } from "phosphor-react";
export function ButtonArrowLeft({ ...rest }) {
    return (
        <button
            {...rest}
            className="absolute text-xl top-6 left-5 text-brand-text opacity-70 text-light-surface-primary hover:opacity-100 dark:text-dark-text-primary dark:hover:text-dark-text-primary"
            title="Voltar para escolher tipo de FeedBack"
        >
            <ArrowLeft className="w-6 h-6" weight="bold" />
        </button>
    );
}
