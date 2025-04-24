import React, { useEffect, useState } from "react";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import GeneralDropDown from "./GeneralDropDown";
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
import { FinancePng, ScrollTest1Png } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getIntelligenceByEventId } from "../features/eventSlice";
import {
  getCurreentEventLocationsAQI,
  getCurreentLocationsAQI,
} from "../features/locationSlice";
import Skeleton from "@mui/material/Skeleton";

function EventAnalysis({ eventId }) {

  const [count, setCount] = useState(0);
  const [currentAQI, setCurrentAQI] = useState({});
  const intelligence = useSelector(
    (state) => state.event.currentEvent.intelligence
  );
  const recordedAQI = useSelector(
    (state) => state.event.currentEvent.recordedAQI
  );
  const { latitude, longitude } = useSelector(
    (state) => state.event.currentEvent.position.locations
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIntelligenceByEventId(eventId));
    dispatch(getCurreentEventLocationsAQI({ lat: latitude, lng: longitude }))
      .unwrap()
      .then((res) => {
        setCurrentAQI(res);
      });
  }, []);

  const handlePrevData = () => {
    console.log("prev clicked");
    if (count > 0) setCount(count - 1);
  };
  const handleNextData = () => {
    console.log("next clicked");
    if (count < intelligence.fertilizerRecommendations.length - 1)
      setCount(count + 1);
  };

  const formatTitle = (str) => {
    return str
      .replace(/([A-Z])/g, " $1") // add space before capital letters
      .replace(/^./, (char) => char.toUpperCase()); // capitalize first letter
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const formated = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    return formated;
  };

  console.log(intelligence);
  console.log(recordedAQI);
  console.log(currentAQI);

  return (
    <div className="my-14">
      {intelligence ? (
        <>
          <div className="bg-[#47B2FF] text-white p-6 rounded-2xl">
            <p className="font-semibold text-lg">Tree to Plant!</p>

            <div>
              <p className="text-center font-semibold mt-1 mb-5">
                {intelligence.fertilizerRecommendations[count].treeName}
              </p>

              <div className="flex">
                <div className="w-1/2">
                  <div className="bg-white text-black rounded-xl min-h-20 mb-5 p-2">
                    <p className="text-[#1566E7] font-semibold">
                      Suggested Fertilizers
                    </p>

                    <p>
                      {
                        intelligence.fertilizerRecommendations[count]
                          .fertilizerType
                      }
                    </p>
                  </div>

                  <div className="bg-white text-black rounded-xl min-h-20 p-2">
                    <p className="text-[#1566E7] font-semibold">
                      Key Nutrients
                    </p>

                    <p>
                      {
                        intelligence.fertilizerRecommendations[count]
                          .keyNutrients
                      }
                    </p>
                  </div>
                </div>

                <div className="w-[1.5px] bg-white mx-3 rounded-xl"></div>

                <div className="w-1/2">
                  <div className="bg-white text-black rounded-xl h-full p-2">
                    <p className="text-[#1566E7] font-semibold">Cautions</p>

                    <p>
                      {intelligence.fertilizerRecommendations[count].caution}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center mt-3">
              <button
                className={`mr-4 ${count == 0 ? "opacity-65" : ""}`}
                onClick={handlePrevData}
              >
                <ArrowBackIosRounded fontSize="xs" />
                Previous Tree
              </button>
              <button
                className={`${
                  count == intelligence.fertilizerRecommendations.length - 1
                    ? "opacity-65"
                    : ""
                }`}
                onClick={handleNextData}
              >
                Next Tree
                <ArrowForwardIosRounded fontSize="xs" />
              </button>
            </div>
          </div>
          <div>
            {intelligence.generalInfo.map((info, index) => {
              const key = Object.keys(info)[0];
              const value = info[key];
              return (
                <GeneralDropDown
                  key={index}
                  listName={key}
                  ListContent={value}
                />
              );
            })}
          </div>
          <div>
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

              className="w-full p-4"
            >
              {intelligence.benefits.map((benefit, index) => {
                const key = Object.keys(benefit)[0];
                const value = benefit[key];
                return (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col rounded-xl shadow-[3.5px_5.5px_16px_0px_#60d6d973] min-h-[25rem]">
                      <img
                        src={FinancePng}
                        alt="image"
                        className="w-full rounded-xl rounded-b-none object-cover"
                      />

                      <div className="p-4">
                        <p className="my-1 font-semibold">{formatTitle(key)}</p>
                        <p>{value}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* work here on AQI */}
          <div className="bg-[#47B2FF] p-4 rounded-2xl flex gap-2">
            {/* work here on skeleton...... */}
            {currentAQI ? (
              Object.keys(currentAQI).length !== 0 ? (
                <div className="bg-white w-1/2 rounded-xl p-4">
                  <p className="font-semibold text-lg">Todays's AQI</p>

                  <div className="flex justify-between items-center my-4">
                    <div>
                      <p className="text-gray-500 text-center">AQI</p>
                      <p className="bg-[#60D6D9] text-white text-xl font-bold px-16 py-2 rounded-xl">
                        {currentAQI.data.current?.pollution.aqius || "NA"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-center">Main</p>
                      <p className="bg-[#60D6D9] text-white text-xl font-bold px-16 py-2 rounded-xl">
                        {currentAQI.data.current?.pollution.mainus || "NA"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-center">
                        Temp&#40;&deg; C&#41;
                      </p>
                      <p className="bg-[#60D6D9] text-white text-xl font-bold px-16 py-2 rounded-xl">
                        {currentAQI.data.current?.weather.tp || "NA"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#83E2C1] p-3 rounded-xl">
                    <p>Make sure to wear mask today!</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white w-1/2 rounded-xl p-4">
                  <Skeleton animation="wave" className="text-lg" />

                  <div className="flex justify-between items-center my-4 gap-2">
                    <div className="w-full">
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={65}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="w-full">
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={65}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="w-full">
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={65}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={45}
                    className="rounded-lg"
                  />
                </div>
              )
            ) : (
              <div className="bg-white w-1/2 rounded-xl p-4">
                <p>
                  <span className="font-semibold text-lg">Todays's AQI</span>
                </p>
                <div className="flex justify-center items-center h-full font-semibold">
                  NA
                </div>
              </div>
            )}

            {recordedAQI ? (
              Object.keys(recordedAQI).length !== 0 ? (
                <div className="bg-white w-1/2 rounded-xl p-4">
                  <p>
                    <span className="font-semibold text-lg">Recorded AQI</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {formatDate(recordedAQI.pollution?.timestamp || "NA")}
                    </span>
                  </p>

                  <div className="flex justify-between items-center my-4">
                    <div>
                      <p className="text-gray-500 text-center">AQI</p>
                      <p className="bg-[#60D6D9] text-white text-xl font-bold px-16 py-2 rounded-xl">
                        {recordedAQI.pollution?.aqiUs || "NA"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-center">Main</p>
                      <p className="bg-[#60D6D9] text-white text-xl font-bold px-16 py-2 rounded-xl">
                        {recordedAQI.pollution?.mainPollutantUs || "NA"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-center">
                        Temp&#40;&deg; C&#41;
                      </p>
                      <p className="bg-[#60D6D9] text-white text-xl font-bold px-16 py-2 rounded-xl">
                        {recordedAQI.weather?.temperature || "NA"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#83E2C1] p-3 rounded-xl">
                    <p>Make sure to wear mask today!</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white w-1/2 rounded-xl p-4">
                  <Skeleton animation="wave" className="text-lg" />

                  <div className="flex justify-between items-center my-4 gap-2">
                    <div className="w-full">
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={65}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="w-full">
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={65}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="w-full">
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={65}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={45}
                    className="rounded-lg"
                  />
                </div>
              )
            ) : (
              <div className="bg-white w-1/2 rounded-xl p-4">
                <p>
                  <span className="font-semibold text-lg">Recorded AQI</span>
                </p>
                <div className="flex justify-center items-center h-full font-semibold">
                  NA
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default EventAnalysis;
