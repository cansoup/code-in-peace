import {Link, useLocation} from "react-router";


const Menus = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        {name: 'home', path: '/'},
        {name: 'about', path: 'about'},
        {name: 'projects', path: 'projects'},
    ]

    return (
        <nav
            className="flex justify-end font-bold items-end gap-6 mt-4 md:mt-0 md:top-16 md:right-16 md:absolute md:flex-col">
            {menuItems.map(item => (
                <Link key={item.path}
                      to={item.path}
                      className={`duration-150 ${
                          currentPath === item.path
                              ? 'text-gray-700'
                              : 'text-gray-700 hover:text-gray-300'
                      }`}
                >
                    <div className="h-4 flex items-center font-medium">
                        {currentPath === item.path ?
                            <div className="size-3 rounded-full bg-black"></div> :
                            <div>{item.name}</div>}
                    </div>
                </Link>
            ))}
        </nav>
    )

}

export default Menus;
