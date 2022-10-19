import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function CloseButton({ ...rest }: ButtonProps) {
    return (
        <Popover.Button
            className="absolute text-xl top-6 right-5 text-light-surface-primary opacity-70 hover:opacity-100 dark:text-dark-text-primary dark:hover:text-dark-text-primary "
            title="Fechar formulário de FeedBack"
            {...rest}
        >
            <X className="w-6 h-6" weight="bold" />
        </Popover.Button>
    );
}
