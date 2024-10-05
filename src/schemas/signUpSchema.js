import * as Yup from "yup";

const signUpSchema = Yup.object({
    firstName:
        Yup.string().trim()
            .min(2, "First Name should contain between 2 and 20 characters.")
            .max(20, "First Name should contain between 2 and 20 characters.")
            .required("Required"),
    lastName:
        Yup.string().trim()
            .min(2, "Last Name should contain between 2 and 20 characters.")
            .max(20, "Last Name should contain between 2 and 20 characters.")
            .required("Required"),
    email:
        Yup.string().trim()
            .email("Email should be valid")
            .required("Required"),
    password:
        Yup.string()
            .min(8, "Password must contain at least 8 characters")
            .required("Required"),
    confirmPassword:
        Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
    age:
        Yup.number()
            .moreThan(5, "Age must be at least 6.")
            .lessThan(101, "Age must be less than or equal to 100")
            .positive("Age must be positive")
            .integer("Age must be an integer")
            .required("Required"),
    gender:
        Yup.string()
            .required("Required"),
    country:
        Yup.string()
            .required("Required"),
    state:
        Yup.string()
            .required("Required"),
    city:
        Yup.string()
            .required("Required")
});

export default signUpSchema;