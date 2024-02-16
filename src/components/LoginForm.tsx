import { TextField, Button } from "@mui/material"
import { gql, useMutation } from "@apollo/client"
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        userRole {
          id
          name
        }
      }
    }
  }
`

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginMutation] = useMutation(LOGIN)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const result = await loginMutation({
        variables: { username, password },
      });

      if (result.data.login) {
        // save user info to localStorage
        window.localStorage.setItem(
            'AuthPayload', JSON.stringify(result.data.login)
        )
        navigate('/varasto')
    }

    } catch (err) {
      // TODO: Change this error handling to something nicer
      alert('Virheellinen käyttäjätunnus tai salasana')
      console.error('Login error:', err)
    }
  }

  return (
    <div>
      <p>Kirjaudu sisään</p>
      <div>
        <TextField
          style={{ marginRight: 5 }}
          id="outlined-basic"
          label="Käyttäjätunnus"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ marginLeft: 5 }}
          id="outlined-basic"
          label="Salasana"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button style={{ marginTop: 20 }} variant="contained" onClick={handleLogin}>
        Kirjaudu Sisään
      </Button>
    </div>
  )
}

export default LoginForm
