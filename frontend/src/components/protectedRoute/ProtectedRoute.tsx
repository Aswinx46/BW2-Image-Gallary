import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const id = localStorage.getItem('userId')
    return id ? children : <Navigate to={'/'} />
}

export default ProtectedRoute
