import { SideNavBar } from "../components";
import { GCPIconPng, CoinPng, TrophyPng, DefaultCoverPic, DefaultBadge, ProfileImg2, Trophy2Png, ConfettiPng } from "../assets";
import { useState } from "react";
import { useInterval } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion"
import { faAngleDown, faAngleUp, faCircleInfo, faClock, faLocationDot, faLayerGroup, faDroplet, faUsers, faSeedling} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

// temporary variables for ease in UI Development
const isSponsor = false;
const coinCount = 1020;
const trophyCount = 1080;
const badgeName = "Frenzy Wizard"
const recentActivitiesList = Array(5).fill({ activity: "Enrolled in event \"Event Name\"", date: "March 01, 2025" });
const certificatesList = Array(5).fill({ title: "Enrolled in event \"Event Name\"", date: "March 01, 2025" });
const gcpList = Array(5).fill({ activity: "Sponsored an event \"Event Name\"", pointsEarned: "20" });
const eventAndLocationListObj = {
    "Participated": [
        {
            eventStartDate: "2024-01-28",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "UPCOMING",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        },
        {
            eventStartDate: "2024-01-28",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "ONGOING",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        },
        {
            eventStartDate: "2024-01-28",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "COMPLETED",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        },
        {
            eventStartDate: "2024-01-28",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "ONGOING",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        }
    ],
    "Sponsored": [
        {
            eventStartDate: "2024-01-28",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "UPCOMING",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        },
        {
            eventStartDate: "2024-01-28",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "ONGOING",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        },
        {
            eventStartDate: "2024-01-28",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "COMPLETED",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        },
        {
            eventStartDate: "2024-01-28",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "ONGOING",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        }
    ], 
    "Created": [
        {
            eventStartDate: "2024-03-22",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "UPCOMING",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        },
        {
            eventStartDate: "2024-03-22",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "ONGOING",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        },
        {
            eventStartDate: "2024-03-22",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "COMPLETED",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        },
        {
            eventStartDate: "2024-03-22",
            eventStartTime: "09:00:00.000",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Event Name Here!",
            eventStatus: "ONGOING",
            targetPlantNumber: 50,
            numberOfParticipants: 50 // might have to get data from another endpoint using event id
        }
    ],
    "Marked": [
        {
            markedOn: "2025-05-25",
            waterAvailability: "Plenty",
            space: "Spacious",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Location Name Here!",
            type: "BARREN"
        },
        {
            markedOn: "2025-05-25",
            waterAvailability: "Plenty",
            space: "Spacious",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Location Name Here!",
            type: "PLANTED"
        },
        {
            markedOn: "2025-05-25",
            waterAvailability: "Plenty",
            space: "Spacious",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Location Name Here!",
            type: "BARREN"
        },
        {
            markedOn: "2025-05-25",
            waterAvailability: "Plenty",
            space: "Spacious",
            position: { address: "Mumbai, Maharashtra, India" },
            name: "Location Name Here!",
            type: "PLANTED"
        }
    ],
}


function BadgeAndStats({ activeView }) {
    const statsList = [
        isSponsor ?
            {
                statName: "Sponsored Events",
                statValue: "100",
                tooltipId: "sponsor-event",
                tooltipContent: "The number of events you have sponsored or supported, helping to fund and facilitate eco-friendly activities."
            } :
            {
                statName: "Participated Events",
                statValue: "100",
                tooltipId: "participate-event",
                tooltipContent: "The total number of events you have actively taken part in, contributing to environmental initiatives and community efforts."
            },
        {
            statName: "Locations Marked",
            statValue: "10",
            tooltipId: "location-marked",
            tooltipContent: "The count of locations you have identified for environmental activities, such as tree plantations or clean-up drives."
        },
        {
            statName: "Locations Watered",
            statValue: "600",
            tooltipId: "location-watered",
            tooltipContent: "The total number of locations where you have watered trees or plants, contributing to their growth and sustainability."
        },
        {
            statName: "Carbon footprints",
            statValue: "0.5%",
            tooltipId: "carbon-footprint",
            tooltipContent: "An estimate of the amount of CO₂ emissions you have helped offset or reduce through your eco-friendly activities."
        }
    ]

    const [showBadge, setShowBadge] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    function handleFlip() {
        // console.log("Yo Koso, ...")
        if (!isAnimating) {
            setShowBadge(!showBadge);
            setIsAnimating(true);
        }
    }

    const delay = activeView == "Overview" ? 5000 : null;
    useInterval(handleFlip, delay);

    return (
        <div
            className="flip-card min-h-[60vh] w-[40%] cursor-pointer"
            onClick={handleFlip}
        // https://youtu.be/GSOgbZ396MI?feature=shared (Card Flip Animation)
        >
            <motion.div
                className="flip-card-inner w-full h-full shadow-[#FFEA63_-3px_0px_18px_1px]"
                initial={false}
                animate={{ rotateY: showBadge ? 0 : 540 }}
                transition={{ duration: 0.6, animationDirection: "normal" }}
                onAnimationComplete={() => setIsAnimating(false)}
            >
                <div className="flip-card-front flex flex-col rounded-lg justify-end items-center px-4 pb-4 bg-gradient-90 from-[#9A9A9A] to-[#FFEA63]">
                    <div
                        className="absolute top-1 right-3 h-[45vh] w-full"
                        style={{
                            backgroundImage: `url(${DefaultBadge})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }}
                    >

                    </div>
                    <span
                        className="break-words pb-4 w-full h-fit text-4xl font-extrabold bg-gradient-90 from-[#00B67A] to-[#005036] text-center text-transparent bg-clip-text"
                        style={{ fontFamily: "Playfair Display SC" }}
                    >
                        {badgeName}
                    </span>
                </div>
                <div
                    className="flip-card-back relative flex flex-col rounded-lg p-5 bg-gradient-90 from-[#9A9A9A] to-[#FFEA63]"
                >
                    <img src={Trophy2Png} alt="" className="absolute left-0 w-full h-[60vh] top-1" />
                    <div className="flex flex-col items-center justify-center pt-4 w-full text-white uppercase">
                        <span className="-mb-2">trophies</span>
                        <span
                            className="text-6xl font-extrabold bg-gradient-90 from-[#00B67A] to-[#005036] text-transparent bg-clip-text"
                            style={{ fontFamily: "Playfair Display SC" }}>{trophyCount}</span>
                    </div>
                    <ul className="flex flex-col justify-between gap-2 pt-12 items-start">
                        {statsList.map(({ statName, statValue, tooltipId, tooltipContent }) => {
                            return <li
                                key={statName}
                                className="relative flex flex-col w-full"
                            >
                                <span className="flex items-center justify-between pr-[11.5rem] text-white">
                                    <span>{statName}</span>
                                    <FontAwesomeIcon
                                        icon={faCircleInfo}
                                        className="text-md"
                                        data-tooltip-id={tooltipId}
                                        data-tooltip-content={tooltipContent}
                                        data-tooltip-place="top"
                                    />
                                </span>
                                <Tooltip
                                    id={tooltipId}
                                    style={{
                                        maxWidth: "200px",
                                        borderRadius: "0.5rem",
                                        backgroundColor: "white",
                                        color: "#3BA5DA",
                                        zIndex: "10"
                                    }}
                                />
                                <span>{statValue}</span>
                            </li>
                        })}
                    </ul>
                </div>
            </motion.div>
        </div>
    )
}

function UserProfile() {

    const [activeView, setActiveView] = useState("Overview");

    const nameIconDiv = (
        <div className="flex gap-6">
            <img src={ProfileImg2} alt="Profile Picture" className="h-full" />
            <div className="flex flex-col justify-center">
                <div className="font-semibold text-[24px]">John Doe</div>
                <div className="text-[#3BA5DA]">Bio-planto-logist</div>
            </div>
        </div>
    );

    const optionsList = ["Overview", "Badges", "Events", "Locations"];

    const navDiv = (
        <ul className="flex gap-8 font-medium">
            {
                optionsList.map((option) =>
                    <li
                        className={"cursor-pointer " + ((option == activeView) ? "text-[#60D6D9]" : "")}
                        onClick={() => setActiveView(option)}
                        key={option}
                    >
                        {option}
                    </li>
                )
            }
        </ul>
    )

    const gradientBgStyle = "bg-gradient-180 from-[#60D6D9] to-[#1846C4]"

    const profileHeader = (
        <div className="relative w-full h-[42vh]">
            <div
                className="absolute top-0 right-0 left-0 bottom-12 rounded-xl bg-[#60D6D9]"
                style={{
                    backgroundImage: `url(${DefaultCoverPic})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
            </div>

            <div className="absolute top-2 right-40 flex gap-1 rounded-lg bg-white py-4 px-8 text-[18px] cursor-pointer">
                <img src={isSponsor ? GCPIconPng : CoinPng} alt="Coins" />
                <span>{coinCount}</span>
            </div>

            <div className="absolute top-2 right-2 flex gap-2 rounded-lg bg-white px-8 py-4 text-[18px] cursor-pointer">
                <img src={TrophyPng} alt="Trophies" />
                <span>{trophyCount}</span>
            </div>

            <div
                className="absolute bottom-0 right-6 left-6 h-[18vh] py-2 pl-5 pr-8 rounded-xl bg-white shadow-[rgba(96,214,217,0.2)_0px_0px_10px_3px] flex justify-between items-center">
                {nameIconDiv}
                <div className="flex gap-8 items-center">
                    {navDiv}
                    <button className={`rounded-lg ${gradientBgStyle} px-[1px] pt-[7px] pb-[6.5px] hover:to-[#60D6D9]`}>
                        <span className="rounded-[6.5px] px-6 py-2 font-medium text-transparent bg-white hover:text-[#60D6D9] active:text-white active:bg-transparent">
                            <span className={`${gradientBgStyle} bg-clip-text`}>
                                EDIT
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );

    const infoFields = [
        { title: "Description", content: "Generated using faker. This description is generated for development purposes only. We hope you understand." },
        { title: "Email", content: "something@gmail.com" },
        { title: "Address", content: "Generated using faker. This description is generated for development purposes only. We hope you understand." },
        { title: "Joined On", content: "February 28, 2025" }
    ];

    const profileInfo = (
        <div className="flex flex-col justify-evenly gap-3 px-4 py-3 w-[60%] rounded-lg shadow-[rgba(96,214,217,0.2)_-1px_3px_6px_1px]" >
            <p className="font-medium text-lg">Profile Information</p>
            {
                infoFields.map((infoObj) => (
                    <div key={infoObj.title}>
                        <p className="text-[#3BA5DA]">{infoObj.title}</p>
                        <p>{infoObj.content}</p>
                    </div>
                ))
            }
        </div>
    );

    const infoSection = (
        <div className="flex gap-6">
            {profileInfo}
            <BadgeAndStats activeView={activeView} />
        </div>
    );

    const DropdownListComponent = ({ listName, listContent }) => {

        const [isOpen, setIsOpen] = useState(false);

        const listHeaderStyle = "flex justify-start items-center border-b-[1.5px] border-opacity-25 border-[#60D6D9]";
        const listElementStyle = "flex justify-between items-center py-4 ";

        function handleCertificateDownload(title) {
            console.log(`Downloading Certificate titled: ${title}`);
        }

        const activitiesList = (
            <>
                <li className="px-4 text-[#60D6D9]">
                    <div className={listHeaderStyle}>
                        <div className="w-[88.6%]">Activity</div>
                        <div>Date</div>
                    </div>
                </li>
                {listContent.map(({ activity, date }, index) =>
                    <li
                        key={index}
                        className="px-4 text-black"
                    >
                        <div className={listElementStyle + (index < listContent.length - 1 && "border-b-[1.5px] border-opacity-25 border-[#60D6D9]")}>
                            <div>{activity}</div>
                            <div>{date}</div>
                        </div>
                    </li>

                )}
            </>
        );

        const certificatesList = (
            <>
                <li className="px-4 text-[#60D6D9]">
                    <div className={listHeaderStyle}>
                        <div className="w-[70%]">Title</div>
                        <div>Date</div>
                    </div>
                </li>
                {listContent.map(({ title, date }, index) =>
                    <li
                        key={index}
                        className="px-4 text-black"
                    >
                        <div className={listElementStyle + (index < listContent.length - 1 && "border-b-[1.5px] border-opacity-25 border-[#60D6D9]")}>
                            <div className="w-[70%]">{title}</div>
                            <div className="flex justify-between w-[30%]">
                                {date}
                                <button
                                    className="text-[#60D6D9] hover:underline active:text-[#3BA5DA]"
                                    onClick={() => handleCertificateDownload(title)}
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </li>

                )}
            </>
        );

        const gcpList = (
            <>
                <li className="px-4 text-[#60D6D9]">
                    <div className={listHeaderStyle}>
                        <div className="w-[85%]">Activity</div>
                        <div>Points Earned</div>
                    </div>
                </li>
                {listContent.map(({ activity, pointsEarned }, index) =>
                    <li
                        key={index}
                        className="px-4 text-black"
                    >
                        <div className={listElementStyle + (index < listContent.length - 1 && "border-b-[1.5px] border-opacity-25 border-[#60D6D9]")}>
                            <div className="w-[90%]">{activity}</div>
                            <div>{pointsEarned}</div>
                        </div>
                    </li>

                )}
            </>
        );

        return (
            <div className="flex flex-col shadow-[rgba(96,214,217,0.2)_0px_3px_6px_3px] rounded-lg">
                <div
                    className={`relative flex justify-between items-center px-4 py-6 text-[#3BA5DA]  cursor-pointer`}

                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p>{listName}</p>
                    <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} className="text-xl" />

                </div>
                {
                    isOpen &&
                    <ul
                        className={`flex flex-col gap-2 h-fit z-10 bottom-0 top-24 right-0 left-0 rounded-b-lg bg-white cursor-default animate-fade-down`}
                        onClick={(e) => { e.stopPropagation() }}
                    >
                        {listName == "Recent Activities" && activitiesList}
                        {listName == "My Certificates" && certificatesList}
                        {listName == "Green Credit Points" && gcpList}

                    </ul>
                }
            </div>

        )
    }

    const listItemObjects = isSponsor ?
        [
            { listName: "Green Credit Points", listContent: gcpList },
            { listName: "Recent Activities", listContent: recentActivitiesList },
        ]
        : [
            { listName: "Recent Activities", listContent: recentActivitiesList },
            { listName: "My Certificates", listContent: certificatesList }
        ];

    const listSection = (
        <div className="flex flex-col gap-4">
            {listItemObjects.map(({ listName, listContent }, index) => (
                <DropdownListComponent
                    key={index}
                    listName={listName}
                    listContent={listContent}
                />
            ))}
        </div>
    );

    const overViewDisplay = (
        <div className="transition-all animate-fade-up">
            {infoSection}
            {listSection}
        </div>
    )

    

    const badgeDisplay = (
        <>

        </>
    );

    function FilterButton({ text, handleClick, isActive }) {
        return (
            <button
                className={"w-[16vw] py-2 text-sm transition-all shadow-[rgba(96,214,217,0.2)_0px_3px_6px_3px] rounded-lg hover:bg-[#60D6D9] " + (isActive && "bg-[#60D6D9]")}
                onClick={handleClick}
            >
                {text}
            </button>
        )
    }

    function FilterButtonRow({ activeListCategory, setActiveListCategory, buttonTexts, listType, listCount }) {
        return (
            <div className="flex w-full pr-2 justify-between">
                <div className="flex gap-2 p-2 bg-[#60D6D9]/[0.06] rounded-xl">
                    {
                        buttonTexts.map((buttonText, index) =>
                            <FilterButton
                                key={index}
                                text={buttonText}
                                isActive={activeListCategory == buttonText}
                                handleClick={() => setActiveListCategory(buttonText)}
                            />
                        )
                    }
                </div>
                <div className="flex items-end gap-1">
                    <img
                        src={ConfettiPng}
                        className="h-5 w-5"
                    />
                    <span className="text-gray-600">{activeListCategory} {listType}s:</span>
                    <span className="text-xl font-semibold h-[50%]">{listCount}</span>
                </div>
            </div>
        )
    }

    function ListDisplay(
        {
            buttonTexts,
            listType,
            listCount,
            activeListCategory,
            setActiveListCategory,
            children
        }) {

        return (
            <div className="flex flex-col gap-4">
                <FilterButtonRow
                    activeListCategory={activeListCategory}
                    setActiveListCategory={setActiveListCategory}
                    buttonTexts={buttonTexts}
                    listType={listType}
                    listCount={listCount}
                />
                <div className="flex flex-col gap-2 transition-all animate-fade-up">{children}</div>
            </div>
        )
    }

    function ListItem({ date, time, address, name, type, space, waterAvailability, targetPlantNumber, numberOfParticipants }) {
        
        const isLocation = time == null;
        const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const typeColorMap = {
            "BARREN": "#BEA500",
            "PLANTED": "#83E2C1",
            "UPCOMING": "#BEA500",
            "ONGOING": "#83E2C1",
            "COMPLETED": "#000000"
        }

        const dateArr = date.split("-");
        const timeArr = time ? time.split(":") : [];

        const unformattedHours = time ? +timeArr[0] : 0;
        timeArr[0] = (+timeArr[0] % 12);
        timeArr[0] = (timeArr[0] < 10 ? "0" : "") + timeArr[0];

        const dateBox = (
            <div className="flex flex-col items-center px-3 pt-3 pb-4 rounded-lg shadow-[rgba(96,214,217,0.2)_2px_0px_4px_0px]">
                <div className="text-[#3BA5DA]">{dateArr[0] + ", " + months[+dateArr[1] - 1].toUpperCase()}</div>
                <div className="text-5xl font-[500]" style={{ fontFamily: "Bebas Neue" }}>{dateArr[2]}</div>
            </div>
        )
        const otherDetailsBox = (
            <div className="flex flex-col gap-2 pt-6 pb-2 min-w-[10vw] font-[400]">
                <div className="flex items-center gap-2">
                    {isLocation ?
                        <>
                            <FontAwesomeIcon icon={faDroplet} className="text-[#3BA5DA]" />
                            {waterAvailability}
                        </> :
                        <>
                            <FontAwesomeIcon icon={faClock} className="text-[#3BA5DA]" />
                            {timeArr[0]}: {timeArr[1]} {unformattedHours >= 12 ? " PM" : " AM"}
                        </>
                    }
                </div>
                <div className="flex items-center gap-2">
                    {isLocation ?
                        <>
                            <FontAwesomeIcon icon={faLayerGroup} className="text-[#3BA5DA] -ml-1.5" />
                            {space}
                        </> :
                        <>
                            <FontAwesomeIcon icon={faLocationDot} className="text-[#3BA5DA]" />
                            {address}
                        </>
                    }
                </div>
            </div>
        )
        const nameStatusBox = (
            <div className="flex flex-col gap-2 pt-6 pb-2">
                <div className="text-[#3BA5DA]">{name}</div>
                <div className={`text-[${typeColorMap[type]}]`}>{type}</div>
            </div>
        )

        const detailsNearButton = (
            isLocation? 
            <div className="flex gap-2 items-center min-w-[25vw]">
                <FontAwesomeIcon icon={faLocationDot} className="text-[#3BA5DA]" />
                {address}
            </div>: 
            <div className="flex gap-3 items-center">
                <FontAwesomeIcon icon={faUsers} className="text-[#3BA5DA]" />
                {numberOfParticipants}
                <div className="h-[70%] w-0.5 bg-gray-300"></div>
                <FontAwesomeIcon icon={faSeedling} className="text-[#3BA5DA]" />
                {targetPlantNumber}
            </div>
        )
        const viewButton = (
            <button className={`rounded-lg ${gradientBgStyle} px-[1px] py-[6.5px] hover:to-[#60D6D9]`}>
                <span className="rounded-[6.5px] px-6 py-2 font-medium text-transparent bg-white hover:text-[#60D6D9] active:text-white active:bg-transparent">
                    <span className={`${gradientBgStyle} bg-clip-text`}>
                        View
                    </span>
                </span>
            </button>
        )

        return (
            <div className="flex w-full pr-4 items-center justify-between shadow-[rgba(96,214,217,0.3)_2px_3px_3px_1px] rounded-lg overflow-hidden">
                <div className="flex gap-6">
                    {dateBox}
                    {otherDetailsBox}
                    {nameStatusBox}
                </div>
                <div className="flex gap-4">
                    {detailsNearButton}
                    {viewButton}
                </div>
            </div>
        )
    }

    const [activeEventListCategory, setActiveEventListCategory] = useState(isSponsor ? "Sponsored" : "Participated");
    const eventList = eventAndLocationListObj[activeEventListCategory];

    const eventDisplay = (
        <ListDisplay
            activeListCategory={activeEventListCategory}
            setActiveListCategory={setActiveEventListCategory}
            buttonTexts={[isSponsor ? "Sponsored" : "Participated", "Created"]}
            listType={"Event"}
            listCount={eventList.length}
        >
            {eventList.map((
                {
                    eventStartDate,
                    eventStartTime,
                    position,
                    name,
                    eventStatus,
                    targetPlantNumber,
                    numberOfParticipants
                }, index) =>
                <ListItem
                    key={index}
                    date={eventStartDate}
                    time={eventStartTime}
                    address={position.address}
                    name={name}
                    type={eventStatus}
                    targetPlantNumber={targetPlantNumber}
                    numberOfParticipants={numberOfParticipants}
                />
            )}
        </ListDisplay>
    )

    const [activeLocationListCategory, setActiveLocationListCategory] = useState("Marked");
    const locationList = eventAndLocationListObj[activeLocationListCategory];

    const locationDisplay = (
        <ListDisplay
            activeListCategory={activeLocationListCategory}
            setActiveListCategory={setActiveLocationListCategory}
            buttonTexts={["Marked"]}
            listType={"Location"}
            listCount={locationList.length}
        >
            {locationList.map((
                {
                    markedOn,
                    waterAvailability,
                    space,
                    position,
                    name,
                    type
                }, index) =>
                <ListItem
                    key={index}
                    date={markedOn}
                    waterAvailability={waterAvailability}
                    space={space}
                    address={position.address}
                    name={name}
                    type={type}
                />
            )}
        </ListDisplay>
    )

    const viewMap = {
        "Overview": overViewDisplay,
        "Badges": badgeDisplay,
        "Events": eventDisplay,
        "Locations": locationDisplay

    }

    const deleteAccountBtn = (
        <button
            className={"mt-2 py-2 px-10 w-fit rounded-lg text-white font-medium bg-gradient-135 from-[#FF0000] to-[#654398] hover:from-[#654398] hover:to-[#FF0000]"}
            onClick={() => deleteAccount()}
        >
            Delete Account
        </button>
    );

    function deleteAccount() {
        console.log("Delete Button Pressed");
    }

    return (
        <div className="flex">
            <SideNavBar />
            <div className="flex flex-col gap-6 w-full px-4 pt-4 pb-8">
                {profileHeader}
                {viewMap[activeView]}
                {deleteAccountBtn}
            </div>
        </div>
    )
}

export default UserProfile