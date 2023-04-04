import { Button, FormControl, InputAdornment, makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField';
import React from 'react'
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  split: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
  row: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  noShrink: {
    flexShrink: 0,
  },
  grow: {
    flexGrow: 1,
  },
  preview: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
  }
}));

const MintDetailsDialog = ({ open, onMint, onClose }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [nfcId, setNFCId] = useState('');
  const [reviewURL, setReviewURL] = useState('');
  const [image, setImage] = useState('');
  const [key, setKey] = useState('');
  const [val, setVal] = useState('');
  const [attribs, setAttribs] = useState([]);
  const [show, setShow] = useState(false);
  const handleMint = () => {
    if (name && desc && image && nfcId && reviewURL) {
      let newAttribs = attribs.slice();
      newAttribs.push({ trait_type: 'nfc', value: nfcId });
      newAttribs.push({ trait_type: 'review', value: reviewURL });
      onMint(name, desc, image, JSON.stringify(newAttribs));
    }
  }
  const handleAdd = () => {
    if (attribs.length === 8) return;
    if (key && val) {
      let newAttribs = attribs.slice();
      newAttribs.push({ trait_type: key, value: val });
      setAttribs(newAttribs);
      setKey('');
      setVal('');
    }
  }
  const classes = useStyles();
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} PaperProps={{ className: classes.root }}>
      <Typography variant="h4">NFT Details</Typography>
      <div className={classes.split}>
        <div className={classes.column}>
          <Typography variant="h6">Primary Attributes</Typography>
          <TextField size="small" variant="outlined" value={name} onChange={e => setName(e.target.value)} label="Name" fullWidth />
          <TextField size="small" variant="outlined" value={desc} onChange={e => setDesc(e.target.value)} label="Description" fullWidth />
          <TextField size="small" variant="outlined" value={nfcId} onChange={e => setNFCId(e.target.value)} label="NFC Id" fullWidth />
          <TextField size="small" variant="outlined" value={reviewURL} onChange={e => setReviewURL(e.target.value)} label="Review URL" fullWidth />
          <TextField
            size="small"
            variant="outlined"
            value={image}
            onChange={e => { setImage(e.target.value); setShow(true) }}
            label="Attachment (IPFS hash)"
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">ipfs://</InputAdornment>,
            }}
          />
          <img onError={() => setShow(false)} src={`https://gateway.pinata.cloud/ipfs/${image}`} className={classes.preview} style={{ opacity: show ? 1 : 0 }} alt="asset preview" />
        </div>
        <div className={classes.column}>
          <Typography variant="h6">Physical Attributes</Typography>
          <div className={classes.row}>
            {/* <FormControl variant="outlined" size="small" color="primary" className={classes.noShrink}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={e => setType(e.target.value)}
              >
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="string">String</MenuItem>
              </Select>
            </FormControl> */}
            <TextField value={key} onChange={e => setKey(e.target.value)} className={classes.grow} size="small" variant="outlined" color='primary' label="Key" />
            <TextField value={val} onChange={e => setVal(e.target.value)} className={classes.grow} size="small" variant="outlined" color='primary' label="Value" />
            <Button onClick={handleAdd} variant="contained" size="small">Add</Button>
          </div>
          <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attribs.map((row) => (
                  <TableRow key={row.trait_type}>
                    <TableCell>{row.trait_type}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Button variant="contained" color="primary" onClick={handleMint}>
        Mint NFT
      </Button>
    </Dialog>
  )
}

export default MintDetailsDialog;