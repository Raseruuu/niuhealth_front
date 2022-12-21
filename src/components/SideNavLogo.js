import imgLogo from '../assets/images/nu-health-logo.png'

function SideNavLogo({ style }) {
  return (
    <img src={imgLogo} alt='logo-small' className='logo-sm' style={style} />
  )
}

export default SideNavLogo
