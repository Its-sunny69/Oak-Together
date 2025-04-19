import * as Yup from "yup";

const FILE_SIZE = 3 * 1024 * 1024; // 3 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const postEventSchema = Yup.object({
  eventPictures: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileSize",
          "Image size must be less than or equal to 3MB",
          (value) => !value || value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          `Unsupported Image Format (Supported Formats: 
            ${SUPPORTED_FORMATS.map((item) => item.replace("image/", "")).join(", ")})`,
          (value) => !value || SUPPORTED_FORMATS.includes(value.type)
        )
    )
    .max(3, "You can upload a maximum of 3 images."),

  name: Yup.string()
    .trim()
    .min(3, "Name should contain between 3 and 100 characters.")
    .max(100, "Name should contain between 3 and 100 characters.")
    .required("Required"),

  description: Yup.string()
    .trim()
    .min(10, "Description should contain at least 10 characters.")
    .max(500, "Description should not exceed 500 characters."),

  eventStartDate: Yup.date()
    .required("Required"),

  eventEndDate: Yup.date()
    .min(Yup.ref("eventStartDate"), "End date must be after start date.")
    .required("Required"),

  eventStartTime: Yup.string().required("Required"),
  eventEndTime: Yup.string().required("Required"),

  address: Yup.string().trim()
          .min(5, "Address should be at least 5 characters long.")
          .max(100, "Address should not exceed 100 characters.")
          .required("Required"),

  latitude: Yup.number()
    .required("Required")
    .typeError("Latitude must be a number."),

  longitude: Yup.number()
    .required("Required")
    .typeError("Longitude must be a number."),

  participantLimit: Yup.number()
    .integer("Must be an integer.")
    .min(1, "At least 1 participant required.")
    .required("Required"),

  acceptingSponsors: Yup.string()
    .oneOf(["yes", "no"], "Invalid selection.")
    .required("Required"),

  acceptingParticipants: Yup.string()
    .oneOf(["yes", "no"], "Invalid selection.")
    .required("Required"),

  targetPlantNumber: Yup.number()
    .integer("Must be an integer.")
    .min(1, "Target plant number must be at least 1")
    .required("Required"),

  estimatedArea: Yup.number()
    .moreThan(0.0, "Estimated area must be greater than 0")
    .required("Required"),

  estimatedCost: Yup.number()
    .moreThan(0.0, "Estimated cost must be greater than 0")
    .required("Required"),

  totalAmountRaised: Yup.number()
    .min(0, "Cannot be negative.")
    .required("Required. Enter 0 if none."),

  space: Yup.string().required("Required"),
  waterAvailability: Yup.string().required("Required"),
});

export default postEventSchema;
