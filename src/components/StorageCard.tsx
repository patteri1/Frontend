import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface StorageCardProps {
    data: { title: string; content: string, palletTypeId?: number; locationId?: number  }[]
    locationName: string
    locationId: number
    address: string // Add address to props
    onUpdate: (updatedData: { title: string; content: string }[]) => void,
    onStorageUpdate: (locationId: number, palletTypeId: number, amount: number) => void;
    
}

const StorageCard: React.FC<StorageCardProps> = ({
    data: originalData,
    locationName,
    address,
    onUpdate,
    onStorageUpdate
}) => {
    const [open, setOpen] = useState(false)
    const [editedData, setEditedData] = useState<
        { title: string; content: string }[]
    >([])
    const nonNegative = (amount: number) => {
        return Math.max(amount, 0)
    }

    useEffect(() => {
        setEditedData(originalData.filter((item) => item.title !== 'Osoite'))
    }, [originalData])

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleCancel = () => {
        setEditedData(originalData.filter((item) => item.title !== 'Osoite'))
        setOpen(false)
    }

    const handleAmountChange = (index: number, amountChange: number) => {
        const newAmount = parseInt(editedData[index].content) + amountChange
        const updatedAmount = nonNegative(newAmount)

        const newData = [...editedData]
        newData[index] = {
            ...newData[index],
            content: updatedAmount.toString(),
        }
        setEditedData(newData)
    }

    const handleInputChange = (index: number, newValue: string) => {
        const newData = [...editedData]
        newData[index] = { ...newData[index], content: newValue }
        setEditedData(newData)
    }

    const handleSave = () => {
        onUpdate(originalData)
        handleClose()
    }
    const handleAmountChangeByTen = (index: number, step: number) => {
        const newAmount = parseInt(editedData[index].content) + step * 10
        const newData = [...editedData]
        const updatedAmount = nonNegative(newAmount)
        newData[index] = {
            ...newData[index],
            content: updatedAmount.toString(),
        }
        setEditedData(newData)
    }
    return (
        <Card sx={{ minWidth: 300, marginTop: 10 }}>
            <CardContent>
                <Typography variant="h6">{locationName}</Typography>
                <Typography variant="body1" color="textSecondary">
                    {address}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {editedData.map((cardData, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {cardData.title !== 'Toimipaikka' && (
                                            <>{cardData.title}</>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {cardData.title !== 'Toimipaikka' && (
                                            <>
                                                {cardData.content}
                                                {cardData.title !==
                                                    'Hinta/lavapaikka/kk' && (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <CardActions>
                <Button
                    size="medium"
                    color="secondary"
                    variant="contained"
                    onClick={handleClickOpen}
                >
                    Muokkaa lavojen määrää
                </Button>
            </CardActions>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold', width: 400 }}>
                    Muokkaa lavojen määrää
                </DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {editedData.map((cardData, index) => (
                                    <TableRow key={index}>
                                        {cardData.title === 'Toimipaikka' ? (
                                            <b>
                                                <Typography variant="inherit">
                                                    {cardData.content}
                                                </Typography>
                                            </b>
                                        ) : cardData.title !==
                                          'Hinta/lavapaikka/kk' ? (
                                            <>
                                                <TextField
                                                    margin="normal"
                                                    label={cardData.title}
                                                    type="text"
                                                    fullWidth
                                                    value={cardData.content}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleAmountChange(
                                                            index,
                                                            1
                                                        )
                                                    }
                                                >
                                                    <AddIcon />
                                                </IconButton>

                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleAmountChange(
                                                            index,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleAmountChangeByTen(
                                                            index,
                                                            1
                                                        )
                                                    }
                                                >
                                                    +10
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleAmountChangeByTen(
                                                            index,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    -10
                                                </IconButton>
                                            </>
                                        ) : null}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Peruuta
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Tallenna
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}

export default StorageCard