import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInFailure, signOutStart } from "../redux/user/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("./api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        // dispatch(signInFailure(data.message));
        return;
      }
      navigate("/signin");
    } catch (error) {}
  };
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1>Profile</h1>
      <form action="" className="form">
        <img src={currentUser.avatar} alt="profile" />
        <span onClick={handleSignOut}>Sign Out</span>
      </form>
    </div>
  );
};

export default Profile;
