import { useState, useEffect } from 'react'

import api from './api'

export default function Auth() {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.common = { 'Authorization': `Bearer ${JSON.parse(token)}` }
            setAuthenticated(true)
        }

        setLoading(false)
    }, [])

    async function handleLogin(email, password) {
        const { data: { token } } = await api.post('/login/user', { email, password })
        console.log(token)
        localStorage.setItem('token', JSON.stringify(token))
        api.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        setAuthenticated(true)
    }

    function handleLogout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
    }

    return { authenticated, loading, handleLogin, handleLogout }
}