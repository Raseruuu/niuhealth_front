import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    access_token: sessionStorage.getItem('access_token'),
    id_token: sessionStorage.getItem('id_token'),
    refresh_token: sessionStorage.getItem('refresh_token'),
    token_type: sessionStorage.getItem('token_type'),
    transactionType: sessionStorage.getItem('transactionType'),
    userType: sessionStorage.getItem('userType'),
    email: sessionStorage.getItem('email'),
    email_verified: sessionStorage.getItem('email_verified'),
    name: sessionStorage.getItem('name'),
    sub: sessionStorage.getItem('sub'),
    username: sessionStorage.getItem('username'),
  })
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || true
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
