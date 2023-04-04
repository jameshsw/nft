import { Button, makeStyles, Paper } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const TokenCard = ({ tokenInfo = {} }) => {
  const classes = useStyles();
  const { name , desc, image, url } = tokenInfo;
  const gotoUrl = () => {
    window.open(url, '_blank');
  }
  return (
    <Paper variant="outlined" className={classes.root}>
      <img src={image} width="100%" />
      <b>{name}</b>
      <span>{desc}</span>
      <Button onClick={gotoUrl} size="small" color="primary" variant="outlined">
        View on Opensea
      </Button>
    </Paper>
  )
}

export default TokenCard;