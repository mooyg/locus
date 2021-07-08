import React, { useState, useRef } from 'react';
import { useAppSelector } from '@redux/hooks';
import { UserDropdown } from '@Components/Navbar/UserDropdown';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { RiUser3Fill, RiLogoutCircleRFill } from 'react-icons/ri';
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
          ref={clickOutsideRef}
          dropdown={dropdown}
          options={[
            { text: 'Account', icon: <RiUser3Fill className="text-2xl" /> },
            {
              text: 'Log Out',
              icon: <RiLogoutCircleRFill className="text-2xl" />,
            },
          ]}
        />
      </div>
    </>
  );
};
