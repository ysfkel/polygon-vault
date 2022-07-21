

const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' });
import { ethers } from 'ethers';
import { BytesLike  } from "@ethersproject/bytes";
const { Wallet, providers: { JsonRpcProvider} } = ethers;

export const goerli_rpc = process.env.RPC_GOERLI
export const rinkeby_rpc = process.env.RPC_RINKEY
export const matic_rpc = process.env.RPC_MATIC
export const ganache_rpc = process.env.RPC_GANACHE

export const goerli_provider = new JsonRpcProvider(process.env.RPC_GOERLI)
export const rinkeby_provider = new JsonRpcProvider(process.env.RPC_RINKEY)
export const matic_provider = new JsonRpcProvider(process.env.RPC_MATIC)
export const ganache_provider = new JsonRpcProvider(process.env.RPC_GANACHE)

export const goerli_wallet = new Wallet(process.env.USER_PRIVATE_KEY as BytesLike, goerli_provider)
export const rinkeby_wallet = new Wallet(process.env.USER_PRIVATE_KEY as BytesLike, rinkeby_provider)
export const matic_wallet = new Wallet(process.env.USER_PRIVATE_KEY as BytesLike, matic_provider)
export const ganache_wallet = new Wallet(process.env.USER_PRIVATE_KEY as BytesLike, ganache_provider)

