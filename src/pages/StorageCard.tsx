import React, { useState } from 'react'
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
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface StorageCardProps {
    data: { title: string; content: string }[]
    onUpdate: (updatedData: { title: string; content: string }[]) => void
}

const StorageCard: React.FC<StorageCardProps> = ({ data, onUpdate }) => {
    const [open, setOpen] = useState(false)
    const [editedData, setEditedData] =
        useState<{ title: string; content: string }[]>(data)

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleCancel = () => {
        setEditedData(data)
        setOpen(false)
    }
    const handleAmountChange = (index: number, amountChange: number) => {
        const newAmount = parseInt(editedData[index].content) + amountChange
        const newData = [...editedData]
        newData[index] = { ...newData[index], content: newAmount.toString() }
        setEditedData(newData)
    }
    const handleInputChange = (index: number, newValue: string) => {
        const newData = [...editedData]
        newData[index] = { ...newData[index], content: newValue }
        setEditedData(newData)
    }
    const handleSave = () => {
        onUpdate(editedData)
        handleClose()
    }

    return (
        <Card sx={{ minWidth: 300 }}>
            <CardContent>
                {editedData.map((cardData, index) => (
                    <div key={index}>
                        <Typography sx={{ fontSize: 20 }} variant="h1">
                            <b>{cardData.title}</b>
                        </Typography>
                        {cardData.title === 'Toimipaikka' ? (
                            <Typography
                                sx={{ fontSize: 14, marginBottom: 1 }}
                                variant="body1"
                            >
                                {cardData.content}
                            </Typography>
                        ) : (
                            <TextField
                                margin="dense"
                                id={index.toString()}
                                type="text"
                                fullWidth
                                value={cardData.content}
                                InputProps={{ readOnly: true }} // Set readOnly to true to make it uneditable
                                onChange={(e) =>
                                    handleInputChange(index, e.target.value)
                                }
                            />
                        )}
                    </div>
                ))}
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
                    {editedData.map((cardData, index) => (
                        <div key={index}>
                            
                            {cardData.title === 'Toimipaikka' ||
                            cardData.title === 'Osoite' ? (
                                <Typography
                                    sx={{ fontSize: 20, marginBottom: 1 }}
                                    variant="body1"
                                >
                                    {cardData.content}
                                </Typography>
                            ) : (
                                <>
                                    <TextField
                                        margin="dense"
                                        id={index.toString()}
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
                                            handleAmountChange(index, 1)
                                        }
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            handleAmountChange(index, -1)
                                        }
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                </>
                            )}
                        </div>
                    ))}
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
