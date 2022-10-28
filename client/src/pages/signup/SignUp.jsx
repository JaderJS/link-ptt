import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../service/api'
import Auth from '../../service/auth'

import './styles.css'

//Inscrever-se
const SignUp = () => {
  const { handleLogin } = Auth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState({ msg: '', show: false })

  const HandlerSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setStatus({ msg: 'Senhas não conferem', show: true })
      return
    }

    api.post('/login/register', { name, email, password }).catch((error) => {
      setStatus({ msg: error.response.data.msg, show: true })
    })

    setTimeout(() => {
      setStatus({ msg: '', show: false })
    }, 2000)
  }

  return (
    <div id='signup'>
      <div className="login">
        <h1>Inscrever-se</h1>
        <form onSubmit={(event) => HandlerSubmit(event)}>
          <input type="text" name="name" value={name} placeholder="Nome" onChange={(event) => setName(event.target.value)} />
          <input type="text" name="email" value={email} placeholder="E-mail" required="required" onChange={(event) => setEmail(event.target.value)} />
          <input type="password" name="password" value={password} placeholder="Senha" required="required" onChange={(event) => setPassword(event.target.value)} />
          <input type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirmação de senha" required="required" onChange={(event) => setconfirmPassword(event.target.value)} />
          <span>
            {status.show && <p className='muted'>{status.msg}</p>}
          </span>
          <button type="submit" className="btn btn-primary btn-block btn-large">Inscrever-se</button>
        </form>
      </div>
    </div>
  )
}
export default SignUp