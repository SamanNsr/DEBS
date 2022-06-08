import React from 'react';
import { classNames } from '../../utils';

const style = {
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
};

const Button = ({ children, className, ...rest }) => {
  return (
    <div className={classNames(style.confirmButton, className)} {...rest}>
      {children}
    </div>
  );
};

export default Button;
