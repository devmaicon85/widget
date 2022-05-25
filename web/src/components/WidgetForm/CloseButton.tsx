import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function CloseButton({ ...rest }: ButtonProps) {
    return (
        <Popover.Button
            className="absolute 
            top-6
            right-5
            text-xl 
            text-light-surface-primary
            opacity-70 
            hover:opacity-100
            dark:text-dark-text-primary
            dark:hover:text-dark-text-primary 
            
            "
            title="Fechar formulário de FeedBack"
            {...rest}
        >
            <X className="h-6 w-6" weight="bold" />
        </Popover.Button>
    );
}
