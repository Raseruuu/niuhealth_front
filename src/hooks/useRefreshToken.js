import axios from "../api/axios"
import useAuth from "./useAuth"

export const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const response = await axios.get("/refresh/user")
    setAuth((prev) => {
      console.log(JSON.stringify(prev))
      console.log(response.data.token)
      const user = response.data?.userInfo
      const access_token = response.data?.access_token

      return { ...prev, access_token, user }
    })

    return response.data.token
  }
  return refresh
}

export default useRefreshToken
