import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas';
import { Formik, Form } from 'formik';
import LoginButton from './LoginButton';
import FormTextComponent from './FormTextComponent';

function LoginForm({ setErrorMessage }) {
    
    const navigate = useNavigate()

    const defaultRowStyle = "p-1 border-2 border-gray-500 rounded-lg";

    return (
        <div className="flex items-center justify-center rounded-l-lg">
            <Formik
                initialValues={{
                    email: "",
                    password: "" // use hashing for password??
                }}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting }) => {
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
                            // might need to provide better response...
                            alert(`User: ${data.firstName} ${data.lastName}, has been logged in successfully.`);
                            navigate("/");
                        })
                        .catch(error => {
                            // this might need improvement too
                            setErrorMessage(error.message);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
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
