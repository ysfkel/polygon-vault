import { ContractFactory } from '@ethersproject/contracts'
const _hre = require("hardhat");
// l1: router, tokenfactory, depositedToken
// l2: masterchef, rewardtoken, gateway 
 
const _deployContract = async (params: Array<any>=[], abi: any, bytecode: any, wallet: any)  => {
    const factory = new ContractFactory(abi, bytecode, wallet)
   const _deployedContract = await factory.deploy(...params)
 
    await _deployedContract.deployTransaction.wait() 
    return _deployedContract
}


export const deployGreeter = async (name: string, abi: any, bytecode: any, wallet: any)  => {
        return _deployContract([name],abi, bytecode, wallet)
}

export const deployRewardToken= async (name: string, symbol: string, initialSupply: string, abi: any, bytecode: any, wallet: any)  => {
    return _deployContract([name, symbol, initialSupply],abi, bytecode, wallet)
}


export const deployTokenTransfer= async (erc20Token: string, erc20Predicate: string, rootChainManager: string,   abi: any, bytecode: any, wallet: any)  => {
    return _deployContract([erc20Token, erc20Predicate, rootChainManager],abi, bytecode, wallet)
}

 