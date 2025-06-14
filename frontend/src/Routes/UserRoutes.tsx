import Home from "@/components/home/Home"
import Login from "@/components/login/Login"
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute"
import SignUp from "@/components/signup/SignUp"
import { Route, Routes } from "react-router-dom"

function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/home" element={<ProtectedRoute><Home /> </ProtectedRoute>} />
        </Routes>
    )
}

export default UserRoutes
