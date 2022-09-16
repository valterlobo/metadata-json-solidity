require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  gasReporter: {
    currency: 'USD',
    gasPrice: 21
  },
  solidity: "0.8.9",
};
