import { FormTextComponent, SideNavBar, ImageUploadField } from "../components";
import {
    GCPIconPng,
    CoinPng,
    TrophyPng,
    DefaultCoverPic,
    DefaultBadge,
    ProfileImg2,
    Trophy2Png,
    ConfettiPng,
    CommonBadgeBG,
    RareBadgeBG,
    EpicBadgeBG,
    LegendaryBadgeBG,
    EmptyBadgeImg,
    SampleCertificateImg,
} from "../assets";
import { useState, useEffect } from "react";
import { useInterval } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion"
import { faAngleDown, faAngleUp, faCircleInfo, faClock, faLocationDot, faLayerGroup, faDroplet, faUsers, faSeedling, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import { deactivateUser, fetchUserById, setPrimaryBadge } from "../features/userSlice";
import { getAllBadgesByFilter, getBadgesByFilter } from "../features/badgeSlice";
import { useDispatch, useSelector } from "react-redux";
import { getEventsByFilterPagination } from "../features/eventSlice";
import { getLocationsByFilterPagination } from "../features/locationSlice";
import { updateUserById, uploadProfilePicture } from "../features/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MessageModal from "../components/MessageModal";
import userEditSchema from "../schemas/userEditSchema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// temporary variables for ease in UI Development
const userId = 202;
const guestView = false;
const isSponsor = false;
const coinCount = 1020;
// const trophyCount = 1080;
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
const tempBadgeList = [
    {
        id: 1,
        rarity: "COMMON",
        name: "Frenzy Wizard 1",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {
        id: 2,
        rarity: "COMMON",
        name: "Frenzy Wizard 5",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {
        id: 3,
        rarity: "COMMON",
        name: "Frenzy Wizard 9",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {
        id: 4,
        rarity: "COMMON",
        name: "Frenzy Wizard 13",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {
        id: 5,
        rarity: "RARE",
        name: "Frenzy Wizard 2",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {
        id: 6,
        rarity: "EPIC",
        name: "Frenzy Wizard 3",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {
        id: 7,
        rarity: "EPIC",
        name: "Frenzy Wizard 7",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {

        id: 8,
        rarity: "EPIC",
        name: "Frenzy Wizard 11",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {
        id: 9,
        rarity: "EPIC",
        name: "Frenzy Wizard 15",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {
        id: 10,
        rarity: "LEGENDARY",
        name: "Frenzy Wizard 4",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    },
    {
        id: 11,
        rarity: "LEGENDARY",
        name: "Frenzy Wizard 8",
        description: "Read 50+ articles and pass quizzes",
        imageUrl: DefaultBadge
    }
]


// Required Global Constants:
const badgeDetailsByRarity = {
    "": { nameTextColor: "#121212", shadowColor: "rgba(42,42,42,0.25)", bgImage: "" },
    "COMMON": { nameTextColor: "#3BA5DA", shadowColor: "rgba(96,214,217,0.25)", bgImage: CommonBadgeBG },
    "RARE": { nameTextColor: "#AAF19C", shadowColor: "rgba(30,74,147,0.25)", bgImage: RareBadgeBG },
    "EPIC": { nameTextColor: "#3BA5DA", shadowColor: "rgba(130,30,202,0.25)", bgImage: EpicBadgeBG },
    "LEGENDARY": { nameTextColor: ["#8E47FF", "#287BE3"], shadowColor: "rgba(255,99,252,0.25)", bgImage: LegendaryBadgeBG }
}


// Overview:

function BadgeAndStats({ activeView, selectedBadge, trophyCount }) {

    // can update statsList to reflect real user data (will require changes in user data response body from server)

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
    ];

    const [showBadge, setShowBadge] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const selectedBadgeObj = selectedBadge ?? {
        name: "No Badge Selected",
        rarity: "",
        imageUrl: EmptyBadgeImg
    };


    const { nameTextColor: nameTextColor, shadowColor: shadowColor, bgImage: badgeBG } = badgeDetailsByRarity[selectedBadgeObj.rarity]; // change later

    const darkShadowColor = shadowColor.slice(0, shadowColor.lastIndexOf(",")) + ",1)";
    const textStyleObj =
    {
        fontFamily: "Playfair Display SC"
    };

    Object.assign(textStyleObj,
        typeof nameTextColor == "string" ?
            {
                color: nameTextColor
            } :
            {
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundImage: `linear-gradient(90deg, ${nameTextColor[0]}, ${nameTextColor[1]})`,
            }
    )

    function handleFlip() {
        // console.log("Yo Koso, ...")
        if (!isAnimating) {
            setShowBadge(!showBadge);
            setIsAnimating(true);
        }
    }

    const delay = activeView == "Overview" ? 8000 : null;
    useInterval(handleFlip, delay);

    return (
        <div
            className="flip-card min-h-[60vh] w-[40%] cursor-pointer"
            onClick={handleFlip}
        // https://youtu.be/GSOgbZ396MI?feature=shared (Card Flip Animation)
        >
            <motion.div
                className="flip-card-inner w-full h-full rounded-lg"
                style={{
                    boxShadow: `0px 3px 7px 10px ${shadowColor}`
                }}
                initial={false}
                animate={{ rotateY: showBadge ? 0 : 540 }}
                transition={{ duration: 0.6, animationDirection: "normal" }}
                onAnimationComplete={() => setIsAnimating(false)}
            >
                <div
                    className={`flip-card-front flex flex-col rounded-lg justify-end items-center px-4 pb-4`}
                    style={{
                        backgroundImage: `url(${badgeBG})`,
                        backgroundSize: "contain",
                        backgroundPosition: "top",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div
                        className="absolute top-4 h-[45vh] w-[70%]"
                        style={{
                            backgroundImage: `url(${selectedBadgeObj.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >

                    </div>
                    <span
                        className={`break-words pb-4 w-full h-fit text-4xl font-extrabold text-center`}
                        style={textStyleObj}
                    >
                        {selectedBadgeObj.name}
                    </span>
                </div>
                <div
                    className={`flip-card-back relative flex flex-col rounded-lg p-5`}
                    style={{
                        backgroundImage: `linear-gradient(90deg, #9A9A9A, ${darkShadowColor})`
                    }}
                >
                    <img src={Trophy2Png} alt="" className="absolute left-0 w-full h-[60vh] top-1" />
                    <div className="flex flex-col items-center justify-center pt-4 w-full text-white uppercase">
                        <span className="-mb-2">trophies</span>
                        <span
                            className={`text-6xl font-extrabold text-center`}
                            style={textStyleObj}>{trophyCount}</span>
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

function DropdownListComponent({ listName, listContent }) {

    const [isOpen, setIsOpen] = useState(false);

    const listHeaderStyle = "flex justify-start items-center border-b-[1.5px] border-opacity-25 border-[#60D6D9]";
    const listElementStyle = "flex justify-between items-center py-4 ";

    const activitiesList = (
        <>
            <li className="px-4 text-[#60D6D9]">
                <div className={listHeaderStyle}>
                    <div className="w-[87%]">Activity</div>
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
                        <div className="mr-4">{date}</div>
                    </div>
                </li>

            )}
        </>
    );

    const certificatesList = (
        <>
            <li className="px-4 text-[#60D6D9]">
                <div className={listHeaderStyle}>
                    <div className={guestView ? "w-[87%]" : "w-[70%]"}>Title</div>
                    <div>Date</div>
                </div>
            </li>
            {listContent.map(({ title, date }, index) =>
                <li
                    key={index}
                    className="px-4 text-black"
                >
                    <div className={listElementStyle + (index < listContent.length - 1 && "border-b-[1.5px] border-opacity-25 border-[#60D6D9]")}>
                        <div className={guestView ? "w-full" : "w-[70%]"}>{title}</div>
                        <div className={"flex justify-between " + (guestView ? "w-[15%]" : "w-[30%]")}>
                            {date}
                            {
                                !guestView &&
                                <a
                                    className="text-[#60D6D9] cursor-pointer hover:underline active:text-[#3BA5DA]"
                                    download
                                    href={SampleCertificateImg}
                                >
                                    Download
                                </a>
                            }
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
                    <div className="ml-6">Points Earned</div>
                </div>
            </li>
            {listContent.map(({ activity, pointsEarned }, index) =>
                <li
                    key={index}
                    className="px-4 text-black"
                >
                    <div className={listElementStyle + (index < listContent.length - 1 && "border-b-[1.5px] border-opacity-25 border-[#60D6D9]")}>
                        <div className="w-[90%]">{activity}</div>
                        <div className="mr-16">{pointsEarned}</div>
                    </div>
                </li>

            )}
        </>
    );

    return (
        <div className="flex flex-col py-2 shadow-[rgba(96,214,217,0.2)_0px_3px_6px_3px] rounded-lg">
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

function OverViewDisplay({ activeView, userData }) {

    const infoFields = [
        { title: "Description", content: userData?.description },
        !guestView && { title: "Email", content: userData?.email },
        !guestView && { title: "Address", content: userData?.address },
        { title: "Joined On", content: userData?.createdOn }
    ];

    const profileInfo = (
        <div className={`flex flex-col ${(guestView ? "gap-1" : "justify-evently gap-3")} px-4 py-3 w-[60%] rounded-lg shadow-[rgba(96,214,217,0.2)_-1px_3px_6px_1px] overflow-scroll`} >
            <p className="font-medium text-lg mb-2">Profile Information</p>
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
        <div className="flex gap-6 h-[62vh]">
            {profileInfo}
            <BadgeAndStats
                activeView={activeView}
                selectedBadge={userData?.primaryBadge}
                trophyCount={userData?.points}
            />
        </div>
    );

    const listItemObjects =
        isSponsor ?
            [
                { listName: "Green Credit Points", listContent: gcpList },
                { listName: "Recent Activities", listContent: recentActivitiesList },
            ]
            : [
                { listName: "Recent Activities", listContent: recentActivitiesList },
                { listName: "My Certificates", listContent: certificatesList }
            ];

    const listSection = (
        <div className="flex flex-col gap-6">
            {listItemObjects.map(({ listName, listContent }, index) => (
                <DropdownListComponent
                    key={index}
                    listName={listName}
                    listContent={listContent}
                />
            ))}
        </div>
    );

    return (
        <div className="flex flex-col gap-6 transition-all animate-fade-up w-full">
            {infoSection}
            {listSection}
        </div>
    )
}


// Badges:
function BadgeCard({ rarity, id, name, description, badgeImgUrl, selectedBadgeId, onBadgeClick, isTopBadge, isLocked }) {

    const isSelected = id == selectedBadgeId;

    const [badgeHover, setBadgeHover] = useState(false);

    const { nameTextColor: nameTextColor, shadowColor: shadowColor, bgImage: bgImage } = badgeDetailsByRarity[rarity];

    const borderColor = shadowColor.slice(0, shadowColor.lastIndexOf(',')) + ",1)";

    return (
        <div
            className={`border-8 rounded-lg animate-fade-up transitonal all ${isLocked ? "grayscale" : ""}`}
            style={{
                borderColor: isSelected && !isLocked && !isTopBadge && !guestView ? borderColor : "white",
                backgroundColor: badgeHover ? "rgba(96,214,217,0.15)" : ""
            }}
            onClick={() => !guestView && !isLocked && onBadgeClick(id)}
        >
            <div
                className={`flex flex-col items-center justify-between text-center relative rounded-lg px-4 pt-3 pb-6 max-w-[18vw] min-h-[54vh] cursor-pointer transition-all`}
                style={{
                    boxShadow: `0px 3px 6px 3px ${shadowColor}`,
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "contain",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat"
                }}
                onMouseEnter={() => setBadgeHover(true)}
                onMouseLeave={() => setBadgeHover(false)}
            >
                <div
                    className={`font-semibold ` + (
                        (rarity == "EPIC" || rarity == "RARE") && "text-white"
                    )}
                >
                    {rarity}
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <img
                        className="w-[80%] -mt-4"
                        src={badgeImgUrl}
                        alt="Badge Image"
                    />
                    <div className="flex flex-col items-center">
                        <div
                            className="font-medium"
                            style={
                                (typeof nameTextColor == "string") ?
                                    { color: nameTextColor } :
                                    {
                                        backgroundImage: `linear-gradient(to right, ${nameTextColor[0]}, ${nameTextColor[1]})`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }
                            }
                        >
                            {name.toUpperCase()}
                        </div>
                        <div className="text-[rgba(0,0,0,0.6)] text-sm px-2">
                            {description}
                        </div>
                    </div>
                </div>
                <div className="relative w-full">
                    <div className="flex gap-3 items-center justify-center">
                        <FontAwesomeIcon icon={isLocked ? faLock : faUnlock} className="text-[#60D6D9] text-lg" />
                        <div className="text-lg font-semibold">{(isLocked ? "" : "UN")}LOCKED</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function BadgeDisplay({ selectedBadge }) {  // might require pagination in future

    const handleBadgeClick = (badgeId) => {
        dispatch(setPrimaryBadge({ userId: userId, badgeId: badgeId }));
    }

    const { allBadgesByFilter: allBadges, badgesByFilter } = useSelector((state) => state.badge);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBadgesByFilter(33))
            .then(() => dispatch(getBadgesByFilter(`badgeOwner=${userId}&&pageSize=33`)))
    }, []);

    const unlockedBadges = new Set([...badgesByFilter.map((badgeObj) => badgeObj.id)]);

    const filteredBadgeLists = {
        "COMMON": [],
        "RARE": [],
        "EPIC": [],
        "LEGENDARY": []
    }

    for (const badge of allBadges) {
        filteredBadgeLists[badge.rarity].push(badge);
    }

    return (
        <div className="flex flex-col items-center gap-6 transition-all animate-fade-up">
            {
                !guestView && selectedBadge &&
                <>
                    <div className="w-full text-center text-lg font-semibold -mb-3">SELECTED BADGE:</div>
                    <BadgeCard
                        key={selectedBadge?.id}
                        id={selectedBadge?.id}
                        rarity={selectedBadge?.rarity}
                        name={selectedBadge?.name}
                        description={selectedBadge?.description}
                        badgeImgUrl={selectedBadge?.imageUrl}
                        selectedBadgeId={selectedBadge?.id}
                        onBadgeClick={handleBadgeClick}
                        isTopBadge
                    />
                    <div className="h-1 bg-gray-200 w-full"></div>
                </>
            }
            <div className="w-full text-xl text-center font-semibold -mb-8">Select a badge to showcase on your profile:</div>
            <div className="flex gap-4 p-6">
                {Object.keys(filteredBadgeLists).map((rarity) =>
                    <div key={rarity} className="flex flex-col gap-4">
                        {filteredBadgeLists[rarity].map(({ rarity, id, name, description, imageUrl }) => (
                            <BadgeCard
                                key={id}
                                id={id}
                                rarity={rarity}
                                name={name}
                                description={description}
                                badgeImgUrl={imageUrl}
                                selectedBadgeId={selectedBadge?.id}
                                isLocked={!unlockedBadges?.has(id)}
                                onBadgeClick={handleBadgeClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


// Components for events and locations:
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
        <div className="flex flex-col gap-4 w-full">
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

// To-do:
// 1) Show participant count for events using appropriate data from server
// 2) Handle 'View' button action for both locations and events
function ListItem({ date, time, address, name, type, space, waterAvailability, targetPlantNumber, numberOfParticipants, gradientBgStyle }) {

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
        <div className="flex flex-col w-[8vw] items-center px-3 pt-3 pb-4 rounded-lg shadow-[rgba(96,214,217,0.2)_2px_0px_4px_0px]">
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
            <div className={`lex items-center gap-2 ${isLocation ? "" : "w-[30vw]"}`}>
                {isLocation ?
                    <div>
                        <FontAwesomeIcon icon={faLayerGroup} className="text-[#3BA5DA] -ml-1.5 mr-2" />
                        {space}
                    </div> :
                    <div className="text-ellipsis truncate">
                        <FontAwesomeIcon icon={faLocationDot} className="text-[#3BA5DA] mr-2 " />
                        {address}
                    </div>
                }
            </div>
        </div>
    )
    const nameStatusBox = (
        <div className="flex flex-col gap-2 pt-6 pb-2 w-[18vw]">
            <div className="text-[#3BA5DA] truncate text-ellipsis">{name}</div>
            <div className={`text-[${typeColorMap[type]}]`}>{type}</div>
        </div>
    )

    const detailsNearButton = (
        isLocation ?
            <div className="flex gap-2 items-center w-[25vw] ">
                <FontAwesomeIcon icon={faLocationDot} className="text-[#3BA5DA]" />
                <div className="truncate text-ellipsis">{address}</div>
            </div> :
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

// To-do:
// 2) Use pagination for easy search and traversal

// Events:
function EventDisplay({ gradientBgStyle }) {

    const filterObjByCategory = {
        "Participated": {
            participatedBy: userId
        },
        "Sponsored": {
            sponsorId: userId
        },
        "Created": {
            eventCreator: userId
        },
    }

    const [activeEventListCategory, setActiveEventListCategory] = useState(isSponsor ? "Sponsored" : "Participated");
    const paramsObj = { size: 10, filterObj: filterObjByCategory[activeEventListCategory] } // Might need to handle page size differently later (if using pagination)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventsByFilterPagination(paramsObj))
    }, [activeEventListCategory, dispatch]);
    // it might be possible to replace above useEffect with something else (will require identifying correct component structure and state handling)

    const { eventsByFilterPagination: eventList } = useSelector((state) => state.event);

    // const eventList = eventAndLocationListObj[activeEventListCategory]; // static data

    return (
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
                    numberOfParticipants // need this from server
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
                    gradientBgStyle={gradientBgStyle}
                />
            )}
        </ListDisplay>
    );
}

// Locations:
// To-do:
// 1) Use Pagination
function LocationDisplay({ gradientBgStyle }) {

    const filterObjByCategory = {
        "Marked": {
            markedBy: userId
        }
    }

    const [activeLocationListCategory, setActiveLocationListCategory] = useState("Marked");
    const paramsObj = { size: 10, filterObj: filterObjByCategory[activeLocationListCategory] }; // Might need to handle page size differently later (if using pagination)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocationsByFilterPagination(paramsObj))
    }, [activeLocationListCategory, dispatch]);
    // it might be possible to replace above useEffect with something else (will require identifying correct component structure and state handling)

    const { locationsByFilterPagination: locationList } = useSelector((state) => state.location);

    // const locationList = eventAndLocationListObj[activeLocationListCategory]; // static data

    return (
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
                    gradientBgStyle={gradientBgStyle}
                />
            )}
        </ListDisplay>
    );
}




// To Do:
// 1) Provide EDIT form to user on button click
function EditForm({ userData, setIsModalVisible }) {

    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting }) => {
        const imageFileObj = values.profilePic;
        const detailsObj = { ...values };
        delete detailsObj.profilePic;

        // console.log(imageFileObj);

        try {
            if (imageFileObj) {
                const formData = new FormData();
                formData.append("image", imageFileObj);

                const imgResponse = await dispatch(
                    uploadProfilePicture({ userId, formData })
                ).unwrap();

                // console.log("Image uploaded:", imgResponse);
            }

            let newDetails = true;

            for(const key in detailsObj) {
                if(userData[key] != detailsObj[key]) {
                    newDetails = true;
                    break;
                }
            }

            if(newDetails) {
                const detailsResponse = await dispatch(updateUserById({ userId, updateData: detailsObj })).unwrap();
                // console.log("Details updated:", detailsResponse); 
            }

            if(imageFileObj || newDetails) setIsModalVisible(true);
            // Optionally close modal or show toast here
        } catch (error) {
            console.error("Profile update failed:", error);
            // Optional: show toast or alert
        } finally {
            setSubmitting(false);
        }
    };


    const defaultContainerStyle = "flex flex-col gap-1 w-full";
    const defaultLabelStyle = " font-semibold";
    const defaultInputStyle = "p-1 w-full border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]";

    const inputTextFields = [
        { label: "Name", id: "name", name: "name", type: "text" },
        { label: "Description (Optional)", id: "description", name: "description", type: "textarea" },
        { label: "Address", id: "address", name: "address", type: "textarea" },
    ];

    // Profile Picture (POST)
    // Name (PUT)
    // Description (PUT)
    // Address (PUT)
    return (
        <div className="w-[50%] animate-fade-up transition-all border-[#60D6D9] border-2 rounded-lg px-8 py-4 bg-gray-100">
            <h2 className="font-semibold text-2xl mb-8">Update Profile Details:</h2>
            <Formik
                initialValues={{
                    name: userData?.name,
                    description: userData?.description,
                    address: userData?.address
                }}
                validationSchema={userEditSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-4 items-center">
                    <Field name="profilePic">
                        {({form}) => 
                        <ImageUploadField
                            form={form}
                            containerStyleClasses={defaultContainerStyle + " items-center "}
                            labelStyleClasses={defaultLabelStyle}
                            inputStyleClasses={defaultInputStyle}
                            previewSizeClasses="w-44"
                            id="profilePic"
                            name="profilePic"
                            label="Profile Picture (Optional)"
                        />
                        }
                    </Field>

                    {inputTextFields.map(({ label, id, name, type }) =>
                        <FormTextComponent
                            key={id}
                            label={label}
                            id={id}
                            name={name}
                            type={type}
                            containerStyleClasses={defaultContainerStyle}
                            inputStyleClasses={defaultInputStyle}
                            labelStyleClasses={defaultLabelStyle}
                            isTextArea={type == "textarea"}
                        />
                    )}

                    <button
                        className="w-1/2 py-2 mt-8 font-semibold rounded-lg bg-gradient-120 shadow-md from-[#83E2C1] to-[#1566E7] hover:from-[#1566E7] hover:to-[#83E2C1] text-white"
                        type="submit"
                    >
                        Update Details
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

function DeleteFormModal() {
    return(
        <div>

        </div>
    )
}

// Fetch server data for Sponsored Events, Recent Activites and My Certificates. 
// Make the DELETE button perform its function
function UserProfile() {

    const [activeView, setActiveView] = useState("Overview");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteFormModalVisible, setIsDeleteFormModalVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => { dispatch(fetchUserById(userId)) }, []);
    const { user: userData } = useSelector((state) => state.user);

    const nameIconDiv = (
        <div className="flex gap-6">
            <div
                style={{
                    backgroundImage: `url(${userData?.profilePicture?.url ?? ProfileImg2})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "6vw",
                    height: "6vw",
                    borderRadius: "0.5rem"
                }}
            >
            </div>
            <div className="flex flex-col justify-center">
                <div className="font-semibold text-[24px]">{userData?.name}</div>
                <div className="text-[#3BA5DA]">{userData?.role}</div>
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
                className="absolute bottom-0 right-6 left-6 h-[18vh] py-2 pl-5 pr-8 rounded-xl bg-white shadow-[rgba(96,214,217,0.2)_0px_0px_10px_3px] flex justify-between items-center">
                {nameIconDiv}
                <div className="flex gap-8 items-center">
                    {navDiv}
                    {
                        !guestView &&
                        <button
                            className={`rounded-lg ${gradientBgStyle} px-[1px] pt-[7px] pb-[6.5px] hover:to-[#60D6D9]`}
                            onClick={() => setActiveView("Edit Form")}
                        >
                            <span className="rounded-[6.5px] px-6 py-2 font-medium text-transparent bg-white hover:text-[#60D6D9] active:text-white active:bg-transparent">
                                <span className={`${gradientBgStyle} bg-clip-text`}>
                                    EDIT
                                </span>
                            </span>
                        </button>
                    }
                </div>
            </div>
        </div>
    );

    const viewMap = {
        "Overview": <OverViewDisplay activeView={activeView} userData={userData} />,
        "Badges":
            <BadgeDisplay
                selectedBadge={userData?.primaryBadge}
            />,
        "Events": <EventDisplay gradientBgStyle={gradientBgStyle} />,
        "Locations": <LocationDisplay gradientBgStyle={gradientBgStyle} />,
        "Edit Form": <EditForm userData={userData} setIsModalVisible={setIsModalVisible} />

    }

    const deleteAccountBtn = (
        <button
            className={"mt-2 py-2 px-10 w-fit rounded-lg text-white font-medium bg-gradient-135 from-[#FF0000] to-[#654398] hover:from-[#654398] hover:to-[#FF0000]"}
            onClick={() => setIsDeleteFormModalVisible(true)}
        >
            Delete Account
        </button>
    );

    return (
        <div className="flex">
            <SideNavBar />
            <div className="relative flex flex-col gap-6 w-full px-4 pt-4 pb-8 items-center">
                {profileHeader}
                {viewMap[activeView]}
                <div className="w-full">
                    {deleteAccountBtn}
                </div>
                {isModalVisible && activeView == "Edit Form" &&
                    <div className=" absolute inset-0 backdrop-blur-[2px] bg-gray-600/50 z-10 flex justify-center items-center">
                        <MessageModal
                            setIsModalVisible={setIsModalVisible}
                            task="Details Updated"
                            message="The profile details have been successfully updated and will reflect on your profile in a moment"
                        />
                    </div>
                }
                {isDeleteFormModalVisible &&
                    <div className=" absolute inset-0 backdrop-blur-[2px] bg-gray-600/50 z-10 flex justify-center items-center">

                    </div>
                }
            </div>
        </div>
    )
}

export default UserProfile