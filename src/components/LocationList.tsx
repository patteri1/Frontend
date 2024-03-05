import { useQuery, gql } from '@apollo/client'
import LocationInfo from './LocationInfo'
import { Box, Paper } from '@mui/material'

// define typescript interface for location
interface Location {
    id: number
}

// define the grapqhl query for fetching all locations
// needs to match one in the schema on the
const GET_LOCATIONS = gql`
    query GetLocations {
        allLocations {
            id
            name
        }
    }
`

const LocationList = () => {
    const { loading, error, data } = useQuery(GET_LOCATIONS)

    if (loading) return <p>Loading...</p>
    if (error) return (<p>Error : {error.message}</p>)


    return (
        <Box sx={{ padding: 2, width: 400 }} component={Paper}>
            <div>
                {(data.allLocations as Location[]).map(({ id }) => (
                    <div style={{ marginTop: 6 }} key={id}>
                        <LocationInfo id={id} />
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default LocationList