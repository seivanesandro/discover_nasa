import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { handleGoogleLoginSuccess } from "../api/apiGoogleAuth";
import styled from "styled-components";
import bgimg from "../assets/bg-auth-page.png";
import { FcGoogle } from "react-icons/fc";
import { Navigate } from "react-router-dom";

const ContainerAuth = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-image: url(${bgimg});
  background-size: 200px auto;
  background-repeat: no-repeat;
  background-position: center center;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  color: #222;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: background 0.2s;
  &:hover {
    background: #f9cd74;
    color: #222;
  }
`;

const AuthContent = styled.div`
  display: flex;  
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 12rem;


`;

const TitleAuth = styled.h2`
    margin-bottom: 2rem !important;
`;

const DescriptionAuth = styled.p`
  margin-top: 2rem;
  color: #f9cd74;
  font-size: 1.1rem;
  text-align: center;
`;

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Auth = () => {
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ContainerAuth className="container-auth">
        <AuthContent className="auth-content">
          <TitleAuth className="title-auth">Sign in with Google</TitleAuth>
          <DescriptionAuth className="description-auth">
            You can only access this application with Google authentication.
            <br />
            Please sign in to continue.
          </DescriptionAuth>
        </AuthContent>
        <GoogleLogin
          locale="en"
          onSuccess={(credentialResponse) =>
            handleGoogleLoginSuccess(credentialResponse, login)
          }
          onError={() => alert("Google Login Failed")}
          useOneTap
          render={({onClick}) => (
            <GoogleButton onClick={onClick}>
              <FcGoogle size={28} /> Sign in with Google
            </GoogleButton>
          )}
        />
      </ContainerAuth>
    </GoogleOAuthProvider>
  );
};

export default Auth;
