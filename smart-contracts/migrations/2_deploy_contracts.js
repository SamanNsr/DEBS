const StorageFactory = artifacts.require('StorageFactory');

module.exports = function (deployer) {
  deployer.deploy(StorageFactory);
};
