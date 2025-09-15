import {projectsData} from "../constants/projects.ts";
import {ProjectItem} from "../components/ProjectItem.tsx";
import AboutSection from "../components/AboutSection.tsx";

const Project = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-16">
                <AboutSection sectionTitle="Projects">
                    <div>
                        {projectsData.map((project) => (
                            <ProjectItem key={project.id} {...project} />
                        ))}
                    </div>
                </AboutSection>
            </div>
        </div>
    )
}

export default Project;
