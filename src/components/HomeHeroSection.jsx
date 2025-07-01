import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartPng,
  LoadingAnimation,
  MapImg,
  RocketPng,
  SettingsPng,
  WalletIcon,
} from "../assets";
import { useNavigate } from "react-router-dom";
import { getAQIByCoordinates } from "../features/airVisualAPISlice";
import { useInterval } from "../hooks";
import {
  AirRounded,
  KeyboardDoubleArrowDownRounded,
  ThermostatRounded,
  WaterDropRounded,
} from "@mui/icons-material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { PollutionBarGraph } from "./";

function HomeHeroSection() {
  const [currLocationCoords, setCurrentLocationCoords] = useState(null);
  // const [aqiColor, setAqiColor] = useState("f7e55c");

  const currentAQI = useSelector((state) => state.airVisual.aqiByCoordinates);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Below line ensures that the state does not change when current location hasn't changed, preventing meaningless re-render of MapComponent
          if (
            currLocationCoords &&
            currLocationCoords.lat == lat &&
            currLocationCoords.lng == lng
          )
            return;
          setCurrentLocationCoords({ lat: lat, lng: lng });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.");
              break;
          }
        }
      );
    } else alert("Geolocation is not supported by this browser.");
  };

  useInterval(fetchLocation, 5000);

  useEffect(() => {
    dispatch(getAQIByCoordinates(currLocationCoords));
  }, [currLocationCoords]);

  const aqiLevels = [
    { min: 0, max: 50, text: "Good", color: "befa66" },
    { min: 51, max: 100, text: "Moderate", color: "f7e55c" },
    {
      min: 101,
      max: 150,
      text: "Unhealthy for Sensitive Groups",
      color: "fcb04e",
    },
    { min: 151, max: 200, text: "Unhealthy", color: "f97c7c" },
    { min: 201, max: 300, text: "Very Unhealthy", color: "a97cf9" },
    { min: 301, max: 500, text: "Hazardous", color: "a94442" },
  ];

  const getAqiInfo = (aqi) => {
    return (
      aqiLevels.find((level) => aqi >= level.min && aqi <= level.max) || {
        text: "Unknown",
        color: "cccccc",
      } // fallback in case AQI is outside expected range
    );
  };

  const aqi = currentAQI?.data?.current.pollution.aqius;
  const { text, color } = getAqiInfo(aqi);
  console.log("first", `bg-[#${color}]`);

  const mapImageDiv = (
    //work here......put actuall value froom currentAQI
    <div
      className={`flex flex-col gap-5 cursor-pointer w-[86%] p-4 rounded-xl`}
      style={{ backgroundColor: `#${color}` }}
    >
      {currentAQI && Object.keys(currentAQI).length !== 0 ? (
        <>
          <div className="flex w-full h-full gap-4 justify-between">
            <div>
              <p className="text-9xl font-semibold text-slate-800">
                {currentAQI.data.current.pollution.aqius || "NA"}
              </p>
              <p className="mt-4">AQI - {text}</p>
            </div>

            <div className="bg-white w-full rounded-2xl flex flex-col justify-between p-4">
              <p className="text-xs italic mt-2 text-gray-400">
                Note: Percentage is calculated from Max value <span className="font-semibold">300</span> µg/m³
              </p>
              <PollutionBarGraph maxPM={300} />
            </div>
          </div>
          <div className="bg-white w-full h- rounded-2xl flex justify-between items-center p-4">
            <div className="text-center">
              <ThermostatRounded
                style={{ fontSize: "2rem", color: "#60D6D9" }}
              />
              <p className="text-4xl my-2">
                {currentAQI.data.current.weather.tp || "NA"}
              </p>
              <p className="text-xl">&deg;c</p>
            </div>

            <div className="w-[1.2px] h-[55%] bg-[#60d7d946]"></div>

            <div className="text-center">
              <WaterDropRounded
                style={{ fontSize: "2rem", color: "#60D6D9" }}
              />
              <p className="text-4xl my-2">
                {currentAQI.data.current.weather.hu || "NA"}
              </p>
              <p className="text-xl">%</p>
            </div>

            <div className="w-[1.2px] h-[55%] bg-[#60d7d946]"></div>

            <div className="text-center">
              <KeyboardDoubleArrowDownRounded
                style={{ fontSize: "2rem", color: "#60D6D9" }}
              />
              <p className="text-4xl my-2">
                {currentAQI.data.current.weather.pr || "NA"}
              </p>
              <p className="text-xl">hPa</p>
            </div>

            <div className="w-[1.2px] h-[55%] bg-[#60d7d946]"></div>

            <div className="text-center">
              <AirRounded style={{ fontSize: "2rem", color: "#60D6D9" }} />
              <p className="text-4xl my-2">
                {((currentAQI.data.current.weather.ws || 0) * 3.6).toFixed(2)}
              </p>
              <p className="text-xl">km/h</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full justify-center items-center">
          <p>Loading... AQI</p>
          <DotLottieReact
            src={LoadingAnimation}
            loop
            autoplay
            style={{ width: 140, height: 140 }}
          />
        </div>
      )}
    </div>
  );

  // Temp variables
  const limit = 500;
  const dummyData = [340, 250, 150, 290, 490, 420, 460, 280, 180];
  const measures = [0, 100, 200, 300, 400, 500];
  const increase = 23;
  let countId = 0; // temporary id variable

  const barChart = (
    <div className="flex flex-grow justify-between p-8 rounded-lg bg-gradient-to-r from-[#313860] to-[#151928] items-end h-3/4 w-full">
      <div className="flex flex-col gap-3">
        {measures.reverse().map((measure) => (
          <div className="text-white text-[10px] font-semibold" key={measure}>
            {measure}
          </div>
        ))}
      </div>
      {dummyData.map((count) => {
        const height = (count * 100) / 500;
        return (
          <div
            key={countId++}
            className="w-[6px] bg-white rounded-t-full rounded-b-full ml-2"
            style={{ height: `${height}%` }}
          ></div>
        );
      })}
    </div>
  );

  // More temp data:
  const progressBoxData = [
    { id: 1, type: "Users", count: 32984, target: 66000 },
    {
      id: 2,
      icon: RocketPng,
      type: "Clicks",
      count: 242,
      target: 400,
      symbol: "m",
    },
    {
      id: 3,
      icon: CartPng,
      type: "Sales",
      count: 2400,
      target: 6000,
      symbol: "$",
    },
    { id: 4, icon: SettingsPng, type: "Items", count: 320, target: 740 },
  ];

  const ProgressBox = ({
    icon = WalletIcon,
    type,
    count,
    target,
    symbol = "",
  }) => {
    const progress = (count * 100) / target;
    return (
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <div className="bg-teal-300 p-1.5 rounded-lg">
            <img src={icon} className="w-3 " />
          </div>
          <p className="text-[#A0AEC0] text-sm font-semibold">{type}</p>
        </div>
        <h3 className="font-semibold">
          {count.toLocaleString()}
          {symbol}
        </h3>
        <div className="w-full h-0.5 bg-gray-200">
          <div className="bg-teal-300 h-full" style={{ width: progress }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-3 py-6 w-full">
      {mapImageDiv}
      <div className="flex flex-col px-4 gap-8 w-full rounded-lg shadow-[rgba(96,214,217,0.25)_0px_3.5px_10px_0px]">
        {barChart}
        <div className="px-2">
          <h3 className="font-bold mb-1 text-[#2D3748]">Active Users</h3>
          <p className="text-gray-500 text-sm">
            <span className="text-green-500 font-semibold mr-1">
              (+{increase})
            </span>
            than last week
          </p>
        </div>
        <div className="flex justify-between mr-8 pb-6 px-2">
          {progressBoxData.map(({ id, icon, type, count, target, symbol }) => {
            return (
              <ProgressBox
                key={id}
                icon={icon}
                type={type}
                count={count}
                target={target}
                symbol={symbol}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeHeroSection;
