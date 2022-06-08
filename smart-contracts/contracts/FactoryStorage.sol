// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Create2.sol';
import './Storage.sol';

contract StorageFactory {
    event StorageCreated(address vault);

    function deployStorage() public {
        bytes32 salt = calculateAddressHash(msg.sender);
        address storageAddress;

        storageAddress = Create2.deploy(0, salt, type(Storage).creationCode);
        Storage(storageAddress).initialize(msg.sender);
        
        emit StorageCreated(storageAddress);
    }

    function computeAddress() public view returns (address) {
        bytes32 salt = calculateAddressHash(msg.sender);
        bytes32 bytecodeHashHash = keccak256(type(Storage).creationCode);
        return Create2.computeAddress(salt, bytecodeHashHash);
    }

  /**
   * A test method exposed to be called from clients to compare that ABI packing and hashing
   * is same across different programming languages.
   *
   * Does ABI encoding for an address and then calculates KECCAK-256 hash over the bytes.
   *
   */
  function calculateAddressHash(address a) public pure returns (bytes32 hash) {
    // First we ABI encode the address to bytes.
    // This is so called "tight packing"
    bytes memory packed = abi.encodePacked(a);

    // Then we calculate keccak256 over the resulting bytes
    bytes32 hashResult = keccak256(packed);

    return(hashResult);
  }

} 