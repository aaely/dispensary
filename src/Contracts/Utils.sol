// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

library Utils {
    
        function compareStrings(string memory _a, string memory _b) public pure returns (bool) {
        
            return (keccak256(abi.encodePacked((_a))) == keccak256(abi.encodePacked((_b))));
            
    }

}