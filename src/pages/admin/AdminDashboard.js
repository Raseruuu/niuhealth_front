import { useMediaQuery } from '@react-hook/media-query'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from './SideNav'
import TopBar from '../../components/topbar/TopBar'

function AdminDashboard() {
  const matches = useMediaQuery('only screen and (max-width: 575.98px)')
  const [openSideNav, setOpenSideNav] = useState(!matches)

  useEffect(() => {
    if (matches) {
      setOpenSideNav(false)
    }
  }, [matches])

  return (
    <div>
      <TopBar menuClick={() => setOpenSideNav((prev) => !prev)} />
      <div style={{ display: 'inline-block', height: '64px' }}></div>
      <div
        className='figma mm-active active'
        style={{ display: 'flex', width: '100vw' }}
      >
        <SideNav openSideNav={openSideNav} />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
