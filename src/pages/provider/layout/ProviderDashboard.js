import { useMediaQuery } from '@react-hook/media-query'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import TopBar from '../../../components/topbar/TopBar'
import useAuth from '../../../hooks/useAuth'
import useDebounce from '../../../hooks/useDebounce'
import useInterval from '../../../hooks/useInterval'
import SideNav from './SideNav'

function ProviderDashboard() {
  

  const navigate = useNavigate()
  const { auth } = useAuth()
  
  const matches = useMediaQuery('only screen and (max-width: 800px)')
  const narrowmatch = useMediaQuery('only screen and (max-width: 460px)')
  const narrowscreen = useMediaQuery('only screen and (max-width: 420px)')
  // const matches = useMediaQuery('only screen and (max-width: 575.98px)')
  const [openSideNav, setOpenSideNav] = useState(!matches)
  const [openSideIcons, setOpenSideIcons] = useState(!narrowmatch)
  const [removePfp,setRemovePfp]= useState(!narrowscreen)
  
  // const [protect_done,setProtectDone]=useState(false)
  // Comment in for Actual Route Protection
  
  useEffect(() => {
    
      if ((String(sessionStorage.getItem('userType')))!=='Provider'||auth.isLoggedIn===false){
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
    
    if (!narrowmatch) {
      setOpenSideIcons(true)
    }
    if (narrowscreen) {
      setRemovePfp(narrowscreen)
    }
    if (!narrowscreen) {
      setRemovePfp(narrowscreen)
    }


  }, [matches,narrowmatch,narrowscreen])

  return (
    <div style={{ display: 'flex', width: '100vw' }}>
      <TopBar
        menuClick={() => {
          setOpenSideNav((prev) => !prev);
          if (narrowmatch||narrowscreen){
            setOpenSideIcons(openSideNav)
          }}}
        removePfp={removePfp}
        homeAddress={'/provider'}
      />
      <SideNav openSideNav={openSideNav}  openSideIcons={openSideIcons}  removePfp={removePfp}/>
      <div
        style={{
          height: '100vh',
          overflowY: 'scroll',
          width: '100%',
        }}
      >
        <div className='page-wrapper'>
          <div className='page-content'>
            <Outlet />
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard
