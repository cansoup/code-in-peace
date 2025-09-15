import type {AllProjectsDataType} from "../types";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

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
    'hiworks-payroll-management': {
        title: 'Hiworks Admin: Payroll Management System',
        subtitle: 'An efficient and secure system for payroll administrators to manage and process company-wide salary payments.',
        overview: 'This project provides a comprehensive solution for payroll management, from initial setup to final processing. Administrators can register employee payroll data in bulk via Excel upload, review historical records, and securely integrate with the e-approval system, streamlining the entire payroll workflow.',
        imageUrl: 'https://static.hiworks.com//www/static/images/www.hiworks.com/renew/product/function/img_attendance_manager03.png',
        techStack: {
            'Core': ['Vue.js', 'TypeScript'],
            'Styling': ['SCSS'],
            'Data Handling': ['exceljs'],
            'State Management': ['Vue Composition API'],
            'Integration': ['E-Approval System API']
        },
        keyFeatures: [
            {icon: <CheckCircleOutlineIcon/>, text: 'Bulk payroll registration via Excel upload'},
            {icon: <CheckCircleOutlineIcon/>, text: 'Automated data validation and error feedback'},
            {icon: <CheckCircleOutlineIcon/>, text: 'View and manage monthly payroll history'},
            {icon: <CheckCircleOutlineIcon/>, text: 'Password-protected Excel creation for security'},
            {icon: <CheckCircleOutlineIcon/>, text: 'Seamless integration with e-approval workflows'},
        ],
        deepDive: [
            {
                icon: <AdminPanelSettingsOutlinedIcon/>,
                title: "Robust Bulk Data Processing & Validation",
                content: "The core of this feature is a robust Excel upload system for batch payroll registration. I implemented a multi-stage client-side validation process before any data is sent to the server. This includes verifying the Excel sheet's structure, column integrity, and data types. Crucially, it cross-references employee names and IDs against the active user database to prevent errors from mismatched or inactive accounts. If validation fails, users are presented with a clear modal that highlights the exact cells with incorrect data, ensuring a user-friendly and error-proof workflow."
            },
            {
                icon: <SecurityOutlinedIcon/>,
                title: "Secure Workflow Integration",
                content: "To bridge the gap between payroll confirmation and official approval, I developed a feature that integrates directly with the e-approval system. When an admin initiates an approval request, the system generates a password-protected Excel file containing the payroll data. I utilized 'exceljs' on the client-side to create this encrypted file, ensuring that sensitive financial information remains secure during transit and throughout the approval process."
            },
            {
                icon: <HubOutlinedIcon/>,
                title: "Modular & Maintainable Architecture",
                content: "Complex business logic, such as date calculations, Excel file generation, and data validation, was intentionally abstracted into separate, reusable modules (e.g., `payrollExcel.ts`, `varifyAccount.ts`, `YearMonthDate.ts`). This separation of concerns not only makes the main component (`PayrollTab.vue`) clean and focused on the UI, but also significantly improves the overall testability and maintainability of the codebase, allowing for easier updates and debugging."
            }
        ],
        outcome: "This system dramatically reduced the time and effort required for monthly payroll processing. The automated validation and clear error feedback minimized human error, while the e-approval integration created a secure and streamlined end-to-end workflow for administrators.",
        links: {}
    },
};
