import { useMediaQuery } from '@react-hook/media-query'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import TopBar from '../../../components/topbar/TopBar'
import useAuth from '../../../hooks/useAuth'
import SideNav from './SideNav'

function ProviderDashboard() {
  
  const navigate = useNavigate()
  const { auth } = useAuth()
  const matches = useMediaQuery('only screen and (max-width: 575.98px)')
  const [openSideNav, setOpenSideNav] = useState(!matches)
  // const [protect_done,setProtectDone]=useState(false)
  // Comment in for Actual Route Protection
  useEffect(() => {
    
      if ((String(sessionStorage.getItem('userType')))!=='Provider'){
        navigate((`/`), { replace: true })
      }
    
    
    
  }, [])
  useEffect(() => {
    
    if (matches) {
      setOpenSideNav(false)
    }
  }, [matches])

  return (
    <div style={{ display: 'flex', width: '100vw' }}>
      <TopBar
        menuClick={() => setOpenSideNav((prev) => !prev)}
        homeAddress={'/provider'}
      />
      <SideNav openSideNav={openSideNav} />
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
