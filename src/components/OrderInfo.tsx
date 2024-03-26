import { useState } from 'react'
// import { Modal, Box, Button } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_ORDER_BY_ID } from '../graphql/Queries'
import { OrderRow } from '../graphql/TypeDefs'
import CustomModal from './CustomModal'

interface OrderInfoProps {
    orderId: number
}

const OrderInfo = ({ orderId }: OrderInfoProps) => {
    const { loading, error, data } = useQuery(GET_ORDER_BY_ID, {
        variables: { orderId: orderId },
    })

    const [open, setOpen] = useState<boolean>(false)

    const showModal = () => setOpen(true)
    const hideModal = () => setOpen(false)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    const modalSections = [
        {
            header: 'Tilaaja',
            content: <p>{data.order.location.locationName}</p>,
        },
        { header: 'Tilaustunnus', content: <p>{data.order.orderId}</p> },
        {
            header: 'Lavat',
            content: data.order.orderRows.map((row: OrderRow) => (
                <p>
                    {row.product.productName} x{row.palletAmount}
                </p>
            )),
        },
        { header: 'Tilattu', content: <p>{data.order.createdAt}</p> },
        { header: 'Status', content: <p>{data.order.status}</p> },
    ]

    return (
        <div>
            <a onClick={showModal}>Näytä</a>
            <CustomModal
                orderId={data.order.orderId}
                open={open}
                hideModal={hideModal}
                sections={modalSections}
            />
        </div>
    )
}

export default OrderInfo
