import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { Location } from "../graphql/TypeDefs";
import { ChangeEvent } from "react";
import { useState } from "react";
import { UPDATE_LOCATION } from "../graphql/mutations";
import { GET_LOCATION_BY_ID } from "../graphql/Queries";
import { useMutation } from "@apollo/client";

interface EditLocationProps {
    location: Location
    open: boolean
    handleClose: () => void
}

const EditLocation = ({ location, open, handleClose }: EditLocationProps) => {
    const [currentLocation, setCurrentLocation] = useState<Location>(location)
    const [updateLocation, { loading, error }] = useMutation(UPDATE_LOCATION, {
        refetchQueries: [{ query: GET_LOCATION_BY_ID, variables: { locationId: location.id } }]
    })

    const cleanLocation = (location: any) => {
        let { __typename, id, ...cleanedLocation } = location;
        cleanedLocation = {...cleanedLocation, price: Number(location.price)}
        return cleanedLocation;
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Form submitted:', currentLocation)
        const updatedLocation = cleanLocation(currentLocation)
        updateLocation({
            variables: {
                locationId: Number(location.id),
                input: updatedLocation
            }
        })
        handleClose()
    };

    const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target
        setCurrentLocation({ ...currentLocation, [name as string]: value })
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Muokkaa</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>

                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nimi"
                        type="text"
                        fullWidth
                        defaultValue={location.name}
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        margin="dense"
                        id="address"
                        name="address"
                        label="Osoite"
                        type="text"
                        fullWidth
                        defaultValue={location.address}
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        margin="dense"
                        id="city"
                        name="city"
                        label="Kaupunki"
                        type="text"
                        fullWidth
                        defaultValue={location.city}
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        margin="dense"
                        id="postCode"
                        name="postCode"
                        label="Postinumero"
                        type="text"
                        fullWidth
                        defaultValue={location.postCode}
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        margin="dense"
                        id="price"
                        name="price"
                        label="Hinta €/kk"
                        type="number"
                        fullWidth
                        defaultValue={String(location.price)}
                        onChange={handleChange}
                    />

                    <DialogActions>
                        <Button onClick={handleClose}>Peruuta</Button>
                        <Button type="submit">Tallenna</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditLocation