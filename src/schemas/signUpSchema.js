import * as Yup from "yup";

const signUpSchema = Yup.object({
    name:
        Yup.string().trim()
            .min(2, "Name should contain between 2 and 30 characters.")
            .max(30, "Name should contain between 2 and 30 characters.")
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
    description:
        Yup.string(), 
    role:
        Yup.string().required("Required")
});

export default signUpSchema;