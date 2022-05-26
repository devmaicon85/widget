import { CircleNotch } from "phosphor-react";

export function Loading() {
    return (
        <div className="flex items-center justify-center w-5 h-5 overflow-hidden">
            <CircleNotch className="w-4 h-4 animate-spin " weight="bold" />
        </div>
    );
}
