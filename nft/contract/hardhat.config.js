require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: '0.8.17',
  networks: {
    mumbai: {
      url: 'https://indulgent-young-fog.matic-testnet.discover.quiknode.pro/b7e93379a21447ebd7d36c6854b52a5a888b1cf8/',
      accounts: ['586944566bf3313edb4bec81d95f17a1b8df1313d252cc35aac6b1d6ae93b0f4'],
    },
  },
};