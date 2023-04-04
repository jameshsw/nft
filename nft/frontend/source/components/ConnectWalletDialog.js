import { Button, makeStyles, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import React from 'react'

const useStyles = makeStyles(theme => ({ 
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const ConnectWalletDialog = ({ open, onConnect }) => {
  const classes = useStyles();
  return (
    <Dialog fullWidth maxWidth="xs" open={open} PaperProps={{ className: classes.root }}>
      <Typography variant="h4">Connect Wallet</Typography>
      <Typography >Please make sure you have a crypto wallet such as metamask installed and press continue</Typography>
      <Button variant="contained" color="primary" onClick={onConnect}>
        Connect Wallet
      </Button>
    </Dialog>
  )
}

export default ConnectWalletDialog;