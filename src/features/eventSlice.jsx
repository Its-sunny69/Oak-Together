import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_SERVER_API_URL;

export const getAllEvents = createAsyncThunk(
  "event/getAllEvents",
  async (_, { rejectWithValue, getState }) => {
    const userId = getState().user.user;

    console.log("userId event", userId);
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/filters/spec?sortOrder=DESC`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to get all event",
        });
      }

      const data = await response.json();
      console.log("getAllEvents res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getEventById = createAsyncThunk(
  "event/getEventById",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to get all event by id",
        });
      }

      const data = await response.json();
      console.log("getEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getParticipantsOfEventById = createAsyncThunk(
  "event/getParticipantsOfEventById",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;

    console.log(userId);
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}/participants`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message:
            errorData.message ||
            "Failed to get all participants of event by id",
        });
      }

      const data = await response.json();
      console.log("getParticipantsOfEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getSponsorsOfEventById = createAsyncThunk(
  "event/getSponsorsOfEventById",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}/sponsors`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message:
            errorData.message || "Failed to get all sponsors of event by id",
        });
      }

      const data = await response.json();
      console.log("getSponsorsOfEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getIntelligenceByEventId = createAsyncThunk(
  "event/getIntelligenceByEventId",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}/intelligence`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message:
            errorData.message || "Failed to get intelligence by event id",
        });
      }

      const data = await response.json();
      console.log("getIntelligenceByEventId res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getEventsByFilter = createAsyncThunk(
  "event/getEventsByFilter",
  async (params, { rejectWithValue, getState }) => {
    const userId = getState().user.user;

    console.log("userId event", userId);
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/filters?${params}`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to get all event by filter",
        });
      }

      const data = await response.json();
      console.log("getEventsByFilter res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getEventsByFilterPagination = createAsyncThunk(
  "event/getEventsByFilterPagination",

  async (paramsObj, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const sortOrder = paramsObj?.sortOrder || "DESC";

      let url = `${apiUrl}/user-profiles/user-id/${userId}/events/filters/spec?sortOrder=${sortOrder}`;

      // Dynamically append only the parameters that exist
      const queryParams = new URLSearchParams();

      if (paramsObj.search) queryParams.append("name", paramsObj.search);

      // Add other filters dynamically
      Object.keys(paramsObj.filterObj || {}).forEach((key) => {
        const value = paramsObj.filterObj[key];
        if (value !== "" && value !== false && value !== undefined) {
          queryParams.append(key, value);
        }
      });

      if (paramsObj.sortBy) queryParams.append("sortBy", paramsObj.sortBy);
      if (paramsObj.page !== undefined)
        queryParams.append("page", paramsObj.page);
      if (paramsObj.size) queryParams.append("size", paramsObj.size);

      // Append the constructed query string to the URL
      if (queryParams.toString()) {
        url += `&${queryParams.toString()}`;
      }

      console.log("Final Request URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to get all event by filter",
        });
      }

      const data = await response.json();
      console.log("getEventsByFilterPagination res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getUnapprovedEvents = createAsyncThunk(
  "event/getUnapprovedEvents",
  async (_, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/unapproved`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to get unapproved events",
        });
      }

      const data = await response.json();
      console.log("getUnapprovedEvents res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postEvent = createAsyncThunk(
  "event/postEvent",
  async (postEventObj, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postEventObj),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to post event",
        });
      }

      const data = await response.json();
      console.log("postEvent res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const approveEventById = createAsyncThunk(
  "event/approveEventById",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}/verify-event/approval-status/APPROVED`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to approve event by id",
        });
      }

      const data = await response.json();
      console.log("approveEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const updateEventById = createAsyncThunk(
  "event/updateEventById",
  async (updateEventObj, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${updateEventObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateEventObj.updatedEvent),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to update event",
        });
      }

      const data = await response.json();
      console.log("updateEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const enrollInEventById = createAsyncThunk(
  "event/enrollInEventById",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}/enroll`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to enroll in event",
        });
      }

      const data = await response.json();
      console.log("enrollInEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const withdrawFromEventById = createAsyncThunk(
  "event/withdrawFromEventById",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}/withdraw`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to withdraw from event",
        });
      }

      const data = await response.json();
      console.log("withdrawFromEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const sponsorEvent = createAsyncThunk(
  "event/sponsorEvent",
  async (paramsObj, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${paramsObj.id}/sponsor/amount/${paramsObj.amount}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to sponsor a event",
        });
      }

      const data = await response.json();
      console.log("sponsorEvent res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const startEventById = createAsyncThunk(
  "event/startEventById",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}/start`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to start event",
        });
      }

      const data = await response.json();
      console.log("startEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const endEventById = createAsyncThunk(
  "event/endEventById",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}/end`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to end event",
        });
      }

      const data = await response.json();
      console.log("endEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const markAttendance = createAsyncThunk(
  "event/markAttendance",
  async (paramsObj, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${paramsObj.id}/attendance?${paramsObj.location}`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to mark attendance",
        });
      }

      const data = await response.json();
      console.log("markAttendance res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const verifyEvent = createAsyncThunk(
  "event/verifyEvent",
  async (eventObj, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${eventObj.id}/verify-completion`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventObj.data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to verify event",
        });
      }

      const data = await response.json();
      console.log("verifyEvent res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteEventById = createAsyncThunk(
  "event/deleteEventById",
  async (id, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/events/event-id/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to delete event",
        });
      }

      const data = await response.json();
      console.log("deleteEventById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    allEvents: [],
    currentEvent: {},
    eventsByFilter: [],
    eventsByFilterPagination: [],
    totalPages: 0,
    totalItems: 0,
    unapprovedEvents: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allEvents = action.payload.content;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.currentEvent = action.payload;
      })
      .addCase(getParticipantsOfEventById.fulfilled, (state, action) => {
        state.currentEvent = {
          ...state.currentEvent,
          participants: action.payload,
        };
        console.log("getParticipantsOfEventById", state.currentEvent);
      })
      .addCase(getSponsorsOfEventById.fulfilled, (state, action) => {
        state.currentEvent = {
          ...state.currentEvent,
          sponsors: action.payload,
        };
        console.log("getSponsorsOfEventById", state.currentEvent);
      })
      .addCase(getIntelligenceByEventId.fulfilled, (state, action) => {
        const payload = action.payload;

        const transformedPayload = {
          id: payload.id,
          lastModified: payload.lastModified,
          fertilizerRecommendations: payload.fertilizerRecommendations,
          generalInfo: [
            { plantingSeason: payload.plantingSeason },
            { generalCareTips: payload.generalCareTips },
          ],
          benefits: [
            { environmentalBenefit: payload.environmentalBenefit },
            { ecologicalBenefit: payload.ecologicalBenefit },
            { communityBenefit: payload.communityBenefit },
            { economicBenefit: payload.economicBenefit },
          ],
        };

        state.currentEvent = {
          ...state.currentEvent,
          intelligence: transformedPayload,
        };

        console.log("getIntelligenceByEventId", state.currentEvent);
      })
      .addCase(getEventsByFilter.fulfilled, (state, action) => {
        console.log(action.payload);
        state.eventsByFilter = action.payload;
      })
      .addCase(getEventsByFilterPagination.fulfilled, (state, action) => {
        console.log(action.payload);
        state.eventsByFilterPagination = action.payload.content;
        state.totalPages = action.payload.page.totalPages;
        state.totalItems = action.payload.page.totalElements;
      })
      .addCase(getUnapprovedEvents.fulfilled, (state, action) => {
        state.unapprovedEvents = action.payload;
      })
      .addCase(postEvent.fulfilled, (state, action) => {
        state.allEvents.push(action.payload);
      })
      .addCase(updateEventById.fulfilled, (state, action) => {
        const index = state.allEvents.findIndex(
          (event) => event.id == action.payload.id
        );

        if (index !== -1) {
          state.allEvents[index] = {
            ...state.allEvents[index],
            ...action.payload,
          };
        }
      })
      .addCase(enrollInEventById.fulfilled, (state, action) => {
        const index = state.allEvents.findIndex(
          (event) => event.id == action.payload.id
        );

        if (index !== -1) {
          state.allEvents[index] = {
            ...state.allEvents[index],
            eventParticipants: action.payload.eventParticipants,
          };
        }

        // state.currentEvent.participants = 
      })
      .addCase(withdrawFromEventById.fulfilled, (state, action) => {
        const index = state.allEvents.findIndex(
          (event) => event.id == action.payload.id
        );

        if (index !== -1) {
          state.allEvents[index] = {
            ...state.allEvents[index],
            eventParticipants: action.payload.eventParticipants,
          };
        }
      })
      .addCase(sponsorEvent.fulfilled, (state, action) => {
        const index = state.allEvents.findIndex(
          (event) => event.id == action.payload.id
        );

        if (index !== -1) {
          state.allEvents[index] = {
            ...state.allEvents[index],
            eventSponsors: action.payload.eventSponsors,
          };
        }
      })
      .addCase(startEventById.fulfilled, (state, action) => {
        const index = state.allEvents.findIndex(
          (event) => event.id == action.payload.id
        );

        if (index !== -1) {
          state.allEvents[index] = {
            ...state.allEvents[index],
            eventStatus: action.payload.eventStatus,
          };
        }
      })
      .addCase(endEventById.fulfilled, (state, action) => {
        const index = state.allEvents.findIndex(
          (event) => event.id == action.payload.id
        );

        if (index !== -1) {
          state.allEvents[index] = {
            ...state.allEvents[index],
            eventStatus: action.payload.eventStatus,
          };
        }
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        const index = state.allEvents.findIndex(
          (event) => event.id == action.payload.id
        );

        if (index !== -1) {
          state.allEvents[index] = {
            ...state.allEvents[index],
            eventParticipants: action.payload.eventParticipants,
          };
        }
      })
      .addCase(verifyEvent.fulfilled, (state, action) => {
        const index = state.allEvents.findIndex(
          (event) => event.id == action.payload.id
        );

        if (index !== -1) {
          state.allEvents[index] = {
            ...state.allEvents[index],
            actualPlantNumber: action.payload.actualPlantNumber,
            actualArea: action.payload.actualArea,
            treeSpecies: action.payload.treeSpecies,
          };
        }
      })
      .addCase(deleteEventById.fulfilled, (state, action) => {
        const eventId = action.payload.id;

        state.allEvents = state.allEvents.filter(
          (event) => event.id !== eventId
        );
      });
  },
});

export default eventSlice.reducer;
