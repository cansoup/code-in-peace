import type {AllProjectsDataType} from "../types";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'; // 엑셀 아이콘 추가
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';

export const allProjectsData: AllProjectsDataType = {
    'hiworks-user-payroll-access': {
        title: 'Hiworks User: Payroll Slip Access',
        subtitle: 'A secure and intuitive interface for employees to access their payslips.',
        overview: 'This project aimed to provide employees with direct access to their historical and current payroll statements within the Hiworks platform, reducing the administrative burden on the HR department and improving employee convenience.',
        imageUrl: 'https://static.hiworks.com//www/static/images/www.hiworks.com/renew/product/function/img_attendance_user02.png',
        techStack: {
            'Core': ['Vue2', 'TypeScript'],
            'Styling': ['element UI', 'SCSS'],
            'Data Handling': ['exceljs'],
            'State Management': ['Vuex'],
            'Data Fetching': ['Axios']
        },
        keyFeatures: [
            {icon: <CheckCircleOutlineIcon/>, text: 'View current and past payslips'},
            {icon: <CheckCircleOutlineIcon/>, text: 'Securely download payslips as PDF files'},
            {icon: <CheckCircleOutlineIcon/>, text: 'Export payroll data to Excel'},
            {icon: <CheckCircleOutlineIcon/>, text: 'Directly print statements from the browser'},
        ],
        deepDive: [
            {
                icon: <SecurityOutlinedIcon/>,
                title: "Enhanced Security via Re-authentication",
                content: "Given the sensitive nature of payroll data, I implemented a critical security gateway. Before accessing the payslip menu, users are required to re-enter their password for verification. This process generates a short-lived, single-use token that authenticates them for the session, ensuring that sensitive information is protected even on a logged-in device."
            },
            {
                icon: <HubOutlinedIcon/>,
                title: "State Management with Composition API",
                content: "To manage the feature's state and business logic, I leveraged Vue's Composition API to create a dedicated 'usePayMenuContext' function. This approach centralizes all reactive state (like selected year, payslip data, and sort order) and related methods (API calls, sorting, bulk selection) into a single, reusable hook. This cleanly separates the UI components from the underlying logic, significantly improving code maintainability, testability, and scalability."
            },
            {
                icon: <BarChartOutlinedIcon/>,
                title: "Advanced Client-Side Data Export",
                content: "To provide users with a convenient way to analyze their payroll data, I implemented a client-side Excel export feature using 'exceljs'. This library was chosen for its comprehensive API, which not only allows for creating styled workbooks but also for inserting Excel formulas directly into specific cells for dynamic calculations. To enhance code readability and maintain a clear separation of concerns between UI/UX and business logic, I encapsulated the entire Excel file generation process into a dedicated utility function. This approach offloaded data processing from the server, resulting in a faster, more responsive user experience for data downloads."
            },
            {
                icon: <SettingsOutlinedIcon/>,
                title: "Performance & UX Optimization",
                content: "To prevent excessive API calls during rapid user interactions, such as quickly clicking through years, I implemented a debounce function on the year change event handler. In the details modal, I also implemented logic to dynamically add empty rows to align the payment and deduction tables. This ensures a symmetrical and polished UI, demonstrating a commitment to both performance and a high-quality user experience."
            }
        ],
        outcome: "The feature successfully reduced HR department inquiries regarding payslip issuance by over 50%. It empowered employees with self-service capabilities and received positive feedback for its ease of use and accessibility.",
        links: {
            // live: '#',
            // github: '#'
        }
    },
};
