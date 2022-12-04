import { Navigate } from "react-router-dom"
import { AWS_COGNITO_HOSTUI_DOMAIN } from "../constants"

function LoginAuth() {
  const accessTokenValid = true

  // if accessToken is present, call api for validation
  if (accessTokenValid) {
    // store user details then navigate to designated dashboard (? selection of role)
    return <Navigate to={"/patient"} replace={true} />
  } else {
    window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
  }
}

export default LoginAuth
