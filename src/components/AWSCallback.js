import { useEffect, useState } from "react"
import {
  json,
  Navigate,
  redirect,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import axios from "../api/axios"
import { API_URL, AWS_COGNITO_HOSTUI_DOMAIN } from "../constants"

export async function loader({ request }) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  // if (!code || code === null) {
  //   redirect("/404")
  // }

  const response = await fetch(`${API_URL}exchange`, {
    method: "POST",
    body: JSON.stringify({ Code: code }),
  })

  console.log(response)

  if (response.status !== 200) {
    throw new Response("Not Found", { status: 404 })
  }

  return { code, response: response.json() }
}

function AWSCallback() {
  const { code } = useLoaderData()
  const [queryParameters] = useSearchParams()
  const [isValid, setIsValid] = useState(true)
  const [errMsg, setErrMsg] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    // call api for code validation
    const auth = async () => {
      await axios
        .post(
          "/exchange",
          { Code: code },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const {
            data: { StatusCode, Message = "", Tokens = {} },
          } = res

          if (StatusCode === 200 && isMounted) {
            sessionStorage.setItem(
              "access_token",
              Tokens?.access_token || false
            )
            sessionStorage.setItem(
              "refresh_token",
              Tokens?.refresh_token || false
            )
            sessionStorage.setItem("token_type", Tokens?.token_type || false)

            navigate("/", { replace: true })
          } else {
            console.error(Message || "Something went wrong...")
            setErrMsg(Message || "Something went wrong...")
            // window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(JSON.stringify(err, null, 4))
        })

      // TODO: err needs to be check if errmsg is from aws cognito or api err response before redirecting to AWS COGNITO HOSTUI to prevent sign-in loop
    }

    if (code !== null) auth()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  if (!code || code === null) {
    return <Navigate to="/404" replace={true} />
  }

  return <div>{code}</div>
  // return errMsg ? <div>{errMsg}</div> : <div>Please wait...</div>
  // TODO: Redirect to user designated dashboard
  // return isValid ? (
  //   <Navigate to="/patient" replace={true} />
  // ) : (
  //   window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
  // )
}

export default AWSCallback
