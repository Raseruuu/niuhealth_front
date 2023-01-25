import { NavLink } from "react-router-dom"
import { useMediaQuery } from "@react-hook/media-query"
function SideNav({ openSideNav=true }) {
  return (
    <div
      className='left-sidenav'
      style={{ display: openSideNav ? "block" : "none" }}
    >
      <ul className='metismenu left-sidenav-menu'  style = {{marginTop: "50px"}}>
        <li>
        <a href="javascript: void(0);">
          <i className="ti-crown"></i>
            Accounts 
            <span className="menu-arrow left-has-menu">
              <i className="mdi mdi-chevron-right"></i>
            </span>
        </a>  
          <ul className="nav-second-level" aria-expanded="false">
            <li>
              <NavLink to='/admin/companies'>
                <i className='ti-bar-chart'></i>
                <span>Companies</span>
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
            </li><li>
              <NavLink to='providers'>
                <i className='far fa-star'></i>
                <span>Providers</span>
                <span className='menu-arrow'>
                  <i className='mdi mdi-chevron-right'></i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to='patients'>
                <i className='fas fa-clock'></i>
                <span>Patients</span>
                <span className='menu-arrow'>
                  <i className='mdi mdi-chevron-right'></i>
                </span>
              </NavLink>
            </li>
            
            
            <li>
              <NavLink to='settings'>
                <i className='far fa-newspaper'></i>
                <span>Settings</span>
                <span className='menu-arrow'>
                  <i className='mdi mdi-chevron-right'></i>
                </span>
              </NavLink>
            </li>
            
          </ul>
        </li>
        
      </ul>
    </div>
  )
}

export default SideNav
