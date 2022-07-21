

const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' });
import { ethers } from 'ethers';
import { BytesLike  } from "@ethersproject/bytes";

const { Wallet, providers: { JsonRpcProvider} } = ethers;

const getWallet = () => {
    let rpc:string|undefined

    switch(process.env.CHAIN){
        case 'matic': 
        rpc=process.env.RPC_MATIC
        break
        case 'goerli': 
        rpc=process.env.RPC_GOERLI
        break
        case 'rinkeby': 
        rpc=process.env.RPC_RINKEY
        break
        case 'ganache': 
        rpc=process.env.RPC_GANACHE
        break
    }

    if(!rpc) {
        throw 'rpc undefined'
    }

    console.log(`..using rpc ${rpc} `)

    const _provider = new JsonRpcProvider(rpc)
    const _wallet = new Wallet(process.env.USER_PRIVATE_KEY as BytesLike, _provider)
    
     return _wallet
}


export const wallet =  getWallet()

