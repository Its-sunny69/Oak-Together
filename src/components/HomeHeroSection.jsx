import { MapImg, WalletIcon } from "../assets";

function HomeHeroSection() {

    const mapImageDiv = (
        <div className="flex gap-5 cursor-pointer w-[45%]" >
            <img src={MapImg} className="rounded-lg" />
        </div>
    )

    // Temp variables
    const limit = 500
    const dummyData = [340, 250, 150, 290, 490, 420, 460, 280, 180]
    const measures = [0, 100, 200, 300, 400, 500]
    const increase = 23

    const barChart = (
        <div className="flex gap-10 px-8 py-8 rounded-lg bg-gradient-to-r from-[#313860] to-[#151928] items-end h-3/4">
            <div className="flex flex-col gap-3">
                {measures.reverse().map(measure => <div className="text-white text-[10px] font-semibold" key={measure}>{measure}</div>)}
            </div>
            {dummyData.map(count => {
                const height = count * 100 / 500;
                return(
                    <div className="w-1.5 bg-white rounded-t-full rounded-b-full" style={{height: `${height}%`}}>
                    </div>
                )
            })}
        </div>
    )

    // More temp data:
    const progressBoxData = [
        {type: "Users", count: 32984, target: 66000},
        {type: "Clicks", count: 242, target: 400, symbol:"m"},
        {type: "Sales", count: 2400, target: 6000, symbol: "$"},
        {type: "Items", count: 320, target: 740}
    ]

    const ProgressBox = ({ icon=WalletIcon, type, count, target, symbol="" }) => { 
        const progress = count * 100 / target;
        return (
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    <div className="bg-teal-300 p-1.5 rounded-lg">
                        <img src={icon} className="w-3 "/>
                    </div>
                    <p className="text-[#A0AEC0] text-sm font-semibold">{type}</p>
                </div>
                <h3 className="font-semibold">{count.toLocaleString()}{symbol}</h3>
                <div className="w-full h-0.5 bg-gray-200">
                    <div className="bg-teal-300 h-full" style={{width: progress}}></div>
                </div>
            </div>
        )
    }

    const PriceCard = ({}) => {

    }


    return (
        <div className="flex gap-2 py-6">
            {mapImageDiv}
            <div className="flex flex-col px-4 gap-8 w-1/2 rounded-lg shadow-gray-200 shadow-lg">
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
                    {progressBoxData.map(({icon, type, count, target, symbol}) => {
                        return <ProgressBox 
                            icon= {icon}
                            type= {type}
                            count= {count}
                            target= {target}
                            symbol= {symbol}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomeHeroSection;