import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_LOCATION_BY_ID } from '../graphql/Queries'
import CustomModal from './CustomModal'
import EditLocation from './EditLocation'

interface LocationInfoProps {
    id: number
}

const LocationInfo = ({ id }: LocationInfoProps) => {
    const { loading, error, data } = useQuery(GET_LOCATION_BY_ID, {
        variables: { locationId: id },
    })


    const [open, setOpen] = useState<boolean>(false)
    const [editOpen, setEditOpen] = useState<boolean>(false)

    const showModal = () => setOpen(true)
    const hideModal = () => setOpen(false)
    const hideEdit = () => setEditOpen(false)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    const modalSections = [
        { header: 'Nimi', content: <p>{data.location.name}</p> },
        { header: 'Osoite', content: <p>{data.location.address}</p> },
        { header: 'Kaupunki', content: <p>{data.location.city} {data.location.postCode}</p> },
        { header: 'Tyyppi', content: <p>{data.location.locationType}</p> },
        { header: 'Hinta', content: <p>{data.location.price} €/kk</p> }
    ]

    return (
        <div>
            <span style={{ cursor: 'pointer' }} onClick={showModal}>{data.location.name}</ span>
            <br />
            <CustomModal
                open={open}
                hideModal={hideModal}
                sections={modalSections}
                optionalButton={{ label: 'muokkaa', onClick: () => setEditOpen(true) }}
            />
            <EditLocation location={data.location} open={editOpen} handleClose={hideEdit} />

        </div>
    )
}

export default LocationInfo