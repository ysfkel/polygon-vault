pragma solidity ^0.8.0;

import "./MockERC20Predicate.sol";

contract MockRootChainManager {

      address predicateAddress;
      constructor(address _predicateAddress) {
          predicateAddress = _predicateAddress;
      }

       function depositFor(
        address user,
        address rootToken,
        bytes memory depositData
    ) external {
    
        MockERC20Predicate(predicateAddress).lockTokens(
            msg.sender,
            user,
            rootToken,
            depositData
        );

    }
}