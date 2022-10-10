import { useAuth } from "../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import FriendNav from "../components/friend_components/friend_nav";
import FriendContent from "../components/friend_components/friend_content";

const FriendsPage = () => {
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
      <FriendNav />
      <FriendContent />
    </div>
  );
};

export default FriendsPage;
