import { useQuery, gql } from '@apollo/client'
import CustomModal from './CustomModal'
import { useState } from 'react'

interface LocationInfoProps {
    locationId: number
}

const GET_LOCATION_BY_ID = gql`
    query Location($locationId: Int!) {
        location(locationId: $locationId) {
            locationName
            address
            postCode
            city
            locationType
        }
    }
`

const LocationInfo = ({ locationId }: LocationInfoProps) => {
    const { loading, error, data } = useQuery(GET_LOCATION_BY_ID, {
        variables: { locationId: locationId },
    })

    const [open, setOpen] = useState<boolean>(false)

    const showModal = () => setOpen(true)
    const hideModal = () => setOpen(false)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    const modalSections = [
        { header: 'Nimi', content: <p>{data.location.locationName}</p> },
        { header: 'Osoite', content: <p>{data.location.address}</p> },
        {
            header: 'Kaupunki',
            content: (
                <p>
                    {data.location.postCode} {data.location.city}
                </p>
            ),
        },
        { header: 'Tyyppi', content: <p>{data.location.locationType}</p> },
        //{ header: 'Hinta', content: <p>{data.location.price} €/kk</p> },
    ]

    return (
        <div>
            <span style={{ cursor: 'pointer' }} onClick={showModal}>
                {data.location.locationName}
            </span>
            <br />
            <CustomModal
                open={open}
                hideModal={hideModal}
                sections={modalSections}
                optionalButton={{
                    label: 'muokkaa',
                    onClick: () => console.log('button clicked'),
                }}
            />
        </div>
    )
}

export default LocationInfo
