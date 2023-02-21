import { useMediaQuery } from '@react-hook/media-query'
import { useEffect, useState } from 'react'
import { Outlet ,useNavigate} from 'react-router-dom'
import PatientSideNav from './PatientSideNav'
import TopBar from '../../../components/topbar/TopBar'
import useAuth from '../../../hooks/useAuth'

function PatientDashboard() {
  
  const navigate = useNavigate()
  const { auth } = useAuth()
  const matches = useMediaQuery('only screen and (max-width: 575.98px)')
  const [openSideNav, setOpenSideNav] = useState(!matches)
  // Comment in for Actual Route Protection
  useEffect(() => {
    
    if ((String(sessionStorage.getItem('userType')))!=='Patient'){
      navigate((`/`), { replace: true })
    }
    
    
  }, [])
  useEffect(() => {
    

    if (matches) {
      setOpenSideNav(false)
    }
  }, [matches])

  return (
    <div className='d-flex vw-100'>
      <TopBar
        menuClick={() => setOpenSideNav((prev) => !prev)}
        homeAddress={'/patient'}
      />
      {/* <div style={{ display: 'inline-block', height: '64px' }}></div> */}
      {/* <div
        className='figma mm-active active'
        style={{ display: 'flex', width: '100vw' }}
      > */}
      <PatientSideNav openSideNav={openSideNav} />

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
