require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "https://snowy-special-slug.matic-testnet.discover.quiknode.pro/749b924519c9c6680a8abcc381ab5296a73ae286/",
      accounts: [""],
    }
  }
};
