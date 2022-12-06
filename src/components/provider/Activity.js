import { Link } from "react-router-dom"

function Activity() {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title mt-0 mb-3">Activity</h4>
        <div className="slimscroll crm-dash-activity">
          <div className="activity">
            <div className="activity-info">
              <div className="icon-info-activity">
                <i className="mdi mdi-checkbox-marked-circle-outline bg-soft-success"></i>
              </div>
              <div className="activity-info-text">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="m-0 w-75">Surgery finished</h6>
                  <span className="text-muted d-block">10 Min ago</span>
                </div>
                <p className="text-muted mt-3">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration.
                  <Link to="#" className="text-info">
                    [more info]
                  </Link>
                </p>
              </div>
            </div>

            <div className="activity-info">
              <div className="icon-info-activity">
                <i className="mdi mdi-timer-off bg-soft-pink"></i>
              </div>
              <div className="activity-info-text">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="m-0  w-75">Emeregeny Room</h6>
                  <span className="text-muted">50 Min ago</span>
                </div>
                <p className="text-muted mt-3">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration.
                  <Link to="#" className="text-info">
                    [more info]
                  </Link>
                </p>
                <span className="badge badge-soft-secondary">Accident</span>
                <span className="badge badge-soft-secondary">ER</span>
              </div>
            </div>
            <div className="activity-info">
              <div className="icon-info-activity">
                <i className="mdi mdi-alert-decagram bg-soft-purple"></i>
              </div>
              <div className="activity-info-text">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="m-0  w-75">Virtual visit</h6>
                  <span className="text-muted">10 hours ago</span>
                </div>
                <p className="text-muted mt-3">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration.
                  <Link to="#" className="text-info">
                    [more info]
                  </Link>
                </p>
              </div>
            </div>

            <div className="activity-info">
              <div className="icon-info-activity">
                <i className="mdi mdi-clipboard-alert bg-soft-warning"></i>
              </div>
              <div className="activity-info-text">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="m-0">Clinic checkup</h6>
                  <span className="text-muted">Yesterday</span>
                </div>
                <p className="text-muted mt-3">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration.
                  <Link to="#" className="text-info">
                    [more info]
                  </Link>
                </p>
              </div>
            </div>
            <div className="activity-info">
              <div className="icon-info-activity">
                <i className="mdi mdi-clipboard-alert bg-soft-secondary"></i>
              </div>
              <div className="activity-info-text">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="m-0">New Patient Consultation</h6>
                  <span className="text-muted">14 Nov 2019</span>
                </div>
                <p className="text-muted mt-3">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration.
                  <Link to="#" className="text-info">
                    [more info]
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
