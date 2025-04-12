import React, { useEffect, useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getEventsByFilterPagination } from "../features/eventSlice";
import { SearchRounded } from "@mui/icons-material";

function Filter({ paramsObj, setParamsObj, isSearchInputValid }) {
  //tempparamsObj is used to prevent api calls on every changes in search and filter, now it will call on button click
  const [tempParamsObj, setTempParamsObj] = useState(paramsObj);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  const statusType = ["UPCOMING", "ONGOING", "COMPLETED"];
  const spaceTypes = [
    "PLAINS",
    "SLOPE",
    "HILL",
    "SPACIOUS",
    "CONJUSTED",
    "RIVERBANK",
  ];
  const waterAvailabilityTypes = ["PLENTY", "MODERATE", "SCARCE"];
  const list = [
    "Joined Events",
    "Event Status",
    "Event Date",
    "Accepting Participents",
    "Accepting Sponsors",
    "Space",
    "Water Availability",
    "Participants Limit",
    "No. Of Participants",
    "Targeted Plant No.",
    "Estimated Cost",
    "Estimated Area",
  ];

  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    setTempParamsObj((prev) => ({
      ...prev,
      filterObj: {
        ...prev.filterObj,
        [name]: checked
          ? [...prev.filterObj[name], value]
          : prev.filterObj[name].filter((item) => item !== value),
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTempParamsObj((prev) => ({
      ...prev,
      filterObj: {
        ...prev.filterObj,
        [name]: value,
      },
    }));
  };

  const handleSingleCheckBoxChange = (e) => {
    const { name, checked } = e.target;

    setTempParamsObj((prev) => ({
      ...prev,
      filterObj: {
        ...prev.filterObj,
        [name]: checked,
      },
    }));
  };

  const handleReset = () => {
    const resetParams = {
      filterObj: {
        joinedEvents: false,
        eventStatus: [],
        space: [],
        eventAfterDate: "",
        eventBeforeDate: "",
        acceptingParticipants: false,
        acceptingSponsors: false,
        waterAvailability: [],
        participantLimitMoreThan: "",
        participantLimitLessThan: "",
        participantsMoreThan: "",
        participantsLessThan: "",
        numberOfParticipants: "",
        targetPlantNumberMoreThan: "",
        targetPlantNumberLessThan: "",
        estimatedCostMoreThan: "",
        estimatedCostLessThan: "",
        estimatedAreaMoreThan: "",
        estimatedAreaLessThan: "",
      },
      search: "",
      page: 0,
      size: 10,
    };

    setSelectedName("");
    setTempParamsObj(resetParams); // Reset locally
    setParamsObj(resetParams); // Reset globally

    dispatch(getEventsByFilterPagination(resetParams));
  };

  useEffect(() => {
    // console.log("filterObj:", tempParamsObj.filterObj);
    // console.log("search:", tempParamsObj.search);
    // console.log("tempParamsObj", tempParamsObj)
    setParamsObj(tempParamsObj);
  }, [tempParamsObj]);

  const handleSearch = () => {
    if (tempParamsObj.search.trim().length < 3) {
      alert("Please Enter atleast 3 characters to search.");
      return;
    }

    setParamsObj(tempParamsObj);
    dispatch(getEventsByFilterPagination(tempParamsObj));
  };

  const handleFilter = () => {
    setParamsObj(tempParamsObj);
    dispatch(getEventsByFilterPagination(tempParamsObj));
  };

  return (
    <div className="py-6">
      <div className="flex">
        <input
          className="px-3 py-1 w-full border-2 border-[#60d6d9] rounded-lg focus:outline-[#2572CF]"
          type="text"
          placeholder="Search..."
          value={tempParamsObj.search}
          onChange={(e) =>
            setTempParamsObj((prev) => ({ ...prev, search: e.target.value }))
          }
          min="3"
        />
       
        <button className="p-2 mx-1" onClick={handleSearch}>
          <SearchRounded className="text-[#60d6d9]" sx={{ fontSize: 30 }} />
        </button>

        {showFilter ? (
          <button
            className="px-6 py-2 ml-4 rounded-lg text-red-600 font-medium flex justify-center items-center gap-2 active:scale-95 transition-all"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FontAwesomeIcon icon={faXmark} size="xl" />
            Close
          </button>
        ) : (
          <button
            className="px-6 py-2 ml-4 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium flex justify-center items-center gap-2 active:scale-95 transition-all"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filter
          </button>
        )}
      </div>
      {console.log(isSearchInputValid)}
      {isSearchInputValid ? "" : <div className="text-red-400 text-sm px-4">Please Enter minimum 3 characters to search!</div> }

      <div
        className={`bg-gradient-120 shadow-[rgba(96,214,217,0.2)_0px_0px_10px_3px] border border-[#60D6D9]  mt-3 py-2 px-4 rounded-lg grid grid-cols-6 gap-6 ${
          showFilter ? "block" : "hidden"
        } animate-fade`}
      >
        <div className="col-span-2">
          <ul>
            {list.map((item, index) => (
              <li
                key={index}
                className={`my-1 p-2 rounded-lg flex justify-between font-bold hover:outline outline-[#60D6D9] outline-1 ${
                  selectedName == item
                    ? "text-white bg-[#60D6D9]"
                    : "text-[#60D6D9] bg-[#60d7d914]"
                } transition-all`}
                onClick={() => setSelectedName(item)}
              >
                {item}

                <ArrowForwardIosRoundedIcon />
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-4 p-2">
          <div className="">
            {selectedName == "" && (
              <div className="h-[32rem] flex justify-center items-center animate-fade-right">
                <div className="border border-[#60D6D9] text-[#60D6D9] shadow-sm mx-10 rounded-lg p-6 font-medium grid grid-cols-8">
                  <span className="col-span-1">
                    <TipsAndUpdatesRoundedIcon style={{ fontSize: "3rem" }} />
                  </span>

                  <span className="col-span-7">
                    Search throughout Events using the search field above, or
                    choose a specific filter from the left.
                  </span>
                </div>
              </div>
            )}

            {selectedName == "Joined Events" && (
              <div className="flex flex-col relative w-fit animate-fade-right">
                <label className="text-sm my-1 font-medium cursor-pointer flex justify-start items-center">
                  <input
                    className="appearance-none w-6 h-6 border-2 border-teal-300 rounded-md checked:border-transparent checked:bg-teal-400 cursor-pointer"
                    type="checkbox"
                    name="joinedEvents"
                    checked={tempParamsObj.filterObj.joinedEvents}
                    onChange={handleSingleCheckBoxChange}
                  />
                  {tempParamsObj.filterObj.joinedEvents && (
                    <span className="absolute left-1 text-lg pointer-events-none text-white font-extrabold">
                      ✓
                    </span>
                  )}

                  <span className="mx-3">Joined Events</span>
                </label>
              </div>
            )}

            {selectedName == "Event Status" && (
              <div className="flex flex-col relative w-fit animate-fade-right">
                {statusType.map((item) => (
                  <label
                    id={item}
                    className="text-sm my-1 font-medium cursor-pointer flex justify-start items-center"
                  >
                    <input
                      className="appearance-none w-6 h-6 border-2 border-teal-300 rounded-md checked:border-transparent checked:bg-teal-400 cursor-pointer"
                      type="checkbox"
                      name="eventStatus"
                      value={item}
                      checked={tempParamsObj.filterObj.eventStatus.includes(
                        item
                      )}
                      onChange={handleCheckboxChange}
                    />
                    {tempParamsObj.filterObj.eventStatus.includes(item) && (
                      <span className="absolute left-1 text-lg pointer-events-none text-white font-extrabold">
                        ✓
                      </span>
                    )}

                    <span className="mx-3">{item}</span>
                  </label>
                ))}
              </div>
            )}

            {selectedName == "Event Date" && (
              <div className="flex flex-col w-[55%] animate-fade-right">
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Event on & After:</span>
                  <input
                    type="date"
                    name="eventAfterDate"
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    value={tempParamsObj.filterObj.eventStartDate}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="my-1 flex justify-between items-center font-medium">
                  Event on & Before:
                  <input
                    type="date"
                    name="eventBeforeDate"
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    value={tempParamsObj.filterObj.eventEndDate}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            )}

            {selectedName == "Accepting Participents" && (
              <div className="flex flex-col relative w-fit animate-fade-right">
                <label className="text-sm my-1 font-medium cursor-pointer flex justify-start items-center">
                  <input
                    className="appearance-none w-6 h-6 border-2 border-teal-300 rounded-md checked:border-transparent checked:bg-teal-400 cursor-pointer"
                    type="checkbox"
                    name="acceptingParticipants"
                    checked={tempParamsObj.filterObj.acceptingParticipants}
                    onChange={handleSingleCheckBoxChange}
                  />
                  {tempParamsObj.filterObj.acceptingParticipants && (
                    <span className="absolute left-1 text-lg pointer-events-none text-white font-extrabold">
                      ✓
                    </span>
                  )}

                  <span className="mx-3">Accepting</span>
                </label>
              </div>
            )}

            {selectedName == "Accepting Sponsors" && (
              <div className="flex flex-col relative w-fit animate-fade-right">
                <label className="text-sm my-1 font-medium cursor-pointer flex justify-start items-center">
                  <input
                    className="appearance-none w-6 h-6 border-2 border-teal-300 rounded-md checked:border-transparent checked:bg-teal-400 cursor-pointer"
                    type="checkbox"
                    name="acceptingSponsors"
                    checked={tempParamsObj.filterObj.acceptingSponsors}
                    onChange={handleSingleCheckBoxChange}
                  />
                  {tempParamsObj.filterObj.acceptingSponsors && (
                    <span className="absolute left-1 text-lg pointer-events-none text-white font-extrabold">
                      ✓
                    </span>
                  )}

                  <span className="mx-3">Accepting</span>
                </label>
              </div>
            )}

            {selectedName == "Space" && (
              <div className="flex flex-col relative w-fit animate-fade-right">
                {spaceTypes.map((item) => (
                  <label
                    id={item}
                    className="text-sm my-1 font-medium cursor-pointer flex justify-start items-center"
                  >
                    <input
                      className="appearance-none w-6 h-6 border-2 border-teal-300 rounded-md checked:border-transparent checked:bg-teal-400 cursor-pointer"
                      type="checkbox"
                      name="space"
                      value={item}
                      checked={tempParamsObj.filterObj.space.includes(item)}
                      onChange={handleCheckboxChange}
                    />
                    {tempParamsObj.filterObj.space.includes(item) && (
                      <span className="absolute left-1 text-lg pointer-events-none text-white font-extrabold">
                        ✓
                      </span>
                    )}

                    <span className="mx-3">{item}</span>
                  </label>
                ))}
              </div>
            )}

            {selectedName == "Water Availability" && (
              <div className="flex flex-col relative w-fit animate-fade-right">
                {waterAvailabilityTypes.map((item) => (
                  <label
                    id={item}
                    className="text-sm my-1 font-medium cursor-pointer flex justify-start items-center"
                  >
                    <input
                      className="appearance-none w-6 h-6 border-2 border-teal-300 rounded-md checked:border-transparent checked:bg-teal-400 cursor-pointer"
                      type="checkbox"
                      name="waterAvailability"
                      value={item}
                      checked={tempParamsObj.filterObj.waterAvailability.includes(
                        item
                      )}
                      onChange={handleCheckboxChange}
                    />
                    {tempParamsObj.filterObj.waterAvailability.includes(
                      item
                    ) && (
                      <span className="absolute left-1 text-lg pointer-events-none text-white font-extrabold">
                        ✓
                      </span>
                    )}

                    <span className="mx-3">{item}</span>
                  </label>
                ))}
              </div>
            )}

            {selectedName == "Participants Limit" && (
              <div className="flex flex-col w-[45%] animate-fade-right">
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Min:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Minimum value"
                    name="participantLimitMoreThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Max:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Maximum value"
                    name="participantLimitLessThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            )}

            {selectedName == "No. Of Participants" && (
              <div className="flex flex-col w-[70%] animate-fade-right">
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">More Than:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Minimum value"
                    name="participantsMoreThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Less Than:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Maximum value"
                    name="participantsLessThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Exact Participant Count:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Maximum value"
                    name="numberOfParticipants"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            )}

            {selectedName == "Targeted Plant No." && (
              <div className="flex flex-col w-[45%] animate-fade-right">
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Min:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Minimun value"
                    name="targetPlantNumberMoreThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Max:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Maximum value"
                    name="targetPlantNumberLessThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            )}

            {selectedName == "Estimated Cost" && (
              <div className="flex flex-col w-[45%] animate-fade-right">
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Min:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Minimun value"
                    name="estimatedCostMoreThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Max:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Maximum value"
                    name="estimatedCostLessThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            )}

            {selectedName == "Estimated Area" && (
              <div className="flex flex-col w-[45%] animate-fade-right">
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Min:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Minimun value"
                    name="estimatedAreaMoreThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="my-1 flex justify-between items-center font-medium">
                  <span className="mr-4">Max:</span>
                  <input
                    className="px-2 py-1 font-normal border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                    type="number"
                    placeholder="Maximum value"
                    name="estimatedAreaLessThan"
                    min="0"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-6 flex justify-end items-center font-medium">
          <button onClick={handleReset}>
            <div className="rounded-lg bg-gradient-120 from-[#60D6D9] from-50% to-[#1566E7] to-100% p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-md px-4 py-1.5 bg-white shadow-md hover:bg-gradient-120 hover:from-[#60D6D9] hover:from-50% hover:to-[#1566E7] hover:to-100% hover:text-white back">
                <p>Reset Filter</p>
              </div>
            </div>
          </button>

          <button
            className="px-4 py-2 ml-4 flex justify-between items-center rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9]
           text-white"
            onClick={handleFilter}
          >
            <span className="mr-4">Show Events</span>

            <ArrowForwardIosRoundedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
