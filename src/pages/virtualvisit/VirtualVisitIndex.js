import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useInterval from '../../hooks/useInterval'


function VisitIndexStep1(){
  return(
    <div className="page-wrapper">
    {/* <!-- Page Content--> */}
      <div className="page-content">
        <div className="container-fluid">
        {/* <!-- Page-Title --> */}
            <div className="row">
                <div className="col-sm-12">
                    <div className="page-title-box">
                        <h4 className="page-title"></h4>
                    </div>
                    {/* <!--end page-title-box--> */}
                </div>
                {/* <!--end col--> */}
            </div>
            {/* <!-- end page title end breadcrumb --> */}
  
  <div className="row "> 
    <div className="col-lg-6">
      <div className="card">
          <div className="card-body">   
          <h3>Tell us why you’re here today</h3>
          
          {/* <Textarea/> */}
          <textarea style={{margin:'30px 0 20px 0'}} className="form-control" rows="5" id="message" placeholder="Add reason for your virtual visit"></textarea>
                            <p className="text-muted mb-3">Upload your files here</p>
                            <input type="file" id="input-file-now" className="dropify" />
              <div className="wizard_btn" style={{marginBottom:"50px"}}> 
                <a href="step_02.html"><button type="button" className="btn btn-success btn-round waves-effect waves-light figmaBigButton float-left">Start Your First Virtual Visit</button>
                </a>
                <p>
                Enjoy our video content while you wait. It’s entertaining, educational and helps us reduce costs for you
                </p>

              </div>
            {/* <!--end of row --> */}
            </div>
            {/* <!--end card-body--> */}
          </div> 
          {/* <!--end card-->                                    */}
        </div>
    <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
        
            <img src="../assets/images/getting-consultation-of-doctor.jpg"  className="steps_img" />
          
                            <div className="media">
                                              
                                <div className="media-body align-self-center">
                                    <h3 className="mt-0 mb-1">How to get the most out of your visit</h3>
                                  
                                </div>
                                {/* <!--end media-body--> */}
                            </div>
                            {/* <!--end media--> */}
                          

          <div className="pricingTable1 text-center">
                                
                              
                                <ul className="list-unstyled pricing-content-2 text-left py-3 border-0 mb-0">
                                    <li>Please give NIU Health permission to access your camera and microphone when starting the visit</li>
                                    <li>Do not start a virtual visit while driving</li>
                                    <li>Be sure your device has a strong internet signal before starting your visit</li>
                                    <li>Try to find a quiet location with good lighting</li>
                                </ul>
                            </div>
          <div>
            
          </div>
                        </div>
                        {/* <!--end card-body-->  */}
                    </div>
                    {/* <!--end card-->                                    */}
                </div>
    
  </div>
  {/* <!--end row--> */}
  
  

        </div>
        {/* <!-- container --> */}

        {/* <footer className="footer text-center text-sm-left">
            &copy; 2022 NU Health 
        </footer> */}
        <Footer />
        {/* <!--end footer--> */}
    </div>
    {/* <!-- end page content --> */}
</div>
  )
}

export default function VirtualVisitIndex() {
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [isReady, setIsReady] = useState(false)
  const [delay, setDelay] = useState('10000')

  const [visitStatus,setVisitStatus] = useState("Step1")
  const getStatus = async () => {
    const controller = new AbortController()
    await axiosPrivate
      .post(
        'getMeetingDetails',
        { MeetingID: '4737080721' },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        const { Status, Message, Data } = res.data
        if (Data?.Status === 'started') {
          setDelay(null)
          setIsReady(true)
        } else {
          setIsReady(false)
        }
      })
      .catch((err) => console.error(err))
  }

  useInterval(getStatus, delay)

  useEffect(() => {
    getStatus()
  }, [])
  if (visitStatus=="Step1"){
    return(<VisitIndexStep1 />)
  }
  return (
    <div className='figma'>
      <div className='page-wrapper'>
        <div className='page-content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='page-title-box'>
                  <h4 className='page-title'></h4>
                </div>
              </div>
            </div>

            <div className='row '>
              <div className='col-lg-6'>
                <iframe
                  width='100%'
                  height='500'
                  src='https://www.youtube.com/embed/oVAJZMVpL_g'
                  title='YouTube video player'
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowfullscreen
                ></iframe>
              </div>

              <div className='col-lg-6'>
                <div className='card'>
                  <div className='card-body'>
                    <h2 style={{ paddingTop: '30px' }}>
                      Thanks for your patience.
                      <br />
                      Your provider will soon be with you.
                    </h2>

                    <div className='steps_title_sub_text'>
                      Keep this window open and active to hold your place in
                      line. Video content is how we keep your healthcare costs
                      low
                    </div>

                    <div className='steps_info_text'>
                      {/* <i className='dripicons-user-group green_h'></i> There are{" "}
                      <span className='green_h'>12</span> patients ahead of you */}
                    </div>
                    <div className='steps_info_text'>
                      {/* <i className='mdi mdi-av-timer green_h'></i> Estimated
                      waiting time is <span className='green_h'>5:20</span> mins */}
                    </div>

                    <div
                      className='wizard_btn'
                      style={{ margin: '50px 0', paddingBottom: '50px' }}
                    >
                      <button
                        type='button'
                        className='btn btn-success btn-round waves-effect waves-light figmaBigButton float-left'
                        onClick={() => navigate('room')}
                        style={{
                          cursor: isReady ? 'pointer' : 'not-allowed',
                        }}
                        disabled={!isReady}
                      >
                        {isReady ? ' Join Virtual Visit Now' : 'Please wait...'}
                      </button>

                      <button
                        onClick={() => navigate(-1)}
                        type='button'
                        className='btn btn-outline-danger btn-round waves-effect waves-light figmaBigButton float-right'
                      >
                        Cancel Visit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  )
}
