import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'

function PatientIndexPage() {
  const navigate = useNavigate()
  // TODO: get from CONTEXT
  const isEmailVerified = Boolean(sessionStorage.getItem('email_verified'))

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          <div className='row figmaFirstBox'>
            {/* added paddingTop for space covered by topbar */}
            <div className='col-sm-12'>
              {isEmailVerified ? (
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
              ) : null}
            </div>
          </div>
          <div className='row figmaFirstBox'>
            <div className='col-lg-12'>
              <div className='card'>
                <div className='card-body'>
                  <h2>Start Your First Virtual Visit</h2>
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
                      onClick={() => navigate('/virtualvisit')}
                      type='button'
                      className='btn btn-success btn-round waves-effect waves-light figmaBigButton'
                    >
                      Start Your First Virtual Visit
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
