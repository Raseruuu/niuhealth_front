import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../../components/Footer'
import RingLoading from '../../components/lottie/RingLoading'
import { APP_URL } from '../../constants'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function PatientIndexPage() {
  const navigate = useNavigate()
  // TODO: get from CONTEXT
  const isEmailVerified = Boolean(sessionStorage.getItem('email_verified'))
  const [subscribed,setSubscribed] = useState()
  const { auth,setAuth } = useAuth();
  
  const axiosPrivate = useAxiosPrivate()
  const [isLoading,setIsLoading]=useState(true)
  const [patient,setPatient]=useState({})
  const has_insurance=sessionStorage.getItem('has_insurance')
  useEffect(()=>{
    
    const controller = new AbortController()
    function getPatientDetails() {
      axiosPrivate
        .post(
          'getPatientDetails',
          {
            Email:auth.email||sessionStorage.getItem('email')
          },
          {signal: controller.signal}
        )
        .then((res) => {
          
          setIsLoading(false)
          console.log('res',res)
          setAuth({...auth,...res.data.Data[0]})
          setSubscribed(parseInt(res.data.Data[0].subscription_plan)>0)
          
          sessionStorage.setItem('has_insurance',res.data.Data[0].has_insurance)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  getPatientDetails()
  },[])
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
                    disabled={isLoading}
                    type='button'
                    className={`btn ${(has_insurance==='true'||subscribed)?"btn-success":"btn-outline-success"}  btn-round waves-effect waves-light figmaBigButton`}
                    onClick={
                      () => {
                        console.log("auth",auth)
                        if (!auth||auth.first_name==="name"||auth.address_line_1===""){
                          Swal.fire({icon:'info',html:"Please complete your registration to continue."})
                          .then(()=>{
                            navigate((`/patient/profile`), { replace: true })
                          })
                        }
                        else if (has_insurance==='true'||subscribed){
                          navigate('/virtualvisit')
                        }
                        else{
                          
                          Swal.fire({
                            html:
                            `
                            Access Virtual Visits by uploading your updated <a href='${APP_URL}/patient/insurance'>Insurance</a>  or by <a href='${APP_URL}/patient/subscription/plans'>Subscribing.</a>
                          
                            `})
                          }
                      }}
                  >
                    {(isLoading)?<div className="row d-flex align-items-center m-0"><RingLoading size={30}/><b>Loading...</b></div>:"Start Your Virtual Visit"}
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
