// Google Auth API logic for React
// Uses @react-oauth/google
import { googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export function handleGoogleLoginSuccess(credentialResponse, login) {
  // credentialResponse.credential is a JWT token
  const decoded = jwtDecode(credentialResponse.credential);
  login(decoded, credentialResponse.credential);
}

export function handleGoogleLogout(logout) {
  googleLogout();
  logout();
}
