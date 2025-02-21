import { GCPIconPng, CoinPng, DoorBellPng, ProfileImg, TrophyPng } from "../assets";
import { useNavigate } from "react-router-dom";

function ProfileHeader() {

    const navigate = useNavigate();

    const userInfo = (
        <div
            className="flex justify-left items-center w-3/5 gap-2 pl-4 py-2 text-sm rounded-lg shadow-md shadow-[#60D6D9]/30 cursor-pointer"
            onClick={() => navigate("/profile")}
        >
            <img src={ProfileImg} className="w-[10%]" />
            <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-[#3BA5DA]">Bio-planto-logist</p>
            </div>
        </div>
    )

    // Temporary variable:
    let unseenNotifs = true
    const isSponsor = false;

    const bellIcon = (
        <button className="relative rounded-lg py-1 px-4 shadow-md shadow-[#60D6D9]/30 hover:shadow-inherit hover:opacity-50">
            {unseenNotifs && <div className="absolute top-0 right-0 bg-red-600 h-2 w-2 rounded-full animate-ping"></div>}
            <img src={DoorBellPng} className="w-8 h-8" />
        </button>
    )

    // clicking on the icon will navigate user to marketplace
    const coinIcon = (
        <div className="flex items-center gap-2 px-8 py-2 rounded-lg shadow-md shadow-[#60D6D9]/30 cursor-pointer">
            <img src={isSponsor? GCPIconPng: CoinPng} alt="Coins" />
            <span>1020</span>
        </div>
    )

    // clicking on the icon will navigate user to leaderboards
    const trophyIcon = (
        <div className="flex items-center gap-2 px-8 py-2 rounded-lg shadow-md shadow-[#60D6D9]/30 cursor-pointer">
            <img src={TrophyPng} className="w-8 h-8" />
            <span>1340</span>
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