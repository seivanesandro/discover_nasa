import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { handleGoogleLogout } from "../../api/apiGoogleAuth";

const UserImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #f9cd74;
  margin-left: 1rem;
`;

const Logout = () => {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <UserImg
      src={user.picture}
      alt={user.name || "User"}
      title="Logout"
      onClick={() => handleGoogleLogout(logout)}
    />
  );
};

export default Logout;
