import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas';
import { Formik, Form } from 'formik';
import { LoginButton, FormTextComponent } from "."
import toast from 'react-hot-toast';

function LoginForm() {

    const navigate = useNavigate()

    const defaultRowStyle = "p-1 border-2 border-gray-500 rounded-lg";

    const handleFormSubmit = (values, { setSubmitting }) => {
        const apiUrl = import.meta.env.VITE_SERVER_API_URL;
        console.log(apiUrl)

        const postHeaders = new Headers();
        postHeaders.append("Content-Type", "application/json");
        console.log(JSON.stringify(values));
        fetch(apiUrl + "users/log-in", {
            method: "POST",
            body: JSON.stringify(values),
            headers: postHeaders
        })
            .then(async (response) => {
                const responseObj = await response.json();
                if (!response.ok) throw new Error(`${responseObj.message}`);
                return responseObj;
            })
            .then(data => {
                // might need to provide better response... //sunny msg - in improvement we can add some loading effect untill the data is arrvied

                toast.success(`Welcome back ${data.firstName} 🥳`, "success")
                navigate("/home");
            })
            .catch(error => {
                // this might need improvement too //sunny msg - in improvement we can give short error msg instead of long error msg
                toast.error(error.message, "error")
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <div className="flex items-center justify-center rounded-l-lg">
            <Formik
                initialValues={{
                    email: "",
                    password: "" // use hashing for password??
                }}
                validationSchema={loginSchema}
                onSubmit={handleFormSubmit}
            >
                <Form className="flex flex-col gap-5 items-start justify-center p-8 h-full w-full rounded-l-lg">

                    <div className="flex flex-col items-start"  >
                        <FormTextComponent
                            label={"Email"}
                            styleClasses={defaultRowStyle}
                            id={"email"}
                            name={"email"}
                            type={"email"}
                            placeholder={"Enter email address"}
                        />
                    </div>

                    <div className="flex flex-col items-start"  >
                        <FormTextComponent
                            label={"Password"}
                            styleClasses={defaultRowStyle}
                            id={"password"}
                            name={"password"}
                            type={"password"}
                            placeholder={"Enter password"}
                        />
                    </div>

                    <div className="flex w-full justify-end">
                        <button type="submit">
                            <div className="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
                                <LoginButton />
                            </div>
                        </button>
                    </div>

                </Form>
            </Formik>
        </div>
    );
}

export default LoginForm;
