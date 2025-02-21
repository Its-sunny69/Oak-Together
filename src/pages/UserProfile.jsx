import { SideNavBar } from "../components";
import { GCPIconPng, CoinPng, TrophyPng, DefaultCoverPic, DefaultBadge, ProfileImg2 } from "../assets";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

// temporary variables for ease in UI Development
const isSponsor = true;
const coinCount = 1020;
const trophyCount = 1080;
const badgeName = "Frenzy Wizard"
const recentActivitiesList = Array(5).fill({ activity: "Enrolled in event \"Event Name\"", date: "March 01, 2025" });
const certificatesList = Array(5).fill({ title: "Enrolled in event \"Event Name\"", date: "March 01, 2025" });
const gcpList = Array(5).fill({ activity: "Sponsored an event \"Event Name\"", pointsEarned: "20" });

function UserProfile() {

    const [activeView, setActiveView] = useState("Overview");
    const [showBadge, setShowBadge] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);

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
                        onClick={() => {
                            setActiveView(option);
                            setOpenDropdown(activeView == option ? openDropdown : null);
                        }}
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

    const badgeAndStats = (
        <div className="bg-gradient-90 from-[#9A9A9A] to-[#FFEA63] min-h-[60vh] w-[40%] rounded-lg shadow-[#FFEA63_-3px_0px_18px_1px]">
            {showBadge ?
                <div className="flex flex-col justify-end items-center px-4 pb-4">
                    <div
                        className="h-[46vh] w-full"
                        style={{
                            backgroundImage: `url(${DefaultBadge})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }}
                    >
                    </div>
                    <p className="flex flex-wrap gap-2 overflow-hidden items-center break-words pt-4 pb-8 w-full h-full justify-center font-bold text-3xl bg-gradient-90 from-[#00B67A] to-[#005036] text-transparent bg-clip-text uppercase">
                        {badgeName.split(" ").map((word, index) =>
                            <span key={index} >
                                <span className="text-4xl">{word[0]}</span>{word.slice(1)}
                            </span>
                        )}
                    </p>
                </div> :
                <div>

                </div>}
        </div>
    );

    const infoSection = (
        <div
            className="flex gap-6 cursor-pointer"
            onClick={() => { setShowBadge(prev => !prev) }}
        >
            {profileInfo}
            {badgeAndStats}
        </div>
    );

    const DropdownListComponent = ({ listName, listContent }) => {

        function handleCertificateDownload(title) {
            console.log(`Downloading Certificate titled: ${title}`);
        }

        const dropdownActive = listName == openDropdown;

        const activitiesList = (
            <>
                <li className="px-4 text-[#60D6D9]">
                    <div className="flex justify-start items-center border-b-[1.5px] border-opacity-25 border-[#60D6D9]">
                        <div className="w-[88.6%]">Activity</div>
                        <div>Date</div>
                    </div>
                </li>
                {listContent.map(({ activity, date }, index) =>
                    <li
                        key={index}
                        className="px-4 text-black"
                    >
                        <div className="flex justify-between items-center py-4 border-b-[1.5px] border-opacity-25 border-[#60D6D9]">
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
                    <div className="flex justify-start items-center border-b-[1.5px] border-opacity-25 border-[#60D6D9]">
                        <div className="w-[70%]">Title</div>
                        <div>Date</div>
                    </div>
                </li>
                {listContent.map(({ title, date }, index) =>
                    <li
                        key={index}
                        className="px-4 text-black"
                    >
                        <div className="flex justify-start items-center py-4 border-b-[1.5px] border-opacity-25 border-[#60D6D9]">
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
                    <div className="flex justify-start items-center border-b-[1.5px] border-opacity-25 border-[#60D6D9]">
                        <div className="w-[85%]">Activity</div>
                        <div>Points Earned</div>
                    </div>
                </li>
                {listContent.map(({ activity, pointsEarned }, index) =>
                    <li
                        key={index}
                        className="px-4 text-black"
                    >
                        <div className="flex justify-start items-center py-4 border-b-[1.5px] border-opacity-25 border-[#60D6D9]">
                            <div className="w-[90%]">{activity}</div>
                            <div>{pointsEarned}</div>
                        </div>
                    </li>

                )}
            </>
        );

        return (
            <div
                className="relative flex justify-between items-center rounded-lg px-4 py-10 text-[#3BA5DA] shadow-[rgba(96,214,217,0.2)_-1px_3px_6px_1px] cursor-pointer"
                onClick={() => setOpenDropdown(dropdownActive ? null : listName)}
            >
                <p>{listName}</p>
                <FontAwesomeIcon icon={dropdownActive ? faAngleUp : faAngleDown} className="text-xl" />
                {
                    dropdownActive &&
                    <ul
                        className="flex flex-col gap-2 absolute h-fit z-10 rounded-b-lg bottom-0 top-24 right-0 left-0 bg-white shadow-[rgba(96,214,217,0.2)_-1px_3px_6px_1px] transition-opacity duration-[1000ms] cursor-default"
                        onClick={(e) => { e.stopPropagation() }}
                    >
                        {listName == "Recent Activities" && activitiesList}
                        {listName == "My Certificates" && certificatesList}
                        {listName == "Green Credit Points" && gcpList}
                        <li className="absolute h-8 bottom-0 right-0 left-0 top-96"></li>
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
            {
                listItemObjects.map(({ listName, listContent }, index) =>
                    <DropdownListComponent
                        key={index}
                        listName={listName}
                        listContent={listContent}
                    />
                )
            }
        </div>
    );

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

    const overViewDisplay = (
        <>
            {infoSection}
            {listSection}
        </>
    )

    let pageExpansionMargin = "";
    if (openDropdown) {
        const condition = ((openDropdown == "Recent Activities" && isSponsor) || openDropdown == "My Certificates");
        console.log(condition);
        pageExpansionMargin = condition ? "mb-80" : "mb-48";

    }

    return (
        <div className="flex">
            <SideNavBar />
            <div className={"flex flex-col gap-6 w-full px-4 pt-4 pb-8 " + pageExpansionMargin}>
                {profileHeader}
                {activeView == "Overview" && overViewDisplay}
                {deleteAccountBtn}
            </div>
        </div>
    )
}

export default UserProfile