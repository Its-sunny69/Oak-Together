import * as Yup from "yup";

const FILE_SIZE = 3 * 1024 * 1024; // 3 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const userEditSchema = Yup.object({

    profilePic: Yup.mixed()
        .test("fileSize", "Image size should be less than 3 MB", value => {
            return !value || (value && value.size <= FILE_SIZE);
        })
        .test("fileFormat", 
            `Unsupported Image Format (Supported Formats: 
            ${SUPPORTED_FORMATS.map((item) => item.replace("image/", "")).join(", ")})`, 
            value => {
            return !value || (value && SUPPORTED_FORMATS.includes(value.type));
        }),

    name: Yup.string().trim()
        .min(2, "Name should contain between 2 and 30 characters.")
        .max(30, "Name should contain between 2 and 30 characters.")
        .required("Required"),

    description: Yup.string()
        .trim()
        .max(1000, "Description should not exceed 1000 characters."),

    address: Yup.string().trim()
        .min(5, "Address should be at least 5 characters long.")
        .max(100, "Address should not exceed 100 characters.")
        .required("Required"),
});

export default userEditSchema;
