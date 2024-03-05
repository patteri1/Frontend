import { gql } from '@apollo/client'

export const GET_LOCATIONS = gql`
  query {
    allLocations {
      name
      address
      price
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
`;


