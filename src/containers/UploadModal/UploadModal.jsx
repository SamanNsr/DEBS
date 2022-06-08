import React, { useState, useContext } from 'react';
import { Buffer } from 'buffer';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import ipfsClient from 'ipfs-http-client';
import Button from '../../components/Button/Button';
import { AccountContext } from '../../context/AccountContext';
import { formatters } from '../../utils';
import { PulseLoader } from 'react-spinners';

// leaving out the arguments will default to these values
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-center font-semibold text-xl`,
  container: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
};

const UploadModal = () => {
  const { currentAccount, storageContract, storageContractExist } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({
    type: null,
    name: null,
    buffer: null,
    description: null,
  });

  // Get file from user
  const captureFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFile({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name,
      });
      console.log('buffer', file.buffer);
    };
  };

  const uploadFile = async () => {
    if (!currentAccount) {
      alert('Please connect your wallet');
      return;
    }
    if (!storageContractExist) {
      alert('Storage contract not deployed to detected network');
      return;
    }
    console.log('Submitting file to IPFS...');
    // Add file to the IPFS
    try {
      setLoading(true);
      const result = await ipfs.add(file.buffer);
      console.log(result);
      console.log('IPFS result', result.size);

      if (!file.type) {
        // Assign value for the file without extension
        setFile((prevFile) => ({
          ...prevFile,
          type: 'none',
        }));
      }

      await storageContract.uploadFile(
        result.path,
        result.size,
        file.type,
        file.name,
        file.description,
      );

      setLoading(false);
      setFile({
        type: null,
        name: null,
        buffer: null,
        description: null,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      window.alert('Error');
      return;
    }
  };

  const deleteFileHandler = async (event) => {
    event.preventDefault();

    setFile({
      type: null,
      name: null,
      buffer: null,
    });
  };

  const fileContainer = () => {
    if (!file.buffer) {
      return (
        <label className="flex justify-center w-full h-32 px-4 transition bg-[#2D2F36] border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span className="flex items-center space-x-2">
            <AiOutlineCloudUpload className="text-gray-600" />
            <span className="font-medium text-gray-600">
              Drop a file to Attach, or
              <span> </span>
              <span className="text-[#2172E5] underline">browse</span>
            </span>
          </span>
          <input type="file" onChange={captureFile} name="file_upload" className="hidden" />
        </label>
      );
    }
    return (
      <div className="flex justify-center w-full h-32 px-4 transition bg-[#2D2F36] border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none">
        <span className="flex items-center pr-4 space-x-2">
          {formatters.getEllipsisTxt(file.name, 6)}
        </span>
        <span className="flex items-center font-medium text-gray-600 cursor-pointer">
          <FaTrash onClick={deleteFileHandler} />
        </span>
      </div>
    );
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div>Drop your file</div>
        </div>
        <div className={style.container}>{fileContainer()}</div>
        <div className={style.container}>
          <br></br>
          <input
            type="text"
            className="flex items-center justify-center w-full h-10 px-4 text-gray-400 placeholder-gray-600 text-base transition bg-[#2D2F36] border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none"
            placeholder="description..."
            onChange={(event) =>
              setFile((prevState) => ({ ...prevState, description: event.target.value }))
            }
          />
        </div>
        <Button onClick={uploadFile}>
          {!loading ? 'Upload' : <PulseLoader color="white" />}
        </Button>
      </div>
    </div>
  );
};

export default UploadModal;
