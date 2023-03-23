import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useInterval from '../../hooks/useInterval'

export default function WaitingRoom() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [isReady, setIsReady] = useState(false)
  const [delay, setDelay] = useState('10000')
  const [queueCount, setQueueCount] = useState('-')
  const [meetingID, setMeetingID] = useState({})
  const [password, setPassword] = useState({})
  const myVideo = useRef('video1');
  
  const [videoLinks,setVideoLinks]=useState([
    
    "https://drcoco-bucket.s3.us-west-1.amazonaws.com/videos/default/PSA_Exercise_01.mp4",
    "https://drcoco-bucket.s3.us-west-1.amazonaws.com/videos/default/Ruby_Tuesday_April_2022_EMAIL_VERSION.mp4",
    "https://drcoco-bucket.s3.us-west-1.amazonaws.com/videos/default/Braddah_2_Braddah___Diabetes.mp4",
    "https://drcoco-bucket.s3.us-west-1.amazonaws.com/videos/default/braddah_2_braddah___gout+(720p).mp4",
    "https://drcoco-bucket.s3.us-west-1.amazonaws.com/videos/default/braddah_2_braddah___hypertension+(720p).mp4",
    "https://drcoco-bucket.s3.us-west-1.amazonaws.com/videos/default/Ask_The_Doctor___Eps.1.mp4",
    "https://drcoco-bucket.s3.us-west-1.amazonaws.com/videos/default/Ask_the_Doctor___Eps._2.mp4",
    "https://drcoco-bucket.s3.us-west-1.amazonaws.com/videos/default/Ask_the_Doctor___Eps._3.mp4",
    
  ])
  const randomindex = Math.floor(Math.random() * videoLinks.length)
  const [currentVideo, setCurrentVideo] = useState(videoLinks[randomindex])
  const [videoIndex, setVideoIndex] = useState(0)
  
  function playNextVideo(){
    var next_src=""
    if (videoIndex===videoLinks.length-1){
      setVideoIndex(0)
      next_src=videoLinks[0]
    }
    else{
      setVideoIndex(videoIndex+1)
      next_src=videoLinks[videoIndex+1]
    }
    
    setCurrentVideo(next_src)
    myVideo.current.src=next_src
    myVideo.current.play()

  }
  function playPreviousVideo(){
    var next_src=""
    if (videoIndex===0){
      setVideoIndex(videoLinks.length-1)
      next_src=videoLinks[videoLinks.length-1]
    }
    else{
      setVideoIndex(videoIndex-1)
      next_src=videoLinks[videoIndex-1]
    }
    setCurrentVideo(next_src)
    myVideo.current.src=next_src
    myVideo.current.play()

  }
  const getQueueCount = async () => {
    const controller = new AbortController()
    await axiosPrivate
      .get('getVirtualVisitQue', {
        signal: controller.signal,
      })
      .then((res) => {
        const data = res.data

        setQueueCount(data?.Data || '-')
      })
      .catch((err) => console.error(err))
  }

  const getStatus = async () => {
    const controller = new AbortController()
    await axiosPrivate
      .post(
        'getMeetingDetails',
        { Email: auth.email || sessionStorage.getItem('email') },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        const { Data } = res.data

        setMeetingID(Data.MeetingID)
        setPassword(Data.Passcode)

        if (Data?.Status === 'started') {
          setDelay(null)
          setIsReady(true)
        } else {
          setIsReady(false)
        }
      })
      .catch((err) => console.error(err))
  }

  // we need to put getStatus and getQueueCount on useInterval,
  useInterval(getStatus, delay)
  useInterval(getQueueCount, delay)
  useEffect(() => {
    const handleContextmenu = e => {
        e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
        document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [ ])
  useEffect(() => {
    
    getStatus()
    getQueueCount()
    Swal.fire({
      html:"Please stay until an available doctor picks you in waiting room.",
      // timer: 1,
      // timerProgressBar: true,
      
    })
    .then(()=>{myVideo.current.play()})
  }, [])

  return (
    <div className="figma">
      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-fluid">
            {/* <div className='row'>
              <div className='col-sm-12'>
                <div className='page-title-box'>
                  <h4 className='page-title'></h4>
                </div>
              </div>
            </div> */}

            <div className="row ">
              <div className="col-lg-6">
                {/* <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/oVAJZMVpL_g"
                  title="YouTube video player"
                  // frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                >

                </iframe> */}
                
                  
                  <>

                    <video
                      width="100%"
                      height="442" 
                      // controls={true}
                      name={"video1"}
                      ref={myVideo}
                      // muted
                      type="video/mp4"
                      onEnded={()=>{playNextVideo()}}
                      // playsinline={true}
                      >
                        {/* <source type="video/webm" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"></source> */}
                        
                          <source type="video/mp4" src={currentVideo}></source> 
                          
                         
                      </video>
                      {/* <div className='d-flex' style={{justifyContent: "space-around"}}>
                        <button className='btn btn-outline-success' onClick={()=>{playPreviousVideo()}}>Previous Video</button>
                        <button className='btn btn-outline-success' onClick={()=>{playNextVideo()}}>Next Video</button>
                      </div> */}
                    </>
               
                
                  {/* <source src="movie.mp4" type="video/mp4">
                  <source src="movie.ogg" type="video/ogg"> */}
                    {/* Your browser does not support the video tag. */}
                {/* </video> */}
              </div>

              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h2 style={{ paddingTop: '30px' }}>
                      Thanks for your patience.
                      <br />
                      Your provider will soon be with you.
                    </h2>
                    <div className="steps_title_sub_text">
                      Keep this window open and active to hold your place in
                      line. Video content is how we keep your healthcare costs
                      low.
                    </div>
                    <div className="steps_info_text">
                      {/* <i className='dripicons-user-group green_h'></i> There are{" "}
                      <span className='green_h'>12</span> patients ahead of you */}
                    </div>
                    <div className="steps_info_text" style={{fontSize:16}}>
                      {/* <i className='mdi mdi-av-timer green_h'></i> Estimated
                      waiting time is <span className='green_h'>5:20</span> mins */}
                    </div>
                    <div className="steps_info_text">
                    There are <strong>{queueCount}</strong> people in the queue
                    </div>
                    <div
                      className="wizard_btn"
                      style={{ margin: '50px 0', paddingBottom: '50px' }}
                    >
                      <button
                        type="button"
                        className="btn btn-success btn-round waves-effect waves-light figmaBigButton float-left"
                        onClick={() =>
                          navigate('../room', {
                             state: 
                             {MeetingID:meetingID,
                              Password:password}
                            })
                        }
                        style={{
                          cursor: isReady ? 'pointer' : 'not-allowed',
                        }}
                        disabled={!isReady}
                      >
                        {isReady ? ' Join Virtual Visit Now' : 'Please wait...'}
                      </button>

                      <button
                        onClick={() => navigate('/patient')}
                        type="button"
                        className="btn btn-outline-danger btn-round waves-effect waves-light figmaBigButton float-right"
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
