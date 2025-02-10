import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocationById } from "../features/locationSlice";
import { HandWithPenPng, IrrigationPng, ConfettiPng, UserPng, Calendar1Png, MultiplyPng, SeasonPng } from "../assets";
import { getAQIByCoordinates } from "../features/airVisualAPISlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";


function LocationDetailComponent({ selectedLocationId, setSelectedLocationId, selectedLocationCoords, setSelectedLocationCoords }) {

    // We use the 'selectedLocationId' to fetch data from API, for now, using dummy data
    const [locationObj, setLocationObj] = useState({});
    const [aqiObj, setAqiObj] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocationById(selectedLocationId)).unwrap()
            .then((response) => {
                const responseObj = {};
                for (let detail in response) {
                    let value = response[detail] ?? "NA";
                    if (detail === "relatedEvents" && value != "NA") {
                        value = (value && value.length > 0) ? value.map((eventObj) => eventObj.name).join(", ") : "NA";
                    }
                    if (detail === "description" && value == "") value = "NA";
                    if (detail === "markedBy" && value) value = value.name ?? "NA";
                    responseObj[detail] = value;
                }
                setLocationObj(responseObj);
            })
            .catch((error) => console.log(error));

        dispatch(getAQIByCoordinates(`lat=${selectedLocationCoords.lat}&lng=${selectedLocationCoords.lng}`)).unwrap()
            .then((response) => {
                setAqiObj(response);
                // console.log(response);
            })
            .catch((error) => console.log(error));
    }, [selectedLocationId]);

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

    const DescriptiveDetailsBox = ({ imageSrc, title, content }) => {
        return (
            <div className="flex flex-col flex-grow h-fit min-h-[15vh] min-w-[15vw] rounded-xl shadow-[0px_0px_25px_rgba(0,0,0,0.2)] gap-2 bg-white px-4 py-2">
                <div className="flex items-center gap-2">
                    <img src={imageSrc} />
                    <span className="text-gray-500 text-sm">{title}</span>
                </div>
                {content}
            </div>
        )
    }


    const AQIContent = (
        <div className="flex flex-col justify-center gap-4">
            <span className="flex gap-2 items-center ">
                <FontAwesomeIcon
                    icon={faWind}
                    className="text-cyan-700"
                />
                AQI (US): {Object.hasOwn(aqiObj, "data") && aqiObj.data.current.pollution.aqius}
            </span>
            <span className="flex gap-2 items-center">
                <FontAwesomeIcon
                    icon={faWind}
                    className="text-cyan-700"
                />
                AQI (CN): {Object.hasOwn(aqiObj, "data") && aqiObj.data.current.pollution.aqicn}
            </span>
        </div>
    )

    const descriptionContent = (
        locationObj.description && <span className="text-sm text-wrap">{locationObj.description}</span>
    )
    

    const descriptiveDetailsList = [
        { imageSrc: HandWithPenPng, title: "Description", content: descriptionContent },
        { imageSrc: SeasonPng, title: "AQI", content: AQIContent },
        // not sure what to use to fill the description for 'Current Season'
    ]

    let descriptiveDetailsId = 0;
    const descriptiveDetailsRow = (
        <div className="flex p-4 gap-8 overflow-x-auto ">
            {descriptiveDetailsList.map(({ imageSrc, title, content }) => 
                (
                    <DescriptiveDetailsBox
                        key={descriptiveDetailsId++}
                        imageSrc={imageSrc}
                        title={title}
                        content={content}
                    />
                )
            )}
        </div>
    )


    return (
        <div
            className="absolute left-6 bottom-6 right-[33%] max-h-[58%] flex flex-col gap-8 py-8 px-6 rounded-xl shadow-lg bg-white"
        >
            <span className="text-lg font-medium">
                {locationObj.name}
            </span>
            {shortDetailsRow}
            {descriptiveDetailsRow}

            <button
                className="absolute top-2 right-2"
                onClick={() => {
                    setSelectedLocationId(null);
                    setSelectedLocationCoords(null);
                }}
            >
                <img src={MultiplyPng} />
            </button>
        </div>
    )
}

export default LocationDetailComponent;