import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import StoragePage from './pages/StoragePage'
import OrderPage from './pages/OrderPage'
import ManagementPage from './pages/ManagementPage'
import ReportPage from './pages/ReportPage'

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
    {
        path: '/raportit',
        element: <ReportPage />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
