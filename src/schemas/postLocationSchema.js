import * as Yup from "yup";


const postLocationSchema = Yup.object({ // validation schema pending
    name: "",
    description: "",
    type: "",
    address: "",
    waterAvailability: "",
    space: ""
})

export default postLocationSchema