import { useState } from 'react'
import OrderList from '../components/OrderList'
import Page from '../components/Page'
import OrderForm from '../components/OrderForm'
import NewOrderButton from '../components/NewOrderButton'
import Dialog from '@mui/material/Dialog'

const OrderPage = () => {
    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)

    const openOrderForm = () => {
        setIsOrderFormOpen(true)
    }

    const closeOrderForm = () => {
        setIsOrderFormOpen(false)
    }

    return (
        <Page>
            <div style={{ paddingTop: 20 }}>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>Tilaukset</p>
                <NewOrderButton onClick={openOrderForm} />
                <Dialog open={isOrderFormOpen} onClose={closeOrderForm}>
                    <OrderForm onClose={closeOrderForm} />
                </Dialog>
                <OrderList />
            </div>
        </Page>
    )
}

export default OrderPage
