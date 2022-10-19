import { Check } from "phosphor-react";

interface Props {
    check: boolean;
    handleCheck: () => void;
}

export function Checkbox({ check, handleCheck }: Props) {
    return (
        <button
            onClick={handleCheck}
            className={"h-8 w-8 bg-white rounded-md border-2 text-3xl flex "}
        >
            {check && <Check className="text-slate-900" />}
        </button>
    );
}
