import React, { useEffect } from 'react'

import { ZoomMtg } from '@zoomus/websdk'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'
import { APP_URL, USERTYPE } from '../../constants'

function Room() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const email = auth?.email || sessionStorage.getItem('email')
  const name = auth?.name || sessionStorage.getItem('name')
  const isProvider =
    (auth?.userType || sessionStorage.getItem('userType')) === USERTYPE.provider
      ? true
      : false

  var signatureEndpoint =
    'http://niuhealthfront4-env.eba-h3pm89ah.us-west-2.elasticbeanstalk.com'
  var sdkKey = 'PR20n3Vl85rbugudeRTyHST5pY7RkNimkdpW'
  var meetingNumber = '4737080721'
  var role = isProvider ? 1 : 0
  var userName = name
  var userEmail = email
  var passWord = '123456'
  var registrantToken = ''
  var leaveUrl = isProvider
    ? `${APP_URL}/provider/visits`
    : `${APP_URL}/virtualvisit/complete?meeting=${encodeURI(meetingNumber)}`

  function getSignature() {
    axiosPrivate
      .post(
        signatureEndpoint,
        {
          meetingNumber: meetingNumber,
          role: role,
        },
        {
          headers: {
            'Set-Cookie': 'cross-site-cookie=whatever; SameSite=None; Secure',
          },
        }
      )
      .then((response) => {
        startMeeting(response.data?.signature)
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
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
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

  useEffect(() => {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.5/lib', '/av')

    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareWebSDK()
    ZoomMtg.i18n.load('en-US')
    ZoomMtg.i18n.reload('en-US')

    getSignature()

    return () => {
      document.getElementById('zmmtg-root').style.display = 'none'
    }
  }, [])

  return (
    <div className='d-flex vw-100 vh-100'>
      <div className='flex-fill'>
        <div id='meetingSDKElement'>
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
      </div>
    </div>
  )
}

export default Room
