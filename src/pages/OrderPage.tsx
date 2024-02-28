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
              <div style={!isMobile ? { display: 'flex', gap: 50 } : undefined}>
                <OrderList
                    title="Aktiiviset Tilaukset"
                    query={GET_OPEN_ORDERS}
                    orderData="openOrders"
                />
                <OrderList
                    title="Käsitellyt Tilaukset"
                    query={GET_CLOSED_ORDERS}
                    orderData="closedOrders"
                />
              </div>
            </div>
        </Page>
    )
}

export default OrderPage
