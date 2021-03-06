import { Routes, Route } from 'react-router-dom';

import { Header, UploadModal, ManageTable, Deployer } from './containers';
import { AccountProvider } from './context/AccountContext';

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#171f24] text-white select-none flex flex-col `,
};

function App() {
  return (
    <AccountProvider>
      <div className={style.wrapper}>
        <Header />
        <Deployer />
        <Routes>
          <Route path="/" element={<UploadModal />} />
          <Route path="/manage" element={<ManageTable />} />
        </Routes>
      </div>
    </AccountProvider>
  );
}

export default App;
