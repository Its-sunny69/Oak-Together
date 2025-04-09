import * as Yup from "yup";

const postEventSchema = Yup.object({
    position: Yup.string()
        .required("Required"),
    name: Yup.string()
        .trim()
        .min(1, "Name should contain between 1 and 100 characters.")
        .max(100, "Name should contain between 1 and 100 characters.")
        .required("Required"),
    description: Yup.string()
        .trim()
        .min(10, "Description should contain at least 10 characters.")
        .max(1000, "Description should not exceed 1000 characters.")
        .required("Required"),
    eventStartDate: Yup.date()
        .required("Required."),
    eventEndDate: Yup.date()
        .min(Yup.ref('eventStartDate'), "End date should be after start date.")
        .required("Required."),
    eventStartTime: Yup.string()
        .required("Required."),
    eventEndTime: Yup.string()
        .required("Required."),
    participantLimit: Yup.number()
        .integer("Participant limit should be an integer.")
        .min(1, "Participant limit should be at least 1.")
        .required("Required. (Numeric input expected)"),
    targetPlantNumber: Yup.number()
        .integer("Target plant number should be an integer.")
        .min(0, "Target plant number cannot be negative.")
        .required("Required. (Numeric input expected)"),
    estimatedArea: Yup.number()
        .min(0, "Estimated area cannot be negative.")
        .required("Required. (Numeric input expected)"),
    estimatedCost: Yup.number()
        .min(0, "Estimated cost cannot be negative.")
        .required("Required. (Numeric input expected)"),
    totalAmountRaised: Yup.number()
        .min(0, "Total amount raised cannot be negative.")
        .required("Required. (Numeric input expected, enter '0' if no amount raised)"),
    space: Yup.string()
        .required("Required."),
    waterAvailability: Yup.string()
        .required("Required."),
});

export default postEventSchema;
