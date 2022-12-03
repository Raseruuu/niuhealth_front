import Footer from "../../components/Footer"

function Appointment() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="page-title">Appointments</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="task-box">
                    <div className="task-priority-icon">
                      <i className="fas fa-circle text-purple"></i>
                    </div>
                    <p className="text-muted float-right">
                      <span className="text-muted">9:30 AM</span>
                      <span className="mx-1">·</span>
                      <span>
                        <i className="far fa-fw fa-clock"></i> June 06, 2022
                      </span>
                    </p>
                    <div className="media">
                      <a className="" href="#">
                        <img
                          src="../assets/images/users/user-1.jpg"
                          alt="user"
                          className="rounded-circle thumb-md"
                        />
                      </a>
                      <div className="media-body align-self-center ml-3">
                        <p className="font-14 font-weight-bold mb-0">
                          Provider Name
                          <span className="virtualvisitbadge badge badge-md badge-soft-purple">
                            Upcoming
                          </span>
                        </p>
                        <p className="mb-0 font-12 text-muted">Specialty</p>
                      </div>
                    </div>
                    <p className="text-muted mb-1 virtDesc">
                      <strong>Hub: </strong> Hawaii Kai Health Hub
                    </p>

                    <div className="virtDesc d-flex justify-content-between">
                      <div className="br-wrapper br-theme-fontawesome-stars">
                        <strong>Hub Address:</strong> 45-1151 kamehameha, Hwy,
                        Suite H View location on map
                      </div>

                      <div className="list-inline mb-0 align-self-center">
                        <button
                          type="button"
                          className="btn btn-danger btn-round waves-effect waves-light"
                        >
                          Cancel Visit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="task-box">
                    <div className="task-priority-icon">
                      <i className="fas fa-circle text-danger"></i>
                    </div>
                    <p className="text-muted float-right">
                      <span className="text-muted">9:30 AM</span>
                      <span className="mx-1">·</span>
                      <span>
                        <i className="far fa-fw fa-clock"></i> June 06, 2022
                      </span>
                    </p>
                    <div className="media">
                      <a className="" href="#">
                        <img
                          src="../assets/images/users/user-1.jpg"
                          alt="user"
                          className="rounded-circle thumb-md"
                        />
                      </a>
                      <div className="media-body align-self-center ml-3">
                        <p className="font-14 font-weight-bold mb-0">
                          Provider Name
                          <span className="virtualvisitbadge badge badge-md badge-soft-danger">
                            Cancelled by you
                          </span>
                        </p>
                        <p className="mb-0 font-12 text-muted">Specialty</p>
                      </div>
                    </div>
                    <p className="text-muted mb-1 virtDesc">
                      <strong>Hub: </strong> Hawaii Kai Health Hub
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="task-box">
                    <div className="task-priority-icon">
                      <i className="fas fa-circle text-success"></i>
                    </div>
                    <p className="text-muted float-right">
                      <span className="text-muted">9:30 AM</span>
                      <span className="mx-1">·</span>
                      <span>
                        <i className="far fa-fw fa-clock"></i> June 06, 2022
                      </span>
                    </p>
                    <div className="media">
                      <a className="" href="#">
                        <img
                          src="../assets/images/users/user-1.jpg"
                          alt="user"
                          className="rounded-circle thumb-md"
                        />
                      </a>
                      <div className="media-body align-self-center ml-3">
                        <p className="font-14 font-weight-bold mb-0">
                          Provider Name
                          <span className="virtualvisitbadge badge badge-md badge-soft-success">
                            Completed
                          </span>
                        </p>
                        <p className="mb-0 font-12 text-muted">Specialty</p>
                      </div>
                    </div>
                    <p className="text-muted mb-1 virtDesc">
                      <strong>Hub: </strong> Hawaii Kai Health Hub
                    </p>

                    <div className="virtDesc d-flex justify-content-between">
                      <div className="br-wrapper br-theme-fontawesome-stars">
                        <strong>Rate your experience: </strong>
                        <select
                          id="example-fontawesome"
                          style={{ display: "none" }}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="list-inline mb-0 align-self-center">
                        <button
                          type="button"
                          className="btn btn-success btn-round waves-effect waves-light"
                        >
                          View Visit Summary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="task-box">
                    <div className="task-priority-icon">
                      <i className="fas fa-circle text-danger"></i>
                    </div>
                    <p className="text-muted float-right">
                      <span className="text-muted">9:30 AM</span>
                      <span className="mx-1">·</span>
                      <span>
                        <i className="far fa-fw fa-clock"></i> June 06, 2022
                      </span>
                    </p>
                    <div className="media">
                      <a className="" href="#">
                        <img
                          src="../assets/images/users/user-1.jpg"
                          alt="user"
                          className="rounded-circle thumb-md"
                        />
                      </a>
                      <div className="media-body align-self-center ml-3">
                        <p className="font-14 font-weight-bold mb-0">
                          Provider Name
                          <span className="virtualvisitbadge badge badge-md badge-soft-danger">
                            Cancelled by Doctor
                          </span>
                        </p>
                        <p className="mb-0 font-12 text-muted">Specialty</p>
                      </div>
                    </div>
                    <p className="text-muted mb-1 virtDesc">
                      <strong>Hub: </strong> Hawaii Kai Health Hub
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Appointment
