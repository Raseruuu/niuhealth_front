import { useState,useEffect, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SideNavLogo from '../../components/SideNavLogo'
import {AWS_BUCKET, AWS_BUCKET_SERVICES, AWS_BUCKET_PROFILES } from '../../constants'
import useAuth from '../../hooks/useAuth'
import SAMPLENOTIF from '../../mocks/topbarNotifs'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useLogout from '../../hooks/useLogout'

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
  const logout = useLogout()
  const [notifs, setNotifs] = useState(SAMPLENOTIF)
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const { auth,setAuth } = useAuth()
  const [profile, setProfile] = useState({})
  //notif badge number
  const ntfBadgeNum = notifs.length
  // console.log(ntfBadgeNum)
  // console.log(notifs[0].type)
  function handleLogout(e) {
    e.preventDefault()
    logout()
    navigate('/')
  }
  useEffect(()=>{
    
    const controller = new AbortController()
    async function getProfile() {
      await axiosPrivate
        .post(
          'get'+auth.userType+'Details',
          { Email: auth.email},{signal: controller.signal}
        )
        .then((res) => {
          // console.log("userdata",res.data.Data[0])
          const { Status, Data: data = [], Message } = res.data
          if (Status) {
            setProfile(res.data.Data[0])
            
            
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
      }
     
      
    // if (auth.userType==="Patient"){
      
    //   getProfile()
    // }
    // if (auth.userType==="Patient"){
      
    getProfile()
    // }
    // else if (auth.userType==="Provider"){
    //   getProviderDetails()
    // }
  },[auth])
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
        <li className='dropdown'>
          <Link
            className='nav-link dropdown-toggle waves-effect waves-light nav-user'
            data-toggle='dropdown'
            to='#'
            role='button'
            aria-haspopup='false'
            aria-expanded='false'
          > 
            {(profile)?

            <img
              src={(auth.userType==='Patient')?`${AWS_BUCKET_SERVICES}${profile.picture}`:(auth.userType==='Provider')?`${AWS_BUCKET_SERVICES}providers/${profile.picture}`:`${AWS_BUCKET}/assets/images/users/user-1.png`}
              alt='profile-user'
              className='rounded-circle'
              style={{objectFit:"cover", width:50, height:50}}
            />:null}
            <span className='ml-1 nav-user-name hidden-sm'>
              
              {(auth.userType==='Patient')?(profile.first_name):(auth.userType==='Provider')?profile.provider_name:null}
              {/*  <i className='mdi mdi-chevron-down'></i>{' '} */}
            </span>
          </Link>
          <div className='dropdown-menu dropdown-menu-right'>
            <Link className='dropdown-item' to='profile'>
              <i className='ti-user text-muted mr-2'></i> Profile
            </Link>
            <Link className='dropdown-item' to='about'>
              <i className='ti-info text-muted mr-2'></i> About
            </Link>
            {/* <Link className='dropdown-item' to='#'>
              <i className='ti-settings text-muted mr-2'></i> Settings
            </Link> */}

            <div className='dropdown-divider mb-0'></div>
            <Link className='dropdown-item' to='/' onClick={handleLogout.bind(this)}>
              <i className='ti-power-off text-muted mr-2'></i> Logout
            </Link>
            {/* <div className='logoutDiv'> */}
              {/* <Link className='ti-power-off text-muted mr-2' onClick={handleLogout.bind(this)}>Logout</Link> */}
            {/* </div> */}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default TopBar
