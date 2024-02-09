import { useState } from 'react'
import { Modal, Box, Button } from '@mui/material'
import { Order, OrderRow } from '../TypeDefs'

const OrderInfo = () => {
    const [open, setOpen] = useState<boolean>(false)

    const showModal = () => setOpen(true)
    const hideModal = () => setOpen(false)

    // hardcoded for now: the data for order and orderRow should
    // be passed here via the order list with the specific orderId
    const order: Order = {
        orderId: 1,
        locationId: 1,
        locationName: 'Kuljetusliike 1',
        datetime: '01.02.2024 11:58',
        status: 'Avattu',
    }
    const rows: OrderRow[] = [
        {
            orderId: 1,
            product: 'Tynnyrilava',
            amount: 10,
        },
        {
            orderId: 1,
            product: 'Lithiumakkulava',
            amount: 5,
        },
        {
            orderId: 1,
            product: 'Pahvilaatikkolava',
            amount: 20,
        },
    ]

    // renders order's pallet types & amounts
    const palletRows = () => {
        return rows.map((item, index) => (
            <p key={index}>
                {item.product} x{item.amount}
            </p>
        ))
    }

    return (
        <div>
            <a onClick={showModal}>Tilaus {order.orderId}</a>
            <Modal open={open} onClose={hideModal}>
                <Box sx={styles.box}>
                    <h4>Tilaaja</h4>
                    <p>{order.locationName}</p>
                    <h4>Tilaustunnus</h4>
                    <p>{order.orderId}</p>
                    <h4>Lavat</h4>
                    {palletRows()}
                    <h4>Tilattu</h4>
                    <p>{order.datetime}</p>
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
