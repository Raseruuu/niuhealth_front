import React, { useEffect, useState } from 'react'
import { AWS_BUCKET } from './../constants'
import { Rating } from 'react-simple-star-rating'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'
import { TableTitle } from '../components/table/Tables'

export default function About() {
  // const { auth } = useAuth()
  // const axiosPrivate = useAxiosPrivate()
  // const navigate = useNavigate()
 

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
                <h1>About</h1>
                
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
