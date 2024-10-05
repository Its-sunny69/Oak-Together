import * as Yup from "yup";

const loginSchema = Yup.object({
    email:
        Yup.string().trim()
            .email("Email should be valid")
            .required("Required"),
    password:
        Yup.string()
            .min(8, "Password must contain at least 8 characters")
            .required("Required"),
});

export default loginSchema;