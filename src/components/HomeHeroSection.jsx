import { CartPng, MapImg, RocketPng, SettingsPng, WalletIcon } from "../assets";
import { useNavigate } from "react-router-dom";

function HomeHeroSection() {

    const navigate = useNavigate();

    const mapImageDiv = (
        <div
            className="flex gap-5 cursor-pointer w-[50%]"
            onClick={() => navigate("/map")}
        >
            <img src={MapImg} className="rounded-lg" />
        </div>
    )

    // Temp variables
    const limit = 500
    const dummyData = [340, 250, 150, 290, 490, 420, 460, 280, 180]
    const measures = [0, 100, 200, 300, 400, 500]
    const increase = 23
    let countId = 0; // temporary id variable

    const barChart = (
        <div className="flex flex-grow justify-between p-8 rounded-lg bg-gradient-to-r from-[#313860] to-[#151928] items-end h-3/4">
            <div className="flex flex-col gap-3">
                {measures.reverse().map(measure => <div className="text-white text-[10px] font-semibold" key={measure}>{measure}</div>)}
            </div>
            {dummyData.map(count => {
                const height = count * 100 / 500;
                return (
                    <div key={countId++} className="w-[6px] bg-white rounded-t-full rounded-b-full ml-2" style={{ height: `${height}%` }}>
                    </div>
                )
            })}
        </div>
    )

    // More temp data:
    const progressBoxData = [
        { id: 1, type: "Users", count: 32984, target: 66000 },
        { id: 2, icon: RocketPng, type: "Clicks", count: 242, target: 400, symbol: "m" },
        { id: 3, icon: CartPng, type: "Sales", count: 2400, target: 6000, symbol: "$" },
        { id: 4, icon: SettingsPng, type: "Items", count: 320, target: 740 }
    ]

    const ProgressBox = ({ icon = WalletIcon, type, count, target, symbol = "" }) => {
        const progress = count * 100 / target;
        return (
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    <div className="bg-teal-300 p-1.5 rounded-lg">
                        <img src={icon} className="w-3 " />
                    </div>
                    <p className="text-[#A0AEC0] text-sm font-semibold">{type}</p>
                </div>
                <h3 className="font-semibold">{count.toLocaleString()}{symbol}</h3>
                <div className="w-full h-0.5 bg-gray-200">
                    <div className="bg-teal-300 h-full" style={{ width: progress }}></div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex gap-2 py-6">
            {mapImageDiv}
            <div className="flex flex-col px-4 gap-8 w-[60%] rounded-lg shadow-gray-200 shadow-lg">
                {barChart}
                <div className="px-2">
                    <h3 className="font-bold mb-1 text-[#2D3748]">Active Users</h3>
                    <p className="text-gray-500 text-sm">
                        <span className="text-green-500 font-semibold mr-1">
                            (+{increase})
                        </span>
                        than last week
                    </p>
                </div>
                <div className="flex justify-between mr-8 pb-6 px-2">
                    {progressBoxData.map(({ id, icon, type, count, target, symbol }) => {
                        return <ProgressBox
                            key={id}
                            icon={icon}
                            type={type}
                            count={count}
                            target={target}
                            symbol={symbol}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomeHeroSection;