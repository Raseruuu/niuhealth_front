import React, { useEffect, useState } from 'react'
import { AWS_BUCKET } from '../../../constants'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'

export default function Success() {
  const [rating, setRating] = useState(3)

  const handleRating = (rate) => {
    setRating(rate)
  }
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
                    <div className='media-body align-self-center'>
                      <h2 className='mt-0 mb-1 text-success'>
                        Payment successfully accepted.
                      </h2>
                      <h3 className='mt-0 mb-1 '>
                        Thank you for choosing our service.
                      </h3>
                    </div>
                  </div>

                  <div className='form-group mb-0 row '>
                    <div className='col-12 mt-2 visit_success_btn'>
                      <Link to='..'>
                        <button
                          className='btn btn-gradient-success btn-round waves-effect waves-light'
                          type='button'
                        >
                          Go back to Marketplace
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
