import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import type {AllProjectsDataType} from "../types";


export const allProjectsData: AllProjectsDataType = {
    'hiworks-user-payroll-access': {
        title: 'Hiworks User: Payroll Slip Access',
        subtitle: 'A secure and intuitive interface for employees to access their payslips.',
        overview: 'This project aimed to provide employees with direct access to their historical and current payroll statements within the Hiworks platform, reducing the administrative burden on the HR department and improving employee convenience.',
        imageUrl: 'https://placehold.co/1200x675/f0f0f0/333?text=Payslip+Viewer+UI',
        techStack: {
            'Core': ['Vue2', 'TypeScript'],
            'Styling': ['element UI', 'SCSS'],
            'State Management': ['Vuex'],
            'Data Fetching': ['Axios']
        },
        keyFeatures: [
            {icon: <CheckCircleOutlineIcon/>, text: 'View current and past payslips'},
            {icon: <CheckCircleOutlineIcon/>, text: 'Securely download payslips as PDF files'},
            {icon: <CheckCircleOutlineIcon/>, text: 'Directly print statements from the browser'},
            {icon: <CheckCircleOutlineIcon/>, text: 'Responsive design for mobile and desktop access'},
        ],
        deepDive: [
            {
                icon: <SettingsOutlinedIcon/>,
                title: "Architectural Choices",
                content: "For rendering PDF documents, I chose the 'React-PDF' library over a standard `<iframe>` approach. While an iframe is simpler to implement, React-PDF offers superior control over the rendering process, such as page-by-page rendering and lazy loading. This significantly improved performance on mobile devices and provided a more integrated, seamless user experience. For state management, Zustand was selected for its minimal boilerplate and simplicity, which was perfectly suited for the feature's scope, avoiding the unnecessary complexity of a larger library like Redux."
            },
            {
                icon: <SecurityOutlinedIcon/>,
                title: "Challenges & Solutions",
                content: "A major challenge was ensuring the secure transmission and rendering of sensitive financial data. To solve this, I worked with the backend team to implement a short-lived, single-use token system for accessing PDF files. On the frontend, I implemented logic to fetch the file as a binary blob and render it directly in the browser memory using React-PDF, preventing the file URL from being easily exposed or cached insecurely in the browser."
            }
        ],
        outcome: "The feature successfully reduced HR department inquiries regarding payslip issuance by over 50%. It empowered employees with self-service capabilities and received positive feedback for its ease of use and accessibility.",
        links: {
            // live: '#',
            // github: '#'
        }
    },
};
