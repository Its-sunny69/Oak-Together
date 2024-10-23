import { BadgePng, DoorBellPng, LargeTreePng, DeadTreePng, ProfileImg, TrophyPng } from "../assets"

function ProfileHeader({mapPageActive}) {

    const userInfo = (
        <div className="flex w-3/5 gap-2 pl-4 py-2 rounded-lg shadow-md shadow-[#60D6D9]/30 cursor-pointer">
            <img src={ProfileImg} />
            <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-[#3BA5DA]">Bio-planto-logist</p>
            </div>
        </div>
    )

    // Temporary variable:
    let unseenNotifs = true

    const bellIcon = (
        <button className="relative rounded-lg p-2 shadow-md shadow-[#60D6D9]/30">
            {unseenNotifs && <div className="absolute top-0 right-0 bg-red-600 h-2 w-2 rounded-full"></div>}
            <img src={DoorBellPng} />
        </button>
    )

    // Dummy planted and barren counts:
    const plantedCount = 1000, barrenCount = 1000;

    const plantedIcon = (
        <button className="flex gap-2 items-center rounded-lg py-2 px-6 shadow-md shadow-[#60D6D9]/30">
            <img src={LargeTreePng} />
            {plantedCount}
        </button>
    )

    const barrenIcon = (
        <button className="flex gap-2 items-center rounded-lg py-2 px-6 shadow-md shadow-[#60D6D9]/30">
            <img src={DeadTreePng} />
            {barrenCount}
        </button>
    )

    const scoreIcon = (
        <div className="flex items-center gap-2 px-8 py-2 rounded-lg p-2 shadow-md shadow-[#60D6D9]/30 cursor-pointer">
            <img src={TrophyPng} />
            <p>1340</p>
        </div>
    )

    return (
        <div className="flex justify-between w-full">
            <div className="flex w-3/4 gap-5">
                {userInfo}
                {bellIcon}
                {mapPageActive && plantedIcon}
                {mapPageActive && barrenIcon}
            </div>
            <div className="flex gap-4">
                <img src={BadgePng} className="w-45 h-12 mt-4"/>
                {scoreIcon}
            </div>
        </div>
    )
}

export default ProfileHeader;