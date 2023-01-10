import { Link, useLocation, useParams } from "react-router-dom"
import { AWS_BUCKET } from "../../../constants"
import TableCard, { TableTitle } from "../../../components/table/Tables"

// TODO: check other UI if it has same layout
function PatientProfile() {
  const { action } = useParams()
  let {
    state: { selectedUser },
  } = useLocation()

  console.log("selectedUser", selectedUser)
  // return (
  //   <div>
  //     Profile from Provider
  //     <p>Selected Patient: {JSON.stringify(selectedUser)}</p>
  //     <p>Action: {action}</p>
  //   </div>
  // )
  return (
    <div className='container-fluid'>
      <TableTitle title="Patient Profile">
        <div className='float-right'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/provider'>NU Health</Link>
            </li>
            <li className='breadcrumb-item'>
              <Link to='/provider/patient'>Patient</Link>
            </li>
            <li className='breadcrumb-item active'>{selectedUser.first_name} {selectedUser.middle_name} {selectedUser.last_name}</li>
          </ol>
        </div>
      </TableTitle>
      
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body  met-pro-bg'>
              <div className='met-profile'>
                <div className='row'>
                  <div className='col-lg-4 align-self-center mb-3 mb-lg-0'>
                    <div className='met-profile-main'>
                      <div className='met-profile-main-pic'>
                        <img
                          src={`${AWS_BUCKET}/assets/images/users/user-4.jpg`}
                          alt=''
                          className='rounded-circle'
                        />
                        {/* <span className='fro-profile_main-pic-change'>
                          <i className='fas fa-camera'></i>
                        </span> */}
                      </div>
                      <div className='met-profile_user-detail'>
                        <h5 className='met-user-name'>{selectedUser.first_name} {selectedUser.middle_name} {selectedUser.last_name}</h5>
                        {/* <p className='mb-0 met-user-name-post'>
                          {selectedUser.status}
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 ml-auto'>
                    <ul className='list-unstyled personal-detail'>
                      <li className=''>
                        <i className='dripicons-phone mr-2 text-info font-18'></i>{" "}
                        <b> phone </b> : {selectedUser.contact_info}
                      </li>
                      <li className='mt-2'>
                        <i className='dripicons-mail text-info font-18 mt-2 mr-2'></i>{" "}
                        <b> Email </b> : {selectedUser.email}
                      </li>
                      <li className='mt-2'>
                        <i className='dripicons-location text-info font-18 mt-2 mr-2'></i>{" "}
                        <b>Location</b> : {selectedUser.address}
                      </li>
                    </ul>
                    <div className='button-list btn-social-icon'>
                      <button type='button' className='btn btn-blue btn-circle'>
                        <i className='fab fa-facebook-f'></i>
                      </button>

                      <button
                        type='button'
                        className='btn btn-secondary btn-circle ml-2'
                      >
                        <i className='fab fa-twitter'></i>
                      </button>

                      <button
                        type='button'
                        className='btn btn-pink btn-circle  ml-2'
                      >
                        <i className='fab fa-dribbble'></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <ul className='nav nav-pills mb-0' id='pills-tab' role='tablist'>
                <li className='nav-item'>
                  <a
                    className='nav-link active'
                    id='general_detail_tab'
                    data-toggle='pill'
                    href='#general_detail'
                  >
                    General
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    id='activity_detail_tab'
                    data-toggle='pill'
                    href='#activity_detail'
                  >
                    Patient Chart
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    id='settings_detail_tab'
                    data-toggle='pill'
                    href='#settings_detail'
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='tab-content detail-list' id='pills-tabContent'>
            <div className='tab-pane fade show active' id='general_detail'>
              <div className='row'>
                <div className='col-xl-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className=' d-flex justify-content-between'>
                        <img
                          src={`${AWS_BUCKET}/assets/images/widgets/monthly-re.png`}
                          alt=''
                          height='75'
                        />
                        <div className='align-self-center'>
                          <h2 className='mt-0 mb-2 font-weight-semibold'>
                            $955
                            <span className='badge badge-soft-success font-11 ml-2'>
                              <i className='fas fa-arrow-up'></i> 8.6%
                            </span>
                          </h2>
                          <h4 className='title-text mb-0'>Total Expense</h4>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between bg-purple p-3 mt-3 rounded'>
                        <div>
                          <h4 className='mb-1 font-weight-semibold text-white'>
                            $1,255
                          </h4>
                          <p className='text-white mb-0'>Balance</p>
                        </div>
                        <div>
                          <h4 className=' mb-1 font-weight-semibold text-white'>
                            12 <small>Days</small>
                          </h4>
                          <p className='text-white mb-0'>Confinement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card'>
                    <div className='card-body dash-info-carousel'>
                      <h4 className='mt-0 header-title mb-4'>
                        Recent Checkups
                      </h4>
                      <div
                        id='carousel_1'
                        className='carousel slide'
                        data-ride='carousel'
                      >
                        <div className='carousel-inner'>
                          <div className='carousel-item'>
                            <div className='media'>
                              <img
                                src={`${AWS_BUCKET}/assets/images/users/user-1.jpg`}
                                className='mr-2 thumb-lg rounded-circle'
                                alt='...'
                              />
                              <div className='media-body align-self-center'>
                                <h4 className='mt-0 mb-1 title-text text-dark'>
                                  Dr. Myrtlle Sison
                                </h4>
                                <p className='text-muted mb-0'>Cardiologist</p>
                              </div>
                            </div>
                          </div>
                          <div className='carousel-item'>
                            <div className='media'>
                              <img
                                src={`${AWS_BUCKET}/assets/images/users/user-2.jpg`}
                                className='mr-2 thumb-lg rounded-circle'
                                alt='...'
                              />
                              <div className='media-body align-self-center'>
                                <h4 className='mt-0 mb-1 title-text'>
                                  Dr. Maria Sandoval
                                </h4>
                                <p className='text-muted mb-0'>Cardiologist</p>
                              </div>
                            </div>
                          </div>
                          <div className='carousel-item active'>
                            <div className='media'>
                              <img
                                src={`${AWS_BUCKET}/assets/images/users/user-3.jpg`}
                                className='mr-2 thumb-lg rounded-circle'
                                alt='...'
                              />
                              <div className='media-body align-self-center'>
                                <h4 className='mt-0 mb-1 title-text'>
                                  Dr. Denisse McLaren
                                </h4>
                                <p className='text-muted mb-0'>Urologist</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a
                          className='carousel-control-prev'
                          href='#carousel_1'
                          role='button'
                          data-slide='prev'
                        >
                          <span
                            className='carousel-control-prev-icon'
                            aria-hidden='true'
                          ></span>
                          <span className='sr-only'>Previous</span>
                        </a>
                        <a
                          className='carousel-control-next'
                          href='#carousel_1'
                          role='button'
                          data-slide='next'
                        >
                          <span
                            className='carousel-control-next-icon'
                            aria-hidden='true'
                          ></span>
                          <span className='sr-only'>Next</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-8'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='float-lg-right float-none eco-revene-history justify-content-end'>
                        <ul className='nav'>
                          <li className='nav-item'>
                            <Link className='nav-link active' to='#'>
                              This Week
                            </Link>
                          </li>
                          <li className='nav-item'>
                            <Link className='nav-link' to='#'>
                              Last Week
                            </Link>
                          </li>
                          <li className='nav-item'>
                            <Link className='nav-link' to='#'>
                              Last Month
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <h4 className='header-title mt-0'>Expense</h4>
                      <canvas
                        id='bar'
                        className='drop-shadow w-100'
                        height='350'
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='mt-0 header-title'>Patient Schedule</h4>
                      <div className='dash-datepick'>
                        <input type='hidden' id='light_datepick' />
                      </div>
                      <div className='d-flex justify-content-between p-3 bg-light'>
                        <div className='media'>
                          <img
                            src={`${AWS_BUCKET}/assets/images/users/user-2.jpg`}
                            className='mr-3 thumb-md rounded-circle'
                            alt='...'
                          />
                          <div className='media-body align-self-center'>
                            <h5 className='mt-0 text-dark mb-1'>
                              Harry McCall
                            </h5>
                            <p className='mb-0'>
                              Urologist
                              <span className='text-muted'>
                                {" "}
                                Virtual Visit, follow up checkup @10:00AM
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='mt-0 header-title'>Patient Diagnosis</h4>
                      <p className='text-muted mb-4'>
                        High blood pressure, diabetic, under monitored
                        medication
                      </p>
                      <textarea
                        className='form-control'
                        rows='3'
                        id='clipboardTextarea'
                        defaultValue={`X-ray completed. Diagnosed with severe pneumonia.\nUrinary tract infection with yeast infection.`}
                      ></textarea>
                      <div className='mt-3'>
                        <button
                          type='button'
                          className='btn btn-gradient-secondary btn-clipboard'
                          data-clipboard-action='copy'
                          data-clipboard-target='#clipboardTextarea'
                        >
                          <i className='fas fa-video'></i> Start Virtual Call
                        </button>{" "}
                        <button
                          type='button'
                          className='btn btn-gradient-primary btn-clipboard'
                          data-clipboard-action='cut'
                          data-clipboard-target='#clipboardTextarea'
                        >
                          <i className='fab fa-rocketchat'></i> Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='header-title mt-0 mb-4'>
                        Latest Activity
                      </h4>
                      <div
                        className='slimscroll profile-activity-height'
                        style={{ overflowY: "scroll" }}
                      >
                        <div className='activity'>
                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-checkbox-marked-circle-outline bg-soft-success'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Patient
                                  </span>
                                  updated the status of{" "}
                                  <Link to='' className='text-dark'>
                                    Invoice #1234
                                  </Link>
                                  to Paid
                                </p>
                                <span className='text-muted'>10 Min ago</span>
                              </div>
                            </div>
                          </div>

                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-timer-off bg-soft-pink'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Dr. Peterson
                                  </span>
                                  scheduled a virtual visit on{" "}
                                  <Link to='' className='text-dark'>
                                    Dec 2, 2022
                                  </Link>
                                </p>
                                <span className='text-muted'>50 Min ago</span>
                              </div>
                            </div>
                          </div>

                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-alert-decagram bg-soft-purple'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Dr. Lim
                                  </span>
                                  completed a virtual meet.{" "}
                                  <Link to='' className='text-dark'>
                                    Checkup #112233
                                  </Link>{" "}
                                  was saved to archive.
                                </p>
                                <span className='text-muted'>10 hours ago</span>
                              </div>
                            </div>
                          </div>

                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-clipboard-alert bg-soft-warning'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Patient
                                  </span>
                                  completed a{" "}
                                  <Link to='' className='text-dark'>
                                    Bloodtest
                                  </Link>{" "}
                                  on Laboratory A.
                                </p>
                                <span className='text-muted'>Yesterday</span>
                              </div>
                            </div>
                          </div>
                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-clipboard-alert bg-soft-secondary'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Dr. Maricris Jowels
                                  </span>
                                  was added to the group, group name is{" "}
                                  <Link to='' className='text-dark'>
                                    Physicians
                                  </Link>
                                </p>
                                <span className='text-muted'>14 Nov 2022</span>
                              </div>
                            </div>
                          </div>
                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-clipboard-alert bg-soft-info'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Patient
                                  </span>
                                  request a virtual visit to{" "}
                                  <Link to='' className='text-dark'>
                                    Dr. Nefario
                                  </Link>{" "}
                                  on Dec. 1, 2022.
                                </p>
                                <span className='text-muted'>15 Nov 2022</span>
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

            <div className='tab-pane fade' id='activity_detail'>
              <div className='row'></div>
            </div>

            <div className='tab-pane fade' id='settings_detail'>
              <div className='row'>
                <div className='col-lg-12 col-xl-9 mx-auto'>
                  <div className='card'>
                    <div className='card-body'>
                      <form method='post' className='card-box'>
                        <input
                          type='file'
                          id='input-file-now-custom-1'
                          className='dropify'
                          data-default-file='../assets/images/users/user-4.jpg'
                        />
                      </form>

                      <div className=''>
                        <form className='form-horizontal form-material mb-0'>
                          <div className='form-group'>
                            <input
                              type='text'
                              placeholder='Full Name'
                              className='form-control'
                            />
                          </div>

                          <div className='form-group row'>
                            <div className='col-md-4'>
                              <input
                                type='email'
                                placeholder='Email'
                                className='form-control'
                                name='example-email'
                                id='example-email'
                              />
                            </div>
                            <div className='col-md-4'>
                              <input
                                type='password'
                                placeholder='password'
                                className='form-control'
                              />
                            </div>
                            <div className='col-md-4'>
                              <input
                                type='password'
                                placeholder='Re-password'
                                className='form-control'
                              />
                            </div>
                          </div>
                          <div className='form-group row'>
                            <div className='col-md-6'>
                              <input
                                type='text'
                                placeholder='Phone No'
                                className='form-control'
                              />
                            </div>
                            <div className='col-md-6'>
                              <select className='form-control'>
                                <option>London</option>
                                <option>India</option>
                                <option>Usa</option>
                                <option>Canada</option>
                                <option>Thailand</option>
                              </select>
                            </div>
                          </div>
                          <div className='form-group'>
                            <textarea
                              rows='5'
                              placeholder='Message'
                              className='form-control'
                            ></textarea>
                            <button className='btn btn-gradient-primary btn-sm px-4 mt-3 float-right mb-0'>
                              Update Profile
                            </button>
                          </div>
                        </form>
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

export default PatientProfile
