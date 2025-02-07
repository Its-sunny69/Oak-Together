import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocationById } from "../features/locationSlice";
import { HandWithPenPng, IrrigationPng, ConfettiPng, UserPng, Calendar1Png, MultiplyPng, SeasonPng } from "../assets";


function LocationDetailComponent({ lastMarkerDiv, setLastMarkerDiv, selectedLocationId, setSelectedLocationId, revertStyle, }) {

    // We use the 'selectedLocationId' to fetch data from API, for now, using dummy data
    const [locationObj, setLocationObj] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocationById(selectedLocationId)).then((response) => {
            const responseObj = {};
            for(let detail in response.payload) {
                let value = response.payload[detail]?? "NA";
                if(detail === "relatedEvents") {
                    value = (value.length > 0)? value.map((eventObj) => eventObj.name).join(", "): "NA";
                }
                if(detail === "intelligence") {
                    // Might be required later
                }
                if(detail === "markedBy" && value) value = value.name?? "NA";
                responseObj[detail] = value;
            }
            setLocationObj(responseObj);
        });
    }, []);

    const ShortDetailBox = ({ imageSrc, metaData, data }) => (
        <div className="flex flex-col">
            <div className="flex items-center gap-1">
                <img src={imageSrc} />
                <span className="text-gray-500 text-sm">{metaData}</span>
            </div>
            <span className="font-medium text-sm">{data}</span>
        </div>
    )

    const shortDetailsList = [
        { imageSrc: UserPng, metaData: "marked by: ", data: locationObj.markedBy },
        { imageSrc: Calendar1Png, metaData: "marked on: ", data: locationObj.markedOn },
        { imageSrc: ConfettiPng, metaData: "associated event: ", data: locationObj.relatedEvents },
        { imageSrc: IrrigationPng, metaData: "last watered:", data: locationObj.lastWatered },
    ]

    let shortDetailsId = 0;
    const shortDetailsRow = (
        <div className="flex justify-between w-full">
            {shortDetailsList.map(({ imageSrc, metaData, data }) =>
                <ShortDetailBox
                    key={shortDetailsId++}
                    imageSrc={imageSrc}
                    metaData={metaData}
                    data={data}
                />
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

    const descriptiveDetailsList = [
        { imageSrc: HandWithPenPng, title: "Description", description: locationObj.description },
        { imageSrc: SeasonPng, title: "Current Season", description: "" }, 
        // not sure what to use to fill the description for 'Current Season'
    ]

    let descriptiveDetailsId = 0;
    const descriptiveDetailsRow = (
        <div className="flex p-4 gap-8 overflow-x-auto">
            {descriptiveDetailsList.map(({ imageSrc, title, description }) => (
                <DescriptiveDetailsBox
                    key={descriptiveDetailsId++}
                    imageSrc={imageSrc}
                    title={title}
                    description={description}
                />
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