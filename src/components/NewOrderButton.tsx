import React from 'react'
import Button from '@mui/material/Button'

interface NewOrderButtonProps {
    onClick: () => void
}

const NewOrderButton: React.FC<NewOrderButtonProps> = ({ onClick }) => {
    return (
        <Button variant="outlined" onClick={onClick}>
            Uusi Tilaus
        </Button>
    )
}

export default NewOrderButton
