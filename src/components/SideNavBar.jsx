import { LogoPng } from "../assets";


function SideNavBar() {

    const NavbarListItem = ({item}) => {
        return (
            <li className="mt-4 py-3 text-center hover:bg-[#60D6D9] rounded-xl cursor-pointer">
                {item}
            </li>
        )
    }

    const navbarItems = [
        "Home",
        "Map",
        "Events",
        "Oaks",
        "Learnings",
        "Map",
        "Shop",
        "Leaderboards"
    ];

    return (
        <div className="flex flex-col items-center gap-8 w-1/4 min-w-[280px] py-2 px-4">
            <h3 className="flex font-bold items-center  w-11/12 gap-2 p-2 border-b-2 border-[#83e2c1]">
                <img src={LogoPng} className="w-12" />
                OAK TOGETHER
            </h3>
            <ul className="w-full">
                {navbarItems.map(item => <NavbarListItem key={item} item={item}/>)}
            </ul>
        </div>
    )
}

export default SideNavBar;