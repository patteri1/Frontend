import { gql } from '@apollo/client'

export const GET_LOCATIONS = gql`
    query {
        allLocations {
            id
            name
            address
            price
            locationType
            storages {
                locationId
                palletTypeId
                amount
                palletType {
                    product
                }
            }
        }
    }
`

export const SET_AMOUNT_TO_STORAGE = gql`
    mutation setAmountToStorage(
        $locationId: Int!
        $palletTypeId: Int!
        $amount: Int!
    ) {
        setAmountToStorage(
            locationId: $locationId
            palletTypeId: $palletTypeId
            amount: $amount
        )
        amount
    }
`

export const GET_ORDERS = gql`
    query AllOrders {
        allOrders {
            orderId
            createdAt
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
            createdAt
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

export const GET_OPEN_ORDERS = gql`
    query Query {
        openOrders {
            orderId
            location {
                name
            }
            createdAt
            status
        }
    }
`

export const GET_CLOSED_ORDERS = gql`
    query Query {
        closedOrders {
            orderId
            location {
                name
            }
            createdAt
            status
        }
    }
`
export const ADD_ORDER = gql`
    mutation AddOrder($input: AddOrderInput!) {
        addOrder(input: $input) {
            location {
                id
            }
            status
        }
    }
`

export const COLLECT_ORDER = gql`
    mutation CollectOrder($orderId: Int!) {
        collectOrder(id: $orderId) {
            orderId
            location {
                id
            }
            createdAt
            status
        }
    }
`

export const CANCEL_ORDER = gql`
    mutation CancelOrder($orderId: Int!) {
        cancelOrder(id: $orderId) {
            orderId
            location {
                id
            }
            createdAt
            status
        }
    }
`

export const GET_ORDER_FORM = gql`
    query OrderForm {
        availableStorages {
            amount
            palletType {
                palletTypeId
                product
            }
        }
        carrierLocations {
            id
            name
        }
    }
`
