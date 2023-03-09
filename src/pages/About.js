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
        backgroundRepeat: 'no-repeat',
        position:'absolute',
        backgroundSize: '100%'
      }}
    >
      <div className='container'>
        <div className='col vh-100 '>
          <h1>About</h1>
          <div className='col' >
            {/* <div className='visitCompleteCont'> */}
                
                
                <div className="row">
                  <div className="card p-2 m-2 col-md-3">
                  <b>NiuHealth DrCoco Platform</b><br/>
                    <div className='align-self-center'>
                    <b>Version 1.0.0.0 (drcoco-lives)</b> <br/>
                        [1.0.0.0] - 2023-09-10<br/>
                        <b>Added</b><br/>
                        - Everything<br/>
                        <b>Fixed</b><br/>
                        - Nothing yet<br/>
                        <b>Changed</b><br/>
                        - Upgraded nothing yet<br/>
                        <b>Removed</b><br/>
                        - Nothing yet<br/>
                        <br/>
                        </div>
                  </div>
                 <div className="card p-2 m-2 col-md-3">
                 <b>Provider & Telehealth Platform</b><br/>
                 <div className='align-self-center'>
                  <b> Version 1.0.0 (health-lives)</b><br/>
                          [1.0.0] - 2023-09-10<br/>
                          <b>Added</b>  <br/>
                          - Everything<br/>
                          <b>Fixed</b> <br/>
                          - Nothing yet<br/>
                          <b>Changed</b><br/>
                          - Upgraded nothing yet<br/>
                          <b>Removed</b> <br/>
                          - Nothing yet<br/>
                          </div>
                  </div> 
                 
                  <div className="card p-2 m-2 col-md-3">
                  <b>Marketplace Platform</b><br/>
                  <div className='align-self-center'>
                  <b>Version 1.0.0 (shopping-lives)</b><br/>
                          [1.0.0.0] - 2023-09-10<br/>
                        <b>Added</b><br/>
                        - Everything<br/>
                        <b>Fixed</b><br/>
                        - Nothing yet<br/>
                        <b>Changed</b><br/>
                        - Upgraded nothing yet<br/>
                        <b>Removed</b><br/>
                        - Nothing yet<br/>
                        <br/>
                        </div>
                  </div>
                  <div className="card p-2 m-2 col-md-3">
                    <b>Niu Social Platform</b><br/>
                    <div className='align-self-center'>
                    <b>Version 0.0.5 (buzz-alpha)</b><br/>
                        [0.0.5] - 2023-09-10<br/>
                        <b>Added</b><br/>
                        - TBD<br/>
                        <b>Fixed</b><br/>
                        - TBD<br/>
                        <b>Changed</b><br/>
                        - TBD<br/>
                        <b>Removed</b><br/>
                        - TBD<br/>
                        </div>
                  </div>
                  <div className="card p-2 m-2 col-md-3">
                    <b>Niu Coin Platform</b><br/>
                          Version 0.0.0 (coin-poc) <br/>
                      </div>
                  <div className="card p-2 m-2 col-md-3">
                  <b>Personal Health Platform</b><br/>
                        Version 0.0.0 (phr-poc)<br/>
                  </div>
       </div>
       
            </div>
          </div>
        </div>
      </div>
    // </div>
  )
}
