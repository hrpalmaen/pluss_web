import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export const Aler = (open) => {
    // const [opens, setOpen] = React.useState(false);
    let show = false;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        open = false
    }

    return (
        <div>
            <Snackbar
                open={open.open}
                anchorOrigin= {{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={4000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
            >
                <Alert onClose={handleClose} severity="success">aaaaaaaaayyyyyyyyyyyaaaaaaaaaa</Alert>
            </Snackbar>
        
        </div>
    )
}

