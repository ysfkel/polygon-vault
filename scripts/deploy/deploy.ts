const TokenTransfer = require('../../artifacts/contracts/TokenTransfer.sol/TokenTransfer.json')

import {wallet} from './common/wallet';
import {  deployTokenTransfer } from './deployments';

const dotenv = require('dotenv')
const hre = require("hardhat");
dotenv.config({ path: __dirname + '/../.env' });
 
const deploy = async () => {

const [deployer, user] = await hre.ethers.getSigners()
const devAddress = await deployer.getAddress()
const userAddress = await user.getAddress()

const _erc20Token =  '0xcF76fd262F9105a69A2AFe66aE11fc6930A267e7'
// MAPPED TOKEN MATIC 0x2f1ee78581F920668BDF63dc0670bF08e15aD021
const _mintableErc20PredicateProxy = '0x37c3bfC05d5ebF9EBb3FF80ce0bd0133Bf221BC8'
const _rootChainManagerProxy = '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74'
const _tokenTransfer = await deployTokenTransfer(_erc20Token, _mintableErc20PredicateProxy, _rootChainManagerProxy, TokenTransfer.abi, TokenTransfer.bytecode, wallet)

console.log('_tokenTransfer address ', _tokenTransfer.address)

    const newDeployments = {
 
    }
   return newDeployments
}
  
const runTasks = async () => {
   await deploy()
}

runTasks()
 

