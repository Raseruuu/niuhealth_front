import { Outlet } from "react-router-dom"
import PatientSideNav from "./PatientSideNav"

function PatientDashboard() {
  return (
    <div
      className="figma mm-active active"
      style={{ display: "flex", width: "100vw" }}
    >
      <PatientSideNav />
      <Outlet />
    </div>
  )
}

export default PatientDashboard
