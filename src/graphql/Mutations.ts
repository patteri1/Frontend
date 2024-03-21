import { gql } from '@apollo/client';

export const DELETE_LOCATION = gql`
    mutation Mutation($deleteLocationId: Int!) {
        deleteLocation(id: $deleteLocationId) {
            locationId
        }
      }  
`