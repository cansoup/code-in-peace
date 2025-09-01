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
        <nav className="absolute flex flex-col font-bold items-end gap-6 top-16 right-16">
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
