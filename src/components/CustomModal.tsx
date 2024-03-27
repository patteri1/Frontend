import { Box, Button, Modal } from '@mui/material' // Import Box and Button from Material-UI
import { useMutation } from '@apollo/client'
import { COLLECT_ORDER, CANCEL_ORDER } from '../graphql/Queries'
import { Order } from '../graphql/TypeDefs'

type Section = {
    header: string
    content: JSX.Element | JSX.Element[]
}

type OptionalButton = {
    label: string
    onClick: () => void
}

type CustomModalProps = {
    open: boolean
    hideModal: () => void
    sections: Section[]
    optionalButton?: OptionalButton
    order: Order
}

const CustomModal = ({
    open,
    hideModal,
    sections,
    order,
}: CustomModalProps) => {
    const [collectOrderMutation] = useMutation(COLLECT_ORDER)
    const [cancelOrderMutation] = useMutation(CANCEL_ORDER)

    const handleCollectOrder = async () => {
        try {
            console.log('Collecting order:', order.orderId) // Log orderId
            await collectOrderMutation({
                variables: { orderId: order.orderId },
            })
            hideModal()
        } catch (error) {
            console.error('Error collecting order:', error)
        }
    }

    const handleCancelOrder = async () => {
        try {
            console.log('Cancelling order:', order.orderId) // Log orderId
            await cancelOrderMutation({
                variables: { orderId: order.orderId },
            })
            hideModal()
        } catch (error) {
            console.error('Error cancelling order:', error)
        }
    }

    return (
        <Modal open={open} onClose={hideModal}>
            <Box sx={styles.box}>
                {sections.map((section, index) => (
                    <div key={index}>
                        <h4>{section.header}</h4>
                        {section.content}
                    </div>
                ))}
                <Button
                    style={{ marginTop: '10px', float: 'right' }}
                    onClick={handleCollectOrder}
                    variant="contained"
                >
                    Nouda
                </Button>
                <Button
                    style={{ marginTop: '10px', float: 'right' }}
                    onClick={handleCancelOrder}
                    variant="contained"
                >
                    Peru
                </Button>
                <Button
                    style={{ marginTop: '10px', float: 'right' }}
                    onClick={hideModal}
                    variant="contained"
                >
                    Sulje
                </Button>
            </Box>
        </Modal>
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

export default CustomModal
