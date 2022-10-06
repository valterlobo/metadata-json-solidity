require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const { WALLET_PRIVATE_KEY } = process.env;
const { POLYGONSCAN_API_KEY } = process.env;
const { INFURA_URL } = process.env;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  gasReporter: {
    currency: 'USD',
    gasPrice: 21
  },
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: INFURA_URL,
      accounts: [`0x${WALLET_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};
