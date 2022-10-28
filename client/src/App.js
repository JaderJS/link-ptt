import { useState, useEffect } from "react"
import { io } from "socket.io-client"

import Ping from "./utils/ping"

import Pushtotalk from "./service/pushtotalk"

import './App.css'

const App = () => {

  const [time, setTime] = useState('fetching')

  const socket = io('http://localhost:5000');

  useEffect(() => {

    socket.on('connect', () => console.log(socket.id));

    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    })

    socket.on('time', (data) => setTime(data))
    socket.on('disconnect', () => setTime('server disconnected'))

  }, [])

  return (
    <div className="App">
      <header>
        <h1>Walktalkie</h1>
      </header>
      <main>
        <span>
        </span>
        <Pushtotalk socket={socket} />
      </main>
      <footer>
        <Ping socket={socket} />
      </footer>
    </div>
  )
}

export default App
