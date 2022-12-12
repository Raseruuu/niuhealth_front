import { useEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import axios from "../api/axios"
import { AWS_COGNITO_HOSTUI_DOMAIN, USERTYPE } from "../constants"
import useAuth from "../hooks/useAuth"
import LottieFailed from "./lottie/LottieFailed"
import GreenLock from "./lottie/LottieGreenLock"

export function loader({ request }) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  if (!code || code === null) {
    window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
  }

  return { code }
}

function AWSCallback() {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const { code } = useLoaderData()
  const [errMsg, setErrMsg] = useState()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function auth() {
      await axios
        .post(
          "exchange",
          { Code: code },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const {
            StatusCode,
            StatucCode,
            Message,
            TransactionType,
            Tokens,
            UserType,
          } = res.data

          return {
            ...Tokens,
            transactionType: TransactionType,
            statusCode: StatusCode || StatucCode,
            msg: Message,
            userType: UserType,
          }
        })
        .then(
          ({
            access_token,
            id_token,
            refresh_token,
            token_type,
            transactionType,
            statusCode,
            msg,
            userType,
          }) => {
            if (statusCode !== 200) {
              sessionStorage.removeItem("access_token")
              sessionStorage.removeItem("id_token")
              sessionStorage.removeItem("refresh_token")
              sessionStorage.removeItem("token_type")
              sessionStorage.removeItem("userType")
              setAuth({})

              throw new Error(msg)
            }

            sessionStorage.setItem("access_token", access_token)
            sessionStorage.setItem("id_token", id_token)
            sessionStorage.setItem("refresh_token", refresh_token)
            sessionStorage.setItem("token_type", token_type)
            sessionStorage.setItem("transactionType", transactionType)
            sessionStorage.setItem("userType", userType)
            console.log("Success")

            setAuth({
              access_token,
              id_token,
              refresh_token,
              token_type,
              transactionType,
              userType,
            })

            if (userType === USERTYPE.provider) {
              navigate("/provider", { replace: true })
              return
            } else if (userType === USERTYPE.patient) {
              navigate("/patient", { replace: true })
              return
            }

            navigate("/", { replace: true })
          }
        )
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }

    isMounted && auth()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div
      className='d-flex flex-column justify-content-center align-items-center'
      style={{ width: "100vw", height: "100vh" }}
    >
      {errMsg ? <LottieFailed /> : <GreenLock />}
      {errMsg ? (
        <div className='text-center'>
          <h4>{errMsg}</h4>
          <p>
            <button
              onClick={() => {
                window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
              }}
              type='button'
              className='btn btn-success btn-round py-2 waves-effect waves-light figmaBigButton'
            >
              Back to Login
            </button>
          </p>
        </div>
      ) : (
        <div>Authenticating...</div>
      )}
    </div>
  )
}

export default AWSCallback
