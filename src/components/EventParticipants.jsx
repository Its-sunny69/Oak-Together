import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParticipantsOfEventById } from "../features/eventSlice";
import { LoadingAnimation, ProfileImg } from "../assets";


function EventParticipants({ eventId }) {
  const participants = useSelector(
    (state) => state.event.currentEvent.participants
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipantsOfEventById(eventId));
  }, []);

  return (
    <div className="my-14">
      {participants ? (
        participants.length !== 0 ? (
          participants.map((participant, index) => (
            <div
              key={index}
              className="px-4 py-2 my-4 flex justify-between items-center broder rounded-xl shadow-[3.5px_5.5px_16px_0px_#60d6d973]"
            >
              <div className="flex">
                <img src={ProfileImg} alt="" className="" />

                <div className="px-2">
                  <p className="text-[#1566E7]">{participant.name}</p>
                  <p className="text-xs">
                    {participant.role}
                    <span className="text-lg px-2 text-[#1566E7]">|</span>{" "}
                    {participant.email}
                  </p>
                </div>
              </div>

              {/* <button className="px-6 py-2 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium flex justify-center items-center gap-2 active:scale-95 transition-all">
                View Profile
              </button> */}
            </div>
          ))
        ) : (
          <div className="min-h-64 flex items-center justify-center font-semibold">
            No Data Available
          </div>
        )
      ) : (
        <div className="min-h-64 flex items-center justify-center font-semibold">
          <Lottie animationData={LoadingAnimation} loop={true} />
        </div>
      )}
    </div>
  );
}

export default EventParticipants;
