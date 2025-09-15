import {Link, useParams} from "react-router-dom";
import {allProjectsData} from "../constants/detailed-project-data.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {DetailSection} from "../components/ProjectDetailSection.tsx";
import {Feature} from "../components/Feature.tsx";
import {SkillTag} from "../components/SkillTag.tsx";

export const ProjectDetails = () => {
    const {id} = useParams()
    const projectId = id || 'hiworks-user-payroll-access';
    const project = allProjectsData[projectId];

    if (!project) {
        return (
            <div className="text-center p-10">
                <h2 className="text-2xl font-bold">Project Not Found</h2>
                <Link to="/projects" className="text-black hover:underline mt-4 inline-block">
                    &larr; Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen text-black font-sans">
            <div>
                <header className="mb-12">
                    <Link to="/projects"
                          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6">
                        <ArrowBackIcon/>
                        <span>Back to Projects</span>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">{project.title}</h1>
                    <p className="mt-3 text-lg text-gray-700">{project.subtitle}</p>
                </header>

                <main>
                    <div className="mb-12">
                        <img src={project.imageUrl} alt={project.title}
                             className="w-full rounded-lg border border-gray-200"/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2">
                            <section className="mb-12">
                                <h3 className="text-2xl font-bold text-black pb-3 mb-6 border-b-2 border-black">Overview</h3>
                                <p className="text-gray-700 leading-relaxed">{project.overview}</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-black pb-3 mb-6 border-b-2 border-black">Technical
                                    Deep Dive</h3>
                                <div className="space-y-8">
                                    {project.deepDive.map((item, index: number) => (
                                        <DetailSection key={index} {...item} />
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside>
                            <section className="mb-8">
                                <h3 className="text-xl font-bold text-black pb-3 mb-4 border-b border-black">Tech
                                    Stack</h3>
                                <div className="space-y-4">
                                    {Object.entries(project.techStack).map(([category, skills]) => (
                                        <div key={category}>
                                            <h4 className="font-semibold text-gray-600 mb-2 text-sm uppercase tracking-wider">{category}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map(skill => <SkillTag key={skill} skill={skill}/>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-black pb-3 mb-4 border-b border-black">Key
                                    Features</h3>
                                <div className="space-y-4">
                                    {project.keyFeatures.map((feature, index) => (
                                        <Feature key={index} {...feature} />
                                    ))}
                                </div>
                            </section>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
    );
}
