import React, { useState, useRef } from 'react';
import { useAppSelector } from '@redux/hooks';
import { UserDropdown } from '@Components/Navbar/UserDropdown';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { RiUser3Fill } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';
import { useOnClickOutside } from '@hooks/useOnClickOutside';

export const UserProfile = () => {
  const user = useAppSelector((state) => state.wrappedReducer.userSlice.value);

  const clickOutsideRef = useRef(null);

  const [dropdown, setDropdown] = useState<boolean>(false);

  useOnClickOutside(clickOutsideRef, () => setDropdown(false));
  return (
    <>
      <div ref={clickOutsideRef} className="pr-5 p-2 flex items-end">
        <button onClick={() => setDropdown((current) => !current)}>
          <img
            className="rounded-full w-10 h-10"
            draggable="false"
            src={`https://cdn.discordapp.com/avatars/${user.discord_user_id}/${user.avatar}.png?size=64 `}
          />
        </button>
        {dropdown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        <UserDropdown
          dropdown={dropdown}
          options={[
            { text: 'Account', icon: <RiUser3Fill className="text-2xl" /> },
            {
              text: 'Log Out',
              styleProp: {
                color: '#FF6B6B',
                cursor: 'pointer',
              },
              onClick: () => {
                window.location.replace('http://localhost:4000/logout');
              },
              icon: <BiLogOut className="text-2xl" fill="#FF6B6B " />,
            },
          ]}
        />
      </div>
    </>
  );
};
