import { gql } from '@apollo/client'

// todo: fix the storages part in backend
// (only fetch the latest storage row for every product)
export const GET_LOCATIONS = gql`
    query {
        allLocations {
            locationName
            address
            postCode
            city
            locationType
            storages {
                locationId
                productId
                palletAmount
                product {
                    productName
                }
            }
        }
    }
`

// todo: fix
export const SET_AMOUNT_TO_STORAGE = gql`
    mutation setAmountToStorage(
        $locationId: Int!
        $productId: Int!
        $palletAmount: Int!
    ) {
        setAmountToStorage(
            locationId: $locationId
            productId: $productId
            palletAmount: $palletAmount
        )
        palletAmount
    }
`

export const GET_ORDERS = gql`
    query AllOrders {
        allOrders {
            orderId
            createdAt
            updatedAt
            status
            location {
                locationName
            }
        }
    }
`

export const GET_ORDER_BY_ID = gql`
    query Order($orderId: Int!) {
        order(orderId: $orderId) {
            orderId
            createdAt
            updatedAt
            status
            location {
                locationName
            }
            orderRows {
                palletAmount
                product {
                    productName
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
                locationName
            }
            createdAt
            updatedAt
            status
        }
    }
`

export const GET_CLOSED_ORDERS = gql`
    query Query {
        closedOrders {
            orderId
            location {
                locationName
            }
            createdAt
            updatedAt
            status
        }
    }
`
export const ADD_ORDER = gql`
    mutation AddOrder($input: AddOrderInput!) {
        addOrder(input: $input) {
            orderId
            location {
                locationId
            }
            createdAt
            status
        }
    }
`

export const COLLECT_ORDER = gql`
    mutation CollectOrder(
        $orderId: Int!
        $storageInput: StorageInput!
        $storageInput2: StorageInput!
    ) {
        add: addPallets(storageInput: $storageInput) {
            productId
            palletAmount
            locationId
        }
        reduce: addPallets(storageInput: $storageInput2) {
            productId
            palletAmount
            locationId
        }
        collectOrder(orderId: $orderId) {
            orderId
            location {
                locationId
            }
            createdAt
            status
        }
    }
`

export const CANCEL_ORDER = gql`
    mutation CancelOrder($orderId: Int!) {
        cancelOrder(orderId: $orderId) {
            orderId
            location {
                locationId
            }
            createdAt
            status
        }
    }
`

export const GET_ORDER_FORM = gql`
    query OrderForm {
        carrierLocations {
            locationId
            locationName
        }
        availableStorages {
            palletAmount
            product {
                productId
                productName
            }
        }
    }
`
