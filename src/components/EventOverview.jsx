import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventById,
  enrollInEventById,
  getEventById,
  getParticipantsOfEventById,
  withdrawFromEventById,
} from "../features/eventSlice";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  ProfileImg,
  Trophy2Png,
  Trophy3Png,
  Trophy4Png,
  TrophyPng,
} from "../assets";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { CircleRounded, EventRounded } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faMapLocationDot,
  faPeopleGroup,
  faSeedling,
  faSunPlantWilt,
  faTrophy,
  faVectorSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function EventOverview({ eventId }) {
  const [readMore, setReadMore] = useState(false);

  const userData = useSelector((state) => state.user.userData);
  // const userData = { role: "" };
  const detail = useSelector((state) => state.event.currentEvent);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("eventId", eventId);
    dispatch(getEventById(eventId));
    dispatch(getParticipantsOfEventById(eventId));
  }, []);

  const formateDate = (dateStr) => {
    const date = new Date(dateStr);

    const formated = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    return formated;
  };

  const formateTime = (dateStr, timeStr) => {
    const date = new Date(`${dateStr}T${timeStr}`);

    const formated = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formated;
  };

  const handleEdit = () => {};

  const handleEventDetele = () => {
    toast.promise(dispatch(deleteEventById(detail.id)), {
      loading: "Deleting event...",
      success: "Event deleted successfully!",
      error: (err) => err?.payload?.message || "Failed to delete event.",
    });

    navigate("/events");
  };

  const handleRegister = () => {
    toast.promise(dispatch(enrollInEventById(detail.id)), {
      loading: "Enrolling in event...",
      success: "Enrolled successfully!",
      error: (err) => err?.payload?.message || "Failed to enroll in event.",
    });

    dispatch(getParticipantsOfEventById(detail.id));
  };

  const handleWithdraw = () => {
    toast.promise(dispatch(withdrawFromEventById(detail.id)), {
      loading: "Withdrawing from event...",
      success: "Withdrawn successfully!",
      error: (err) => err?.payload?.message || "Failed to Withdraw from event.",
    });

    dispatch(getParticipantsOfEventById(detail.id));
  };

  const RenderButton = () => {
    const userData = useSelector((state) => state.user.userData);
    const detail = useSelector((state) => state.event.currentEvent);

    console.log("first");
    if (userData.role === "ADMIN") {
      return (
        //show approve and delete button
        <button
          className={
            "ml-4 py-2 px-10 w-fit rounded-lg shadow-md text-white font-medium bg-gradient-135 from-[#FF0000] to-[#654398] hover:from-[#654398] hover:to-[#FF0000]"
          }
          onClick={handleEventDetele}
        >
          Delete
        </button>
      );
    } else if (userData.role === "ORGANIZATION") {
      //show sponsor and sponsored button
      return (
        <button className="px-6 py-2 ml-4 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium flex justify-center items-center active:scale-95 transition-all">
          Sponsors
        </button>
      );
    } else {
      if (userData?.id == detail.eventCreator?.id) {
        return (
          <button
            className={
              "ml-4 py-2 px-10 w-fit rounded-lg shadow-md text-white font-medium bg-gradient-135 from-[#FF0000] to-[#654398] hover:from-[#654398] hover:to-[#FF0000]"
            }
            onClick={handleEventDetele}
          >
            Delete
          </button>
        );
      } else {
        console.log("here", detail);
        if (!detail.participants?.some((user) => user.id == userData.id)) {
          return (
            <button
              className="px-6 py-2 ml-4 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium flex justify-center items-center active:scale-95 transition-all"
              onClick={handleRegister}
            >
              Participate
            </button>
          );
        } else {
          return (
            <button
              className="py-2 px-10 w-fit rounded-lg shadow-md text-white font-medium bg-gradient-135 from-[#FF0000] to-[#654398] hover:from-[#654398] hover:to-[#FF0000] active:scale-95 transition-all"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          );
        }
      }
    }
  };

  // useEffect(() => {
  //   renderButton();
  // }, [detail, userData]);

  return (
    <div className="my-10">
      {/* {console.log(detail)} */}
      {Object.keys(detail).length !== 0 && userData ? (
        <>
          {/* name */}
          <div className="mt-14 mb-5 flex justify-between items-center">
            <p className="text-3xl font-bold ">{detail.name}</p>

            <p className="bg-[#60D6D9] px-2 py-1 text-white rounded-md text-sm font-semibold">
              {detail.eventStatus}
            </p>
          </div>

          {/* description */}
          <div>
            <p className="text-[#1566E7]">Description</p>

            <p className="text-gray-500 my-5">
              {detail.description?.slice(0, 140)}
              <span className={`${readMore ? "hidden" : ""}`}>...</span>
              <span className={`${readMore ? "" : "hidden"}`}>
                {detail.description?.slice(140)}
              </span>
            </p>
            <button
              className="text-gray-600 font-semibold"
              onClick={() => setReadMore(!readMore)}
            >
              Read {readMore ? "less" : "more"}
              <KeyboardArrowDownRoundedIcon
                className={` ${readMore ? " rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* eventCreator & sponsors & register */}
          <div className="my-5 flex justify-between items-center">
            {/* eventcreator */}
            <div className="w-fit px-4 py-2 flex broder rounded-xl shadow-[3.5px_5.5px_16px_0px_#60d6d973]">
              <img src={ProfileImg} alt="" className="" />

              <div className="px-2">
                <p className="text-[#1566E7]">{detail.eventCreator?.name}</p>
                <p className="text-xs">
                  {detail.eventCreator?.role}{" "}
                  <span className="text-lg px-2 text-[#1566E7]">|</span>{" "}
                  {detail.eventCreator?.email}
                </p>
              </div>

              <button className="text-sm text-[#1566E7]">Profile</button>
            </div>

            {/* sponsors */}
            <div className="flex justify-center items-center">
              <AvatarGroup>
                <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
                <Avatar alt="Travis Howard" src="https://picsum.photos/200" />
                <Avatar alt="Agnes Walker" src="https://picsum.photos/200" />
              </AvatarGroup>

              <p className="font-semibold ml-1 text-[#1566E7]">
                {detail?.numberOfSponsors || 0} Sponsors
              </p>
            </div>

            {/* button */}
            <RenderButton />
          </div>

          {/* details */}
          <div className="flex my-5">
            <div className="w-3/5">
              <div className="bg-[#60D6D9] rounded-xl shadow-[0px_0px_16px_0px_#60d6d973] text-white px-4 py-2">
                <table className="border-separate border-spacing-y-2">
                  <tbody>
                    <tr>
                      <td>
                        <span className="mr-5">From:</span>
                      </td>
                      <td>
                        <td>
                          <span className="mx-2">
                            <EventRounded className="opacity-60" />
                          </span>
                        </td>
                        <td>
                          <span>{formateDate(detail?.eventStartDate)}</span>
                        </td>
                        <td>
                          <span className="mx-2">
                            <CircleRounded
                              style={{ fontSize: "0.4rem" }}
                              className="opacity-60"
                            />
                          </span>
                        </td>
                        <td>
                          <span>
                            {formateTime(
                              detail?.eventStartDate,
                              detail?.eventStartTime
                            )}
                          </span>
                        </td>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span className="mr-5">To:</span>
                      </td>

                      <td>
                        <td>
                          <span className="mx-2">
                            <EventRounded className="opacity-60" />
                          </span>
                        </td>
                        <td>
                          <span>{formateDate(detail?.eventEndDate)}</span>
                        </td>
                        <td>
                          <span className="mx-2">
                            <CircleRounded
                              style={{ fontSize: "0.4rem" }}
                              className="opacity-60"
                            />
                          </span>
                        </td>
                        <td>
                          <span>
                            {formateTime(
                              detail?.eventEndDate,
                              detail?.eventEndTime
                            )}
                          </span>
                        </td>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span className="mr-5">
                          <FontAwesomeIcon
                            icon={faMapLocationDot}
                            style={{ fontSize: "1.5rem" }}
                          />
                        </span>
                      </td>
                      <td colSpan={4}>
                        <span className="mx-2">{detail.position?.address}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between rounded-xl shadow-[0px_0px_16px_0px_#60d6d973] px-6 py-6 mt-5">
                <div className="flex flex-col justify-center items-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faPeopleGroup}
                      style={{ fontSize: "1.6rem" }}
                    />
                  </span>
                  <span className="text-gray-500 text-xs">Participants</span>
                  <span className="text-[#1566E7] text-lg  font-bold mt-1">
                    {detail?.numberOfParticipants || 0}
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faSeedling}
                      style={{ fontSize: "1.6rem" }}
                      className="text-[#47B2FF]"
                    />
                  </span>
                  <span className="text-gray-500 text-xs">Targeted Plants</span>
                  <span className="text-[#1566E7] text-lg  font-bold mt-1">
                    {detail?.targetPlantNumber || 0}
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faSunPlantWilt}
                      style={{ fontSize: "1.6rem" }}
                      className="text-[#560404]"
                    />
                  </span>
                  <span className="text-gray-500 text-xs">Space</span>
                  <span className="text-[#1566E7] text-lg  font-bold mt-1">
                    {detail?.space || "NA"}
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faDroplet}
                      style={{ fontSize: "1.6rem" }}
                      className="text-[#1566E7]"
                    />
                  </span>
                  <span className="text-gray-500 text-xs">
                    Water Availability
                  </span>
                  <span className="text-[#1566E7] text-lg  font-bold mt-1">
                    {detail?.waterAvailability || "NA"}
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faVectorSquare}
                      style={{ fontSize: "1.6rem" }}
                      className="text-[#560404]"
                    />
                  </span>
                  <span className="text-gray-500 text-xs">Astimeted Area</span>
                  <span className="text-[#1566E7] text-lg  font-bold mt-1">
                    {detail?.estimatedArea || detail?.actualArea || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-2/5 ml-5">
              <div className="w-full h-full flex flex-col justify-between rounded-xl shadow-[0px_0px_16px_0px_#60d6d973] px-6 py-6">
                <p className="text-sm text-[#1566E7]">Estimated Rewards</p>
                <p className="flex justify-center items-center">
                  {/* <FontAwesomeIcon icon={faTrophy} style={{fontSize: "10rem"}} /> */}
                  <img src={Trophy4Png} alt="" className="w-[60%]" />
                </p>
                <p className="text-3xl font-semibold text-center">
                  +{detail?.estimatedReward || 100}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default EventOverview;
