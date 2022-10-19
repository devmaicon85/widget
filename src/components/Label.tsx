import { LabelHTMLAttributes, ReactNode } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    description?:string;
}
export function Label({ className, children, description, ...rest }: Props) {
    return (
        <label
            {...rest}
            className={`p-1 text-sm font-bold text-zinc-800 ${className}`}
        >
            {children}
            <div className="p-1 pt-0 text-xs font-normal">{description}</div>
        </label>
    );
}
