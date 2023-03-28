import { useState } from 'react'
import { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useLogout from '../../../hooks/useLogout'

function SideNav({ openSideNav,openSideIcons,removePfp }) {
  const logout = useLogout()
  const navigate = useNavigate()
  const [openSideNav_delayed,setOpenSideNav_delayed]=useState(openSideNav)
  function handleLogout(e) {
    e.preventDefault()
    Swal.fire(
      {
        icon:'question',
        html:`Are you sure you want to Logout?`,
        showConfirmButton:true,
        showCancelButton:true
      }
      )
      .then((result)=>{
        if(result.isConfirmed)
          { 
            logout()
            navigate('/login',{replace:true})
          }
        else{
          return
        }
      })
  }
  useEffect(()=>{
    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
    const handleClick = async event => {
  
      console.log(openSideNav)
      if (openSideNav===true){
        
        await delay(400);
        setOpenSideNav_delayed(openSideNav)
      }
      else{setOpenSideNav_delayed(openSideNav)}
    };
    handleClick()
  },[openSideNav])
  return (
    <div
      className='left-sidenav'
      // style={{ display: openSideNav ? 'block' : 'none', marginTop: '70px' }}
      style={{
        display: (openSideIcons?'block':'none') , 
        marginTop: '70px' ,
        padding:'0px', 
        minWidth:'80px', 
        pxmarginLeft:'-26zpx',
        width:(openSideNav?'260px':'78px'),
        zIndex:10,
        position:(!removePfp?'unset':'absolute')
      }}

    >
      {(openSideNav)?
      <ul className='metismenu left-sidenav-menu'>
      <li>
        <NavLink to='/provider'>
          <i className='ti-bar-chart'></i>
          {(openSideNav_delayed)?
          <span>Dashboard</span>:<></>}
          {/* <span className='menu-arrow'>
            <i className='mdi mdi-chevron-right'></i>
          </span> */}
        </NavLink>
      </li>

      <li>
        <NavLink to='patient'>
          <i className='fas fa-user-friends'></i>
          {(openSideNav_delayed)?
          <span>Patients</span>:<></>}
        </NavLink>
      </li>
      <li>
        <NavLink to='ratings'>
          <i className='far fa-star'></i>
          {(openSideNav_delayed)?
          <span>Ratings</span>:<></>}
        </NavLink>
      </li>
      <li>
        <NavLink to='visits'>
          <i className='fas fa-clock'></i>
          {(openSideNav_delayed)?
          <span>Visits</span>:<></>}
        </NavLink>
      </li>
      <li>
        <NavLink to='visit-requests'>
          <i className='far fa-newspaper'></i>
          {(openSideNav_delayed)?
          <span>Visit Requests</span>:<></>}
        </NavLink>
      </li>
      <li>
        <NavLink to='clinics'>
          <i className='fas fa-medkit'></i>
          {(openSideNav_delayed)?
          <span>Clinics</span>:<></>}
        </NavLink>
      </li>
      <li>
        <NavLink to='services'>
          <i className='fas fa-dolly'></i>
          {(openSideNav_delayed)?
          <span>Services</span>:<></>}
          </NavLink>
      </li>
    </ul>:
     <ul className='metismenu left-sidenav-menu'>
     <li>
       <NavLink to='/provider'>
         <i className='ti-bar-chart'></i>
       </NavLink>
     </li>

     <li>
       <NavLink to='patient'>
         <i className='fas fa-user-friends'></i>
       </NavLink>
     </li>
     <li>
       <NavLink to='ratings'>
         <i className='far fa-star'></i>
       </NavLink>
     </li>
     <li>
       <NavLink to='visits'>
         <i className='fas fa-clock'></i>
       </NavLink>
     </li>
     <li>
       <NavLink to='visit-requests'>
         <i className='far fa-newspaper'></i>
       </NavLink>
     </li>
     <li>
       <NavLink to='clinics'>
         <i className='fas fa-medkit'></i>
       </NavLink>
     </li>
     <li>
       <NavLink to='services'>
         <i className='fas fa-dolly'></i>
       </NavLink>
     </li>
   </ul>}
      
    <div className='logoutDiv row' style={{marginLeft:-18}}>
      <ul className='metismenu left-sidenav-menu'>
        <li>
        {(openSideNav)?
          <NavLink onClick={handleLogout.bind(this)}
            >
              <i className="fas fa-sign-out-alt"></i>
              {(openSideNav_delayed)?
              <span>Logout</span>:<></>}
            </NavLink>:
          <NavLink onClick={handleLogout.bind(this)}>
              <i className="fas fa-sign-out-alt"></i>
            </NavLink>
            }
          </li>
          </ul>
      </div>
    </div>
  )
}

export default SideNav
