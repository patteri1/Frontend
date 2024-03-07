import { Box, Button, Modal } from '@mui/material'; // Import Box and Button from Material-UI

interface Section {
    header: string
    content: JSX.Element | JSX.Element[]
}

interface OptionalButton {
    label: string
    onClick: () => void
}

interface CustomModalProps {
    open: boolean
    hideModal: () => void
    sections: Section[]
    optionalButton?: OptionalButton
}

const CustomModal = ({ open, hideModal, sections, optionalButton }: CustomModalProps) => {
    return (
        <Modal open={open} onClose={hideModal}>
            <Box sx={styles.box}>
                {sections.map((section, index) => (
                    <div key={index}>
                        <h4>{section.header}</h4>
                        {section.content}
                    </div>
                ))}
                {optionalButton && (
                    <Button
                        style={{ marginTop: '10px', float: 'right' }}
                        onClick={optionalButton.onClick}
                        variant="contained"
                    >
                        {optionalButton.label}
                    </Button>
                )}
                <Button
                    style={{ marginTop: '10px', float: 'right' }}
                    onClick={hideModal}
                    variant="contained"
                >
                    Takaisin
                </Button>
            </Box>
        </Modal>
    );
};

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