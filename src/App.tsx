import './App.css'
import { Box, Tabs, Tab, Typography, AppBar } from '@mui/material'
import React from 'react'
import StoragePage from './pages/StoragePage'
import OrderPage from './pages/OrderPage'
import ManagementPage from './pages/ManagementPage'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import { useMobileScreen } from './hooks/useMobileScreen'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function App() {
    const [page, setPage] = React.useState(0)
    const isMobile = useMobileScreen()
    console.log(isMobile)
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
    return (
        // this components is for testing and learning graphql,
        // remove when the real stuff comes in
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
                    >
                        <Tab label="Varasto" />
                        <Tab label="Tilaukset" />
                        <Tab label="Hallinnointi" />
                    </Tabs>
                )}

                <button
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
            <CustomTabPanel value={page} index={0}>
                <StoragePage />
            </CustomTabPanel>
            <CustomTabPanel value={page} index={1}>
                <OrderPage />
            </CustomTabPanel>
            <CustomTabPanel value={page} index={2}>
                <ManagementPage />
            </CustomTabPanel>
        </Box>
    )
}

export default App
