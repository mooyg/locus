import React from 'react';
import LogoSVG from '../../../public/svgs/logo.svg';
import { UserProfile } from '@Components/Navbar/UserProfile';
export const Navbar = () => {
  return (
    <div className="flex items-center justify-between	">
      <div className="flex justify-center items-center">
        <LogoSVG style={{ padding: '2px' }} />{' '}
        <h2 className="font-bold p-2 text-2xl">Locus</h2>
      </div>
      <UserProfile />
    </div>
  );
};
