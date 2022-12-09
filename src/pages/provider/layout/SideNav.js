import { NavLink } from "react-router-dom"
import { useMediaQuery } from "@react-hook/media-query"
function SideNav({ openSideNav }) {
  return (
    <div
      className='left-sidenav'
      style={{ display: openSideNav ? "block" : "none" }}
    >
      <ul className='metismenu left-sidenav-menu'>
        <li>
          <NavLink to='/provider'>
            <i className='ti-bar-chart'></i>
            <span>Dashboard</span>
            <span className='menu-arrow'>
              <i className='mdi mdi-chevron-right'></i>
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to='patient'>
            <i className='fas fa-user-friends'></i>
            <span>Patients</span>
            <span className='menu-arrow'>
              <i className='mdi mdi-chevron-right'></i>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to='ratings'>
            <i className='far fa-star'></i>
            <span>Ratings</span>
            <span className='menu-arrow'>
              <i className='mdi mdi-chevron-right'></i>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to='visits'>
            <i className='fas fa-clock'></i>
            <span>Visits</span>
            <span className='menu-arrow'>
              <i className='mdi mdi-chevron-right'></i>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to='visit-requests'>
            <i className='far fa-newspaper'></i>
            <span>Visit Requests</span>
            <span className='menu-arrow'>
              <i className='mdi mdi-chevron-right'></i>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to='clinics'>
            <i className='fas fa-medkit'></i>
            <span>Clinics</span>
            <span className='menu-arrow'>
              <i className='mdi mdi-chevron-right'></i>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to='services'>
            <i className='fas fa-dolly'></i>
            <span>Services</span>
            <span className='menu-arrow'>
              <i className='mdi mdi-chevron-right'></i>
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SideNav
