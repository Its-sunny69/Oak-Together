import { LogoPng } from "../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/userSlice";
import toast from "react-hot-toast";

function SideNavBar({selectedPageName}) {
    
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const NavbarListItem = ({ item }) => {
        return (
            <li
                className="mt-2.5 py-4  text-center hover:bg-[#60D6D9] rounded-xl cursor-pointer text-sm"
                style={{backgroundColor: selectedPageName === item? "#60D6D9": ""}}
                onClick={() => navigate("../" + item.toLowerCase())}
            >
                {item}
            </li>
        )
    }

    const navbarItems = [
        "Home",
        "Map",
        "Events",
        "AskAI",
        "Oaks",
        "Learnings",
        "Shop",
        "Leaderboards"
    ];

    const handleLogout = () => {
        localStorage.removeItem("userId");
        dispatch(logoutUser()); // <-- clear Redux state
        toast.success(`User ${userData?.name} has been logged out successfully.`);
        navigate("/");
    }

    return (
        <div className="flex flex-col items-center gap-8 w-1/6 min-w-[280px] py-2 px-4 justify-start">
            <h2 className="flex font-bold items-center  w-11/12 gap-2 p-2 border-b-2 border-[#83e2c1]">
                <img src={LogoPng} className="w-12" />
                OAK TOGETHER
            </h2>
            <ul className="w-full flex-grow">
                {navbarItems.map(item => <NavbarListItem key={item} item={item} />)}
            </ul>
            <div className="flex flex-col gap-8 mb-8">
                {/* <p className="cursor-pointer hover:opacity-[0.8]">Settings</p> */}
                <p 
                className="text-red-500 cursor-pointer hover:font-semibold "
                onClick={handleLogout}
                >
                    LOGOUT
                </p>
            </div>
        </div>
    )
}

export default SideNavBar;