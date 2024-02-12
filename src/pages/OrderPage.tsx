import OrderList from '../components/OrderList'
import Page from '../components/Page'

const OrderPage = () => {
    return (
        <Page>
            <div>
                 <p>Tilaukset</p>
                 <OrderList/>
            </div>
        </Page>
    )
}

export default OrderPage
