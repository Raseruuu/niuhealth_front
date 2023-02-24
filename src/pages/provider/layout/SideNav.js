import { Link, NavLink, useNavigate } from 'react-router-dom'
import useLogout from '../../../hooks/useLogout'

function SideNav({ openSideNav }) {
  const logout = useLogout()
  const navigate = useNavigate()

  function handleLogout(e) {
    e.preventDefault()
    logout()
    navigate('/login',{replace:true})
  }

  return (
    <div
      className='left-sidenav'
      style={{ display: openSideNav ? 'block' : 'none', minWidth: '308px' }}
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
      <div className='logoutDiv'>
        <Link onClick={handleLogout.bind(this)}>Logout</Link>
      </div>
    </div>
  )
}

export default SideNav
