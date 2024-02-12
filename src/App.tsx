import './App.css'

import { Box, Tabs, Tab, Typography, AppBar } from '@mui/material'
import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import StoragePage from './pages/StoragePage'
import OrderPage from './pages/OrderPage'
import ManagementPage from './pages/ManagementPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <SignInPage />,
    },
    {
        path: '/varasto',
        element: <StoragePage />,
    },
    {
        path: '/tilaukset',
        element: <OrderPage />,
    },
    {
        path: '/hallinnointi',
        element: <ManagementPage />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
