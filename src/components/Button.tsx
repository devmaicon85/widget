import { useGetQueryTheme } from "../util/getQueryUrl";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...rest }: ButtonProps) {
    const theme = useGetQueryTheme();

    return (
        <button
            className={`
                
                        p-2
                        flex-1 
                        disabled:bg-light-surface-secondary-hover
                        dark:disabled:bg-dark-surface-secondary-hover
                        
                        bg-theme-${theme}
                        
                        border-theme-${theme}
                        
                        hover:bg-theme-${theme}
                        hover:border-theme-${theme}
                        flex justify-center items-center text-sm
                        disabled:cursor-not-allowed
                        disabled:scale-100
                        rounded-[4px]
                        ease-linear
                        hover:duration-100
                        hover:scale-95
                        outline-none
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-opacity-40 
                        focus:ring-offset-2 
                        focus:ring-offset-white 
                        dark:focus:ring-offset-zinc-900
                        
                        focus:ring-theme-${theme}
                        
                        text-light-surface-primary
                        
                        dark:bg-theme-${theme}
                        dark:text-dark-text-primary 
                        dark:focus:ring-offset-dark-surface-primary

                        ${className}
                        
                        `}
            {...rest}
        ></button>
    );
}
