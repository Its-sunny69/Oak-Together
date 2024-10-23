import { BadgePng, DoorBellPng, LargeTreePng, DeadTreePng, ProfileImg, TrophyPng } from "../assets"

function ProfileHeader({mapPageActive}) {

    const userInfo = (
        <div className="flex justify-left items-center w-3/5 gap-2 pl-4 py-2 text-sm rounded-lg shadow-md shadow-[#60D6D9]/30 cursor-pointer">
            <img src={ProfileImg} className="w-[10%]" />
            <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-[#3BA5DA]">Bio-planto-logist</p>
            </div>
        </div>
    )

    // Temporary variable:
    let unseenNotifs = true

    const bellIcon = (
        <button className="relative rounded-lg py-1 px-2 shadow-md shadow-[#60D6D9]/30">
            {unseenNotifs && <div className="absolute top-0 right-0 bg-red-600 h-2 w-2 rounded-full animate-ping"></div>}
            <img src={DoorBellPng} className="w-8 h-8"/>
        </button>
    )

    // Dummy planted and barren counts:
    const plantedCount = 1000, barrenCount = 1000;

    const plantedIcon = (
        <button className="flex gap-2 items-center rounded-lg py-2 px-6 shadow-md shadow-[#60D6D9]/30">
            <img src={LargeTreePng} className="w-8 h-8"/>
            {plantedCount}
        </button>
    )

    const barrenIcon = (
        <button className="flex gap-2 items-center rounded-lg py-2 px-6 shadow-md shadow-[#60D6D9]/30">
            <img src={DeadTreePng} className="w-8 h-8"/>
            {barrenCount}
        </button>
    )

    const scoreIcon = (
        <div className="flex items-center gap-2 px-8 py-2 rounded-lg shadow-md shadow-[#60D6D9]/30 cursor-pointer">
            <img src={TrophyPng} className="w-8 h-8"/>
            <p>1340</p>
        </div>
    )

    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex w-3/4 gap-5">
                {userInfo}
                {bellIcon}
                {mapPageActive && plantedIcon}
                {mapPageActive && barrenIcon}
            </div>
            <div className="flex gap-4 justify-between items-center">
                <img src={BadgePng} className="w-9 h-9"/>
                {scoreIcon}
            </div>
        </div>
    )
}

export default ProfileHeader;