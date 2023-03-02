import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'

function PatientIndexPage() {
  const navigate = useNavigate()
  // TODO: get from CONTEXT
  const isEmailVerified = Boolean(sessionStorage.getItem('email_verified'))
  const has_insurance=sessionStorage.getItem('has_insurance')
  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          <div className='row figmaFirstBox'>
            {/* added paddingTop for space covered by topbar */}
            <div className='col-sm-12'>
              {/* {isEmailVerified ? (
                <div
                  className='alert alert-warning alert-warning-shadow mb-0 alert-dismissible fade show'
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
                  Please verify your email address to be able to use Niu Health
                  services if you dont see the email, you may need to check your
                  spam folder. <a href=''>Resend verification email</a>
                </div>
              ) : null} */}
            </div>
          </div>
          <div className='row figmaFirstBox'>
            <div className='col-lg-12'>
              <div className='card'>
                <div className='card-body'>
                  <h2>Start Your Virtual Visit</h2>
                  <h4 style={{ marginTop: '40px' }}>
                    How does telehealth work?
                  </h4>
                  <ol className='telehealth'>
                    <li>Click on Start Your Virtual Visit</li>
                    <li>
                      Add your reason for visiting and test your mic and camera
                    </li>
                    <li>
                      Enjoy our video content in the virtual waiting room. Your
                      healthcare provider will be with you shortly
                    </li>
                  </ol>
                  
                  <p style={{ marginTop: '40px' }}>
                  <button
                    type='button'
                    className={`btn ${(has_insurance==='true')?"btn-success":"btn-outline-success"}  btn-round waves-effect waves-light figmaBigButton`}
                    onClick={
                      () => {
                        console.log(has_insurance)
                        if (has_insurance==='true'){
                          navigate('/virtualvisit')
                        }
                        else if (has_insurance==='false'){
                          
                          Swal.fire({
                            html:
                            `
                            <a href='subscription/plans'><b>Subscribe Now! </b></a> to access virtual visits.<br>
                            <a href='insurance'><b>Submit Insurance</b></a> 
                             for more benefits.
                            `})
                          }
                      }}
                  >
                    Start Your Virtual Visit
                  </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default PatientIndexPage
