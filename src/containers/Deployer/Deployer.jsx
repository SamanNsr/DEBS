import React, { useContext, useState } from 'react';
import { Button } from '../../components';
import { AccountContext } from '../../context/AccountContext';
import { PulseLoader } from 'react-spinners';

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
};

const Deployer = () => {
  const { currentAccount, factoryContract, storageContractExist, setStorageContractExist } =
    useContext(AccountContext);
  const [loading, setLoading] = useState(false);

  const deployContract = async (e) => {
    e.preventDefault();
    if (!currentAccount || storageContractExist) {
      return;
    }
    try {
      setLoading(true);
      await factoryContract.deployStorage();
      setLoading(false);
      setStorageContractExist(true);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  return (
    <>
      {currentAccount && !storageContractExist && (
        <div className={style.wrapper}>
          <div className={style.content}>
            <p className="font-medium text-gray-400">
              You are joining Debs for the first time; To start, please click the button below
              to deploy your contract.
            </p>
            <Button onClick={deployContract}>
              {!loading ? 'Deploy My Contract' : <PulseLoader color="white" />}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Deployer;
