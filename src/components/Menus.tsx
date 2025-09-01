const Menus = ({currentPage, onNavigate}) => {
    const menuItems = [
        {name: 'home', page: 'home'},
        {name: 'projects', page: 'projects'},
        {name: 'about', page: 'about'},
    ]

    return (
        <div className=" flex font-bold justify-end gap-12">
            <div>Main</div>
            <div>About</div>
            <div>Projects</div>
        </div>
    )

}

export default Menus;
