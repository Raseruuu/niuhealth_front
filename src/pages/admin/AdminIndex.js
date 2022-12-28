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
            <div className='col-lg-12'>
              <div className='card'>
                <div className='card-body'>
                  <h2>Do some Admin things</h2>
                  <h4 style={{ marginTop: '40px' }}>
                    I'm an admin?
                  </h4>
                  <ol className='telehealth'>
                    <li>Really?</li>
                    <li>
                      Cool
                    </li>
                    <li>
                      I don't believe it
                    </li>
                  </ol>
                  <p style={{ marginTop: '40px' }}>
                    <button
                      onClick={() => navigate('/virtualvisit')}
                      type='button'
                      className='btn btn-success btn-round waves-effect waves-light figmaBigButton'
                    >
                      Awesome.
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
