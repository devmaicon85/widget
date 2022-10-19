import { LabelHTMLAttributes, ReactNode } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
}
export function Label({ className, children, ...rest }: Props) {
    return (
        <label
            {...rest}
            className={`p-1 text-sm font-bold text-zinc-800 ${className}`}
        >
            {children}
        </label>
    );
}
