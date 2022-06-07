import StorgeFactoryABI from '../abis/StorageFactory.json';
import StorgeABI from '../abis/Storage.json';

const storageFactoryABI = StorgeFactoryABI.abi;
const storageFactoryAddress = '0x4FE071b01A4cafe93F6dD85918B5ebB073269a77';

const storageABI = StorgeABI.abi;

const data = { storageFactoryABI, storageFactoryAddress, storageABI };

export default data;
