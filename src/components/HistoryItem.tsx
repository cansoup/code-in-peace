interface Props {
    title: string
    period: string
    institution: string
    description: string
}

export const HistoryItem = ({title, period, institution, description}: Props) => (
    <div className="py-6 border-b border-gray-200 last:border-b-0 px-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
                <h3 className="text-xl font-semibold text-black">{title}</h3>
                <p className="text-md text-gray-600">{institution}</p>
            </div>
            <span className="text-sm text-gray-500 mt-2 sm:mt-0 flex-shrink-0 sm:ml-4">{period}</span>
        </div>
        <p className="mt-3 text-gray-700">
            {description}
        </p>
    </div>
);
