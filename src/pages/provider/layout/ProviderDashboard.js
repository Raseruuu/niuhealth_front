import { useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../../../components/Footer"
import SideNav from "./SideNav"
import TopBar from "./TopBar"

function ProviderDashboard() {
  const [openSideNav, setOpenSideNav] = useState(true)
  return (
    <div style={{ display: "flex", width: "100vw" }}>
      <TopBar menuClick={() => setOpenSideNav((prev) => !prev)} />
      <SideNav openSideNav={openSideNav} />
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          width: "100%",
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
