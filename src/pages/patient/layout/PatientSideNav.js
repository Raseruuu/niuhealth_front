import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { APP_URL, AWS_BUCKET } from '../../../constants'
import SideNavLogo from '../../../components/SideNavLogo'
import useLogout from '../../../hooks/useLogout'

function PatientSideNav({ openSideNav }) {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useLogout()

  const name = sessionStorage.getItem('name') || 'Welcome'
  const email = sessionStorage.getItem('email')

  function handleLogout(e) {
    e.preventDefault()
    logout()
    navigate('/')
  }

  return (
    <div
      className='left-sidenav'
      style={{ display: openSideNav ? 'block' : 'none', minWidth: '308px' }}
    >
      {/* <div className='topbar-left'>
        <Link to='/patient' className='logo'>
          <span>
            <SideNavLogo />
          </span>
        </Link>
      </div> */}

      {/* <div className='media figmaSideUser'>
        <Link className='' href='#'>
          <img
            src={`${APP_URL}/assets/images/users/user-1.jpg`}
            alt='user'
            className='rounded-circle thumb-md'
            onError={(e) =>
              (e.target.src = `${AWS_BUCKET}/assets/images/users/user-1.jpg`)
            }
          />
        </Link>
        <div className='media-body align-self-center ml-3'>
          <p className='font-14 font-weight-bold mb-0'>{name}</p>
          <p className='mb-0 font-12 text-muted'>{email}</p>
        </div>
      </div> */}

      <div className='virtualTourSide'>
        <button
          type='button'
          className='btn btn-success btn-round waves-effect waves-light figmaBigButton'
          onClick={() => navigate('/virtualvisit')}
        >
          Start Your Virtual Visit
        </button>
      </div>
      {location?.pathname === '/patient/virtualvisit' ? (
        <div
          className='spacetop alert alert-warning alert-warning-shadow mb-0 alert-dismissible fade show'
          role='alert'
        >
          <button
            type='button'
            className='close'
            data-dismiss='alert'
            aria-label='Close'
          >
            <span aria-hidden='true'>
              <i className='mdi mdi-close'></i>
            </span>
          </button>
          Sorry, we are unavailable for virtual visits from 12:00 Am to 8:00 Am.
          Please call 808-888-4800 and select option 4 to talk to a provider
        </div>
      ) : null}

      <ul className='metismenu left-sidenav-menu'>
        <li>
          <NavLink to='virtualvisit'>
            <i className='mdi mdi-video'></i>
            <span>Virtual Visit</span>
            <span className='menu-arrow'></span>
          </NavLink>
        </li>
        <li>
          <NavLink to='appointments'>
            <i className='mdi mdi-calendar-text'></i>
            <span>Appointments</span>
            <span className='menu-arrow'></span>
          </NavLink>
        </li>
        <li>
          <NavLink to='marketplace'>
            <i className='dripicons-medical'></i>
            <span>Marketplace</span>
            <span className='menu-arrow'></span>
          </NavLink>
        </li>
        <li>
          <NavLink to='subscription'>
            <i className='mdi mdi-credit-card'></i>
            <span>Subscription and Payment</span>
            <span className='menu-arrow'></span>
          </NavLink>
        </li>
        <li>
          <NavLink to='insurance'>
            <i className='mdi mdi-home-plus'></i>
            <span>Insurance</span>
            <span className='menu-arrow'></span>
          </NavLink>
        </li>
        <li>
          <NavLink to='profile'>
            <i className='dripicons-user'></i>
            <span>Profile</span>
            <span className='menu-arrow'></span>
          </NavLink>
        </li>
      </ul>
      <div className='logoutDiv'>
        <Link onClick={handleLogout.bind(this)}>Logout</Link>
      </div>
    </div>
  )
}

export default PatientSideNav
