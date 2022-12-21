import { useMediaQuery } from "@react-hook/media-query"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import PatientSideNav from "./PatientSideNav"
import TopBar from "./TopBar"

function PatientDashboard() {
  const matches = useMediaQuery("only screen and (max-width: 575.98px)")
  const [openSideNav, setOpenSideNav] = useState(!matches)

  useEffect(() => {
    if (matches) {
      setOpenSideNav(false)
    }
  }, [matches])

  return (
    <div>
      <TopBar menuClick={() => setOpenSideNav((prev) => !prev)} />
      
      <div
        className="figma mm-active active"
        style={{ display: "flex", width: "100vw" }}
      >
        {/* <PatientSideNav /> */}
        <PatientSideNav openSideNav={openSideNav} />
        <Outlet />
      </div>
    </div>
  )
}

export default PatientDashboard
