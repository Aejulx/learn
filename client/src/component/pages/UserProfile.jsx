import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logout } from "../Redux/actions";

const UserProfile = () => {
  const { user, isLoading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="user-profile">
      <h1>User Information</h1>
      {user ? (
        <div>
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserProfile;
