import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaWallet } from 'react-icons/fa';

import { images } from '../../constants';
import { AccountContext } from '../../context/AccountContext';
import { formatters } from '../../utils';

const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center items-center`,
  navItemsContainer: `md:flex hidden bg-[#191B1F] rounded-3xl `,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-1`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
};

const Header = () => {
  const { connectWallet, currentAccount } = useContext(AccountContext);

  return (
    <div className={style.wrapper}>
      <div className={style.headerLogo}>
        <img src={images.logo} alt="logo" height={40} width={40} />
      </div>
      <div className={style.nav}>
        <div className={style.navItemsContainer}>
          <NavLink
            to="/"
            className={(navData) =>
              `${style.navItem} ${navData.isActive && style.activeNavItem}`
            }
          >
            Upload
          </NavLink>
          <NavLink
            to="/manage"
            className={(navData) =>
              `${style.navItem} ${navData.isActive && style.activeNavItem}`
            }
          >
            Manage
          </NavLink>
        </div>
        <div className="bottomNav fixed bottom-6 ">
          <nav className="md:hidden flex-1 flex justify-center items-center flex bg-[#191B1F] rounded-3xl">
            <NavLink
              to="/"
              className={(navData) =>
                `${style.navItem} ${navData.isActive && style.activeNavItem}`
              }
            >
              Upload
            </NavLink>
            <NavLink
              to="/manage"
              className={(navData) =>
                `${style.navItem} ${navData.isActive && style.activeNavItem}`
              }
            >
              Manage
            </NavLink>
          </nav>
        </div>
      </div>
      <div className={style.buttonsContainer}>
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={style.buttonIconContainer}>
            <img src={images.bnb} alt="bsc logo" height={20} width={20} />
          </div>
          <p className="pr-2">BSC</p>
        </div>
        {currentAccount ? (
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={style.buttonTextContainer}>
              <span className="pl-2">
                <FaWallet />
              </span>
              <span className="p-2">{formatters.getEllipsisTxt(currentAccount, 4)}</span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${style.button} ${style.buttonPadding}`}
          >
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
              Connect Wallet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
