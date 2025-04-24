import { useEffect } from "react";
import { DefaultCoverPic, GCPIconPng, CoinPng, TrophyPng } from "../assets"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserById } from "../features/userSlice";

function ProfileHeader2({ children, absolutePositionObj }) {

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    const isSponsor = userData?.role == "ORGANIZATION"

    return (
        <div className="relative w-full h-[42vh] animate-fade-down transition-all">
            <div
                className="absolute top-0 right-0 left-0 bottom-12 rounded-xl bg-[#60D6D9]"
                style={{
                    backgroundImage: `url(${DefaultCoverPic})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
            </div>

            <div className="absolute top-2 right-2 flex gap-4">
                <div className="flex gap-1 rounded-lg bg-white py-4 px-8 text-[18px] cursor-pointer">
                    <img src={isSponsor ? GCPIconPng : CoinPng} alt="Coins" />
                    <span>{userData?.points}</span>
                </div>
                <div className="flex gap-1 rounded-lg bg-white py-4 px-8 text-[18px] cursor-pointer">
                    <img src={TrophyPng} alt="Trophies" />
                    <span>{userData?.points}</span>
                </div>
            </div>

            <div
                className="absolute top-40 right-6 left-6 min-h-[18vh] py-2 pl-5 pr-8 rounded-xl bg-white shadow-[rgba(96,214,217,0.2)_0px_0px_10px_3px] flex justify-between items-center"
                style={absolutePositionObj}
            >
                {children}
            </div>
        </div>
    )
}

export default ProfileHeader2