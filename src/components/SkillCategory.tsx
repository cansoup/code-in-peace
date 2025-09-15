interface Props {
    title: string
    skills: string[]
}

export const SkillCategory = ({title, skills}: Props) => (
    <div className="py-4">
        <h3 className="text-lg font-semibold text-black mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
                <span key={index}
                      className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full border border-gray-200">
                    {skill}
                </span>
            ))}
        </div>
    </div>
);
