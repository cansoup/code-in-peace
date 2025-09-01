interface MenusProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

const Menus = ({currentPage, onNavigate}: MenusProps) => {
    const menuItems = [
        {name: 'home', page: 'home'},
        {name: 'projects', page: 'projects'},
        {name: 'about', page: 'about'},
    ]

    return (
        <nav className=" flex font-bold justify-end gap-12">
            {menuItems.map(item => (
                <button key={item.page}
                        onClick={() => onNavigate(item.page)}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                            currentPage === item.page
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {item.name}
                </button>
            ))}
        </nav>
    )

}

export default Menus;
