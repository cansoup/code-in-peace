import {Outlet} from "react-router-dom";
import Menus from "../Menus.tsx";
import MyInfo from "../MyInfo.tsx";
import Contacts from "../Contacts.tsx";
import Footer from "../Footer.tsx";

const DefaultLayout = () => {
    return (
        <div className="py-8 px-16 relative h-screen">
            <Menus/>
            <MyInfo/>
            <div className="flex justify-end mt-20">
                <div className="w-[69%]">
                    <Outlet/>
                </div>
            </div>
            <Contacts/>
            <Footer/>
        </div>
    )
}

export default DefaultLayout
