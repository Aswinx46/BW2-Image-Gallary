import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button } from '../ui/button';
import { useUserLogin } from '@/hooks/userHooks';
import { toast } from 'sonner';
import type { UserRegisterType } from '@/types/userRegisterType';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addToken } from '@/store/slice/tokenSlice';
function Login() {
    const dispatch = useDispatch()
    const initialValues = {
        email: '',
        password: ''
    }
    const navigate = useNavigate()
    const userLoginMutation = useUserLogin()
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
    });

    const handleLogin = (values: UserRegisterType) => {
        userLoginMutation.mutate({ email: values.email, password: values.password }, {
            onSuccess: (data) => {
                console.log(data)
                dispatch(addToken(data.accessToken))
                localStorage.setItem('user', data.user.email)
                localStorage.setItem('userId', data.user._id)
                toast('user Logged')
                navigate('/home')
            },
            onError: (err) => {
                toast(err.message)
                console.log('error while login', err)
            }
        })
    }

    return (
        <div className="flex h-screen bg-black w-full items-center justify-center">
            <div className="h-1/2 bg-white w-1/4 rounded-2xl flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl">LOGIN</h1>
                <div className='w-full'>
                    <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationSchema}>
                        <Form className="flex w-full flex-col p-5 gap-5">
                            <Field name="email" type="text" className="border-2 rounded-1xl h-10 p-3" placeholder="Enter Email" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            <Field name="password" type="password" className="border-2 rounded-1xl h-10 p-3" placeholder="Enter Password" />
                            <ErrorMessage name='password' component="div" className="text-red-500 text-sm"></ErrorMessage>
                            <Button type='submit'>{userLoginMutation.isPending ? "Logining....." : "Login"}</Button>
                        </Form>
                    </Formik>
                </div>
                <div className='flex '>
                    <p>Dont have an Account ? </p>
                    <Link to={'/signup'}>SIGNUP HERE</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
