import React, { useEffect, useState } from 'react'
import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from '../../constants'
import { Rating } from 'react-simple-star-rating'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'

export default function Complete() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const [rating, setRating] = useState(5.0)
  const [review, setReview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { meetingId } = useParams()
  // const [provider, setProvider] = useState({provider_name:"John Doe"})
  const [meetingDetails, setMeetingDetails] = useState({})
 
  const handleRating = (rate) => {
    console.log(rate)
    setRating(rate)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await axiosPrivate
        .post('createRating', {
          Email: auth.email,
          ProviderEmail: meetingDetails.provider_email,
          MeetingID: meetingId,
          VisitID: meetingDetails.visit_id,
          TransType:meetingDetails.trans_type,
          ServiceID:meetingDetails.service_id,
          Rating: rating,
          Review: review,
        })
        .then((res) => {
          console.log(res.data)
          const { Status, Message } = res.data
          if (Status) {
            navigate('/patient')
          } else {
            alert(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          throw err
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    } catch (error) {
      setIsSubmitting(false)
      console.error(error)
    }
  }
  const getCompleteMeetingDetails = async () => {
    const controller = new AbortController()
    await axiosPrivate
      .post(
        'getCompletedMeetingDetails',
        { Email: auth.email, MeetingID:meetingId },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        const { Data } = res.data

        console.log(Data)
        // setMeetingID(Data.MeetingID)
        setMeetingDetails(Data)
        console.log(meetingDetails)
        
        // if (Data?.Status === 'started') {
        //   setDelay(null)
        //   setIsReady(true)
        // } else {
        //   setIsReady(false)
        // }
      })
      .catch((err) => console.error(err))
  }
  useEffect(()=>{
    
    getCompleteMeetingDetails()

  }, [])
  return (
    <div
      className='account-body visitsuccess vw-100'
      style={{
        backgroundImage: `url(${AWS_BUCKET}/assets/images/11b-05.jpg)`,
      }}
    >
      <div className='container'>
        <div className='row vh-100 '>
          <div className='col-12 align-self-center'>
            <div className='visitCompleteCont'>
              <div className='card auth-card shadow-lg'>
                <div className='card-body'>
                  <div className='media'>
                    {/* <img
                      src={`${AWS_BUCKET}${auth.picture}`}
                      alt=''
                      className='thumb-md rounded-circle mr-2'
                    /> */}
                    <div className='media-body align-self-center'>
                      <h2 className='mt-0 mb-1 text-success'>
                        Your virtual visit is complete.
                      </h2>
                      <h3 className='mt-0 mb-1 '>See you next time!</h3>
                    </div>
                  </div>

                  <div style={{ margin: '30px 0' }}>
                    <div className='media'>
                      <img
                        src={`${AWS_BUCKET_SERVICES}providers/${meetingDetails?.image}`}
                        alt=''
                        className='thumb-md rounded-circle mr-2'
                      />
                      <div className='media-body align-self-center'>
                        <h5>Rate your visit experience with {meetingDetails?.provider_name}</h5>
                      </div>
                    </div>
                    <h4 style={{ marginTop: '30px' }}>
                      How do you rate your experience?
                    </h4>
                    <div className='big_rating'>
                      <Rating
                        allowFraction
                        onClick={handleRating}
                        initialValue={5.0}
                        ratingValue={rating}
                        transition
                        fillColorArray={[
                          '#f17a45',
                          '#f19745',
                          '#f1a545',
                          '#f1b345',
                          '#f1d045',
                        ]}
                      />
                    </div>
                    <h4>Tell to us your experience</h4>
                    <div className='big_rating'>
                      <textarea
                        onChange={(e) => setReview(e.target.value)}
                        className='form-control'
                        maxLength={500}
                      ></textarea>
                    </div>
                  </div>

                  <div className='form-group mb-0 row '>
                    <div className='col-12 mt-2 visit_success_btn'>
                      <button
                        className='btn btn-gradient-success btn-round waves-effect waves-light'
                        type='button'
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        SUBMIT
                      </button>

                      <Link to='/'>
                        <button
                          className='btn btn-outline-info btn-round waves-effect waves-light float-right'
                          type='button'
                        >
                          Skip
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
