import React, { useState, useEffect, useContext } from 'react';
import { RiSettings3Fill } from 'react-icons/ri';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Modal from 'react-modal';

import Button from '../../components/Button/Button';

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-center font-semibold text-xl`,
  container: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
};

const UploadModal = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div>Drop your file</div>
        </div>
        <div className={style.container}>
          <label className="flex justify-center w-full h-32 px-4 transition bg-[#2D2F36] border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <AiOutlineCloudUpload className="text-gray-600" />
              <span className="font-medium text-gray-600">
                Drop a file to Attach, or
                <span> </span>
                <span className="text-[#2172E5] underline">browse</span>
              </span>
            </span>
            <input type="file" name="file_upload" className="hidden" />
          </label>
        </div>
        <Button>Upload</Button>
      </div>

      {/* <Modal isOpen={!!router.query.loading} style={customStyles}>
        <TransactionLoader />
      </Modal> */}
    </div>
  );
};

export default UploadModal;
