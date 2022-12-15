import { useEffect } from 'react'
import { Navigate, useLoaderData } from 'react-router-dom'
import axios from '../api/axios'
import { AWS_COGNITO_HOSTUI_DOMAIN, USERTYPE } from '../constants'
import useAuth from '../hooks/useAuth'

export async function loader({ request }) {
  const access_token = sessionStorage.getItem('access_token')
  const token_type = sessionStorage.getItem('token_type')

  if (!access_token || access_token === 'undefined') {
    window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
  }

  const result = await axios
    .post(
      'checktoken',
      { AccessToken: access_token },
      { headers: { Authorization: `${token_type} ${access_token}` } }
    )
    .then((res) => {
      console.log('res: ', res)

      try {
        const { email, email_verified, name, sub, username } =
          res?.data?.Result || {}

        sessionStorage.setItem('email', email)
        sessionStorage.setItem('email_verified', email_verified)
        sessionStorage.setItem('name', name)
        sessionStorage.setItem('sub', sub)
        sessionStorage.setItem('username', username)
        if (!email) {
          throw new Error('No email address.')
        }

        return {
          email,
          email_verified,
          name,
          sub,
          username,
          accessTokenValid: true,
          access_token,
          token_type,
        }
      } catch (error) {
        return { accessTokenValid: false }
      }
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

  return result
}

function LoginAuth() {
  const { setAuth } = useAuth()
  const id_token = sessionStorage.getItem('id_token')
  const refresh_token = sessionStorage.getItem('refresh_token')
  const transactionType = sessionStorage.getItem('transactionType')
  const userType = sessionStorage.getItem('userType')
  const {
    email,
    email_verified,
    name,
    sub,
    username,
    accessTokenValid,
    access_token,
    token_type,
  } = useLoaderData()
  console.log(email, email_verified, name, sub, username, accessTokenValid)

  useEffect(() => {
    setAuth((prev) => ({
      ...prev,
      email,
      email_verified,
      name,
      sub,
      username,
      access_token,
      token_type,
      id_token,
      refresh_token,
      transactionType,
      userType,
    }))
  }, [])

  if (accessTokenValid && userType === USERTYPE.patient) {
    return <Navigate to={'/patient'} replace={true} />
  } else if (accessTokenValid && userType === USERTYPE.provider) {
    return <Navigate to={'/provider'} replace={true} />
  } else {
    // window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
    return <div>Authentication Failed.</div>
  }
}

export default LoginAuth
