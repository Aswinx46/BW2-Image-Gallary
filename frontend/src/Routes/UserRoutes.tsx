import Login from "@/components/login/Login"
import SignUp from "@/components/signup/SignUp"
import { Route, Routes } from "react-router-dom"

function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/signUp" element={<SignUp />}/>
        </Routes>
    )
}

export default UserRoutes
