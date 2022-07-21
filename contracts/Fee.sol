// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { Ownable } from  "@openzeppelin/contracts/access/Ownable.sol";
contract Fee is Ownable   {

   using SafeMath for uint256;
    
    uint public fee = 10;
    uint constant public feeFactor = uint256(10000); 
    function _calculateFee(uint _amount) internal view returns(uint256 _depositAmount , uint256 _fee){
       // calculate fee
      _fee = _amount.mul(fee);
       _fee = _fee.div(feeFactor);
       // calculate final deposit amoint
       _depositAmount = _amount.sub(_fee);

    }

    function updateFee(uint256 _fee) external onlyOwner {
          fee = _fee;
    }
       
}