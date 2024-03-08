import { useQuery } from '@apollo/client'
import { Box, Paper } from '@mui/material'
import { GET_LOCATIONS_IDS } from '../graphql/Queries'
import LocationInfo from './LocationInfo'

// define typescript interface for location
interface Location {
    id: number
}

const LocationList = () => {
    const { loading, error, data } = useQuery(GET_LOCATIONS_IDS)

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