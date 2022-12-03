import { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import axios from "../api/axios"
import { API_URL, AWS_COGNITO_HOSTUI_DOMAIN } from "../constants"

function AWSCallback() {
  const [queryParameters, _] = useSearchParams()
  const [isValid, setIsValid] = useState(false)

  // get code from callback
  const code = queryParameters?.get("code")

  if (!code) {
    window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    // call api for code validation
    const auth = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/exchange`,
          { Code: code },
          {
            signal: controller.signal,
          }
        )

        console.log(response.data)
        isMounted && setIsValid(true)
      } catch (err) {
        console.error(err)
        // window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
      }
    }

    auth()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  // return <div>CALLBACK</div>

  return isValid ? (
    <Navigate to="/patient" replace={true} />
  ) : (
    window.location.replace(AWS_COGNITO_HOSTUI_DOMAIN)
  )
}

export default AWSCallback
