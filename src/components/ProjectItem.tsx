import {Link} from "react-router";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
    id: string
    title: string
    description: string
    tags: string[]
}

export const ProjectItem = ({id, title, description, tags}: Props) => (
    <Link
        to={`/project/${id}`}
        className="block group px-4 py-8 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
    >
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
                <p className="text-gray-600 mb-4 max-w-2xl">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag}
                              className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full border border-gray-200">
              {tag}
            </span>
                    ))}
                </div>
            </div>
            <div className="ml-4 mt-1">
                <ArrowForwardIcon
                    className="!h-6 !w-6 text-gray-400 group-hover:text-black transition-colors duration-300"/>
            </div>
        </div>
    </Link>
);
