import React from 'react'
import { Formik, Form } from "formik";
import { FormTextComponent, FormSelectComponent } from ".";
import postEventSchema from '../schemas/postEventSchema';

function getDateLimit(type, isMax) {
  if (type != "date") return null;

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1, date = dateObj.getDate();

  month = (month < 10) ? `0${month}` : month;
  date = (date < 10) ? `0${date}` : date;

  return isMax ? `${year}-12-31` : `${year}-${month}-${date}`;
}

function CreateEventForm() {

  const handleSubmit = (values, { setSubmitting }) => {
  
      dispatch(postLocation(values)).unwrap()
        .then(() => {
          setIsModalVisible(true);
        })
        .catch((error) => {
          toast.error(error.message, "error");
          console.log(error);
          console.log("What was sent? :");
          console.log(postLocationObj);
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
      label: "Description",
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
      id: "eventStatus",
      name: "eventStatus",
      label: "Event Status",
      defaultOptions: ["Select Status", "UPCOMING", "ONGOING", "COMPLETED"],
    },
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

  return (
    <div>
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
          eventStatus: "",
          space: "",
          waterAvailability: "",
        }}
        validationSchema={postEventSchema}
      // onSubmit={handleFormSubmit}
      >
        {({ errors, touched, values, setFieldValue, setFieldTouched }) =>
          <Form className="flex flex-col gap-5 items-start justify-center p-8 w-full rounded-l-lg">
            {formTextObjects.map(({ id, name, label, placeholder, type }) => (
              <div className="flex w-full flex-col items-start" key={label}>
                <FormTextComponent
                  label={label}
                  containerStyleClasses={defaultContainerStyle}
                  inputStyleClasses={defaultInputStyle}
                  id={id}
                  name={name}
                  type={type}
                  isTextArea={id == "description"}
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


          </Form>
        }
      </Formik>
    </div>
  )
}

export default CreateEventForm