import { useQuery, gql } from '@apollo/client'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, IconButton, Button } from '@mui/material'
import { Location } from '../graphql/TypeDefs'
import { Delete, Edit } from '@mui/icons-material'
import Paper from '@mui/material/Paper'
import { GET_LOCATIONS_WITH_PRICE } from '../graphql/Queries'


const LocationList = () => {
    const { loading, error, data } = useQuery(GET_LOCATIONS_WITH_PRICE)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    const handleDeleteButton = (id: number) => {
        console.log('Delete location by id: ', id)
    }

    const handleEditButton = (id: number) => {
        console.log('Edit location by id: ', id)
    }

    return (
        <div>
            <TableContainer sx={{ padding: 2 }} component={Paper}>
                <Table
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Yritys</TableCell>
                            <TableCell>Osoite</TableCell>
                            <TableCell>Postitoimipaikka</TableCell>
                            <TableCell>Tyyppi</TableCell>
                            <TableCell>Lavapaikan hinta</TableCell>
                            <TableCell>Toiminnot</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.allLocationsWithPrice.map((location: Location) => (
                            <TableRow key={location.locationId} >
                                <TableCell>{location.locationName}</TableCell>
                                <TableCell>{location.address}</TableCell>
                                <TableCell>{location.postCode}, {location.city}</TableCell>
                                <TableCell>{location.locationType}</TableCell>
                                <TableCell>{location.locationPrices![0].price}€</TableCell>
                                <TableCell>
                                    <IconButton color='primary' onClick={() => handleDeleteButton(Number(location.locationId))}>
                                        <Delete />
                                    </IconButton>

                                    <IconButton color='secondary' onClick={() => handleEditButton(Number(location.locationId))}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default LocationList
