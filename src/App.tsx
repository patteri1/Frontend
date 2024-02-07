import './App.css'
import { Box, Tabs, Tab, Typography, AppBar } from '@mui/material'
import React from 'react'
import StoragePage from './pages/StoragePage'
import OrderPage from './pages/OrderPage'
import ManagementPage from './pages/ManagementPage'

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
    const [value, setValue] = React.useState(0)
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    return (
        // this components is for testing and learning graphql,
        // remove when the real stuff comes in
        <Box sx={{ width: '100%' }}>
            <AppBar>
                <Tabs value={value} onChange={handleChange} textColor="inherit">
                    <Tab label="Varasto" />
                    <Tab label="Tilaukset" />
                    <Tab label="Hallinnointi" />
                </Tabs>
            </AppBar>
            <CustomTabPanel value={value} index={0}>
                <StoragePage />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <OrderPage />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <ManagementPage />
            </CustomTabPanel>
        </Box>
    )
}

export default App
