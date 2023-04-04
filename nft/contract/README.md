# Discussion forum contract

### Step#1
Clone the repo.
Run ``` 
npm i ``` on the root directory.
### Step#2
Download Metamask extenssion: https://metamask.io/.
### Step#3
Setup the new wallet if the there is no wallet exist before.

### Step#4
Setup test network mumbai in your wallet. Follow the following steps

1) Give permission to your wallet to show test networks.
2) Open extension there is a dropdown in a header select add network then it will ask about the following field:

a. Network Name: Mumbai Testnet
b. New RPC URL: https://rpc-mumbai.maticvigil.com/
c. Chain ID: 80001
d. Currency Symbol: MATIC
e. Block Explorer URL: https://polygonscan.com/

### Step#5
Once you have succesfully added mumbai test network then you must have to request some test metic token through -> https://faucet.polygon.technology/ just simply select network mumbai, add your public wallet address and submitted. Check your wallet after 30 to 40 seconds it will reflect some amount in your wallet.

### Step#6
Go to your metamask extension again and get your private wallet key by clicking three dots menu button in wallet select account details from the menu and click on the export private key once you confirm the password it will return your's private key just copied it for now.

### Step#7
Go to the repo open the file hardhat.config.
Paste the copied private key into accounts array. 

### Step#8
Run the command ```
npx hardhat run scripts/deploy.js --network mumbai``` on the root directory.

Once your command is succesfully run it will print a log on your terminal for example:
"Contract deployed to: 0x8D07d7e63BDe74Df31Cead16c601a1C4E5De20f6"
