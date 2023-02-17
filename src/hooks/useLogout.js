import axios from '../api/axios'
import useAuth from './useAuth'

const useLogout = () => {
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth({})
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('id_token')
    sessionStorage.removeItem('refresh_token')
    sessionStorage.removeItem('token_type')
    sessionStorage.removeItem('userType')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('email_verified')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('sub')
    sessionStorage.removeItem('username')
    
    sessionStorage.removeItem('isLoggedIn',  false)
    //   try {
    //     const response = await axios("/logout/user", { withCredentials: true })
    //   } catch (err) {
    //     console.error(err)
    //   }

    // TODO: api calls to invalidate tokens
  }
  return logout
}

export default useLogout
