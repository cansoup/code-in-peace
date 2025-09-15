import type {ReactNode} from "react";

interface Props {
    icon: ReactNode,
    title: string,
    content: string,
}

export const DetailSection = ({icon, title, content}: Props) => (
    <div className="flex items-start gap-4">
        <div className="text-black mt-1">{icon}</div>
        <div>
            <h4 className="text-xl font-semibold text-black">{title}</h4>
            <p className="mt-2 text-gray-700">{content}</p>
        </div>
    </div>
);
