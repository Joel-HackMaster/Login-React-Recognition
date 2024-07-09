import React from "react";
import Snackbar from "@mui/material/Snackbar";

export function SnackBar({ open, handleClose, message, transition }) {
  return (
    <Snackbar 
        open={open}
        autoHideDuration={1200}
        TransitionComponent={transition}
        onClose={handleClose}
        message={message}
    />
  );
}

// const [snackMessage, setSnackMessage] = React.useState("");
//   const [state, setState] = React.useState({
//     open: false,
//     Transition: Slide,
//   });

// setSnackMessage("Gaaaa");
// setSnackColor("danger");
// handleClick(SlideTransition);

{/* <SnackBar open={state.open} handleClose ={handleClose} message={snackMessage} transition={state.Transition}/> */}

// const handleClick = (Transition) => {
//     setState({
//         open: true,
//         Transition,
//       });
//   };

//   const handleClose = (event, reason) => {
//     setState({
//         ...state,
//         open: false,
//     });
//   };