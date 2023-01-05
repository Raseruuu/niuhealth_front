function TitleBox({text}){
  return(
    <div className='row'>
      <div className='col-sm-12'>
        <div className='page-title-box'>
          <h4 className='page-title'>{text}</h4>
        </div>
      </div>
    </div>
  )
}
function RatingsBox({score,totalReviews}){
  const scorestars=[1,1,1,1,0.5]
  return(
    <div className='p-4 bg-light text-center align-item-center'>
    <h1 className='font-weight-semibold'>{score}</h1>
    <h4 className='header-title'>Overall Rating</h4>
    <ul className='list-inline mb-0 product-review'>
      {scorestars.map((star)=>{

        
        (star===1)?
          (
            <li className='list-inline-item mr-0'>
              <i className='mdi mdi-star text-warning font-24'></i>
            </li>
          ):
        (star===0.5)?
          (
            <li className='list-inline-item mr-0'>
              <i className='mdi mdi-star-half text-warning font-24'></i>
            </li>
          )
        :(
          <li className='list-inline-item mr-0'>
            <i className='mdi mdi-star-half light-gray font-24'></i>
          </li>
          )
        }
      )}
{/*       
      <li className='list-inline-item mr-0'>
        <i className='mdi mdi-star text-warning font-24'></i>
      </li>
      <li className='list-inline-item mr-0'>
        <i className='mdi mdi-star text-warning font-24'></i>
      </li>
      <li className='list-inline-item mr-0'>
        <i className='mdi mdi-star text-warning font-24'></i>
      </li>
      <li className='list-inline-item mr-0'>
        <i className='mdi mdi-star-half text-warning font-24'></i>
      </li>
      <li className='list-inline-item mr-0'>
          <i className='mdi mdi-star light-gray font-24'></i>
        </li> */}
      <li className='list-inline-item'>
        <small className='text-muted'>Total Review ({totalReviews})</small>
      </li>
    </ul>
  </div>
  )
}



function Ratings() {
  return (
    <div className='container-fluid'>
      <TitleBox text="Ratings"/>

      {/* <!-- Calendar --> */}
      <div className='row'>
        <div className='col-lg-3'>
          <div className='card'>
            <div className='card-body'>
              <RatingsBox score={4.8} totalReviews={42} />
              <ul className='list-unstyled mt-3'>
                <li className='mb-2'>
                  <span className='text-dark'>5 Star</span>
                  <small className='float-right text-muted ml-3 font-14'>
                    593
                  </small>
                  <div className='progress mt-2' style={{ height: '5px' }}>
                    <div
                      className='progress-bar bg-secondary'
                      role='progressbar'
                      style={{ width: '80%', borderRadius: '5px' }}
                      aria-valuenow='80'
                      aria-valuemin='0'
                      aria-valuemax='100'
                    ></div>
                  </div>
                </li>
                <li className='mb-2'>
                  <span className='text-dark'>4 Star</span>
                  <small className='float-right text-muted ml-3 font-14'>
                    99
                  </small>
                  <div className='progress mt-2' style={{ height: '5px' }}>
                    <div
                      className='progress-bar bg-secondary'
                      role='progressbar'
                      style={{ width: '18%', borderRadius: '5px' }}
                      aria-valuenow='18'
                      aria-valuemin='0'
                      aria-valuemax='100'
                    ></div>
                  </div>
                </li>
                <li className='mb-2'>
                  <span className='text-dark'>3 Star</span>
                  <small className='float-right text-muted ml-3 font-14'>
                    6
                  </small>
                  <div className='progress mt-2' style={{ height: '5px' }}>
                    <div
                      className='progress-bar bg-secondary'
                      role='progressbar'
                      style={{ width: '10%', borderRadius: '5px' }}
                      aria-valuenow='10'
                      aria-valuemin='0'
                      aria-valuemax='100'
                    ></div>
                  </div>
                </li>
                <li className='mb-2'>
                  <span className='text-dark'>2 Star</span>
                  <small className='float-right text-muted ml-3 font-14'>
                    2
                  </small>
                  <div className='progress mt-2' style={{ height: '5px' }}>
                    <div
                      className='progress-bar bg-secondary'
                      role='progressbar'
                      style={{ width: '1%', borderRadius: '5px' }}
                      aria-valuenow='1'
                      aria-valuemin='0'
                      aria-valuemax='100'
                    ></div>
                  </div>
                </li>
                <li>
                  <span className='text-dark'>1 Star</span>
                  <small className='float-right text-muted ml-3 font-14'>
                    0
                  </small>
                  <div className='progress mt-2' style={{ height: '5px' }}>
                    <div
                      className='progress-bar bg-secondary'
                      role='progressbar'
                      style={{ width: '0%', borderRadius: '5px' }}
                      aria-valuenow='0'
                      aria-valuemin='0'
                      aria-valuemax='100'
                    ></div>
                  </div>
                </li>
              </ul>
              <div className=''>
                <h3 className='d-inline-block mr-2 mb-1 mb-lg-0'>98.5%</h3>
                <h4 className='header-title d-inline-block mr-2 mb-1 mb-lg-0'>
                  Satisfied Customer
                </h4>
                {/* <span className='text-right ml-auto d-inline-block'>
                  <i className='far fa-smile font-24 text-warning'></i>
                </span> */}
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <h6 className='mt-0 mb-4'>Filter</h6>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox3' type='checkbox' />
                      <label for='checkbox3'>
                        {' '}
                        5<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox4' type='checkbox' />
                      <label for='checkbox4'>
                        {' '}
                        4<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox5' type='checkbox' />
                      <label for='checkbox5'>
                        {' '}
                        3<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox6' type='checkbox' />
                      <label for='checkbox6'>
                        {' '}
                        2<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox7' type='checkbox' />
                      <label for='checkbox7'>
                        {' '}
                        1<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox0' type='checkbox' checked />
                      <label for='checkbox0'>
                        <i className='dripicons-camcorder'></i> Virtual Visits
                      </label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox1' type='checkbox' checked />
                      <label for='checkbox1'>
                        <i className=' dripicons-user'></i> In-Person Visits
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <h6 className='mb-3 mt-0'>Age Range</h6>
                    <input type='text' id='range_04' />
                  </div>
                </div>
              </div> */}

              <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <h6 className='mb-3 mt-0'>My Clinics</h6>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox0' type='checkbox' checked />
                      <label for='checkbox0'>BLK Hospital</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox1' type='checkbox' checked />
                      <label for='checkbox1'>Linda's Clinic</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox2' type='checkbox' />
                      <label for='checkbox2'>Sony Center Clinic</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='media'>
                        <a className='' href='#'>
                          <img
                            src='../assets/images/users/user-1.jpg'
                            alt='user'
                            className='rounded-circle thumb-md'
                          />
                        </a>
                        <div className='media-body align-self-center ml-3'>
                          <p className='font-14 font-weight-bold mb-0'>
                            John Tamez
                          </p>
                          <p className='mb-0 font-12 text-muted'>
                            Johntamez@gmail.com
                          </p>

                          <ul className='list-inline mb-2 product-review ratingsPage'>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star-half text-warning'></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='media'>
                        <a className='' href='#'>
                          <img
                            src='../assets/images/users/user-1.jpg'
                            alt='user'
                            className='rounded-circle thumb-md'
                          />
                        </a>
                        <div className='media-body align-self-center ml-3'>
                          <p className='font-14 font-weight-bold mb-0'>
                            Jessica Smith
                          </p>
                          <p className='mb-0 font-12 text-muted'>
                            jessmith20@gmail.com
                          </p>
                          <ul className='list-inline mb-2 product-review ratingsPage'>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star light-gray'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star light-gray'></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='media'>
                        <a className='' href='#'>
                          <img
                            src='../assets/images/users/user-1.jpg'
                            alt='user'
                            className='rounded-circle thumb-md'
                          />
                        </a>
                        <div className='media-body align-self-center ml-3'>
                          <p className='font-14 font-weight-bold mb-0'>
                            Richard Thompson
                          </p>
                          <p className='mb-0 font-12 text-muted'>
                            rich1982@gmail.com
                          </p>
                          <ul className='list-inline mb-2 product-review ratingsPage'>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star-half text-warning'></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='media'>
                        <a className='' href='#'>
                          <img
                            src='../assets/images/users/user-1.jpg'
                            alt='user'
                            className='rounded-circle thumb-md'
                          />
                        </a>
                        <div className='media-body align-self-center ml-3'>
                          <p className='font-14 font-weight-bold mb-0'>
                            Anne Collins
                          </p>
                          <p className='mb-0 font-12 text-muted'>
                            annecollins@gmail.com
                          </p>

                          <ul className='list-inline mb-2 product-review ratingsPage'>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                            <li className='list-inline-item'>
                              <i className='mdi mdi-star text-warning'></i>
                            </li>
                          </ul>
                        </div>
                      </div>
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

export default Ratings
