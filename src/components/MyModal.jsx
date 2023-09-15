import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function MyModal({ isOpen, onClose }) {
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="modal-title">Modal Title</h2>
        <p id="modal-description">Modal content goes here.</p>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}

export default MyModal;
