import { useState } from 'react'
// import { Modal, Box, Button } from '@mui/material'
import { useQuery, gql } from '@apollo/client'
import CustomModal from './CustomModal'

const GET_ORDER_BY_ID = gql`
    query Orders($orderId: Int!) {
        order(id: $orderId) {
            orderId
            datetime
            status
            location {
                name
            }
            orderRows {
                amount
                palletType {
                    product
                }
            }
        }
    }
`

export interface OrderRow {
    orderId: number
    palletType: PalletType
    amount: number
}

export interface PalletType {
    palletTypeId: number
    product: string
    amount: number
}

interface OrderInfoProps {
    id: number
}

const OrderInfo = ({ id }: OrderInfoProps) => {
    const { loading, error, data } = useQuery(GET_ORDER_BY_ID, {
        variables: { orderId: id },
    })

    const [open, setOpen] = useState<boolean>(false)

    const showModal = () => setOpen(true)
    const hideModal = () => setOpen(false)

    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    
    const modalSections = [
        { header: 'Tilaaja', content: <p>{data.order.location.name}</p> },
        { header: 'Tilaustunnus', content: <p>{data.order.orderId}</p> },
        { header: 'Lavat', content: data.order.orderRows.map((row: OrderRow) => <p>{row.palletType.product} x{row.amount}</p>) },
        { header: 'Tilattu', content: <p>{data.order.datetime}</p> },
        { header: 'Status', content: <p>{data.order.status}</p> }
    ];
    
    return (
        <div>
            <a onClick={showModal}>Näytä</a>
            <CustomModal
                open={open}
                hideModal={hideModal}
                sections={modalSections}
            />
        </div>
    )
}

export default OrderInfo
