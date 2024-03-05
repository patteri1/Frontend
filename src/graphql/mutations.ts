import { gql } from '@apollo/client';


export const SET_AMOUNT_TO_STORAGE = gql`
    mutation setAmountToStorage($locationId: Int!, $palletTypeId: Int!, $amount: Int!){
        setAmountToStorage(locationId: $locationId, palletTypeId: $palletTypeId, amount: $amount)
        amount
    }
`
