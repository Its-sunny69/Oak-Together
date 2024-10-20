import { BadgePng, DoorBellPng, ProfileImg, TrophyPng } from "../assets"

function ProfileHeader() {

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
        <div className="relative rounded-lg p-2 shadow-md shadow-[#60D6D9]/30 cursor-pointer">
            {unseenNotifs && <div className="absolute top-0 right-0 bg-red-600 h-2 w-2 rounded-full"></div>}
            <img src={DoorBellPng} />
        </div>
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
            </div>
            <div className="flex gap-4">
                <img src={BadgePng} className="w-45 h-12 mt-4"/>
                {scoreIcon}
            </div>
        </div>
    )
}

export default ProfileHeader;