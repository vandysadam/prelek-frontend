import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authSlice } from '../../modules/auth/auth.slice';
import { CurrentUserDTO, User } from '../../modules/users/dtos/models/user.entity';

import { useTypedDispatch } from '../../store';
import Transition from '../../utils/Transition';

interface DropdownProfileProps {
  currentUser?: CurrentUserDTO;
  align?: 'left' | 'right';
}

function DropdownProfile({ align, currentUser }: DropdownProfileProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  /// Dispatcher hooks
  const dispatch = useTypedDispatch();
  /// Router hooks

  const router = useNavigate();

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    console.log('logout');

    dispatch(authSlice.actions.logout());

    setDropdownOpen(!dropdownOpen);

    router('/signin');

    // redirect to login page
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current!.contains(target))
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}>
        <img
          className="w-20 h-auto rounded-full"
          src={
            'https://firebasestorage.googleapis.com/v0/b/contag-c8b18.appspot.com/o/logo_white.png?alt=media&token=7f2ce481-ea63-429f-abc7-570106a77526'
          }
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
            {currentUser?.name || 'nama user tidak di temukan'}
          </span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        appear={undefined}>
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}>
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
            <div className="font-medium text-gray-800">
              {currentUser?.name || 'name tidak ditemukan'}
            </div>
            <div className="text-xs text-gray-500 italic">{currentUser?.roles || '-'}</div>
          </div>
          <ul>
            {/* <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li> */}
            <li>
              <button
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                onClick={handleLogout}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
