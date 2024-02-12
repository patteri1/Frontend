import OrderList from '../components/OrderList'
import Page from '../components/Page'

const OrderPage = () => {
    return (
        <Page>
            <div style={{ paddingTop: 20, fontSize: 20, fontWeight: 'bold' }}>
                <p>Tilaukset</p>
                <OrderList />
            </div>
        </Page>
    )
}

export default OrderPage
