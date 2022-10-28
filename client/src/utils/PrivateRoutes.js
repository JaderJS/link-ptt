import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import Auth from '../service/auth'

const PrivateRoutes = () => {

    const { authenticated, loading } = Auth()

    if (loading) {
        return (<Outlet />)
    }

    return (
        authenticated ? <Outlet /> : <Navigate to='/signup' />
    )
}

export default PrivateRoutes