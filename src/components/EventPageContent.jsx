import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { getEventsByFilterPagination } from "../features/eventSlice";
import EventCard from "./EventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FolderCopyRounded } from "@mui/icons-material";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CreateEventForm from "./CreateEventForm";

function EventPageContent() {
  const [currentView, setCurrentView] = useState("event-search");
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleRegisterClick = (nextEventId) => {
    setCurrentView("event-details");
    setSelectedEventId(nextEventId);
  }

  const dispatch = useDispatch();
  const { eventsByFilter, totalPages, totalItems } = useSelector(
    (state) => state.event
  );

  const [sortBy, setSortBy] = useState("eventStartDate");
  const [isSearchInputValid, setIsSearchInputValid] = useState(true);

  const [paramsObj, setParamsObj] = useState({
    page: 0,
    size: 10,
    sortBy: "eventStartDate",
    search: "",
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
      participatedBy: "",
      targetPlantNumberMoreThan: "",
      targetPlantNumberLessThan: "",
      estimatedCostMoreThan: "",
      estimatedCostLessThan: "",
      estimatedAreaMoreThan: "",
      estimatedAreaLessThan: "",
    },
  });

  const startIndex = paramsObj.page * paramsObj.size + 1;
  const endIndex = Math.min((paramsObj.page + 1) * paramsObj.size, totalItems);

  console.log(eventsByFilter);

  useEffect(() => {
    if (paramsObj.search.trim() && paramsObj.search.trim().length < 3) {
      setIsSearchInputValid(false);
      return;
    } else {
      setIsSearchInputValid(true);
      dispatch(getEventsByFilterPagination(paramsObj));
    }

  }, [paramsObj, dispatch]);

  useEffect(() => {
    setParamsObj((prev) => ({
      ...prev,
      sortBy: sortBy,
      page: 0,
    }));
  }, [sortBy]);

  const handlePageClick = (event) => {
    setParamsObj((prev) => ({
      ...prev,
      page: event.selected,
    }));
  };

  const formatLabel = (str) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (match) => match.toUpperCase());
  };

  const sortByOptionList = [
    "eventStartDate",
    "eventEndDate",
    "eventStartTime",
    "eventEndTime",
    "targetPlantNumber",
    "participantLimit",
    "numberOfParticipants",
  ];

  const eventPerPage = ["5", "20", "50"];

  useEffect(() => {
    console.log("sortBy", sortBy);
  }, [sortBy]);

  const eventSearchDisplay = (
    <>
      <Filter
        paramsObj={paramsObj}
        setParamsObj={setParamsObj}
        isSearchInputValid={isSearchInputValid}
      />

      {isSearchInputValid ? (
        <>
          <div className="flex justify-between">
            <div className="flex justify-center items-center">
              <p className="font-semibold">
                Results: {startIndex} - {endIndex} of {totalItems}
              </p>

              <div className="ml-4">
                <select
                  name="eventPerPage"
                  id="event-per-page"
                  className="p-1 w-full border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
                  value={paramsObj.size}
                  disabled={!isSearchInputValid}
                  onChange={(e) => {
                    isSearchInputValid
                      ? setParamsObj((prev) => ({
                        ...prev,
                        size: Number(e.target.value),
                        page: 0,
                      }))
                      : "";
                  }}
                >
                  <option value="" className="text-gray-400">
                    10
                  </option>

                  {eventPerPage.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <select
              name="sort"
              id="sort-by"
              className="p-1 border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
              disabled={!isSearchInputValid}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="" className="text-gray-400 ">
                Sort By
              </option>

              {sortByOptionList.map((option, index) => (
                <option key={index} value={option}>
                  {formatLabel(option)}
                </option>
              ))}
            </select>
          </div>

          <ReactPaginate
            nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
            onPageChange={handlePageClick}
            forcePage={paramsObj.page}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.max(totalPages, 1)}
            previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
            previousClassName={`page-item ${paramsObj.page === 0 ? "opacity-50 pointer-events-none" : ""
              }`}
            nextClassName={`page-item ${paramsObj.page === totalPages - 1
              ? "opacity-50 pointer-events-none"
              : ""
              }`}
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            renderOnZeroPageCount={null}
            containerClassName="pagination flex justify-center items-center my-4"
            pageClassName="page-item px-3 py-1 border border-[#60d6d9] rounded-md mx-2"
            activeClassName="active bg-[#60d6d9] text-white"
          />

          {/* Event List */}
          <div>
            {eventsByFilter?.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={handleRegisterClick}
              />
            ))}
          </div>
        </>
      ) : (
        "invalid"
      )}

      <button 
      className="px-6 py-2 ml-4 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium flex justify-center items-center gap-2 active:scale-95 transition-all fixed bottom-4 right-4"
      onClick={() => setCurrentView('create-event-form')}
      >
        Create Event
      </button>
    </>
  );

  const eventFormDisplay = (
    <>
      <CreateEventForm />
    </>
  );

  const eventDetailsDisplay = (
    <>
      
    </>
  );

  const viewMap = {
    "event-search": eventSearchDisplay,
    "create-event-form": eventFormDisplay,
    "event-details": eventDetailsDisplay
  }

  return (
    <div className="pt-6 pr-4 w-full">
      <ProfileHeader />
      <div className="w-full">


        {viewMap[currentView]}

      </div>
    </div>
  );
}

export default EventPageContent;
