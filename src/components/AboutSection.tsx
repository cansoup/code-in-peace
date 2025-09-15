import type {ReactNode} from "react";

interface Props {
    sectionTitle: string;
    sectionIcon?: ReactNode;
    children?: ReactNode;
}

const AboutSection = ({sectionTitle, sectionIcon, children}: Props) => {
    return (
        <section>
            <h3 className="font-bold text-2xl pb-4 mb-4 border-b-1 border-gray-300">{sectionIcon} {sectionTitle}</h3>
            <div>
                {children}
            </div>
        </section>
    )
}

export default AboutSection;
