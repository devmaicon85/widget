import { getTheme } from "../util/getQueryUrl";

export type InputProps = React.ComponentPropsWithoutRef<"input">;

export function Input({ className, ...rest }: InputProps) {
    return (
        <input
            className={`
            
            w-full 
            text-sm
            border
            h-9
            p-3
            dark:placeholder-dark-text-secondary dark:text-dark-text-primary dark:border-dark-stroke
            placeholder-light-text-secondary placeholder:opacity-100 text-light-text-primary border-light-stroke
            bg-transparent
            outline-none
            focus:border-theme-${getTheme()}
            focus:ring-theme-${getTheme()}
            focus:ring-1
            resize-none

            
            rounded scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin
            ${className}
            `}
            {...rest}
        />
    );
}
