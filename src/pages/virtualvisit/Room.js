import React, { useEffect, useState } from 'react'

import { ZoomMtg } from '@zoomus/websdk'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import { APP_URL,API_URL, USERTYPE, ZOOM_SDK } from '../../constants'
import "./zoom.css"
function Room() {
  const { auth } = useAuth()
  const { state } = useLocation()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const email = auth?.email || sessionStorage.getItem('email')
  const name = auth?.name || sessionStorage.getItem('name')
  const [symptomVisible,setSymptomVisible] = useState(false)
  let zindex=0
  const isProvider =
    (auth?.userType || sessionStorage.getItem('userType')) === USERTYPE.provider
      ? true
      : false

  var signatureEndpoint =API_URL+"/generateZoomSignature"
    // 'http://niuhealthfront4-env.eba-h3pm89ah.us-west-2.elasticbeanstalk.com'
    // REACT_APP_API_URL
  var sdkKey = ZOOM_SDK
  var meetingNumber = state?.MeetingID
  // var meetingNumber = '4737080721'
  var userName = name
  var userEmail = email
  var passWord = state.Password
  // var passWord = '123456'
  var registrantToken = ''
  var leaveUrl = isProvider
    ? `${APP_URL}/provider/visits`
    : `${APP_URL}/virtualvisit/complete/${encodeURI(meetingNumber)}`

  function getSignature() {
    axiosPrivate
      .post(
        signatureEndpoint,
        {
          MeetingID:meetingNumber,
          Role: isProvider ? 1 : 0,
        },
        {
          headers: {
            'Set-Cookie': 'cross-site-cookie=whatever; SameSite=None; Secure',
          },
        }
      )
      .then((response) => {
        state.MeetingStatus=true
        startMeeting(response.data?.signature)
        // setSymptomVisible(true)
        
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)
        
        ZoomMtg.join({
          // signature: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZGtLZXkiOiJzR3pOdWhaTUJXWkNjTkJqQXh2Q0ZXQXdqR2xuVDlYQnJjMnYiLCJtbiI6IjQ3MzcwODA3MjEiLCJyb2xlIjoiMSIsImlhdCI6MTY3MzYwMTcwMSwiZXhwIjoxNjczNjA1MzAxLCJ0b2tlbkV4cCI6MTY3MzYwNTMwMX0.xC8b0A1BFiJWbco0j3HdCdlPe7DgXCnozKB2KxhVi5g',
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
            
            
            
            // ZoomMtg.showMeetingHeader()
            // if (state.Symptom){
            //   alert(`The patient's symptom is listed as: \n"`+state.Symptom+`"`)}
          },
          error: (error) => {
            console.log(error)
          },
        })
      },
      error: (error) => {
        console.log(error)
      },
    })
  }

  console.log(state)

  useEffect(() => {
    // if (!state?.MeetingID) {
    //   // navigate(-1)
    //   console.log("ugu")
    //   return
    // }

    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.5/lib', '/av')

    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareWebSDK()
    ZoomMtg.i18n.load('en-US')
    ZoomMtg.i18n.reload('en-US')

    getSignature()
    
    // startMeeting()

    return () => {
      document.getElementById('zmmtg-root').style.display = 'none'
    }
  
  }, [])

  return (
    
    <div className="d-flex vw-100 vh-100">
      <div className="flex-fill" style={{ display:'flex', justifyContent: 'center'}} >
      
      {(state.Symptom)?
      (<SymptomDisplay symptom={state.Symptom} z_index={99}/>):null
      }
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
      </div>
    </div>
    
  )
}

export default Room
function SymptomDisplay({symptom, z_index=99}){
  if (symptom)
  {return(
    <>
    <div style={{ position: 'absolute', zIndex:z_index, marginTop:'60px' }}>
        <div className='notification-message-wrap__layer column'>
          <div className="notification-message-wrap__txt-container"> 
            {`The patient's symptom is listed as: \n"`+(symptom)+`" `}
          </div>
          <button onClick={()=>{z_index=0}}className='close-button zmu-btn ax-outline zmu-btn--primary zmu-btn__outline--blue ' style={{marginLeft:10}} >OK</button>
          <i role="button" tabindex="0" className='notification-message-wrap__close close-jd ax-outline' onclick={()=>{symptom=false}}></i>
        </div>
      </div>
      </>
  )}
}