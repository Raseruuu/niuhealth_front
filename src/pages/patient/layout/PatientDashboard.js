import { useMediaQuery } from '@react-hook/media-query'
import { useEffect, useState } from 'react'
import { Outlet ,useNavigate} from 'react-router-dom'
import PatientSideNav from './PatientSideNav'
import TopBar from '../../../components/topbar/TopBar'
import useAuth from '../../../hooks/useAuth'
import Swal from 'sweetalert2'

function PatientDashboard() {
  
  const navigate = useNavigate()
  const { auth } = useAuth()
  const matches = useMediaQuery('only screen and (max-width: 800px)')
  const narrowmatch = useMediaQuery('only screen and (max-width: 460px)')
  const narrowscreen = useMediaQuery('only screen and (max-width: 320px)')
  const [openSideNav, setOpenSideNav] = useState(!matches)
  
  const [openSideIcons, setOpenSideIcons] = useState(!narrowmatch)
  const [removePfp,setRemovePfp]= useState(!narrowscreen)
  // Comment in for Actual Route Protection
  useEffect(() => {
    console.log(sessionStorage.getItem("isLoggedIn"))
    if ((String(sessionStorage.getItem('userType')))!=='Patient'||auth.isLoggedIn===false){
      navigate((`/`), { replace: true })
    }
   
    
    
  }, [])
  useEffect(() => {
    

    if (matches) {
      setOpenSideNav(false)
      setOpenSideIcons(!narrowmatch)
    }
    if (narrowmatch) {
      
      // console.log("sideIcons",openSideIcons)
      setOpenSideIcons(false)
    }
    if (narrowscreen) {
      setRemovePfp(narrowscreen)
    }
    if (!narrowscreen) {
      setRemovePfp(narrowscreen)
    }
  }, [matches,narrowmatch,narrowscreen])

  return (
    <div className='d-flex vw-100'>
      
      <TopBar
        menuClick={() => {setOpenSideNav((prev) => !prev);if(narrowmatch||narrowscreen){setOpenSideIcons(openSideNav)}}}
        removePfp={removePfp}
        homeAddress={'/patient'}
      />
      {/* <div style={{ display: 'inline-block', height: '64px' }}></div> */}
      {/* <div
        className='figma mm-active active'
        style={{ display: 'flex', width: '100vw' }}
      > */}
      <PatientSideNav openSideNav={openSideNav} openSideIcons={openSideIcons}  removePfp={removePfp}/>

      <div
        style={{
          overflowY: 'scroll',
        }}
        className='vh-100 w-100 pt-4'
      >
        
        <Outlet />
      </div>
      {/* </div> */}
    </div>
  )
}

export default PatientDashboard
