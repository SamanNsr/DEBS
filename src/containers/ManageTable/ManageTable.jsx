import React, { useContext, useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import Table, { AvatarCell } from '../../components/Table/Table';
import { AccountContext } from '../../context/AccountContext';
import { formatters } from '../../utils';

const ManageTable = () => {
  const { currentAccount, storageContract, storageContractExist } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!storageContractExist || !currentAccount) {
          return [];
        }
        setLoading(true);
        const data = await storageContract.getFiles();
        const filteredData = data.map((file) => {
          const { fileName, fileDescription, fileHash, fileSize, fileType, uploadTime } = file;
          console.log(fileSize.toString());
          return {
            fileName: formatters.getEllipsisTxt(fileName, 7),
            fileDescription,
            uploadTime: formatters.convertTime(uploadTime),
            fileType,
            fileExtension: formatters.getFileExtension(fileName),
            fileSize: formatters.convertBytes(fileSize.toNumber()),
            download: 'https://ipfs.infura.io/ipfs/' + fileHash,
          };
        });
        setLoading(false);
        return setFiles(filteredData);
      } catch (error) {
        console.error(error);
        setLoading(false);
        alert('Error getting files');
      }
    };
    getData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'File Name',
        accessor: 'fileName',
        Cell: AvatarCell,
        fileExtension: 'fileExtension',
        downloadAccessor: 'download',
      },
      {
        Header: 'Description',
        accessor: 'fileDescription',
      },
      {
        Header: 'File Size',
        accessor: 'fileSize',
      },
      {
        Header: 'Upload Time',
        accessor: 'uploadTime',
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen text-gray-900 bg-[#171f24]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl text-gray-600 font-semibold">Manage your files</h1>
        </div>
        <div className="mt-6">
          {!loading ? <Table columns={columns} data={files} /> : <PulseLoader color="white" />}
        </div>
      </div>
    </div>
  );
};

export default ManageTable;
