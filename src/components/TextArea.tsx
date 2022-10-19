import { TextareaHTMLAttributes } from "react";
import { useGetQueryTheme } from "../util/getQueryUrl";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ ...rest }: TextAreaProps) {
    const theme = useGetQueryTheme();

    return (
        <textarea
            {...rest}
            className={` w-full min-h-[112px]
                    text-sm
                    rounded scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin

                    bg-transparent
                    border
                    text-light-text-primary 
                    border-light-stroke
                    focus:border-theme-${theme}
                    focus:ring-1
                    focus:ring-theme-${theme}

                    dark:placeholder-dark-text-secondary 
                    dark:text-dark-text-primary 
                    dark:border-dark-stroke
                    
                    placeholder-light-text-secondary 
                    resize-none
                    outline-none
                    `}
        />
    );
}
