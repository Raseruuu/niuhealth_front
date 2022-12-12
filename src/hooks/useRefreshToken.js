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
      const points = response.data?.userInfo?.points
      const commission = response.data?.userInfo?.commission
      const role = [response.data?.userInfo?.type]
      const token = response.data?.token

      return { ...prev, token, role, user, points, commission }
    })

    return response.data.token
  }
  return refresh
}

export default useRefreshToken
