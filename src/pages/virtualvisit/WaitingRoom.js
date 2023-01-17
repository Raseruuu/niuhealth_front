import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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

        console.log(Data)
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
    getStatus()
    getQueueCount()
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
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/oVAJZMVpL_g"
                  title="YouTube video player"
                  // frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
