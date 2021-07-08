import React from 'react';
import { LoginButton } from '@Components/Login/LoginButton';
import DiscordLogo from '../../../public/svgs/Discord.svg';
export const Login = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-900 text-textPrimary flex-col">
      <div className="bg-darkgray p-5 rounded-2xl sm:p-10">
        <div className="mb-7">
          <h2 className="font-bold mb-2 text-2xl">Login To Locus</h2>
          <h2 className="font-medium">Stay Safe.</h2>
        </div>
        <LoginButton
          Icon={<DiscordLogo style={{ fill: 'white', margin: '5px' }} />}
          Text={'Continue with Discord'}
        />
      </div>
    </div>
  );
};
