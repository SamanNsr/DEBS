// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract Storage is Initializable, OwnableUpgradeable {
  string public name = 'Storage';
  uint private fileCount = 0;
  mapping(uint => File) private files;

  struct File {
    string fileHash;
    uint fileSize;
    string fileType;
    string fileName;
    string fileDescription;
    uint uploadTime;
  }

  event FileUploaded(
    string fileHash,
    uint fileSize,
    string fileType,
    string fileName, 
    string fileDescription,
    uint uploadTime
  );
  event FileDeleted(
    uint fileId
  );

  function initialize(address _owner) public initializer {
      __Ownable_init();
      transferOwnership(_owner);
  }

  function uploadFile(string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public onlyOwner  {
    // Make sure the file hash exists
    require(bytes(_fileHash).length > 0);
    // Make sure file type exists
    require(bytes(_fileType).length > 0);
    // Make sure file description exists
    require(bytes(_fileDescription).length > 0);
    // Make sure file fileName exists
    require(bytes(_fileName).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));
    // Make sure file size is more than 0
    require(_fileSize>0);

    // Add File to the contract
    files[fileCount] = File(_fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp);
    
    // Increment file id
    fileCount ++;

    // Trigger an event
    emit FileUploaded(_fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp);
  }

  function getFiles() public view onlyOwner returns (File[] memory) {
    File[] memory result = new File[](fileCount);
    for (uint i = 0; i < fileCount; i++) {
      result[i] = files[i];
    }
    return result;
  }

  function deleteFile(uint _fileId) public onlyOwner  {
    // Make sure file id exists
    require(_fileId > 0);
    // Make sure file id is less than fileCount
    require(_fileId < fileCount);

    // Delete file
    delete(files[_fileId]);

    // Decrement file count
    fileCount--;

    // Trigger an event
    emit FileDeleted(_fileId);
  } 
}