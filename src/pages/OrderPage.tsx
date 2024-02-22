import OrderList from '../components/OrderList'
import Page from '../components/Page'
import { useMobileScreen } from '../hooks/useMobileScreen'
import { GET_OPEN_ORDERS, GET_CLOSED_ORDERS } from '../graphql/Queries'

const OrderPage = () => {
    const isMobile = useMobileScreen()
    return (
        <Page>
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
        </Page>
    )
}

export default OrderPage
