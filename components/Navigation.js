import { IoMdStats } from 'react-icons/io';
import { useContext } from 'react';

import { authContext } from '@/lib/store/auth-context';

export default function Navigation() {
  const { user, loading, logout } = useContext(authContext);
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User data */}
        {user && !loading && (
          <div className="flex items-center gap-2">
            {/* user image */}
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
              ></img>
            </div>
            {/* user name */}
            <small>Hi, {user.displayName}!</small>
          </div>
        )}

        {/* Buttons */}
        {user && !loading && (
          <nav className="flex items-center gap-4">
            <div>
              <IoMdStats className="text-2xl" />
            </div>
            <div>
              <button onClick={logout} className="btn btn-danger">
                Log out!
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
