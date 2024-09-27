// import LoginButton from './LoginButton'
// import { useState } from 'react';

// function LoginForm() {

//     const [loginData, setLoginData] = useState({
//         email: "",
//         password: ""
//     })

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLoginData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(loginData);
//     }


//     return (
//         <div className="flex items-center justify-center rounded-l-lg">
//             <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-start justify-center p-8 h-full w-full rounded-l-lg">
//                 <div className="flex flex-col">
//                     <label htmlFor="email">Email</label>
//                     <input className="p-1 border-2 border-gray-500 rounded-lg" type="email" placeholder="Enter email address" name="email" value={loginData.email} onChange={handleChange} />
//                 </div>
//                 <div className="flex flex-col">
//                     <label htmlFor="password">Password</label>
//                     <input className="p-1 border-2 border-gray-500 rounded-lg" type="password" id="password" placeholder="Enter password" name="password" value={loginData.password} onChange={handleChange} />
//                 </div>
//                 <div className="flex w-full justify-end">
//                     <button type="submit">
//                         <div className="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
//                             <LoginButton action={"/"} />
//                         </div>
//                     </button>
//                 </div>
//             </form>
//         </div >
//     )
// }

// export default LoginForm;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Optional: for validation
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Required')
        }),
        onSubmit: (values) => {
            console.log(values);
            // Handle login logic here
            navigate("/")
        }
    });

    return (
        <div className="flex items-center justify-center rounded-l-lg">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 items-start justify-center p-8 h-full w-full rounded-l-lg">
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        className={`p-1 border-2 rounded-lg ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-500'}`}
                        type="email"
                        placeholder="Enter email address"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        className={`p-1 border-2 rounded-lg ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-500'}`}
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="flex w-full justify-end">
                    <button type="submit">
                        <div className="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
                            <div className="flex h-full w-full items-center justify-center rounded-md px-6 py-1.5 bg-white shadow-md hover:bg-gradient-120 hover:from-[#83E2C1] hover:from-50% hover:to-[#1566E7] hover:to-100% hover:text-white back"
                            >
                                <p>Login</p>
                            </div>
                        </div>
                    </button>

                </div>
            </form>
        </div>
    );
};

export default LoginForm;
