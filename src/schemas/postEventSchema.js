import * as Yup from "yup";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js"
dayjs.extend(isSameOrAfter)

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
    .required("Required")
    .min(10, "Description should contain at least 10 characters.")
    .max(500, "Description should not exceed 500 characters."),

  eventStartDate: Yup.string()
    .required("Required"),

  eventEndDate: Yup.string()
    .required("Required")
    .test("is-after-or-same-start-date", "End date cannot be before start date", function (value) {
      const { eventStartDate } = this.parent;
      if (!eventStartDate || !value) return true; // Skip if missing
      return dayjs(value).isSameOrAfter(dayjs(eventStartDate), "day");
    })
    .test("max-3-month-gap", "Event duration cannot exceed 3 months", function (value) {
      const { eventStartDate } = this.parent;
      if (!eventStartDate || !value) return true;
      return dayjs(value).diff(dayjs(eventStartDate), "month", true) <= 3;
    }),

  eventStartTime: Yup.string()
    .required("Required")
    .test("not-after-10pm", "Event cannot start after 10:00 PM if it's a one-day event", function (value) {
      const { eventStartDate, eventEndDate } = this.parent;
      if (!eventStartDate || !eventEndDate || !value) return true;
      const sameDay = dayjs(eventStartDate).isSame(dayjs(eventEndDate), "day");
      if (!sameDay) return true;

      const [hour, minute] = value.split(":").map(Number);
      const time = dayjs().hour(hour).minute(minute);
      return time.isBefore(dayjs().hour(22).minute(0));
    }),

  eventEndTime: Yup.string()
    .required("Required")
    .test("min-gap-2-hours", "Event must be at least 2 hours long if on the same day", function (value) {
      const { eventStartDate, eventEndDate, eventStartTime } = this.parent;
      if (!eventStartDate || !eventEndDate || !eventStartTime || !value) return true;

      const sameDay = dayjs(eventStartDate).isSame(dayjs(eventEndDate), "day");
      if (!sameDay) return true;

      const [startHour, startMinute] = eventStartTime.split(":").map(Number);
      const [endHour, endMinute] = value.split(":").map(Number);

      const start = dayjs().hour(startHour).minute(startMinute);
      const end = dayjs().hour(endHour).minute(endMinute);

      return end.diff(start, "minute") >= 120;
    })
  ,

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
