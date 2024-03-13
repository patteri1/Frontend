import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_ORDER, GET_ORDER_FORM } from '../graphql/Queries'
import { Storage } from '../graphql/TypeDefs'

interface OrderFormProps {
    onClose: () => void
    onOrderSuccess: () => void
}

interface Location {
    id: string
    name: string
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose, onOrderSuccess }) => {
    const { loading, error, data } = useQuery(GET_ORDER_FORM)

    const [locationId, setLocationId] = useState<number>(1)
    const [paristolaatikko, setParistolaatikko] = useState<number>()
    const [litiumlaatikko, setLitiumlaatikko] = useState<number>()
    const [lavat, setLavat] = useState<Storage[]>([])
    const [lava, setLava] = useState<Storage>()
    const status: string = 'Avattu'

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

    if (loading) return <p>Loading...</p>
    if (error) {
        console.log(error)
        return <p>Error : {error.message}</p>
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
                        onChange={(e) => {
                            console.log(data)
                            setLocationId(Number(e.target.value))
                        }}
                    >
                        {(data.carrierLocations as Location[]).map(
                            ({ id, name }) => (
                                <MenuItem key={id} value={id}>
                                    {name}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                    {data.availableStorages.map(
                        (row: Storage, index: number) => (
                            <div key={index}>
                                <p>
                                    {row.palletType.product}: {row.amount}
                                </p>
                                <TextField
                                    required
                                    margin="dense"
                                    id={`palletType-${index}`}
                                    type="number"
                                    fullWidth
                                    value={row.amount}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        // Assuming you have a function to update the amount in your 'row' object
                                        updateAmount(index, value) // Pass the index and the new value to the update function
                                    }}
                                ></TextField>
                            </div>
                        )
                    )}
                    {/* <TextField
                        required
                        margin="dense"
                        id="paristolaatikko"
                        label="Paristolaatikko"
                        type="number"
                        value={paristolaatikko}
                        onChange={(e) => {
                            const value = e.target.value
                            setParistolaatikko(
                                value ? Number(value) : undefined
                            )
                        }}
                    /> */}
                    {/* <TextField
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
                    /> */}
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
