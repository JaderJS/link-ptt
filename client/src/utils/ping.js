import { useEffect, useState } from "react"

const Ping = ({ socket }) => {
    const [ping_ms, setping_ms] = useState(0)

    useEffect(() => {

        const refresh = setInterval(() => {
            const start = Date.now()

            socket.emit('ping', () => {
                const duration = Date.now() - start
                setping_ms(duration)
            })
        }, 5000)

        socket.on('disconnect', () => {
            setping_ms('server disconnected')
            clearInterval(refresh)
        })

    }, [])


    return (
        <p>{ping_ms} ms</p>
    )
}

export default Ping