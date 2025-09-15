import LaunchIcon from '@mui/icons-material/Launch';
import {Link} from "react-router";
import {Button} from "@mui/material";

const OpenResume = () => {
    return (
        <Button variant="outlined" color="info">
            <Link
                to="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
            >
                <LaunchIcon/> View Resume (PDF)
            </Link>
        </Button>
    )
}

export default OpenResume
