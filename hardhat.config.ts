import { task, HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
require('dotenv').config()
import './tasks'

 
module.exports = {
  solidity: "0.8.1",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  }, //
  networks: {
    hardhat:{
      forking: {
        // This Infura API key is obtained publicly from Ethers.js.
        url:'https://rpc-mumbai.maticvigil.com/'
      },
    },
    matic: {
      url: 'https://rpc-mumbai.maticvigil.com/',
    },

  }
};

