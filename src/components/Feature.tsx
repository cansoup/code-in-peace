import type {ReactNode} from "react";

interface Props {
    icon: ReactNode,
    text: string
}

export const Feature = ({icon, text}: Props) => (
    <div className="flex items-center gap-3">
        <div className="text-black">{icon}</div>
        <span className="text-gray-800">{text}</span>
    </div>
);
