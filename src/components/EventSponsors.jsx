import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSponsorsOfEventById } from "../features/eventSlice";
import { ProfileImg } from "../assets";

function EventSponsors({ eventId }) {
  const sponsors = useSelector((state) => state.event.currentEvent.sponsors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSponsorsOfEventById(eventId));
  }, []);

  return (
    <div className="my-14">
      {console.log("sponsors", sponsors)}
      {sponsors ? (
        sponsors.length !== 0 ? (
          sponsors.map((sponsor) => (
            <div className="px-4 py-2 my-4 flex justify-between items-center broder rounded-xl shadow-[3.5px_5.5px_16px_0px_#60d6d973]">
              <div className="flex">
                <img src={ProfileImg} alt="" className="" />

                <div className="px-2">
                  <p className="text-[#1566E7]">{sponsor.name}</p>
                  <p className="text-xs">
                    {sponsor.role}
                    <span className="text-lg px-2 text-[#1566E7]">|</span>{" "}
                    {sponsor.email}
                  </p>
                </div>
              </div>

              {/* <button className="px-6 py-2 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium flex justify-center items-center gap-2 active:scale-95 transition-all">
                View Profile
              </button> */}
            </div>
          ))
        ) : (
          <div className="min-h-64 flex items-center justify-center font-semibold">No Data Available</div>
        )
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default EventSponsors;
