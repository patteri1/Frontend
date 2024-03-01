import { gql } from '@apollo/client'

export const GET_LOCATIONS = gql`
    query {
        allLocations {
            name
            address
            price
            city
            postCode
            storages {
                palletType {
                    product
                    amount
                }
            }
        }
    }
`

export const GET_PALLET_TYPES = gql`
    query {
        allPalletTypes {
            palletTypeId
            product
            amount
        }
    }
`
