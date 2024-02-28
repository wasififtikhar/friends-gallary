import { Modal, Box } from "@mui/material";

const CustomModal = ({open=false, handleClose= () => {}, children}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add Friend"
        aria-describedby="Add Your friend and save your friendship"
        style={{ display: `flex`, justifyContent: `center`, alignItems: `flex-start`, padding: `22px`}}
      >
        <Box>
        {children}
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
