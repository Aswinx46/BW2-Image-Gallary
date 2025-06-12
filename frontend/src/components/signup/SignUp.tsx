import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from 'yup'
import { Button } from "../ui/button";
import { useState } from "react";
import OtpModal from "../otherComponents/OtpModal";
import { useUserSendOTp, useUserSignup, useUserVerifyOtp } from "@/hooks/userHooks";
import { toast } from "sonner"
import type { UserRegisterType } from "@/types/userRegisterType";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [userData, setUserData] = useState<UserRegisterType | null>()
    const signUpMutation = useUserSignup()
    const sendOtpMutation = useUserSendOTp()
    const verifyOtpMutation = useUserVerifyOtp()
    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup
            .string()
            .test(
                "no-star-only",
                "Password cannot be just '*'",
                (value) => value !== "*"
            )
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
            )
            .required("Password is required"),
        confirmPassword: yup.string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwords must match')
    });
    const inititalValues = {
        email: '',
        password: ''
    }

    const sendOtp = async (values: UserRegisterType) => {
        try {
            setUserData(values)
            sendOtpMutation.mutate(values.email, {
                onSuccess: () => {
                    console.log('error')
                    setIsOpen(true)
                    toast('OTP Sended')
                },
                onError: (err) => {
                    console.log(err)
                    toast(err.message)
                    setIsOpen(false)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const createUser = async () => {
        try {
            if (!userData) return;
            console.log('this is the userData', userData)
            signUpMutation.mutate(userData, {
                onSuccess: () => {
                    console.log('created')
                    toast('User Created')
                },
                onError: (err) => {
                    console.log(err)
                    toast(err.message)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const navigate = useNavigate()
    const handleVerifyOtp = async (otp: string) => {
        try {
            if (!userData?.email) return;
            verifyOtpMutation.mutate({ email: userData.email, otp }, {
                onSuccess: () => {
                    console.log('otp verified')
                    toast('OTP Verified')
                    setIsOpen(false)
                    createUser()
                    navigate('/login')
                },
                onError: (err) => {
                    console.log(err)
                    toast(err.message)

                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="h-screen bg-black w-full flex justify-center items-center">
            {isOpen && <OtpModal isOpen={isOpen} onClose={() => setIsOpen(false)} onVerify={handleVerifyOtp} />}
            <div className="bg-white h-1/2 w-1/4 flex flex-col rounded-2xl items-center justify-center">
                <h1 className="font-bold text-2xl ">SIGNUP</h1>
                <div className="w-full">
                    <Formik initialValues={inititalValues} onSubmit={sendOtp} validationSchema={validationSchema}>
                        <Form className="w-full flex flex-col gap-2 p-5">
                            <Field name="email" type="text" className="border-2 rounded-1xl h-10 p-3" placeholder="Enter Email" />
                            <div className="min-h-[15px]">
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm " />
                            </div>
                            <Field name="password" type="password" className="border-2 rounded-1xl h-10 p-3" placeholder="Enter password" />
                            <div className=" min-h-[15px]">
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>
                            <Field name="confirmPassword" type="password" className="border-2 rounded-1xl h-10 p-3" placeholder="confirmPassword" />
                            <div className=" min-h-[15px]">
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>
                            <Button type="submit">{sendOtpMutation.isPending ? "Signing up....." : "Sign up"}</Button>
                        </Form>
                    </Formik>
                </div>
                <div className="flex">
                    <p>Already Have An Account ? </p>
                    <Link to={'/'}>LOGIN HERE</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
