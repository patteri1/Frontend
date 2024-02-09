import { TextField, Button } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useState } from 'react';

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

const SignInPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginMutation] = useMutation(LOGIN)

  const handleLogin = async () => {
    try {
      const result = await loginMutation({
        variables: { username, password },
      });

      // Handle successful login
      if (result.data.login) {
        // save user info to localStorage
        window.localStorage.setItem(
            'AuthPayload', JSON.stringify(result.data.login)
        )
    }

    } catch (err) {
      // Handle login error
      console.error('Login error:', err);
    }
  };

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

export default SignInPage;
