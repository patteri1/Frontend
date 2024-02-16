import '../App.css'
import { Box, Tabs, AppBar } from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import { useMobileScreen } from '../hooks/useMobileScreen'
import { Link, useNavigate } from 'react-router-dom'

interface PageProps {
    children?: React.ReactNode
}

function Page(props: PageProps) {
    const [page, setPage] = React.useState(0)
    const isMobile = useMobileScreen()

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setPage(newValue)
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const path = window.location.pathname
    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('AuthPayload')
        navigate('/')
    }

    return (
        <Box sx={{ width: '100%' }}>
            <AppBar
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {isMobile ? (
                    // navigaatio mobiilinäkymä
                    <div>
                        <Button
                            style={{ color: 'white' }}
                            onClick={handleClick}
                        >
                            <MenuIcon />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    setPage(0)
                                }}
                            >
                                Varasto
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    setPage(1)
                                }}
                            >
                                Tilaukset
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    setPage(2)
                                }}
                            >
                                Hallinnointi
                            </MenuItem>
                        </Menu>
                    </div>
                ) : (
                    // navigaatio webbinäkymä
                    <Tabs
                        value={page}
                        onChange={handleChange}
                        textColor="inherit"
                        style={{ marginLeft: 10 }}
                    >
                        <Link
                            style={{
                                marginTop: 2,
                                color: 'white',
                                padding: 10,
                                fontWeight: 'normal',
                                opacity: path === '/varasto' ? 0.4 : 1,
                            }}
                            to="/varasto"
                        >
                            Varasto
                        </Link>
                        <Link
                            style={{
                                marginTop: 2,
                                color: 'white',
                                padding: 10,
                                fontWeight: 'normal',

                                opacity: path === '/tilaukset' ? 0.4 : 1,
                            }}
                            to="/tilaukset"
                        >
                            Tilaukset
                        </Link>
                        <Link
                            style={{
                                marginTop: 2,
                                color: 'white',
                                padding: 10,
                                fontWeight: 'normal',
                                opacity: path === '/hallinnointi' ? 0.4 : 1,
                            }}
                            to="/hallinnointi"
                        >
                            Hallinnointi
                        </Link>
                    </Tabs>
                )}

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
            </AppBar>
            {props.children}
        </Box>
    )
}

export default Page
