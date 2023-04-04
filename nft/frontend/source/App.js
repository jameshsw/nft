import React, { useState } from 'react';
import { Button, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import useMinter from './hooks/useMinter';
import { Image } from '@material-ui/icons';
import ConnectWalletDialog from './components/ConnectWalletDialog';
import MintDetailsDialog from './components/MintDetailsDialog';
import TokenCard from './components/TokenCard';
import contractFile from './utils/compiled-contract.json';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    backgroundColor: theme.palette.background.default,
    display: 'grid',
    position: 'fixed',
    inset: 0,
    gridTemplateRows: '80px 1fr',
  },
  heading: {
    marginRight: 'auto',
  },
  header: {
    gridArea: '1 / 1 / 2 / 2',
    display: 'flex',
    gap: theme.spacing(2),
    padding: theme.spacing(0,2),
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    gridArea: '2 / 1 / 3 / 2',
    overflowY: 'auto',
    padding: theme.spacing(2),
  },
}));

const Contact = {
  address : '0x1a8015F314Ab517a5D43aA429b8910D4EF3e2f00',
  abi: contractFile.abi,
}

const App = () => {
  const classes = useStyles();
  const [mintForm, setMintForm] = useState(false);
  const [
    account, 
    connectToWallet, 
    minting,
    mintedTokens,
    mintNewToken
  ] = useMinter(Contact.address, Contact.abi);
  
  const handleMint = (name, desc, image, attribs) => {
    setMintForm(false);
    mintNewToken(name, desc, image, attribs);
  }

  return (
    <div className={classes.mainGrid}>
      <div className={classes.header}>
        <img src="fairkraft.jpeg" alt="FairCraft" width="100"></img>
        <Button color="primary" variant="contained" size="large" onClick={() => setMintForm(true)} disabled={minting}>
          Mint NFT
        </Button>
      </div>
      <div className={classes.content}>
        {minting ? <LinearProgress/> : null}
        <Grid container spacing={2} >
          {mintedTokens.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.url} lg={3}>
              <TokenCard tokenInfo={item}/>
            </Grid>
          ))}
        </Grid>
      </div>
      <ConnectWalletDialog open={!account} onConnect={connectToWallet} />
      <MintDetailsDialog open={mintForm} onMint={handleMint} onClose={() => setMintForm(false)} />
    </div>
  )
}

export default App;
