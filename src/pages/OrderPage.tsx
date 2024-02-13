import OrderList from '../components/OrderList'
import Page from '../components/Page'

const OrderPage = () => {
    return (
        <Page>
            <div style={{ paddingTop: 20 }}>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>Tilaukset</p>
                <OrderList />
            </div>
        </Page>
    )
}

export default OrderPage
