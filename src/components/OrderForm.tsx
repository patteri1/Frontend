import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import { useMutation, gql } from '@apollo/client'

interface OrderFormProps {
    onClose: () => void
}

const ADD_ORDER = gql`
    mutation AddOrder($input: AddOrderInput!) {
        addOrder(input: $input) {
            location {
                id
            }
            datetime
            status
        }
    }
`

const OrderForm: React.FC<OrderFormProps> = ({ onClose }) => {
    const [locationId, setLocationId] = useState<number>(1)
    const [datetime, setDatetime] = useState<string>('')
    const [paristolaatikko, setParistolaatikko] = useState<number>(0)
    const [litiumlaatikko, setLitiumlaatikko] = useState<number>(0)
    const [status, setStatus] = useState<string>('Avattu')

    const [addOrder] = useMutation(ADD_ORDER)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const { data } = await addOrder({
                variables: {
                    input: {
                        locationId,
                        datetime,
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
        } catch (error) {
            console.error('Error adding order:', error)
        }
    }

    const getCurrentDate = () => {
        const date = new Date()
        const year = date.getFullYear()
        let month = String(date.getMonth() + 1)
        let day = String(date.getDate())

        if (month.length === 1) {
            month = '0' + month
        }
        if (day.length === 1) {
            day = '0' + day
        }

        return `${year}-${month}-${day}`
    }

    React.useEffect(() => {
        setDatetime(getCurrentDate())
    }, [])

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
                        {[1, 2, 3, 4].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        margin="dense"
                        id="datetime"
                        label="Päivämäärä"
                        type="date"
                        fullWidth
                        value={datetime}
                        onChange={(e) => setDatetime(e.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="paristolaatikko"
                        label="Paristolaatikko"
                        type="number"
                        fullWidth
                        value={paristolaatikko}
                        onChange={(e) =>
                            setParistolaatikko(Number(e.target.value))
                        }
                    />
                    <TextField
                        required
                        margin="dense"
                        id="litiumlaatikko"
                        label="Litiumlaatikko"
                        type="number"
                        fullWidth
                        value={litiumlaatikko}
                        onChange={(e) =>
                            setLitiumlaatikko(Number(e.target.value))
                        }
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
