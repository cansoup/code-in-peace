import LaunchIcon from '@mui/icons-material/Launch';

const OpenResume = () => {
    return (
        <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-transparent text-black font-semibold px-8 py-3 rounded-md border-1 border-black hover:bg-black hover:text-white transition-colors duration-300"
        >
            <LaunchIcon/> View Resume (PDF)
        </a>
    )
}

export default OpenResume
