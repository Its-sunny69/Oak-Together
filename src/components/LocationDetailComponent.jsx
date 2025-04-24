import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationById, waterLocationWithId } from "../features/locationSlice";
import { getEventById } from "../features/eventSlice";
import { HandWithPenPng, IrrigationPng, ConfettiPng, UserPng, Calendar1Png, MultiplyPng, SeasonPng, LocationInfoIcon } from "../assets";
// import { getAQIByCoordinates } from "../features/airVisualAPISlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassWater, faMap, faWind } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";


function LocationDetailComponent({ selectedLocationId, setSelectedLocationId, selectedLocationCoords, setSelectedLocationCoords, eventSelected, currLocationCoords }) {

    const { locationById } = useSelector((state) => state.location);
    const { eventById } = useSelector((state) => state.event);

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("Event Selected: ", eventSelected);
        dispatch(eventSelected ? getEventById(selectedLocationId) : getLocationById(selectedLocationId))
            .unwrap()
            .catch((error) => console.log(error));

        // dispatch(getAQIByCoordinates(`lat=${selectedLocationCoords.lat}&lng=${selectedLocationCoords.lng}`))
        //     .unwrap()
        //     .catch((error) => console.log(error));
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

    const shortDetailsList = eventSelected ?
        [
            { imageSrc: UserPng, metaData: "created by: ", data: eventById?.eventCreator?.name },
            { imageSrc: Calendar1Png, metaData: "created on: ", data: eventById?.createdOn },
            { imageSrc: Calendar1Png, metaData: "starts on: ", data: eventById?.eventStartDate },
            { imageSrc: Calendar1Png, metaData: "ends on:", data: eventById?.eventEndDate }
        ]
        : [
            { imageSrc: UserPng, metaData: "marked by: ", data: locationById?.markedBy?.name },
            { imageSrc: Calendar1Png, metaData: "marked on: ", data: locationById?.markedOn },
            {
                imageSrc: ConfettiPng,
                metaData: "associated event: ",
                data:
                    locationById?.relatedEvents?.length > 0 ?
                        locationById.relatedEvents.map(ev => ev.name).join(", ")
                        : "NA"
            },
            { imageSrc: IrrigationPng, metaData: "last watered:", data: locationById?.lastWatered },
        ];

    let shortDetailsId = 0;
    const shortDetailsRow = (
        <div className="flex justify-between w-full">
            {shortDetailsList.map(({ imageSrc, metaData, data }) =>
                <ShortDetailBox
                    key={shortDetailsId++}
                    imageSrc={imageSrc}
                    metaData={metaData}
                    data={data ?? "NA"}
                />
            )}
        </div>
    )

    const DescriptiveDetailsBox = ({ imageSrc, title, content }) => {
        return (
            <div
                className="flex flex-col h-fit min-h-[22vh] min-w-[20vw] w-fit rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.2)] gap-2 bg-white px-4 pt-2 py-4"

            >
                <div className="flex items-center gap-2">
                    <img src={imageSrc} />
                    <span className="text-gray-500 text-sm">{title}</span>
                </div>

                {content}
            </div>
        )
    }

    function colorCodedAQI(aqi) {

        if(aqi == null) return null;

        const colors = ["green", "yellow", "orange", "red", "purple", "maroon"];
        const limits = [50, 100, 150, 200, 300]
        let selectedIndex = 0;

        limits.forEach(limit => aqi > limit && selectedIndex++);

        return <span className="font-medium p-1 rounded-md" style={{ backgroundColor: colors[selectedIndex] }}>{aqi}</span>
    }


    const AQIContent = (
        <div className="flex flex-col justify-center gap-4 text-sm">
            <span className="flex gap-2 items-center ">
                <FontAwesomeIcon
                    icon={faWind}
                    className="text-cyan-700"
                />
                AQI (US): {colorCodedAQI(locationById?.currentAQI?.pollution.aqiUs) ?? "NA"}
            </span>
            <span className="flex gap-2 items-center">
                <FontAwesomeIcon
                    icon={faWind}
                    className="text-cyan-700"
                />
                AQI (CN): {colorCodedAQI(locationById?.currentAQI?.pollution.aqiCn) ?? "NA"}
            </span>
        </div>
    );


    const locDetailsContent = (
        <div className="flex flex-col justify-center gap-4 text-sm text-nowrap w-fit mt-1">
            <p className="flex gap-2 items-center">
                <FontAwesomeIcon
                    icon={faMap}
                    className="text-cyan-700 text-base"
                />
                Space: <span className="font-medium">{(eventSelected ? eventById?.space : locationById?.space) ?? "NA"}</span>
            </p>
            <p className="flex gap-2 items-center">
                <FontAwesomeIcon
                    icon={faGlassWater}
                    className="text-cyan-700 text-base"
                />
                Water Availability: <span className="font-medium">{(eventSelected ? eventById?.waterAvailability : locationById?.waterAvailability) ?? "NA"}</span>
            </p>
        </div>
    )

    const descriptionContent = (
        eventSelected ?
            <p className="text-sm break-words text-justify">{eventById?.description ?? "NA"}</p>
            : <p className="text-sm break-words text-justify">{locationById?.description ?? "NA"}</p>
    )


    const descriptiveDetailsList = [
        { imageSrc: HandWithPenPng, title: "Description", content: descriptionContent },
        { imageSrc: LocationInfoIcon, title: "Location Info", content: locDetailsContent },
        !eventSelected && { imageSrc: SeasonPng, title: "AQI", content: AQIContent }
    ]

    let descriptiveDetailsId = 0;
    const descriptiveDetailsRow = (
        <div className="flex p-4 gap-3 overflow-x-scroll">
            {descriptiveDetailsList.map((detailObj) => {

                if(!detailObj) return;

                const { imageSrc, title, content } = detailObj;
                return (
                    <DescriptiveDetailsBox
                        key={descriptiveDetailsId++}
                        imageSrc={imageSrc}
                        title={title}
                        content={content}
                    />
                )
            })}
        </div>
    )

    const markLocationWatered = (locationId) => {
        dispatch(waterLocationWithId({ locationId, coordsString: `latitude=${currLocationCoords?.lat}&longitude=${currLocationCoords.lng}` })).unwrap()
            .then((response) => {
                toast.success(`Location: ${response.name} watered successfully`);
                dispatch(getLocationById(locationId))
            })
            .catch((error) => {
                toast.error(error.message, "error");
                console.log(error);
            })

    }


    return (
        <div
            className="absolute left-6 bottom-6 right-[33%] max-h-[70%] flex flex-col gap-6 py-8 px-6 rounded-xl shadow-lg bg-white"
        >
            <span className="text-lg font-medium">
                {(eventSelected ? eventById?.name : locationById?.name) ?? "NA"}
            </span>
            {shortDetailsRow}
            {descriptiveDetailsRow}

            {!eventSelected && locationById.type == "PLANTED" &&
                <div className="flex w-full justify-end">
                    <button
                        className="px-6 py-2 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium flex justify-center items-center active:scale-95 transition-all"
                        onClick={() => markLocationWatered(locationById?.id)}
                    >
                        Watered
                    </button>
                </div>
            }

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