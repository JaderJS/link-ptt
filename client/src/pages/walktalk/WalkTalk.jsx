import { useState, useEffect } from "react"
import { io } from "socket.io-client"

import Ping from "../../utils/ping"

import Pushtotalk from "../../service/pushtotalk"
import Auth from "../../service/auth"

import './styles.css'

const WalkTalkie = () => {

    const [time, setTime] = useState('fetching')

    const { handleLogout } = Auth()

    const socket = io('http://localhost:5000')

    useEffect(() => {

        socket.on('connect', () => console.log(socket.id))

        socket.on('connect_error', () => {
            setTimeout(() => socket.connect(), 5000)
        })

        socket.on('time', (data) => setTime(data))
        socket.on('disconnect', () => setTime('server disconnected'))

    }, [])

    return (
        <div id="app">
            <header>
                <h1>Walktalkie</h1>
            </header>
            <main>
                <span>
                    <p>Chat text</p>
                </span>
                <Pushtotalk socket={socket} />
            </main>
            <footer>
                <Ping socket={socket} />
                <button className="btn" onClick={handleLogout}>Logout</button>
            </footer>
        </div>
    )
}

export default WalkTalkie
