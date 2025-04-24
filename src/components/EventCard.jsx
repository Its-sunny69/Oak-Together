import React from "react";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDollarToSlot,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();

  const handleOnRegister = () => {
    navigate(`/events/details/${event.id}`)
  }

  return (
    <div
      className={`border-2 border-dashed ${
        event?.eventStatus == "UPCOMING" ? "border-[#36D7B7]" : ""
      } ${event?.eventStatus == "ONGOING" ? "border-[#FFC107]" : ""} ${
        event?.eventStatus == "COMPLETED" ? "border-[#95A5A6]" : ""
      } rounded-lg p-4 my-4 shadow-md`}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-bold">{event?.name}</p>

          <div className="flex">
            <LocationOnRoundedIcon className="mr-2" />
            <p className="text-[#9A9A9A] font-bold">
              {event?.position.address}
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="bg-[#60d7d929] rounded-md px-4 py-1 mx-1 flex justify-center items-center">
            {/* <img src={CoinPng} /> */}
            <FontAwesomeIcon icon={faCircleDollarToSlot} size="xl" />

            <p className="text-[#60D6D9] text-xl font-semibold ml-2">8</p>
          </div>

          <div className="bg-[#60d7d929] rounded-md px-4 py-1 mx-1 flex justify-center items-center">
            {/* <img src={TrophyPng} /> */}
            <FontAwesomeIcon icon={faTrophy} size="xl" />

            <p className="text-[#60D6D9] text-xl font-semibold ml-2">8</p>
          </div>
        </div>
      </div>

      <div className="flex my-4 justify-between items-center">
        <div className={`border-l-4 pl-4 ${
        event?.eventStatus == "UPCOMING" ? "border-[#36D7B7]" : ""
      } ${event?.eventStatus == "ONGOING" ? "border-[#FFC107]" : ""} ${
        event?.eventStatus == "COMPLETED" ? "border-[#95A5A6]" : ""
      }`}>
          <div className="my-1">
            <p className="font-medium text-[#9A9A9A]">RUNS FROM</p>
            <p className="font-bold ">
              {event?.eventStartDate} - {event?.eventEndDate}
            </p>
          </div>

          <div className="my-1 mt-3">
            <p className="font-medium text-[#9A9A9A]">EVENT STATUS</p>
            <p className="font-bold">{event?.eventStatus}</p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <AvatarGroup>
            <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
            <Avatar alt="Travis Howard" src="https://picsum.photos/200" />
            <Avatar alt="Agnes Walker" src="https://picsum.photos/200" />
          </AvatarGroup>

          <p className="font-bold ml-1">+100 Participants</p>
        </div>
      </div>

      <div className="flex justify-end">
        {event?.eventStatus == "COMPLETED" ? (
          <button className="bg-[#60D6D9] hover:bg-white hover:outline outline-1 outline-[#60D6D9] px-4 py-2 rounded-lg text-white hover:text-[#60D6D9] font-bold">
            See Images
          </button>
        ) : (
          <button 
            className="bg-[#60D6D9] hover:bg-white hover:outline outline-1 outline-[#60D6D9] px-4 py-2 rounded-lg text-white hover:text-[#60D6D9] font-bold"
            onClick={handleOnRegister}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}

export default EventCard;
