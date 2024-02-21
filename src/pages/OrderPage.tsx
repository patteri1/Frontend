import OrderList from '../components/OrderList'
import Page from '../components/Page'
import { GET_OPEN_ORDERS, GET_CLOSED_ORDERS } from '../graphql/Queries'

const OrderPage = () => {
    return (
        <Page>
            <div style={{ paddingTop: 20 }}>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>Tilaukset</p>
                <OrderList query={GET_OPEN_ORDERS} orderData={'openOrders'} />
                <OrderList
                    query={GET_CLOSED_ORDERS}
                    orderData={'closedOrders'}
                />
            </div>
        </Page>
    )
}

export default OrderPage
