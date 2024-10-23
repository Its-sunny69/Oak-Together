import { HandWithPenPng, IrrigationPng, ConfettiPng, UserPng, Calendar1Png, MultiplyPng, SeasonPng } from "../assets";

function LocationDetailComponent({ lastMarkerDiv, setLastMarkerDiv, selectedLocationId, setSelectedLocationId, revertStyle, }) {

    // We use the 'selectedLocationId' to fetch data from API, for now, using dummy data

    const ShortDetailBox = ({ imageSrc, metaData, data }) => (
        <div className="flex flex-col">
            <div className="flex items-center gap-1">
                <img src={imageSrc} />
                <span className="text-gray-500 text-sm">{metaData}</span>
            </div>
            <span className="font-medium">{data}</span>
        </div>
    )

    const shortDetailsList = [
        { imageSrc: UserPng, metaData: "marked by: ", data: "Rahul Gupta" },
        { imageSrc: Calendar1Png, metaData: "marked on: ", data: "October 12, 2024" },
        { imageSrc: ConfettiPng, metaData: "associated event: ", data: "Ghansoli Vruksha Ropan" },
        { imageSrc: IrrigationPng, metaData: "last watered:", data: "October 16, 2024" },
    ]

    const shortDetailsRow = (
        <div className="flex justify-between w-full">
            {shortDetailsList.map(({ imageSrc, metaData, data }) =>
                <ShortDetailBox imageSrc={imageSrc} metaData={metaData} data={data} />
            )}
        </div>
    )

    const DescriptiveDetailsBox = ({ imageSrc, title, description }) => (
        <div className="flex flex-col h-fit rounded-xl shadow-[0px_0px_25px_rgba(0,0,0,0.2)] gap-2 bg-white px-4 py-2">
            <div className="flex items-center gap-2">
                <img src={imageSrc} />
                <span className="text-gray-500 text-sm">{title}</span>
            </div>
            <span className="w-[30vw] text-sm">{description}</span>
        </div>
    )

    const randomText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    const descriptiveDetailsList = [
        { imageSrc: HandWithPenPng, title: "Description", description: randomText },
        { imageSrc: SeasonPng, title: "Current Season", description: randomText },
    ]


    const descriptiveDetailsRow = (
        <div className="flex p-4 gap-8 overflow-x-auto">
            {descriptiveDetailsList.map(({ imageSrc, title, description }) => (
                <DescriptiveDetailsBox imageSrc={imageSrc} title={title} description={description} />
            ))}
        </div>
    )


    return (
        <div
            className="absolute left-6 bottom-6 right-[33%] max-h-[58%] flex flex-col gap-8 py-8 px-6 rounded-xl shadow-lg bg-white"
        >
            <span className="text-lg font-medium">
                {"Ghansoli Railway Station"}
            </span>
            {shortDetailsRow}
            {descriptiveDetailsRow}

            <button
                className="absolute top-2 right-2"
                onClick={() => {
                    setSelectedLocationId(null)
                    revertStyle(lastMarkerDiv.style)
                    setLastMarkerDiv(null)
                }}
            >
                <img src={MultiplyPng} />
            </button>
        </div>
    )
}

export default LocationDetailComponent;