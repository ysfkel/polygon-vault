import { task, HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
require('dotenv').config()
import './tasks'


const accounts = [
  {
    privateKey:'0x754fde3f5e60ef2c7649061e06957c29017fe21032a8017132c0078e37f6193a',
    balance: '1000000000000000000000000'
  },{
    privateKey:'0xd2ab07f7c10ac88d5f86f1b4c1035d5195e81f27dbe62ad65e59cbf88205629b',
    balance: '1000000000000000000000000'
  },{
    privateKey:'0xd2cb07f7c10ac88d5f86f1b4c1035d5195e81f27dbe62ad65e59cbf88205629b',
    balance: '1000000000000000000000000'
  }
]
 
module.exports = {
  solidity: "0.8.1",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      // Default to 1
      default: 1,
      // dev address mainnet
      // 1: "",
    },
  }, //
  networks: {
    hardhat:{
      forking: {
        // This Infura API key is obtained publicly from Ethers.js.
        url:'https://rpc-mumbai.maticvigil.com/'
      },
       accounts:accounts
    },
    rinkeby:{
      url:'https://rinkeby.infura.io/v3/39e1dcc4bfe34d828da9887e03192eda',
      accounts:[
        '0x754fde3f5e60ef2c7649061e06957c29017fe21032a8017132c0078e37f6193a',
        '0xd2ab07f7c10ac88d5f86f1b4c1035d5195e81f27dbe62ad65e59cbf88205629b'
      ]
    },
    goerli:{
      url:'https://goerli.infura.io/v3/39e1dcc4bfe34d828da9887e03192eda',
      accounts:[
        '0x754fde3f5e60ef2c7649061e06957c29017fe21032a8017132c0078e37f6193a',
        '0xd2ab07f7c10ac88d5f86f1b4c1035d5195e81f27dbe62ad65e59cbf88205629b'
      ]
    },
    matic: {
      url: 'https://rpc-mumbai.maticvigil.com/',
      accounts: [
        '0x754fde3f5e60ef2c7649061e06957c29017fe21032a8017132c0078e37f6193a',
        '0xd2ab07f7c10ac88d5f86f1b4c1035d5195e81f27dbe62ad65e59cbf88205629b'
      ]
    },ganache: {
      url: 'https://127.0.0.1:7545',
      accounts: [
        '0x754fde3f5e60ef2c7649061e06957c29017fe21032a8017132c0078e37f6193a',
        '0xd2ab07f7c10ac88d5f86f1b4c1035d5195e81f27dbe62ad65e59cbf88205629b'
      ]
    }
    //npx ganache-cli --account '0x754fde3f5e60ef2c7649061e06957c29017fe21032a8017132c0078e37f6193a, 1000000000000000000000' -f https://rpc-mumbai.maticvigil.com/ -i 1
  }
};

