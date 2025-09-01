import MyInfo from "./components/MyInfo.tsx";
import Contents from "./components/Contents.tsx";
import Menus from "./components/Menus.tsx";
import Contacts from "./components/Contacts.tsx";
import {useState} from "react";
import HomeContent from "./components/contents/HomeContent.tsx";

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderContent = () => {
        switch (currentPage) {
            // case 'projects':
            //     return <ProjectsContent/>;
            // case 'about':
            //     return <AboutContent/>;
            case 'home':
            default:
                return <HomeContent/>;
        }
    };

    return (
        <div className="p-8 relative h-screen">
            <Menus/>
            <MyInfo/>
            <Contents/>
            <Contacts/>
        </div>
    )
}

export default App
