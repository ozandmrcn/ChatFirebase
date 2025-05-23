import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Room from "./pages/Room";
import Chat from "./pages/Chat";
import Protected from "./components/Protected";

const App = () => {
  const [user, setUser] = useState(undefined);

  // Check if user is logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Pages without login required */}
        <Route path="/" element={<Login user={user} />} />

        {/* Pages with login required */}
        <Route element={<Protected user={user} />}>
          <Route path="/room" element={<Room />} />
          <Route path="/chat/:room" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
