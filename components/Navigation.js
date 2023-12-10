import { IoMdStats } from 'react-icons/io';

export default function Navigation() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User data */}
        <div className="flex items-center gap-2">
          {/* user image */}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src="https://pbs.twimg.com/profile_images/1251244594966040576/v-b1F6AM_400x400.jpg"
              alt="Profile Image"
            ></img>
          </div>
          {/* user name */}
          <small>Hi, Ritik!</small>
        </div>

        {/* Buttons */}
        <nav className="flex items-center gap-4">
          <div>
            <IoMdStats className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Log out!</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
