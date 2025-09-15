import type {ReactElement} from "react";

export interface ProjectFeature {
    icon: ReactElement;
    text: string;
}

export interface ProjectDeepDive {
    icon: ReactElement;
    title: string;
    content: string;
}

export interface ProjectType {
    title: string;
    subtitle: string;
    overview: string;
    imageUrl: string;
    techStack: Record<string, string[]>;
    keyFeatures: ProjectFeature[];
    deepDive: ProjectDeepDive[];
    outcome: string;
    links: {
        live?: string;
        github?: string;
    };
}

export type AllProjectsDataType = Record<string, ProjectType>;
