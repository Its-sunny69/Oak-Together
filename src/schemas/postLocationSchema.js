import * as Yup from "yup";


const postLocationSchema = Yup.object({ 
    name:
        Yup.string().trim()
            .min(1, "Name should contain between 1 and 100 characters.")
            .max(100, "Name should contain between 1 and 100 characters.")
            .required("Required"),
    type:
        Yup.string().required("Required"),
    address:
        Yup.string().required("Required"),
    waterAvailability:
        Yup.string().required("Required"),
    space:
        Yup.string().required("Required")
})

export default postLocationSchema