import React, { useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Mousewheel,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ScrollTest1Png, ScrollTest2Png } from "../assets/index";
import EventOverview from "./EventOverview";
import EventParticipants from "./EventParticipants";
import EventSponsors from "./EventSponsors";
import EventAnalysis from "./EventAnalysis";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventById,
  getIntelligenceByEventId,
  getParticipantsOfEventById,
  getSponsorsOfEventById,
} from "../features/eventSlice";
import { useParams } from "react-router-dom";

function EventDetail({ eventId }) {
  const options = ["Overview", "Participants", "Sponsors", "Analysis"];

  const [activeView, setActiveView] = useState("Overview");

  const detail = useSelector((state) => state.event.currentEvent);

  const dispatch = useDispatch();

  const viewMap = {
    Overview: <EventOverview eventId={eventId} />,
    Participants: <EventParticipants eventId={eventId} />,
    Sponsors: <EventSponsors eventId={eventId} />,
    Analysis: <EventAnalysis eventId={eventId} />,
  };

  return (
    <div className="pt-6 pr-4 w-full overflow-hidden">
      <div className=" relative mb-10">
        <Swiper
          // install Swiper modules
          modules={[
            Autoplay,
            Mousewheel,
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
          ]}
          spaceBetween={10}
          slidesPerView={2.2}
          slideToClickedSlide={true}
          mousewheel={true}
          initialSlide={1}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: true,
          // }}

          className="w-full"
        >
          {console.log(detail)}

          {/* {detail.imageUrls?.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center">
                <img src={img.url} className="rounded-lg" />
              </div>
            </SwiperSlide>
          ))} */}

          <SwiperSlide>
            <div className="flex justify-center items-center">
              <img src={ScrollTest2Png} className="rounded-lg" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center">
              <img src={ScrollTest2Png} className="rounded-lg object-cover" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center">
              <img src={ScrollTest1Png} className="rounded-lg" />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="absolute -bottom-6 z-20">
          <ul className="flex">
            {options.map((option, index) => (
              <li
                key={index}
                className={` w-fit mx-2 px-7 py-2 rounded-lg shadow-[3.5px_5.5px_16px_0px_#60d6d973] cursor-pointer transition-all ${
                  activeView == option
                    ? "bg-[#60D6D9] text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setActiveView(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>{viewMap[activeView]}</div>
    </div>
  );
}

export default EventDetail;
