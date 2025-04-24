import { GCPIconPng, CoinPng, DoorBellPng, ProfileImg, TrophyPng } from "../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserById } from "../features/userSlice";

function ProfileHeader() {

    const navigate = useNavigate();

    const { userData } = useSelector((state) => state.user);
    const isSponsor = userData?.role == "ORGANIZATION"

    const userInfo = (
        <div
            className="flex justify-left items-center w-3/5 gap-3 pl-4 py-2 text-sm rounded-lg shadow-md shadow-[#60D6D9]/30 cursor-pointer"
            onClick={() => navigate("/profile")}
        >
            <div
                style={{
                    backgroundImage: `url(${userData?.profilePicture?.url ?? ProfileImg})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "4vw",
                    height: "4vw"
                }}
                className="rounded-full"
            >

            </div>
            <div>
                <h3 className="font-semibold">{userData?.name ?? "User Name"}</h3>
                <p className="text-[#3BA5DA]">{userData?.role ?? "User Role"}</p>
            </div>
        </div>
    )

    // Temporary variable:
    let unseenNotifs = true

    const bellIcon = (
        <button className="relative rounded-lg py-1 px-4 shadow-md shadow-[#60D6D9]/30 hover:shadow-inherit hover:opacity-50">
            {unseenNotifs && <div className="absolute top-0 right-0 bg-red-600 h-2 w-2 rounded-full animate-ping"></div>}
            <img src={DoorBellPng} className="w-8 h-8" />
        </button>
    )

    // clicking on the icon will navigate user to marketplace
    const coinIcon = (
        <div className="flex items-center gap-2 px-8 py-2 rounded-lg shadow-md shadow-[#60D6D9]/30 cursor-pointer">
            <img src={isSponsor ? GCPIconPng : CoinPng} alt="Coins" />
            <span>{userData?.points}</span>
        </div>
    )

    // clicking on the icon will navigate user to leaderboards
    const trophyIcon = (
        <div className="flex items-center gap-2 px-8 py-2 rounded-lg shadow-md shadow-[#60D6D9]/30 cursor-pointer">
            <img src={TrophyPng} className="w-8 h-8" />
            <span>{userData?.points}</span>
        </div>
    )

    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex w-3/4 gap-5">
                {userInfo}
                {bellIcon}
            </div>
            <div className="flex gap-4 justify-between items-center">
                {coinIcon}
                {trophyIcon}
            </div>
        </div>
    )
}

export default ProfileHeader;