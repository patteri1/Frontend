import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import { useMutation } from '@apollo/client'
import { ADD_ORDER } from '../graphql/Queries'

interface OrderFormProps {
    onClose: () => void
    onOrderSuccess: () => void
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose, onOrderSuccess }) => {
    const [locationId, setLocationId] = useState<number>(1)
    const [paristolaatikko, setParistolaatikko] = useState<number>()
    const [litiumlaatikko, setLitiumlaatikko] = useState<number>()
    const [status, setStatus] = useState<string>('Avattu')

    const [addOrder] = useMutation(ADD_ORDER)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const { data } = await addOrder({
                variables: {
                    input: {
                        locationId,
                        status,
                        orderRows: [
                            { palletTypeId: 1, amount: paristolaatikko },
                            { palletTypeId: 2, amount: litiumlaatikko },
                        ],
                    },
                },
            })

            console.log('Order added:', data.addOrder)
            onClose()
            onOrderSuccess()
        } catch (error) {
            console.error('Error adding order:', error)
        }
    }

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Uusi Tilaus</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        required
                        margin="dense"
                        id="locationId"
                        label="Tilaaja"
                        fullWidth
                        value={locationId}
                        onChange={(e) => setLocationId(Number(e.target.value))}
                    >
                        {[1, 2, 3].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        margin="dense"
                        id="paristolaatikko"
                        label="Paristolaatikko"
                        type="number"
                        fullWidth
                        value={paristolaatikko}
                        onChange={(e) => {
                            const value = e.target.value
                            setParistolaatikko(
                                value ? Number(value) : undefined
                            )
                        }}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="litiumlaatikko"
                        label="Litiumlaatikko"
                        type="number"
                        fullWidth
                        value={litiumlaatikko}
                        onChange={(e) => {
                            const value = e.target.value
                            setLitiumlaatikko(value ? Number(value) : undefined)
                        }}
                    />

                    <TextField
                        select
                        required
                        margin="dense"
                        id="status"
                        label="Status"
                        fullWidth
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {['Avattu', 'Noudettu'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <DialogActions>
                        <Button onClick={onClose}>Peruuta</Button>
                        <Button type="submit">Tallenna</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default OrderForm
