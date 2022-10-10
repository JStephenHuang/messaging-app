import { useAuth } from "../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import RoomContent from "../components/room_components/room_content";
import RoomNav from "../components/room_components/room_nav";

const RoomsPage = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    authContext.isAuthenticated().then((res) => {
      if (!res.data) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="bg text-[24px]">
      <RoomNav />
      <RoomContent />
    </div>
  );
};

export default RoomsPage;
