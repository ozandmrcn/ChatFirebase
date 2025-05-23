import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const Room = () => {
  const user = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // get room name from input
    const roomName = e.target[0].value.toLowerCase().replaceAll(" ", "-");

    if (!roomName) {
      toast.error("Please enter a room name");
      return;
    }

    // navigate to chat page
    navigate(`/chat/${roomName}`);
  };

  const handleLogout = () => {
    signOut(auth);
    toast.info("Logged out successfully");
  };

  return (
    <div className="wrapper">
      <form
        onSubmit={handleSubmit}
        className="box rounded-[10px] flex flex-col gap-10 text-center"
      >
        <h1 className="text-4xl">Room Selector</h1>
        <p className="text-zinc-500">
          Hi, {user.displayName} <br /> Which room do you want to join today?
        </p>

        <input
          type="text"
          className="border border-gray-300 rounded-md shadow-lg p-2 px-4"
          placeholder="example: Room 1"
        />

        <button type="submit" className="btn bg-zinc-700 text-white">
          Join Room
        </button>

        <button
          className="btn bg-red-500 text-white"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Room;
