import { Link } from "react-router-dom";

const Header = ({ user, room }) => {
  return (
    <header className="flex justify-between items-center p-5 border border-gray-200 shadow-lg">
      <p className="font-semibold">{user.displayName}</p>
      <p className="text-zinc-500 text-center w-full">{room}</p>

      <Link to="/room">
        <button className="btn bg-zinc-700 text-white px-4 py-2 rounded-md">
          Back
        </button>
      </Link>
    </header>
  );
};

export default Header;
