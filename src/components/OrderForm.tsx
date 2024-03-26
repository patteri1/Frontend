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
    locationId: string
    locationName: string
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose, onOrderSuccess }) => {
    const { loading, error, data } = useQuery(GET_ORDER_FORM)

    const [locationId, setLocationId] = useState<number>(1)
    const [rows, setRows] = useState<{ [key: number]: string }>([])

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
                        orderRows: Object.entries(rows).map(
                            ([productId, palletAmount]) => ({
                                productId: Number(productId),
                                palletAmount: Number(palletAmount),
                            })
                        ),
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
                            setLocationId(Number(e.target.value))
                        }}
                    >
                        {(data.carrierLocations as Location[]).map(
                            ({ locationId, locationName }) => (
                                <MenuItem key={locationId} value={locationId}>
                                    {locationName}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                    {data.availableStorages.map((row: Storage) => (
                        <div
                            style={{ display: 'flex', gap: 10 }}
                            key={row.product.productId}
                        >
                            <p style={{ width: 180 }}>
                                {row.product.productName}: <br />
                                {row.palletAmount} vapaana
                            </p>
                            <TextField
                                style={{ width: 70 }}
                                required
                                margin="dense"
                                id={`product-${row.product.productId}`}
                                type="number"
                                value={rows[row.product.productId] || ''}
                                onChange={(e) => {
                                    const value = parseInt(
                                        e.target.value,
                                        10
                                    ).toString()
                                    setRows((prevRows) => ({
                                        ...prevRows,
                                        [row.product.productId]: value,
                                    }))
                                }}
                            />
                        </div>
                    ))}
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
