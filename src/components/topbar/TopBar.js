import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import SideNavLogo from '../../components/SideNavLogo'
import { AWS_BUCKET } from '../../constants'
import useAuth from '../../hooks/useAuth'
import SAMPLENOTIF from '../../mocks/topbarNotifs'

const NotifIconSwitch = ({ icontype }) => {
  const iconsGen = {
    order: {
      bg: 'bg-primary',
      icon: 'la-cart-arrow-down',
    },
    meeting: {
      bg: 'bg-success',
      icon: 'la-group',
    },
    success: {
      bg: 'bg-pink',
      icon: 'la-list-alt',
    },
    deliver: {
      bg: 'bg-warning',
      icon: 'la-truck',
    },
    task: {
      bg: 'bg-info',
      icon: 'la-check-circle',
    },
  }
  return (
    <div className={`avatar-md ${iconsGen[icontype].bg}`}>
      <i className={`la ${iconsGen[icontype].icon} text-white`}></i>
    </div>
  )
}
function NotifLink({ type, subject, body, timeReceived }) {
  // console.log(notifItem)
  // console.log("body"+notifItem['body  '])
  const timeNow = 20
  const timeSince = timeNow - timeReceived + ' minutes ago'
  return (
    <Link to='' className='dropdown-item py-3'>
      <small className='float-right text-muted pl-2'>{timeSince}</small>
      <div className='media'>
        {/* <NotifIconSwitch icontype={ntype}/> */}

        <NotifIconSwitch icontype={type} />
        <div className='media-body align-self-center ml-2 text-truncate'>
          <h6 className='my-0 font-weight-normal text-dark'>{subject}</h6>
          <small className='text-muted mb-0'>{body}</small>
        </div>
      </div>
    </Link>
  )
}

export function TopBar({ menuClick, homeAddress }) {
  const [notifs, setNotifs] = useState(SAMPLENOTIF)
  const [profile, setProfile] = useState()
  //notif badge number
  const ntfBadgeNum = notifs.length
  // console.log(ntfBadgeNum)
  // console.log(notifs[0].type)
  const { auth } = useAuth()
  console.log("Auth ",auth)
  useEffect(()=>{
    async function getProfileDetails() {
      await axiosPrivate
        .post(
          'getPatientDetails',
          { Email: auth.email
          },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            console.log(res.data.Data[0])
            setProfile(res.data.Data[0])
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
      }
    if (auth.userType==="Patient"){
      getProfileDetails()
    }
  },[])
  return (
    <div className='dev-top-bar'>
      <div>
        <button
          onClick={menuClick}
          className='nav-link button-menu-mobile waves-effect waves-light btn-lg'
          type={'button'}
        >
          <i className='ti-menu nav-icon'></i>
        </button>
        <Link to={homeAddress} className='logo'>
          <SideNavLogo style={{ width: '170px' }} />
        </Link>
      </div>

      <ul className='list-unstyled dev-top-bar-right mb-0'>
        {/* <li className='dropdown notification-list'>
          <Link
            className='nav-link dropdown-toggle arrow-none waves-light waves-effect'
            data-toggle='dropdown'
            to='#'
            onClick={(e) => e.preventDefault()}
            role='button'
            aria-haspopup='false'
            aria-expanded='false'
          >
            <i className='ti-bell noti-icon'></i>
            {ntfBadgeNum > 0 && (
              <span className='badge badge-danger badge-pill noti-icon-badge'>
                {ntfBadgeNum}
              </span>
            )}
          </Link>
          <div className='dropdown-menu dropdown-menu-right dropdown-lg pt-0'>
            <h6 className='dropdown-item-text font-15 m-0 py-3 bg-primary text-white d-flex justify-content-between align-items-center'>
              Notifications{' '}
              <span className='badge badge-light badge-pill'>
                {ntfBadgeNum}
              </span>
            </h6>
            <div className='slimscroll notification-list'>
              {notifs.map((notif) => {
                return <NotifLink {...notif} />
              })}
            </div>
          </div>
        </li> */}

        <li className='dropdown'>
          <Link
            className='nav-link dropdown-toggle waves-effect waves-light nav-user'
            data-toggle='dropdown'
            to='#'
            role='button'
            aria-haspopup='false'
            aria-expanded='false'
          >
            <img
              src={`${AWS_BUCKET}/assets/images/users/user-1.png`}
              alt='profile-user'
              className='rounded-circle'
            />
            <span className='ml-1 nav-user-name hidden-sm'>
              {auth.name}
              {/*  <i className='mdi mdi-chevron-down'></i>{' '} */}
            </span>
          </Link>
          {/* <div className='dropdown-menu dropdown-menu-right'>
            <Link className='dropdown-item' to='profile'>
              <i className='ti-user text-muted mr-2'></i> Profile
            </Link>

            <Link className='dropdown-item' to='#'>
              <i className='ti-settings text-muted mr-2'></i> Settings
            </Link>

            <div className='dropdown-divider mb-0'></div>
            <Link className='dropdown-item' to='#'>
              <i className='ti-power-off text-muted mr-2'></i> Logout
            </Link>
          </div> */}
        </li>
      </ul>
    </div>
  )
}

export default TopBar
