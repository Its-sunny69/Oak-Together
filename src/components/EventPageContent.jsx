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
import MessageModal from "./MessageModal";
import ProfileHeader2 from "./ProfileHeader2";
import { useNavigate } from "react-router-dom";

function EventPageContent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentView, setCurrentView] = useState("event-search");

  const [selectedEventId, setSelectedEventId] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { eventsByFilterPagination, totalPages, totalItems } = useSelector(
    (state) => state.event
  );
  const userData = useSelector((state) => state.user.userData);

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
      approvalStatus: userData?.role !== "ADMIN" ? "APPROVED" : "",
    },
  });

  const startIndex = paramsObj.page * paramsObj.size + 1;
  const endIndex = Math.min((paramsObj.page + 1) * paramsObj.size, totalItems);

  console.log(eventsByFilterPagination);

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

  const eventPerPage = ["5", "10", "20", "50"];

  useEffect(() => {
    console.log("sortBy", sortBy);
  }, [sortBy]);

  const EventSearchDisplay = () => (
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
                  {eventPerPage.map((option, index) => (
                    <option
                      key={index}
                      value={option}
                      defaultValue={option == 10}
                    >
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
            previousClassName={`page-item ${
              paramsObj.page === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
            nextClassName={`page-item ${
              paramsObj.page === totalPages - 1
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
            {eventsByFilterPagination?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      ) : (
        "invalid"
      )}

      <button
        className="px-6 py-2 ml-4 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium flex justify-center items-center gap-2 active:scale-95 transition-all fixed bottom-4 right-4"
        onClick={() => setCurrentView("create-event-form")}
      >
        Create Event
      </button>
    </>
  );

  const EventFormDisplay = () => (
    <div className="relative flex flex-col items-start gap-1 w-full">
      
      <CreateEventForm setIsModalVisible={setIsModalVisible} />

      {isModalVisible && (
        <div className="absolute inset-0 backdrop-blur-[2px] bg-gray-600/50 z-10 flex justify-center items-center">
          <MessageModal
            setIsModalVisible={setIsModalVisible}
            task="Event Created"
            message="Now hang tight! Once the event is approved, interested users can see the
          event and participate anytime."
            suggestion="Inform your friends regarding this!"
            customAction={() => setCurrentView("event-search")}
          />
        </div>
      )}
    </div>
  );

  const viewMap = {
    "event-search": <EventSearchDisplay />,
    "create-event-form": <EventFormDisplay />,
  };

  return (
    <div className="py-6 pr-4 w-full">
      {currentView != "create-event-form" ?
        <ProfileHeader />
        :
        <ProfileHeader2>
          <h2 className="font-medium text-2xl">
            Create New Event
          </h2>
          <div 
          className="flex gap-3 items-center font-medium text-lg text-[#3BA5DA] cursor-pointer hover:underline transition-all"
          onClick={() => setCurrentView("event-search")}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-2xl"/>
            <div>Back To Event Search</div>
          </div>
        </ProfileHeader2>
      }
      <div className="pt-4 w-full">

        {viewMap[currentView]}


      </div>
    </div>
  );
}

export default EventPageContent;
