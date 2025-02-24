import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../features/eventSlice";
import toast from "react-hot-toast";

const fetchFilteredData = (
  filteredData,
  search,
  {
    joinedEvents,
    status,
    space,
    eventAfterDate,
    eventBeforeDate,
    acceptingParticipants,
    acceptingSponsors,
    waterAvailability,
    participantLimitMoreThan,
    participantLimitLessThan,
    targetPlantNumberMoreThan,
    targetPlantNumberLessThan,
    estimatedCostMoreThan,
    estimatedCostLessThan,
    estimatedAreaMoreThan,
    estimatedAreaLessThan
  }
) => {
  console.log(space);
  console.log(search);

  if (status.length) {
    filteredData = filteredData.filter((event) =>
      status.includes(event.eventStatus)
    );
  }

  if (space.length) {
    filteredData = filteredData.filter((event) => space.includes(event.space));
  }

  if (eventAfterDate) {
    filteredData = filteredData.filter(
      (event) => eventAfterDate <= event.eventStartDate
    );
  }

  if (eventBeforeDate) {
    filteredData = filteredData.filter(
      (event) => eventBeforeDate >= event.eventStartDate
    );
  }

  if (acceptingParticipants) {
    filteredData = filteredData.filter(
      (event) => event.acceptingParticipants == true
    );
  }

  if (acceptingSponsors) {
    filteredData = filteredData.filter(
      (event) => event.acceptingSponsors == true
    );
  }

  if (waterAvailability.length) {
    filteredData = filteredData.filter((event) =>
      waterAvailability.includes(event.waterAvailability)
    );
  }

  if (participantLimitMoreThan) {
    filteredData = filteredData.filter(
      (event) => participantLimitMoreThan <= event.participantLimit
    );
  }

  if (participantLimitLessThan) {
    filteredData = filteredData.filter(
      (event) => participantLimitLessThan >= event.participantLimit
    );
  }

  if (targetPlantNumberMoreThan) {
    filteredData = filteredData.filter(
      (event) => targetPlantNumberMoreThan <= event.targetPlantNumber
    );
  }

  if (targetPlantNumberLessThan) {
    filteredData = filteredData.filter(
      (event) => targetPlantNumberLessThan >= event.targetPlantNumber
    );
  }

  if (estimatedCostMoreThan) {
    filteredData = filteredData.filter(
      (event) => estimatedCostMoreThan <= event.estimatedCost
    );
  }

  if (estimatedCostLessThan) {
    filteredData = filteredData.filter(
      (event) => estimatedCostLessThan >= event.estimatedCost
    );
  }

  if (estimatedAreaMoreThan) {
    filteredData = filteredData.filter(
      (event) => estimatedAreaMoreThan <= event.estimatedArea
    );
  }

  if (estimatedAreaLessThan) {
    filteredData = filteredData.filter(
      (event) => estimatedAreaLessThan >= event.estimatedArea
    );
  }

  const fuzzyMatch = (name, search) => {
    name = name.toLowerCase().replace(/\s+/g, "");
    search = search.toLowerCase().replace(/\s+/g, "");

    return [...search].every((letter) => name.includes(letter));
  };

  if (search) {
    filteredData = filteredData.filter((event) =>
      fuzzyMatch(event.name, search)
    );
  }

  return filteredData;
};

const useEvents = (search, filterObj) => {
  const [eventData, setEventData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents())
      .unwrap()
      .then((data) => {
        setEventData(data);
      })
      .catch((error) => {
        toast.error(error.message, "error");
        console.error("Error in fetching events:", error);
      });
  }, [dispatch]);

  return fetchFilteredData(eventData, search, filterObj);
};

export default useEvents;
