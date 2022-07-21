 const IMintableChildToken = require("../artifacts/contracts/interfaces/polygon/IMintableChildToken.sol/IMintableChildToken.json")
import { task } from 'hardhat/config'
import { goerli_wallet, matic_wallet, goerli_rpc, matic_rpc } from '../scripts/deploy/common/providers'
import { MaticPOSClient } from '@maticnetwork/maticjs'

 task('deposit').setAction(async ({amount, token, account, ethPolygon}, {  ethers }) => {
    const _erc20 = await ethers.getContractFactory('MockToken', goerli_wallet )
    const EthPolygonContract = await ethers.getContractFactory('MockRootChainManager', goerli_wallet )
    let _token: string=''
    let _account: string=''
    let _ethPolygon: string=''

    if(!token) {
        _token = '0xcF76fd262F9105a69A2AFe66aE11fc6930A267e7'
    }
    if(!ethPolygon) {
        _ethPolygon = '0x50996B9b9d354aB9DCa1E9efC7a0d211BA0E3f14'
    }
    if(!account) {
        _account = await goerli_wallet.getAddress()
    }
    const __token =  _erc20.attach(_token)
    let res = await __token.approve(_ethPolygon, amount, {from:_account, gasPrice:800000,gasLimit: 800000})
    console.log('approve hash ', res)
    //initialize 
    const _ethPolygonContract = EthPolygonContract.attach(_ethPolygon)
    res = await _ethPolygonContract.deposit(amount, {from:_account, gasPrice:800000,gasLimit: 800000})
    console.log('deposit hash ', res.hash)
})
.addParam('amount', 'Withdraw amount')
.addOptionalParam('token', 'L1 token address')
.addOptionalParam('account', 'Account')
.addOptionalParam('ethPolygon', 'Vault contract')

task('withdraw').setAction(async ({amount, token}, {  ethers }) => {
    let _token: string=''
    let _account: string=''
    if(!token) {
        _token = '0x2f1ee78581F920668BDF63dc0670bF08e15aD021'
    }
    const _erc20 = new ethers.Contract(_token, IMintableChildToken.abi, matic_wallet) 
    const connectedToken=   _erc20.connect(matic_wallet)
    let res = await connectedToken.withdraw( amount, {from:_account, gasPrice:800000,gasLimit: 800000})
    console.log('withdraw hash ', res.hash)
})
.addParam('amount', 'Withdraw amount')
.addOptionalParam('token', 'L2 token address')

task('exit').setAction(async ({burnTxHash, account, ethPolygon}, {  ethers }) => {
    // 0x7a8a3f50bc067d6da2fe420c639647e6b62036b39ac9ef89ec18b38f7f86a910
    //0x528eb8bef9f5234a830acd3f97ed2a6eabb8ee3e78cc2ca32002e3960695c75d
    let _account: string=''
    let _ethPolygon: string=''
    if(!ethPolygon) {
        _ethPolygon = '0x50996B9b9d354aB9DCa1E9efC7a0d211BA0E3f14'
    }
    if(!account) {
        _account = await goerli_wallet.getAddress()
    }
    const maticPOSClient = new MaticPOSClient({
        network: "testnet",
        version: "mumbai",
        parentProvider: goerli_rpc,
        maticProvider: matic_rpc
    });
    const exitCalldata = await maticPOSClient.exitERC20(burnTxHash, { from: _account, encodeAbi: true  });
    const EthPolygonContract = await ethers.getContractFactory('MockRootChainManager', goerli_wallet )
    const _ethPolygonContract = EthPolygonContract.attach(_ethPolygon)
    const res = await _ethPolygonContract.exit(exitCalldata.data)

    console.log('exit hash ',res.hash)
})
.addParam('burnTxHash','L2 withdraw txhash')
.addOptionalParam('account', 'Account')
.addOptionalParam('ethPolygon', 'Address of vault contract')

task('l1-balance').setAction(async ({token, account}, {  ethers }) => {

    const _erc20 = await ethers.getContractFactory('MockToken',goerli_wallet )

    let _token = '0xcF76fd262F9105a69A2AFe66aE11fc6930A267e7'

    if(token) {
        _token = token
    }

    let _account

    if(!account) {
        _account = await goerli_wallet.getAddress()
    }

    const __token = _erc20.attach(_token)

    const balance = await  __token.balanceOf(_account)

    console.log('Balance ',balance.toString())
 
})
.addOptionalParam('token', 'Token')
.addOptionalParam('account', 'Account')
task('l2-balance').setAction(async ({token, account}, {  ethers }) => {
    const _erc20 = await ethers.getContractFactory('MockToken',matic_wallet )
    let _token = ''
    let _account=''
    if(!token) {
        _token = '0x2f1ee78581F920668BDF63dc0670bF08e15aD021'
    }
    if(!account) {
        _account = await goerli_wallet.getAddress()
    }
    const __token = _erc20.attach(_token)
    const balance = await  __token.balanceOf(_account)
    console.log('Balance ',balance.toString())
})
.addOptionalParam('token', 'L2 token address')
.addOptionalParam('account', 'Account')
