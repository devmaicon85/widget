import { CircleNotch } from "phosphor-react";

export function Loading() {
    return (
        <div className="w-5 h-5 flex items-center justify-center overflow-hidden">
            <CircleNotch className="w-4 h-4 animate-spin " weight="bold" />
        </div>
    );
}
