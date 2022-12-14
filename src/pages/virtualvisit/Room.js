import React, { useEffect } from "react"

import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useNavigate } from "react-router-dom"
import { USERTYPE } from "../../constants"

function Room() {
  const client = ZoomMtgEmbedded.createClient()
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const email = auth?.email || sessionStorage.getItem("email")
  const isProvider =
    (auth?.userType || sessionStorage.getItem("userType")) === USERTYPE.provider
      ? true
      : false

  console.log("isProvider: ", isProvider)

  var signatureEndpoint =
    "http://niuhealthfront4-env.eba-h3pm89ah.us-west-2.elasticbeanstalk.com"
  var sdkKey = "PR20n3Vl85rbugudeRTyHST5pY7RkNimkdpW"
  var meetingNumber = "4737080721"
  var role = isProvider ? 1 : 0
  var userName = isProvider ? "Provider" : "Patient"
  var userEmail = email
  var passWord = "123456"
  var registrantToken = ""

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
            "Set-Cookie": "cross-site-cookie=whatever; SameSite=None; Secure",
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
    let meetingSDKElement = document.getElementById("meetingSDKElement")

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        // meetingInfo: [
        //   "topic",
        //   "host",
        //   "mn",
        //   "pwd",
        //   "telPwd",
        //   "invite",
        //   "participant",
        //   "dc",
        //   "enctype",
        // ],
        video: {
          isResizable: true,
          viewSizes: {
            default: {
              width: 1000,
              height: 600,
            },
            ribbon: {
              width: 300,
              height: 700,
            },
          },
        },
        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button")
                navigate(-1)
              },
            },
          ],
        },
      },
    })

    client.join({
      sdkKey: sdkKey,
      signature: signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
    })
  }

  useEffect(() => {
    getSignature()
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
