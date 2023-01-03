import { useMediaQuery } from '@react-hook/media-query'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../../components/Footer'
import TopBar from '../../../components/topbar/TopBar'
import SideNav from './SideNav'

function ProviderDashboard() {
  const matches = useMediaQuery('only screen and (max-width: 575.98px)')
  const [openSideNav, setOpenSideNav] = useState(!matches)

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
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard
