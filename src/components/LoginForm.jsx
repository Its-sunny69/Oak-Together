import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas";
import { Formik, Form } from "formik";
import { LoginButton, FormTextComponent } from ".";
import toast from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();

  const defaultRowStyle =
    "p-1 border-2 border-[#60d6d9] rounded-lg focus:outline-[#2572CF]";

  const handleFormSubmit = (values, { setSubmitting }) => {
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;

    const postHeaders = new Headers();
    postHeaders.append("Content-Type", "application/json");

    fetch(apiUrl + "/user-profiles/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: postHeaders,
    })
      .then(async (response) => {
        const responseObj = await response.json();
        if (!response.ok) throw new Error(`${responseObj.message}`);
        return responseObj;
      })
      .then((data) => {
        toast.success(`Welcome back ${data.firstName} 🥳`, "success");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message, "error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex items-center justify-center rounded-l-lg">
      <Formik
        initialValues={{
          email: "",
          password: "", // use hashing for password??
        }}
        validationSchema={loginSchema}
        onSubmit={handleFormSubmit}
      >
        <Form className="flex flex-col gap-5 items-start justify-center p-8 h-full w-full rounded-l-lg">
          <div className="flex flex-col items-start">
            <FormTextComponent
              label={"Email"}
              styleClasses={defaultRowStyle}
              id={"email"}
              name={"email"}
              type={"email"}
              placeholder={"Enter email address"}
            />
          </div>

          <div className="flex flex-col items-start">
            <FormTextComponent
              label={"Password"}
              styleClasses={defaultRowStyle}
              id={"password"}
              name={"password"}
              type={"password"}
              placeholder={"Enter password"}
            />
          </div>

          <div className="flex w-full justify-between items-center">
            <div className="text-sm text-slate-600">
              <p>
                New User?{" "}
                <a
                  onClick={() => navigate("/signup")}
                  className="hover:text-slate-400 underline underline-offset-2 cursor-pointer"
                >
                  Sign Up
                </a>
              </p>
            </div>
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
