import { useState, useRef } from 'react'
import { Formik, Form } from "formik";
import { FormTextComponent, FormSelectComponent, PlaceAutocomplete } from ".";
import postEventSchema from '../schemas/postEventSchema';
import { useDispatch } from 'react-redux';
import { postEvent } from '../features/eventSlice';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { APIProvider } from '@vis.gl/react-google-maps'

function getDateLimit(type, isMax) {
  if (type != "date") return null;

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1, date = dateObj.getDate();

  month = (month < 10) ? `0${month}` : month;
  date = (date < 10) ? `0${date}` : date;

  return isMax ? `${year}-12-31` : `${year}-${month}-${date}`;
}

// To-do:
// 1) Time validation for same date
// 2) Upgrade the interface

function CreateEventForm({ setCurrentView, setIsModalVisible }) {

  const dispatch = useDispatch();

  const handleFormSubmit = (values, { setSubmitting }) => {

    const postEventObj = Object.assign({}, values);
    postEventObj["position"] = { address: values["position"] };

    // console.log(postEventObj);

    dispatch(postEvent(postEventObj)).unwrap()
      .then(() => {
        setIsModalVisible(true);
      })
      .catch((error) => {
        toast.error(error.message, "error");
        console.log(error);
        console.log("What was sent? :");
        console.log(values);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formTextObjects = [
    {
      id: "name",
      name: "name",
      label: "Name",
      placeholder: "Event Name",
      type: "text",
    },
    {
      id: "description",
      name: "description",
      label: "Description (Optional)",
      placeholder: "Describe Event",
      type: "textarea",
    },
    {
      id: "eventStartDate",
      name: "eventStartDate",
      label: "Event Start Date",
      type: "date",
    },
    {
      id: "eventEndDate",
      name: "eventEndDate",
      label: "Event End Date",
      type: "date",
    },
    {
      id: "eventStartTime",
      name: "eventStartTime",
      label: "Event Start Time",
      type: "time",
    },
    {
      id: "eventEndTime",
      name: "eventEndTime",
      label: "Event End Time",
      type: "time",
    },
    {
      id: "participantLimit",
      name: "participantLimit",
      label: "Participant Limit",
      placeholder: "Participant Limit",
      type: "number",
    },
    {
      id: "targetPlantNumber",
      name: "targetPlantNumber",
      label: "Target Plant Number",
      placeholder: "Target Plant Number",
      type: "number",
    },
    {
      id: "estimatedArea",
      name: "estimatedArea",
      label: "Estimated Area",
      placeholder: "Estimated Area",
      type: "number",
    },
    {
      id: "estimatedCost",
      name: "estimatedCost",
      label: "Estimated Cost",
      placeholder: "Estimated Cost",
      type: "number",
    },
    {
      id: "totalAmountRaised",
      name: "totalAmountRaised",
      label: "Total Amount Raised",
      placeholder: "Total Amount Raised",
      type: "number",
    },
  ];

  const formSelectObjects = [
    {
      id: "space",
      name: "space",
      label: "Space",
      defaultOptions: ["Select Space", "PLAINS", "SLOPE", "HILL", "SPACIOUS", "CONJUSTED", "RIVERBANK"],
    },
    {
      id: "waterAvailability",
      name: "waterAvailability",
      label: "Water Availability",
      defaultOptions: ["Select Availability", "PLENTY", "MODERATE", "SCARCE"],
    },
  ]

  const formCheckBoxObjects = [
    {
      id: "acceptingSponsors",
      name: "acceptingSponsors",
      label: "Accepting Sponsors",
    },
    {
      id: "acceptingParticipants",
      name: "acceptingParticipants",
      label: "Accepting Participants",
    }
  ]

  const defaultContainerStyle = "flex flex-col w-full";
  const defaultInputStyle =
    "p-1 w-[80%] border-2 rounded-lg border-[#60d6d9]  focus:outline-[#2572CF]";

  const [showClearIcon, setShowClearIcon] = useState(false);
  const positionInputRef = useRef();


  return (
    <APIProvider apiKey={import.meta.env.VITE_GMAP_API_KEY} libraries={["geometry"]}>
      <div className="w-full h-screen overflow-y-scroll">

        <Formik
          initialValues={{
            name: "",
            description: "",
            eventStartDate: "",
            eventEndDate: "",
            eventStartTime: "",
            eventEndTime: "",
            position: "",
            participantLimit: "",
            acceptingSponsors: false,
            acceptingParticipants: false,
            targetPlantNumber: "",
            estimatedArea: "",
            totalAmountRaised: "",
            space: "",
            waterAvailability: "",
          }}
          validationSchema={postEventSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, values, setFieldValue, setFieldTouched, formikProps }) => {

            console.log(errors)

            return (
              <Form
                className="flex flex-col gap-5 items-start justify-center pl-4 w-full rounded-l-lg"
              >

                <PlaceAutocomplete
                  isEventForm
                  customInputRef={positionInputRef}
                  setInputValue={(value) => setFieldValue("position", value)}
                  customContainerStyle={{ width: "80%" }}
                >
                  <div className={defaultContainerStyle}>
                    <label htmlFor="position">Address</label>
                    <div className="relative flex items-center">
                      <input
                        className={
                          defaultInputStyle + " w-full " +
                          ((touched.position && errors.position) ?
                            " border-red-600" : "")
                        }
                        id="position"
                        name="position"
                        type="text"
                        placeholder="Enter event location address"
                        ref={positionInputRef}
                        value={values.position}
                        onBlur={() => setFieldTouched("position", true)}
                        onChange={(e) => {
                          setFieldValue("position", e.target.value);
                          setShowClearIcon(e.target.value.length > 0);
                        }}
                      />
                      {showClearIcon &&
                        <div
                          className="h-3/4 absolute right-1 flex items-center px-2 rounded-r-lg text-[14px] cursor-pointer bg-white"
                          onClick={() => {
                            setShowClearIcon(false);
                            setFieldValue("position", "");
                          }}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </div>
                      }
                    </div>
                    {(touched.position && errors.position) ?
                      <div className="text-red-600 text-sm">
                        {errors.position ? errors.position : "Select a location from suggestion list"}
                      </div>
                      : null
                    }
                  </div>
                </PlaceAutocomplete>

                {formTextObjects.map(({ id, name, label, placeholder, type }) => (
                  <div className="flex w-full flex-col items-start" key={label}>
                    <FormTextComponent
                      label={label}
                      containerStyleClasses={defaultContainerStyle}
                      inputStyleClasses={defaultInputStyle}
                      id={id}
                      name={name}
                      type={type}
                      isTextArea={type == "textarea"}
                      placeholder={placeholder ? placeholder : ""}
                      min={getDateLimit(type, false)}
                      max={getDateLimit(type, true)}
                    />
                  </div>
                ))}

                {formSelectObjects.map(
                  ({ id, name, label, defaultOptions }) => (
                    <div className="flex w-full flex-col items-start" key={label}>
                      <FormSelectComponent
                        label={label}
                        id={id}
                        name={name}
                        containerStyleClasses={defaultContainerStyle}
                        inputStyleClasses={defaultInputStyle}
                      >
                        <option value="">{defaultOptions[0]}</option>

                        {defaultOptions?.slice(1).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </FormSelectComponent>
                    </div>
                  )
                )}

                {
                  formCheckBoxObjects.map(
                    ({ id, name, label }) => (
                      <div className="relative w-full" key={id}>
                        <label className="flex items-center gap-2" htmlFor={id}>
                          <input
                            className="appearance-none w-6 h-6 border-2 border-teal-300 rounded-md checked:border-transparent checked:bg-teal-400 cursor-pointer"
                            id={id}
                            name={name}
                            type="checkbox"
                            checked={values[id]}
                            onBlur={() => setFieldTouched(id, true)}
                            onChange={() => setFieldValue(id, !values[id])}
                          />
                          {values[id] &&
                            <span className="absolute left-1 text-lg pointer-events-none text-white font-extrabold">
                              ✓
                            </span>
                          }
                          <span>{label}</span>
                        </label>
                      </div>
                    )
                  )
                }

                <div className="flex flex-col gap-2 p-4 justify-center items-center w-[80%]">
                  <button
                    className="px-[15%] py-2 rounded-lg bg-gradient-120 shadow-md from-[#83E2C1] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#83E2C1] text-white"
                    type="submit"
                  >
                    Save
                  </button>
                  <span
                    className="text-red-600 text-center cursor-pointer hover:underline"
                    onClick={() => {
                      setCurrentView("event-search");
                    }}
                  >
                    Cancel
                  </span>
                </div>
              </Form>
            )
          }
          }
        </Formik>
      </div>
    </APIProvider>
  )
}

export default CreateEventForm