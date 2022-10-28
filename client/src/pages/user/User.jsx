import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import api from "../../service/api"
import Auth from "../../service/auth"

import './styles.css'

export const User = () => {

    const [users, setUsers] = useState([])

    const navigate = useNavigate()
    const { handleLogout } = Auth()

    useEffect(() => {
        (async () => {
            const { data } = await api.get('/login/user')
            setUsers(data)
        })()
        console.log(users)
    }, [])

    const HandlerLogout = () => {
        handleLogout()
        navigate('/')
    }

    return (
        <div id="user">
            <h1>Usuários cadastrados</h1>
            <a href="/app"><h4>Walktalkie</h4></a>
            <div className="frame">
                {users && users.map((user) => {
                    return (
                        <div key={user._id}>
                            <p>{user._id}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>
                    )
                })}
            </div>
            <button className='btn' onClick={HandlerLogout}>Logout</button>
        </div>
    )
}

export default User