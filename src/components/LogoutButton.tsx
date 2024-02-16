import { useNavigate } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout'


const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('AuthPayload')
        navigate('/')
    }

    return (
        <button
        onClick={handleLogout}
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
        }}
        >
                    <p style={{ fontSize: 15, color: 'white' }}>
                        Kirjaudu ulos
                    </p>
                    <LogoutIcon
                        style={{
                            marginRight: 15,
                            marginLeft: 10,
                            color: 'white',
                        }}
                        />
                </button>
    )
}

export default LogoutButton