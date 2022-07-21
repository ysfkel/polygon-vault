import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from 'chai';

describe("EthereumPolygonTransfer", function() {
    before('EthereumPolygonTransfer', async function (){
      const signers = await ethers.getSigners()
      this.deployer = signers[0]
      this.treasury = signers[1]
      this.feeAddress = await this.treasury.getAddress()
      
      this.EthereumPolygonTransfer = await ethers.getContractFactory("EthereumPolygonTransfer");
      this.MockRootChainManager = await ethers.getContractFactory("MockRootChainManager");
      this.MockERC20Predicate = await ethers.getContractFactory("MockERC20Predicate");
      this.MockToken = await ethers.getContractFactory("MockToken");
    })

    beforeEach(async function () {
      this.erc20Token = await this.MockToken.deploy('RWT','RWT', '8000000000000000000')
      await this.erc20Token.deployed()
      this.erc20Predicate = await this.MockERC20Predicate.deploy()
      await this.erc20Predicate.deployed()
      this.rootChainManager = await cthis.MockRootChainManager.deploy(this.erc20Predicate.address)
      await this.rootChainManager.deployed()
      this.ethPolygon = await this.EthereumPolygonTransfer.deploy(this.erc20Token.address, this.erc20Predicate.address, this.rootChainManager.address, this.feeAddress )
      await this.ethPolygon.deployed()
    }) 

    it("should set arguments correctly", async function () {
       expect(await this.ethPolygon.erc20Token()).to.equal(this.erc20Token.address)
       expect(await this.ethPolygon.erc20Predicate()).to.equal(this.erc20Predicate.address)
       expect(await this.ethPolygon.rootChainManager()).to.equal(this.rootChainManager.address)
    })

    it("[setERC20Predicate] should revert with ERROR_ZERO_ADDRESS", async function () {
      await expect(this.ethPolygon.setERC20Predicate('0x0000000000000000000000000000000000000000')).to.be.revertedWith('ERROR_ZERO_ADDRESS')
    })

    it("[setERC20Token] should revert with ERROR_ZERO_ADDRESS", async function () {
      await expect(this.ethPolygon.setERC20Token('0x0000000000000000000000000000000000000000')).to.be.revertedWith('ERROR_ZERO_ADDRESS')
    })

    it("[setRootChainManager] should revert with ERROR_ZERO_ADDRESS", async function () {
      await expect(this.ethPolygon.setRootChainManager('0x0000000000000000000000000000000000000000')).to.be.revertedWith('ERROR_ZERO_ADDRESS')
    })
    // test ownable
    it("[setERC20Predicate] should revert with 'revert Ownable: caller is not the owner'", async function () {
      await expect(this.ethPolygon.connect(this.treasury).setERC20Predicate('0x0000000000000000000000000000000000000000')).to.be.revertedWith('revert Ownable: caller is not the owner')
    })
    
    it("[setERC20Token] should revert with 'revert Ownable: caller is not the owner'", async function () {
      await expect(this.ethPolygon.connect(this.treasury).setERC20Token('0x0000000000000000000000000000000000000000')).to.be.revertedWith('revert Ownable: caller is not the owner')
    })

    it("[setRootChainManager] should revert with 'revert Ownable: caller is not the owner'", async function () {
      await expect(this.ethPolygon.connect(this.treasury).setRootChainManager('0x0000000000000000000000000000000000000000')).to.be.revertedWith('revert Ownable: caller is not the owner')
    })

    context("WEthereumPolygonTransfer ", function () {
      beforeEach(async function () {
        this._erc20Token = await this.MockToken.deploy('RWT','RWT', '8000000000000000000')
        await this._erc20Token.deployed()

        this._erc20Predicate = await this.MockERC20Predicate.deploy()
        await this._erc20Predicate.deployed()

        this._rootChainManager = await this.MockRootChainManager.deploy(this._erc20Predicate.address)
        await this._rootChainManager.deployed()

        this._ethPolygon = await this.EthereumPolygonTransfer.deploy(this._erc20Token.address, this._erc20Predicate.address, this._rootChainManager.address, this.feeAddress )
        await this._ethPolygon.deployed()   
      })
      // test update 
      it("[setERC20Predicate] set new erc20Predicate address", async function () {
         await this.ethPolygon.setERC20Predicate(this._erc20Predicate.address)
         expect(await this.ethPolygon.erc20Predicate()).to.equal(this._erc20Predicate.address)
      })
      it("[erc20Token] set new erc20Token address", async function () {
        await this.ethPolygon.setERC20Token(this._erc20Token.address)
        expect(await this.ethPolygon.erc20Token()).to.equal(this._erc20Token.address)
      })
      it("[rootChainManager] set new rootChainManager address", async function () {
        await this.ethPolygon.setRootChainManager(this._rootChainManager.address)
        expect(await this.ethPolygon.rootChainManager()).to.equal(this._rootChainManager.address)
      })

      it("should complete deposit & emit event Deposit", async function() { 
        //calculate percentage deposit
        const addr = await this.deployer.getAddress()
        const x = await this._erc20Token.balanceOf(addr)
        const amount = 10000000
        const fee = (0.1*amount)/100;
        const depositAmount = amount - fee;
    
        await this._erc20Token.approve(this._erc20Predicate.address, amount)
        await this._ethPolygon.deposit(amount);
         expect(await this._erc20Token.balanceOf(this._erc20Predicate.address)).to.equal(depositAmount)
       });
    })
  
});
