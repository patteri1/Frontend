import { gql } from '@apollo/client'

export const GET_ORDERS = gql`
    query AllOrders {
        allOrders {
            orderId
            datetime
            status
            location {
                name
            }
        }
    }
`

export const GET_ORDER_BY_ID = gql`
    query Order($orderId: Int!) {
        order(id: $orderId) {
            orderId
            datetime
            status
            location {
                name
            }
            orderRows {
                amount
                palletType {
                    product
                }
            }
        }
    }
`
