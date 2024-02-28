import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'

interface OrderFormProps {
    onClose: () => void
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose }) => {
    const [orderId] = useState<number>(0)
    const [location, setLocation] = useState<string>('')
    const [currentDate, setCurrentDate] = useState<string>('')
    const [paristolaatikko, setParistolaatikko] = useState<number>(0)
    const [litiumlaatikko, setLitiumlaatikko] = useState<number>(0)
    const [status, setStatus] = useState<string>('Avattu')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Form submitted:', {
            orderId,
            location,
            currentDate,
            paristolaatikko,
            litiumlaatikko,
            status,
        })
        onClose()
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
        setCurrentDate(getCurrentDate())
    }, [])

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Uusi Tilaus</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        id="orderId"
                        value={orderId}
                        onChange={() => {}}
                    />
                    <input
                        type="hidden"
                        id="currentDate"
                        value={currentDate}
                        onChange={() => {}}
                    />
                    <TextField
                        select
                        required
                        margin="dense"
                        id="location"
                        label="Tilaaja"
                        fullWidth
                        value={location}
                        onChange={(e) => setLocation(String(e.target.value))}
                    >
                        {[
                            'Kuljetusliike 1',
                            'Kuljetusliike 2',
                            'Kuljetusliike 3',
                            'Kuljetusliike 4',
                        ].map((option) => (
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
