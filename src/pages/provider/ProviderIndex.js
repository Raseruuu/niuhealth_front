import Activity from '../../components/provider/Activity'
import Calendar from '../../components/provider/calendar/Calendar'
import TodaySchedule from '../../components/provider/calendar/TodaySchedule'
import WelcomeCard from '../../components/provider/WelcomeCard'
import PatientListData from '../../components/provider/PatientListData'

function ProviderIndex() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'></div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <WelcomeCard />
        </div>
      </div>

      {/* <!-- Calendar --> */}
      <div className='row'>
        {/* <div className='col-lg-4'>
          <TodaySchedule />
        </div> */}
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <Calendar />
              <div style={{ clear: 'both' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-4'>
          <Activity />
        </div>
        <div className='col-lg-8'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='header-title mt-0 mb-3'>Patient Details</h4>
              <div className='table-responsive'>
                <table className='table'>
                  <thead className='thead-light'>
                    <tr>
                      <th>Patient</th>
                      <th>Email</th>
                      <th>Phone No</th>

                      <th>Status</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    <PatientListData limit={6} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row">
            <div className="col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className=" d-flex justify-content-between">
                    <img
                      src="../assets/images/widgets/monthly-re.png"
                      alt=""
                      height="75"
                    />
                    <div className="align-self-center">
                      <h2 className="mt-0 mb-2 font-weight-semibold">
                        $24,955
                        <span className="badge badge-soft-success font-11 ml-2">
                          <i className="fas fa-arrow-up"></i> 8.6%
                        </span>
                      </h2>
                      <h4 className="title-text mb-0">Monthly Revenue</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-3">Patients Report</h4>
                  <div className="">
                    <div id="d2_performance" className="apex-charts"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="row">
                <div className="col-sm-3">
                  <div className="card crm-data-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4 align-self-center">
                          <div className="icon-info">
                            <i className="far fa-smile rounded-circle bg-soft-success"></i>
                          </div>
                        </div>
                        <div className="col-8 text-right">
                          <p className="text-muted font-14">Total Patients</p>
                          <h3 className="mb-0">528</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card crm-data-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4 align-self-center">
                          <div className="icon-info">
                            <i className="far fa-user rounded-circle bg-soft-pink"></i>
                          </div>
                        </div>
                        <div className="col-8 text-right">
                          <p className="text-muted font-14">Old Patients</p>
                          <h3 className="mb-0">31</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card crm-data-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4 align-self-center">
                          <div className="icon-info">
                            <i className="far fa-handshake rounded-circle bg-soft-purple"></i>
                          </div>
                        </div>
                        <div className="col-8 text-right">
                          <p className="text-muted font-14">New Patients</p>
                          <h3 className="mb-0">396</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card crm-data-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4 align-self-center">
                          <div className="icon-info">
                            <i className="dripicons-arrow-up rounded-circle bg-soft-warning"></i>
                          </div>
                        </div>
                        <div className="col-8 text-right">
                          <p className="text-muted font-14">Patient Growth</p>
                          <h3 className="mb-0">12%</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0">Patients' Gender</h4>
                  <div id="CrmDashChart" className="flot-chart"></div>
                </div>
              </div>
            </div>
          </div> */}

      {/* <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0">Patients by Geo</h4>
                  <div className="row">
                    <div className="col-lg-8">
                      <div
                        id="world-map-markers"
                        className="crm-dash-map drop-shadow-map"
                      ></div>
                    </div>
                    <div className="col-lg-4 align-self-center">
                      <div className="">
                        <span className="text-secondary">Location 1</span>
                        <small className="float-right text-muted ml-3 font-13">
                          81%
                        </small>
                        <div
                          className="progress mt-2"
                          style={{ height: "3px" }}
                        >
                          <div
                            className="progress-bar bg-pink"
                            role="progressbar"
                            style={{ width: "81%", borderRadius: "5px" }}
                            aria-valuenow="81"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="text-secondary">Location 2</span>
                        <small className="float-right text-muted ml-3 font-13">
                          68%
                        </small>
                        <div
                          className="progress mt-2"
                          style={{ height: "3px" }}
                        >
                          <div
                            className="progress-bar bg-secondary"
                            role="progressbar"
                            style={{ width: "68%", borderRadius: "5px" }}
                            aria-valuenow="68"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-secondary">Location 3</span>
                        <small className="float-right text-muted ml-3 font-13">
                          48%
                        </small>
                        <div
                          className="progress mt-2"
                          style={{ height: "3px" }}
                        >
                          <div
                            className="progress-bar bg-purple"
                            role="progressbar"
                            style={{ width: "48%", borderRadius: "5px" }}
                            aria-valuenow="48"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="text-secondary">Location 14</span>
                        <small className="float-right text-muted ml-3 font-13">
                          32%
                        </small>
                        <div
                          className="progress mt-2"
                          style={{ height: "3px" }}
                        >
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "32%", borderRadius: "5px" }}
                            aria-valuenow="32"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="card">
                <div className="card-body dash-info-carousel">
                  <h4 className="mt-0 header-title mb-4">Admissions</h4>
                  <div
                    id="carousel_2"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="media">
                          <img
                            src="../assets/images/users/user-1.jpg"
                            className="mr-2 thumb-lg rounded-circle"
                            alt="..."
                          />
                          <div className="media-body align-self-center">
                            <h4 className="mt-0 mb-1 title-text text-dark">
                              Rene Sta. Maria
                            </h4>
                            <p className="text-muted mb-0">Mood Disorders</p>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="media">
                          <img
                            src="../assets/images/users/user-2.jpg"
                            className="mr-2 thumb-lg rounded-circle"
                            alt="..."
                          />
                          <div className="media-body align-self-center">
                            <h4 className="mt-0 mb-1 title-text">
                              Janice Smith
                            </h4>
                            <p className="text-muted mb-0">
                              Congestive Heart Failure
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="media">
                          <img
                            src="../assets/images/users/user-3.jpg"
                            className="mr-2 thumb-lg rounded-circle"
                            alt="..."
                          />
                          <div className="media-body align-self-center">
                            <h4 className="mt-0 mb-1 title-text">John Bacon</h4>
                            <p className="text-muted mb-0">
                              Urinary Tract Infection
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carousel_2"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carousel_2"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                  <div className="row my-3">
                    <div className="col-sm-6">
                      <p className="mb-0 text-muted font-13">
                        <i className="mdi mdi-album mr-2 text-secondary"></i>
                        Admission
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-muted font-13">
                        <i className="mdi mdi-album mr-2 text-warning"></i>
                        Re-Admission
                      </p>
                    </div>
                  </div>
                  <div
                    className="progress bg-warning mb-3"
                    style={{ height: "5px" }}
                  >
                    <div
                      className="progress-bar bg-secondary"
                      role="progressbar"
                      style={{ width: "65%" }}
                      aria-valuenow="65"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0 text-muted text-truncate align-self-center">
                      <span className="text-success">
                        <i className="mdi mdi-trending-up"></i>1.5%
                      </span>{" "}
                      Up From Last Week
                    </p>
                    <button
                      type="button"
                      className="btn btn-gradient-primary btn-sm"
                    >
                      Leads Report
                    </button>
                  </div>
                  <div className="bg-light p-3 mt-3 d-flex justify-content-between">
                    <div>
                      <h2 className="mb-1 font-weight-semibold">202</h2>
                      <p className="text-muted mb-0">Active Patients</p>
                    </div>
                    <div className="img-group align-self-center">
                      <Link className="user-avatar user-avatar-group" to="">
                        <img
                          src={`${AWS_BUCKET}/assets/images/users/user-6.jpg`}
                          alt="user"
                          className="rounded-circle thumb-xs"
                        />
                      </Link>
                      <Link className="user-avatar user-avatar-group" to="">
                        <img
                          src={`${AWS_BUCKET}/assets/images/users/user-2.jpg`}
                          alt="user"
                          className="rounded-circle thumb-xs"
                        />
                      </Link>
                      <Link className="user-avatar user-avatar-group" to="">
                        <img
                          src={`${AWS_BUCKET}/assets/images/users/user-3.jpg`}
                          alt="user"
                          className="rounded-circle thumb-xs"
                        />
                      </Link>
                      <Link className="user-avatar user-avatar-group" href="">
                        <img
                          src={`${AWS_BUCKET}/assets/images/users/user-4.jpg`}
                          alt="user"
                          className="rounded-circle thumb-xs"
                        />
                      </Link>
                      <Link
                        to=""
                        className="avatar-box thumb-xs align-self-center"
                      >
                        <span className="avatar-title bg-soft-info rounded-circle font-13 font-weight-normal">
                          +25
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
    </div>
  )
}

export default ProviderIndex
