import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../../service/auth'

import './styles.css'

//Entrar
const SignIn = () => {

  const { authenticated, loading, handleLogin } = Auth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ msg: '', show: false })

  const HandlerSubmit = async (event) => {
    event.preventDefault()
    handleLogin(email, password).then(() => {
      navigate('/user')
    }).catch((error) => {
      setStatus({ msg: error.response.data.msg, show: true })
    })

    setTimeout(() => {
      setStatus({ msg: '', show: false })
    }, 2000)
  }

  return (
    <div id='signin'>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={(event) => HandlerSubmit(event)}>
          <input type="text" name="email" value={email} placeholder="E-mail" required="required" onChange={(event) => setEmail(event.target.value)} />
          <input type="password" name="password" value={password} placeholder="Password" required="required" onChange={(event) => setPassword(event.target.value)} />
          <span>
            {status.show && <p className='muted'>{status.msg}</p>}
          </span>
          <div className='actions'>
            <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
          </div>
        </form>
        <a href='/signup' ><p>Inscrever-se</p></a>
      </div>
    </div>
  )
}
export default SignIn