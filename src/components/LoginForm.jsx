import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas";
import { Formik, Form } from "formik";
import { LoginButton, FormTextComponent } from ".";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultContainerStyle = "flex flex-col w-full";
  const defaultInputStyle =
    "p-1 border-2 border-[#60d6d9] rounded-lg focus:outline-[#2572CF]";

  const handleFormSubmit = (values, { setSubmitting }) => {
    
    dispatch(loginUser(values)).unwrap()
    .then((response) => {
      toast.success(`Welcome ${response.name} 🥳`, "success");
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
              containerStyleClasses={defaultContainerStyle}
              inputStyleClasses={defaultInputStyle}
              id={"email"}
              name={"email"}
              type={"email"}
              placeholder={"Enter email address"}
            />
          </div>

          <div className="flex flex-col items-start">
            <FormTextComponent
              label={"Password"}
              containerStyleClasses={defaultContainerStyle}
              inputStyleClasses={defaultInputStyle}
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
