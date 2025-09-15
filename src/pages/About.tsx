import AboutSection from "../components/AboutSection.tsx";
import {certifications} from "../constants/certificates.ts";
import {HistoryItem} from "../components/HistoryItem.tsx";
import {educations} from "../constants/educations.ts";
import {experiences} from "../constants/experiences.ts";
import {SkillCategory} from "../components/SkillCategory.tsx";
import {skillSets} from "../constants/skillsets.ts";

const About = () => {
    return <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-16">
            <AboutSection sectionTitle="Experience">
                {experiences.map((exp, index) => (
                    <HistoryItem key={index} {...exp} />
                ))}
            </AboutSection>
            <AboutSection sectionTitle="Education">
                {educations.map((edu, index) => (
                    <HistoryItem key={index} {...edu} />
                ))}
            </AboutSection>
            <AboutSection sectionTitle="SkillSet">
                {Object.entries(skillSets).map(([category, skills]) => (
                    <SkillCategory key={category} title={category} skills={skills}/>
                ))}
            </AboutSection>
            <AboutSection sectionTitle="Certifications">
                {certifications.map((cert, index) => (
                    <HistoryItem key={index} {...cert} />
                ))}
            </AboutSection>
        </div>
    </div>
}

export default About;
