import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthenticationContext";
import { IdProvider } from "./context/IdContext";
import { APIProvider } from "./context/APIContext";
import { SocketProvider } from "./context/SocketContext";

import Login from "./page/login_page";
import Register from "./page/register_page";
import MainPage from "./page/main_page";
import RoomsPage from "./page/rooms_page";
import FriendsPage from "./page/friends_page";
import SettingPage from "./page/setting.page";
import RoomMenu from "./page/room_menu";
import Friends from "./components/friend_components/friends";

function App() {
  return (
    <IdProvider>
      <SocketProvider>
        <APIProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/:user/rooms/" element={<RoomsPage />}></Route>
              <Route path="/:user/rooms/:uuid" element={<RoomsPage />}></Route>
              <Route path="/:user/friends/" element={<FriendsPage />}></Route>
              <Route
                path="/:user/friends/:uuid"
                element={<FriendsPage />}
              ></Route>
              <Route path="/:user/settings" element={<SettingPage />}></Route>
            </Routes>
          </AuthProvider>
        </APIProvider>
      </SocketProvider>
    </IdProvider>
  );
}

export default App;
