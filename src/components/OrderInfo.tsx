import { useState } from 'react'
import { Modal, Box, Button } from '@mui/material'
import { useQuery, gql } from '@apollo/client'
import { Order } from './OrderList'

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


const OrderInfo = (props: number) => {
    const { loading, error, data } = useQuery(GET_ORDER_BY_ID, { variables: {orderId} })
    console.log(data)

    const [open, setOpen] = useState<boolean>(false)
    
    const showModal = () => setOpen(true)
    const hideModal = () => setOpen(false)
    
    if (loading) return <p>Loading...</p>
    if (error) return (<p>Error : { error.message }</p>)

    // renders order's pallet types & amounts
    // const palletRows = () => {
    //     return rows.map((item, index) => (
    //         <p key={index}>
    //             {item.product} x{item.amount}
    //         </p>
    //     ))
    // }

    return (
        <div>
            <a onClick={showModal}>Näytä</a>
            <Modal open={open} onClose={hideModal}>
                <Box sx={styles.box}>
                    <h4>Tilaaja</h4>
                    <p>{data.order.location.name}</p>
                    <h4>Tilaustunnus</h4>
                    <p>{data.order.orderId}</p>
                    <h4>Lavat</h4>
                    <h4>Tilattu</h4>
                    <p>{data.order.datetime}</p>
                    <Button
                        style={{ marginTop: '10px', float: 'right' }}
                        onClick={hideModal}
                        variant="contained"
                    >
                        Takaisin
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

// move to separate styles component
const styles = {
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#fff',
        borderRadius: '25px',
        lineHeight: '5px',
        p: 4,
    },
}

export default OrderInfo
