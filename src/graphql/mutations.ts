import { gql } from '@apollo/client';


export const SET_AMOUNT_TO_STORAGE = gql`
    mutation setAmountToStorage($locationId: Int!, $palletTypeId: Int!, $amount: Int!){
        setAmountToStorage(locationId: $locationId, palletTypeId: $palletTypeId, amount: $amount)
        amount
    }
`

export const UPDATE_LOCATION = gql`
    mutation UpdateLocation($locationId: Int!, $input: LocationInput!) {
        updateLocation(locationId: $locationId, input: $input) {
          id
        }
    }
`
