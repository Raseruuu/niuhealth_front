import { Navigate, useLoaderData } from "react-router-dom"
import axios from "../api/axios"
import { AWS_COGNITO_HOSTUI_DOMAIN } from "../constants"

export async function loader({ request }) {
  const access_token = sessionStorage.getItem("access_token")
  const token_type = sessionStorage.getItem("token_type")

  if (!access_token || access_token === null) {
    window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
  }

  const result = await axios
    .post(
      "checktoken",
      { AccessToken: access_token },
      { headers: { Authorization: `${token_type} ${access_token}` } }
    )
    .then((res) => {
      console.log("res: ", res)
      // TODO: store user details in CONTEXT

      try {
        const { email, email_verified, name, sub, username } =
          res?.data?.Result || {}

        sessionStorage.setItem("email", email)
        sessionStorage.setItem("email_verified", email_verified)
        sessionStorage.setItem("name", name)
        sessionStorage.setItem("sub", sub)
        sessionStorage.setItem("username", username)
      } catch (error) {
        return false
      }
      return true
    })
    .catch((err) => {
      console.error(err)
      throw new Response(
        `Authentication Failed. ${err.message} ${err?.request?.responseURL} `,
        {
          status: err?.response?.status || 500,
        }
      )
    })

  return { accessTokenValid: result }
}

function LoginAuth() {
  const { accessTokenValid } = useLoaderData()
  console.log("accessTokenValid: ", accessTokenValid)

  if (accessTokenValid) {
    return <Navigate to={"/patient"} replace={true} />
  } else {
    // window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
    return <div>Authentication Failed.</div>
  }
}

export default LoginAuth
