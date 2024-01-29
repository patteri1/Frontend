// this component is just for testing and learning grapqhl
// remove when the real stuff comes in

import { useQuery, gql } from '@apollo/client'

// define typescript interface for location
interface Location {
    id: string
    name: string
    address: string
    city: string
    postalCode: string
    price: number
}

// define the grapqhl query for fetching all locations
// needs to match one in the schema on the
const GET_LOCATIONS = gql`
    query GetLocations {
        allLocations {
            id
            name
            address
            city
            postalCode
            price
        }
    }
`

const Locations = () => {
    const { loading, error, data} = useQuery(GET_LOCATIONS)
    
    // apollo server automatically track loading and error states
    // reflected in error and loading properties
    if (loading) return <p>Loading...</p>
    if (error) return (<p>Error : { error.message }</p>)

    // as Location[] for type assertion
    return (data.allLocations as Location[]).map(({ id, name, address, postalCode, city, price }) => (
        <div key={id}>
            <b>{name}</b>
            <br />
            <p>{address}, {postalCode}, {city}</p>
            <i>{price} €/kk</i>
        </div>
    ))
}

export default Locations
