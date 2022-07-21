// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// CRYPToken with Governance.
contract MockToken is ERC20, Ownable{
    
    using SafeMath for uint;

     constructor(string memory _name,string memory _symbol,uint256 _initialSupply) 
       ERC20(_name, _symbol)  {  
          _mint(msg.sender, _initialSupply);
    }
    /// @notice Creates `_amount` token to `_to`. Must only be called by the owner (MasterChef).
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }
 
}