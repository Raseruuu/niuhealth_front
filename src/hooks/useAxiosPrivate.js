import { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


async function logoutCurrentUser(){
  const { auth } = useAuth()
  await axiosPrivate
    .post(
      "signOut" ,{Email:auth.email})
    .then((res) => {
      console.log(res);
    })
    
  }
const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  const navigate = useNavigate()
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers[
            'Authorization'
          ] = `${auth?.refresh_token}`
        }
        return config
      },
      (error) => {
        
        // console.log("aXIOSError Number",error);
        Promise.reject(error)}
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        // response,
        console.log(response);
      
      try {
        if (response?.data.Status==='tokenError'){
          Swal.fire({
            icon:'warning',
            html:'Your session has expired.',
            confirmButtonText:'Logout',
            // showClass: {
            //   popup: 'swal2-show'
            // },
            // hideClass: {
            //   popup: ''
            // },
          }).then((response)=>{
           
              
                logoutCurrentUser()
                navigate('/login',{replace:true})
              
          })
        };
      }
      catch(err) {
        console.log(err)
      }

      async (error) => {
        const prevRequest = error?.config
        
        
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          // const newAccessToken = await refresh()
          
          const refreshToken=auth.refresh_token
          prevRequest.headers['Authorization'] = `${refreshToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
      return response
      }
    
    )
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])
  
  return axiosPrivate
}

export default useAxiosPrivate
