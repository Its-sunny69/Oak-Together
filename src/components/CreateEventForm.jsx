import { useState, useEffect } from 'react'
import { useImmer } from "use-immer";
import { Formik, Form, Field, useFormikContext } from "formik";
import { FormTextComponent, ImageUploadField, FormSelectMUI, FormDatePickerMUI, FormTimePickerMUI, MarkedLocationAutocomplete, FormikPlaceAutocomplete } from ".";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import postEventSchema from '../schemas/postEventSchema';
import { useDispatch } from 'react-redux';
import { getAllEvents, postEvent, uploadImagesInEvent } from '../features/eventSlice';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { APIProvider } from '@vis.gl/react-google-maps'
import { faCircle, faCircleDot, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { GalleryIcon } from '../assets';
import dayjs from "dayjs";
import { useDebounce } from '../hooks';

const getFormattedAddress = async (lat, lng, setFormattedAddress, fieldId) => {
  if (!window.google || !window.google.maps) return;

  const geocoder = new window.google.maps.Geocoder();
  const latLng = { lat, lng };
  // console.log(latLng);

  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === "OK" && results[0]) {
      setFormattedAddress(fieldId, results[0].formatted_address);
      console.log("Geolocation address: " + results[0].formatted_address);
    }
    else {
      console.error("Geocoder failed due to: " + status);
    }
  });
};

function FormSectionsThread({ activeSectionIndex, sectionStates, handleSectionChange }) {

  const formik = useFormikContext();

  const statusToStyleMap = {
    "Active": {
      icon: faCircleDot,
      color: "#0043CE"
    },
    "Untouched": {
      icon: faCircle,
      color: "#C6C6C6"
    },
    "Incomplete": {
      icon: faCircleQuestion,
      color: "#0043CE"
    },
    "Completed": {
      icon: faCircleCheck,
      color: "#0043CE"
    },
    "Error": {
      icon: faCircleXmark,
      color: "#CC0000"
    }
  }

  return (
    <div className="flex">
      {
        sectionStates.map(({ sectionName, status }, index) => {
          const { icon, color } = statusToStyleMap[status];

          return (
            <div key={sectionName} className="flex ">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center">
                  <div
                    style={{
                      height: "0.1rem",
                      width: "3vw",
                      backgroundColor:
                        index > 0 ?
                          sectionStates[index - 1].status == "Completed" ?
                            statusToStyleMap[sectionStates[index - 1].status].color : statusToStyleMap["Untouched"].color
                          : ""
                    }}
                  >
                  </div>
                  <FontAwesomeIcon
                    className="text-xl cursor-pointer rounded-full"
                    icon={icon}
                    style={{
                      color: color,
                      boxShadow:
                        index == activeSectionIndex ?
                          "0px 0px 3px 4px rgba(96,214,217,0.5)" : ""
                    }}
                    onClick={() => handleSectionChange(formik, activeSectionIndex, index)}
                  />
                  <div
                    style={{
                      height: "0.1rem",
                      width: "3vw",
                      backgroundColor:
                        index < sectionStates.length - 1 ?
                          status == "Completed" ?
                            color : statusToStyleMap["Untouched"].color
                          : ""
                    }}
                  >
                  </div>
                </div>
                <div className="text-[#6F6F6F] text-xs font-medium">
                  {sectionName}
                </div>
              </div>

            </div>
          )
        })
      }
    </div>
  )
}

function FormSectionContainer({ animation, children }) {
  return (
    <div className={`flex flex-col gap-3 px-2 h-[86%] w-full overflow-y-scroll transition-all ${animation}`}>
      {children}
    </div>
  )
}

const fieldContainerStyle = "flex flex-col w-[98%] gap-2 mx-1"
const fieldLabelStyle = "text-sm text-black font-medium"
const fieldInputStyle = "py-2 px-4 w-full border-[1px] rounded-lg border-[#60d6d9] focus:outline-[#2572CF]"
const fieldSelectStyleObject = {
  width: "100%",
  border: "1px solid #60D6D9",
  borderRadius: "0.5rem",
  backgroundColor: "white",
  placeholderColor: "#a2a2a2",
  padding: "0rem",
  focusOutline: "2px solid #60D6D9",
  iconColor: "#60D6D9",
  hoverBgColor: "#60D6D9",
  hoverTextColor: "black",
};


function BasicFormSection() {

  const { values } = useFormikContext();

  const selectedStartDate = values["eventStartDate"];

  return (
    <>
      <Field name="profilePic">
        {({ form }) =>
          <ImageUploadField
            form={form}
            containerStyleClasses={fieldContainerStyle + " items-center "}
            labelStyleClasses={fieldLabelStyle}
            inputStyleClasses={fieldInputStyle}
            previewStyleClasses="relative w-full py-8 px-4 border-2 border-dashed border-[rgba(0,0,0,0.4)] rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#60D6D9]"
            id="eventPictures"
            name="eventPictures"
            placeholder="Upload Pictures"
            placeholderImg={GalleryIcon}
            placeholderTextStyleClasses="text-lg text-[rgba(0,0,0,0.3)]"
            placeholderImgStyleClasses="w-[75%]"
          />
        }
      </Field>
      <FormTextComponent
        label="Name"
        id="name"
        name="name"
        containerStyleClasses={fieldContainerStyle}
        labelStyleClasses={fieldLabelStyle}
        inputStyleClasses={fieldInputStyle}
        type="text"
      />
      <FormTextComponent
        label="Description"
        id="description"
        name="description"
        containerStyleClasses={fieldContainerStyle}
        labelStyleClasses={fieldLabelStyle}
        inputStyleClasses={fieldInputStyle}
        type="textarea"
        isTextArea
      />

      <div className="flex gap-4">
        <FormDatePickerMUI
          name="eventStartDate"
          id="eventStartDate"
          label="Start Date"
          containerStyleClasses={fieldContainerStyle}
          labelStyleClasses={fieldLabelStyle}
          pickerStyleObject={fieldSelectStyleObject}
          minDate={dayjs()}
          maxDate={dayjs().add(1, "year")}
        />
        <FormDatePickerMUI
          name="eventEndDate"
          id="eventEndDate"
          label="End Date"
          containerStyleClasses={fieldContainerStyle}
          labelStyleClasses={fieldLabelStyle}
          pickerStyleObject={fieldSelectStyleObject}
          minDate={selectedStartDate ? dayjs(selectedStartDate) : dayjs()}
          maxDate={dayjs().add(1, "year").add(4, "month")}
        />
      </div>

      <div className="flex gap-4">
        <FormTimePickerMUI
          name="eventStartTime"
          id="eventStartTime"
          label="Start Time"
          containerStyleClasses={fieldContainerStyle}
          labelStyleClasses={fieldLabelStyle}
          pickerStyleObject={fieldSelectStyleObject}
        />
        <FormTimePickerMUI
          name="eventEndTime"
          id="eventEndTime"
          label="End Time"
          containerStyleClasses={fieldContainerStyle}
          labelStyleClasses={fieldLabelStyle}
          pickerStyleObject={fieldSelectStyleObject}
        />
      </div>


      {/* https://mui.com/x/react-date-pickers/date-picker/ */}
      {/* https://mui.com/x/react-date-pickers/time-picker/ */}
      {/* https://mui.com/x/react-date-pickers/validation/ */}
    </>
  )
}

function LocationFormSection({ selectedLocationObj, setSelectedLocationObj, placeSelected, setPlaceSelected }) {

  const { values, touched, setFieldValue, setFieldTouched, validateField } = useFormikContext();

  const fieldNameToLocationProp = {
    "address": selectedLocationObj?.position,
    "latitude": selectedLocationObj?.position.locations,
    "longitude": selectedLocationObj?.position.locations,
    "space": selectedLocationObj,
    "waterAvailability": selectedLocationObj,
    // "estimatedArea": selectedLocationObj
  }

  const autofillFieldList = ["address", "latitude", "longitude", "space", "waterAvailability"]; // add estimatedArea in future?

  useEffect(() => {

    if (selectedLocationObj) {
      autofillFieldList.forEach((fieldName) => {
        const nextValue = fieldNameToLocationProp[fieldName][fieldName];
        // console.log(`${fieldName}: ${nextValue}`);
        setFieldValue(fieldName, nextValue);
        if (!touched[fieldName]) setFieldTouched(fieldName, true);

        setTimeout(() => { validateField(fieldName) }, 500);
      });
      setPlaceSelected(false); // setting place selected using 'Google's PlaceAutocomplete' as false
      return;
    }

    if (placeSelected) return; // if google's autocomplete was used, then do not clear fields even if no location is selected by custom marked location autocomplete

    // clear related fields as no location is selected using any autocomplete
    autofillFieldList.forEach((fieldName) => {
      setFieldValue(fieldName, "");
      setTimeout(() => { validateField(fieldName) }, 500);
    })
    return;

  }, [selectedLocationObj]);

  useEffect(() => {
    if (!placeSelected && !selectedLocationObj && touched.address) {
      setFieldValue("latitude", "");
      setFieldValue("longitude", "");

      setFieldTouched("latitude", true);
      setFieldTouched("longitude", true);

      setTimeout(() => {
        validateField("latitude");
        validateField("longitude");
      }, 500);
    }
  }, [placeSelected, values.address]);

  const debouncedLat = useDebounce(values.latitude, 800);
  const debouncedLng = useDebounce(values.longitude, 800);

  // might be better to find a way to format address only when coords change by typing and not by place selection in Google autocomplete
  useEffect(() => {
    if (!selectedLocationObj && values.latitude && values.longitude) {
      getFormattedAddress(values.latitude, values.longitude, setFieldValue, "address");
      setPlaceSelected(true);
      setFieldTouched("address", true);
    }
  }, [debouncedLat, debouncedLng]);

  const handlePlaceSelect = (selectedPlace) => {
    const locationCoords = selectedPlace.geometry.location;
    const nextAddress = selectedPlace.formatted_address;

    setPlaceSelected(true);
    setFieldValue("address", nextAddress);
    setFieldValue("latitude", locationCoords.lat());
    setFieldValue("longitude", locationCoords.lng());

    setTimeout(() => {
      autofillFieldList.slice(0, 3).forEach((fieldName) => { validateField(fieldName) });
    }, 500);
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GMAP_API_KEY} libraries={["geometry"]}>
      <div>
        <MarkedLocationAutocomplete
          selectedLocationObj={selectedLocationObj}
          setSelectedLocationObj={setSelectedLocationObj}
          containerStyleClasses={fieldContainerStyle}
          labelStyleClasses={fieldLabelStyle}
          inputStyleClasses={fieldInputStyle}
        />
        <div className="flex items-center justify-center gap-3">
          <div className="w-[30%] h-0 border-t-[0.2px] border-t-black"></div>
          or
          <div className="w-[30%] h-0 border-t-[0.5px] border-t-black"></div>
        </div>
      </div>


      <FormikPlaceAutocomplete
        id="address"
        name="address"
        label="Address"
        placeholder=""
        type="text"
        containerClassname={fieldContainerStyle}
        inputClassname={fieldInputStyle + (selectedLocationObj ? " text-[rgba(0,0,0,0.38)] bg-[#E2E2E2]" : "")}
        labelClassname={fieldLabelStyle}
        handlePlaceSelect={handlePlaceSelect}
        placeSelected={placeSelected}
        setPlaceSelected={setPlaceSelected}
        disabled={selectedLocationObj != null}
      />

      <div className="flex items-center gap-4">
        <FormTextComponent
          label="Latitude"
          id="latitude"
          name="latitude"
          type="number"
          labelStyleClasses={fieldLabelStyle}
          containerStyleClasses={fieldContainerStyle}
          inputStyleClasses={fieldInputStyle}
          disabled={selectedLocationObj != null}
          style={{
            backgroundColor: selectedLocationObj ? "#E2E2E2" : "",
            color: selectedLocationObj ? "rgba(0,0,0,0.38)" : ""
          }}
        />
        <FormTextComponent
          label="Longitude"
          id="longitude"
          name="longitude"
          type="number"
          labelStyleClasses={fieldLabelStyle}
          containerStyleClasses={fieldContainerStyle}
          inputStyleClasses={fieldInputStyle}
          disabled={selectedLocationObj != null}
          style={{
            backgroundColor: selectedLocationObj ? "#E2E2E2" : "",
            color: selectedLocationObj ? "rgba(0,0,0,0.38)" : ""
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <FormSelectMUI
          label="Space"
          id="space"
          name="space"
          options={
            ["PLAINS", "SLOPE", "HILL", "SPACIOUS", "CONJUSTED", "RIVERBANK"]
              .map((opt) => { return { label: opt, value: opt } })
          }
          containerStyleClasses={fieldContainerStyle}
          labelStyleClasses={fieldLabelStyle}
          selectStyleObject={fieldSelectStyleObject}
          disabled={selectedLocationObj != null}
          style={{
            backgroundColor: selectedLocationObj ? "#E2E2E2" : ""
          }}
        />
        <FormSelectMUI
          label="Water Availability"
          id="waterAvailability"
          name="waterAvailability"
          options={
            ["PLENTY", "MODERATE", "SCARCE"]
              .map((opt) => { return { label: opt, value: opt } })
          }
          containerStyleClasses={fieldContainerStyle}
          labelStyleClasses={fieldLabelStyle}
          selectStyleObject={fieldSelectStyleObject}
          disabled={selectedLocationObj != null}
          style={{
            backgroundColor: selectedLocationObj ? "#E2E2E2" : ""
          }}
        />
      </div>

      <FormTextComponent
        label="Estimated Area (sq. mtr.)"
        id="estimatedArea"
        name="estimatedArea"
        type="number"
        labelStyleClasses={fieldLabelStyle}
        containerStyleClasses={fieldContainerStyle}
        inputStyleClasses={fieldInputStyle}
      />

      <FormTextComponent
        label="Target Plant Number"
        id="targetPlantNumber"
        name="targetPlantNumber"
        type="number"
        labelStyleClasses={fieldLabelStyle}
        containerStyleClasses={fieldContainerStyle}
        inputStyleClasses={fieldInputStyle}
      />
    </APIProvider>
  )
}

function ParticipantsFormSection() {

  return (
    <>
      <FormSelectMUI
        label="Accepting Participants"
        id="acceptingParticipants"
        name="acceptingParticipants"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        containerStyleClasses={fieldContainerStyle}
        labelStyleClasses={fieldLabelStyle}
        selectStyleObject={fieldSelectStyleObject}
      />
      <FormTextComponent
        label="Participant Limit"
        id="participantLimit"
        name="participantLimit"
        type="number"
        labelStyleClasses={fieldLabelStyle}
        containerStyleClasses={fieldContainerStyle}
        inputStyleClasses={fieldInputStyle}
      />
    </>
  )
}



function SponsorsFormSection() {

  return (
    <>
      <FormSelectMUI
        label="Accepting Sponsors"
        id="acceptingSponsors"
        name="acceptingSponsors"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        containerStyleClasses={fieldContainerStyle}
        labelStyleClasses={fieldLabelStyle}
        selectStyleObject={fieldSelectStyleObject}
      />
      <FormTextComponent
        label="Estimated Cost"
        id="estimatedCost"
        name="estimatedCost"
        type="number"
        labelStyleClasses={fieldLabelStyle}
        containerStyleClasses={fieldContainerStyle}
        inputStyleClasses={fieldInputStyle}
      />
      <FormTextComponent
        label="Total Amount Raised"
        id="totalAmountRaised"
        name="totalAmountRaised"
        type="number"
        labelStyleClasses={fieldLabelStyle}
        containerStyleClasses={fieldContainerStyle}
        inputStyleClasses={fieldInputStyle}
      />
    </>
  )
}

function ConfirmFormSection() {

  const FieldPreview = ({ label, value }) => (
    <div className="flex flex-col mb-3">
      <span className="text-sm font-semibold text-gray-500">{label}</span>
      <span className="text-base text-gray-800">{value ? value : "—"}</span>
    </div>
  );

  const { values } = useFormikContext();

  const shouldShowImagePreview =
    values.eventPictures &&
    values.eventPictures.length > 0 &&
    values.eventPictures.length <= 3;

  // Mapping fields to labels
  const formFieldMap = {
    name: "Name",
    description: "Description",
    eventStartDate: "Start Date",
    eventEndDate: "End Date",
    eventStartTime: "Start Time",
    eventEndTime: "End Time",
    address: "Address",
    latitude: "Latitude",
    longitude: "Longitude",
    participantLimit: "Participant Limit",
    acceptingSponsors: "Accepting Sponsors",
    acceptingParticipants: "Accepting Participants",
    targetPlantNumber: "Target Plant Number",
    estimatedArea: "Estimated Area",
    estimatedCost: "Estimated Cost",
    totalAmountRaised: "Total Amount Raised",
    space: "Space",
    waterAvailability: "Water Availability"
  };

  const sections = [
    {
      name: "Basic",
      fields: [
        "eventPictures",
        "name",
        "description",
        "eventStartDate",
        "eventEndDate",
        "eventStartTime",
        "eventEndTime"
      ]
    },
    {
      name: "Location",
      fields: [
        "address",
        "latitude",
        "longitude",
        "space",
        "waterAvailability",
        "estimatedArea",
        "targetPlantNumber"
      ]
    },
    {
      name: "Participants",
      fields: ["acceptingParticipants", "participantLimit"]
    },
    {
      name: "Sponsors",
      fields: ["acceptingSponsors", "estimatedCost", "totalAmountRaised"]
    }
  ];

  return (
    <div className="flex flex-col gap-8 p-6 rounded-xl bg-gray-100 shadow-md">
      <div className="text-2xl font-semibold text-gray-700">Event Preview</div>

      {sections.map((section, index) => (
        <div key={section.name}>
          <div className="mb-2">
            <h3 className="text-xl font-bold text-gray-800">{section.name}</h3>
            <hr className="border-t border-gray-300 mt-2" />
          </div>

          <div className="mt-4">
            {section.fields.map((field) => {
              if (field === "eventPictures") {
                return (
                  shouldShowImagePreview && (
                    <div key="eventPictures" className="mb-4">
                      <p className="text-md font-medium text-gray-600 mb-2">
                        Images
                      </p>
                      <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={2}
                        navigation
                        className="rounded-lg"
                      >
                        {values.eventPictures.map((file, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Event Pic ${index + 1}`}
                              className="h-40 w-full object-cover rounded-md shadow"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )
                );
              }
              else {
                return (
                  <FieldPreview
                    key={field}
                    label={formFieldMap[field] || field}
                    value={values[field]}
                  />
                );
              }
            })}
          </div>

          {/* Add spacing after each section except the last */}
          {index !== sections.length - 1 && (
            <div className="mt-6 border-b border-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}


function CreateEventForm({ setIsModalVisible }) {

  const dispatch = useDispatch();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const imageFiles = [...values.eventPictures]; // these should be File objects

    const postEventObj = {
      ...values,
      position: {
        locations: {
          latitude: values.latitude,
          longitude: values.longitude,
        },
        address: values.address,
      },
      acceptingParticipants: values.acceptingParticipants === "yes",
      acceptingSponsors: values.acceptingSponsors === "yes",
    };

    // Cleanup unused fields
    delete postEventObj.address;
    delete postEventObj.latitude;
    delete postEventObj.longitude;
    delete postEventObj.eventPictures;

    try {
      const response = await dispatch(postEvent(postEventObj)).unwrap();
      console.log(response)
      const { id: eventId } = response;

      // If there are image files, upload them
      if (imageFiles?.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("images", file));
        console.log(formData);

        await dispatch(uploadImagesInEvent({ eventId, imageFiles: formData })).unwrap();
      }

      toast.success("Event Creation Successful");
      setIsModalVisible(true);

    } catch (error) {
      toast.error(error.message || "Event creation failed", "error");
      console.error("Error during event creation:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [lastSectionVisited, setLastSectionVisited] = useState(false);
  const [formSectionAnimation, setFormSectionAnimation] = useState("animate-fade-left");
  const [sectionStates, setSectionStates] = useImmer([
    {
      sectionName: "Basic",
      formFieldIds:
        ["eventPictures", "name", "description", "eventStartDate", "eventEndDate", "eventStartTime", "eventEndTime"],
      status: "Active"
    },
    {
      sectionName: "Location",
      formFieldIds:
        ["address", "latitude", "longitude", "space", "waterAvailability", "estimatedArea", "targetPlantNumber"],
      status: "Untouched"
    },
    {
      sectionName: "Participants",
      formFieldIds:
        ["acceptingParticipants", "participantLimit"],
      status: "Untouched"
    },
    {
      sectionName: "Sponsors",
      formFieldIds:
        ["acceptingSponsors", "estimatedCost", "totalAmountRaised"],
      status: "Untouched"
    },
    {
      sectionName: "Confirm",
      formFieldIds: ["eventPictures", "name", "description", "eventStartDate", "eventEndDate", "eventStartTime", "eventEndTime", "address", "latitude", "longitude", "participantLimit", "acceptingSponsors", "acceptingParticipants", "targetPlantNumber", "estimatedArea", "estimatedCost", "totalAmountRaised", "space", "waterAvailability"],
      status: "Untouched"
    }
  ]);

  const [selectedLocationObj, setSelectedLocationObj] = useState(null); // for autofill using marked locations
  const [placeSelected, setPlaceSelected] = useState(false); // for autofill using Google Autocomplete

  const formSectionMap = {
    "Basic": <BasicFormSection />,
    "Location":
      <LocationFormSection
        selectedLocationObj={selectedLocationObj}
        setSelectedLocationObj={setSelectedLocationObj}
        placeSelected={placeSelected}
        setPlaceSelected={setPlaceSelected}
      />,
    "Participants": <ParticipantsFormSection />,
    "Sponsors": <SponsorsFormSection />,
    "Confirm": <ConfirmFormSection />
  }

  const isEmptyField = (fieldValue) => {
    if (typeof fieldValue == "object") return Object.keys(fieldValue).length > 0;
    if (typeof fieldValue == "string") return fieldValue.trim().length == 0;

    return false;
  }

  const unrequiredFieldIds = new Set(["eventPictures"]);

  const getSectionStatus = (formik, formFieldIds) => {
    let noFieldNull = true;

    for (const id of formFieldIds) {
      const fieldTouched = formik.touched[id] ?? false;

      if (formik.errors[id] != null && fieldTouched) return "Error";

      noFieldNull =
        noFieldNull &&
        (unrequiredFieldIds.has(id) || (fieldTouched && !isEmptyField(formik.values[id])));
      // console.log("Field ID: " + id + ", noFieldNull: " + noFieldNull);
    }

    return (noFieldNull) ? "Completed" : "Incomplete";
  }

  const handleSectionChange = (formik, srcSectionIndex, targSectionIndex) => {
    if (targSectionIndex == sectionStates.length - 1) setLastSectionVisited(true);

    const nextFormSectionAnimation = (srcSectionIndex > targSectionIndex) ? "animate-fade-right" : "animate-fade-left";
    setFormSectionAnimation(nextFormSectionAnimation);

    setSectionStates((sectionStatesList) => {
      const nextSrcStatus = getSectionStatus(formik, sectionStatesList[srcSectionIndex].formFieldIds);
      sectionStatesList[srcSectionIndex].status = nextSrcStatus;

      // console.log("Status of " + sectionStatesList[srcSectionIndex].sectionName + ": " + nextSrcStatus);
      // console.log(formik.touched);
      // console.log(formik.values);

      const nextTargStatus = getSectionStatus(formik, sectionStatesList[targSectionIndex].formFieldIds);
      sectionStatesList[targSectionIndex].status = nextTargStatus == "Completed" ? nextTargStatus : "Active";

      if (lastSectionVisited && targSectionIndex != sectionStatesList.length - 1) {
        const nextConfirmationStatus = getSectionStatus(formik, sectionStatesList[sectionStatesList.length - 1].formFieldIds);
        sectionStatesList[sectionStatesList.length - 1].status = nextConfirmationStatus;
      }
    });

    setActiveSectionIndex(targSectionIndex);
  }

  const isFirstSection = activeSectionIndex == 0;
  const isLastSection = activeSectionIndex == sectionStates.length - 1;

  function FormTraversalButtons() {
    const formik = useFormikContext();
    return (
      <div className="absolute right-6 bottom-4 flex gap-5 justify-end w-full">
        {
          !isFirstSection &&
          <button
            className={`px-8 py-2 rounded-lg bg-gradient-120 bg-white shadow-[rgba(96,214,217,0.2)_3.5px_4px_16px_0px] hover:bg-[rgba(96,214,217,0.3)] text-black text-sm font-medium active:scale-95 transition-all `}
            onClick={() => { handleSectionChange(formik, activeSectionIndex, activeSectionIndex - 1) }}
          >
            Back
          </button>
        }
        <button
          className="px-8 py-2 rounded-lg bg-gradient-120 shadow-md from-[#60D6D9] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#60D6D9] text-white font-medium active:scale-95 transition-all "
          onClick={() => {
            if (!isLastSection) handleSectionChange(formik, activeSectionIndex, activeSectionIndex + 1);
            else if(Object.keys(formik.errors).length) toast.error("Please correctly fill all required fields.");
            // console.log(formik);
          }}
          type={isLastSection ? "submit" : null} // for final form submission
        >
          {isLastSection ? "Create Event" : "Next"}
        </button>
      </div>
    )
  }

  const activeSectionObj = sectionStates[activeSectionIndex];

  return (
    <div className="flex justify-center py-4 w-full animate-fade-up transition-all">

      <Formik
        initialValues={{
          eventPictures: [],
          name: "",
          description: "",
          eventStartDate: "",
          eventEndDate: "",
          eventStartTime: "",
          eventEndTime: "",
          address: "",
          latitude: "",
          longitude: "",
          participantLimit: "",
          acceptingSponsors: "",
          acceptingParticipants: "",
          targetPlantNumber: "",
          estimatedArea: "",
          estimatedCost: "",
          totalAmountRaised: "",
          space: "",
          waterAvailability: "",
        }}
        validationSchema={postEventSchema}
        onSubmit={handleFormSubmit}
      >

        <div className="flex flex-col items-center gap-8 w-[50vw]">

          <FormSectionsThread
            activeSectionIndex={activeSectionIndex}
            sectionStates={sectionStates}
            handleSectionChange={handleSectionChange}
          />

          <Form className={`relative flex justify-center p-5 shadow-[rgba(96,214,217,0.2)_3.5px_5.5px_16px_0px] rounded-lg w-full h-[92vh]`}>

            <FormSectionContainer
              key={activeSectionIndex}
              animation={formSectionAnimation}
            >
              {formSectionMap[activeSectionObj.sectionName]}
            </FormSectionContainer>

            <FormTraversalButtons />

          </Form>

        </div>

      </Formik>
    </div>
  )
}

export default CreateEventForm

