import { TextField, Button } from "@mui/material"

const SignInPage = () => {

    return (
        <div>
            <p>Kirjaudu sisään</p>
            <div>
                <TextField style={{marginRight: 5}}id="outlined-basic" label="Käyttäjätunnus" variant="outlined" />
                <TextField style={{marginLeft: 5}}id="outlined-basic" label="Salasana" variant="outlined" />
            </div>
            <Button style={{marginTop: 20}}variant="contained">Kirjaudu Sisään</Button>
        </div>
    )
    }
    
    export default SignInPage