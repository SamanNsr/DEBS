import StorgeFactoryABI from '../abis/StorageFactory.json';
import StorgeABI from '../abis/Storage.json';

const storageFactoryABI = StorgeFactoryABI.abi;
const storageFactoryAddress = process.env.REACT_APP_STORAGE_FACTORY_ADDRESS;

const storageABI = StorgeABI.abi;

const data = { storageFactoryABI, storageFactoryAddress, storageABI };

export default data;
