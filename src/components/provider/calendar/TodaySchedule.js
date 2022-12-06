import { AWS_BUCKET } from "../../../constants"

function TodaySchedule() {
  return (
    <div className="card">
      <div className="card-body">
        <img
          src={`${AWS_BUCKET}/assets/images/widgets/calendar.svg`}
          alt=""
          className="img-fluid"
        />

        <ul className="list-group">
          <li className="list-group-item align-items-center d-flex">
            <div className="media">
              <img
                src={`${AWS_BUCKET}/assets/images/widgets/project1.jpg`}
                className="mr-3 thumb-sm align-self-center rounded-circle"
                alt="..."
              />
              <div className="media-body align-self-center">
                <h5 className="mt-0 mb-1">Heart Operation</h5>
                <p className="text-muted mb-0">Today 07:30 AM</p>
              </div>
            </div>
          </li>
          <li className="list-group-item align-items-center ">
            <div className="media">
              <img
                src={`${AWS_BUCKET}/assets/images/users/user-5.jpg`}
                className="mr-3 thumb-sm align-self-center rounded-circle"
                alt="..."
              />
              <div className="media-body align-self-center">
                <h5 className="mt-0 mb-1">Lunch with my friend</h5>
                <p className="text-muted mb-0">Today 12:30 PM</p>
              </div>
            </div>
          </li>
          <li className="list-group-item align-items-center">
            <div className="media">
              <img
                src={`${AWS_BUCKET}/assets/images/widgets/project3.jpg`}
                className="mr-3 thumb-sm align-self-center rounded-circle"
                alt="..."
              />
              <div className="media-body align-self-center">
                <h5 className="mt-0 mb-1">
                  Call for payment Patient ID : #254136
                </h5>
                <p className="text-muted mb-0">Tomorrow 10:30 AM</p>
              </div>
            </div>
          </li>
          <li className="list-group-item align-items-center ">
            <div className="media">
              <img
                src={`${AWS_BUCKET}/assets/images/users/user-4.jpg`}
                className="mr-3 thumb-sm align-self-center rounded-circle"
                alt="..."
              />
              <div className="media-body align-self-center">
                <h5 className="mt-0 mb-1">Doctors Meeting</h5>
                <p className="text-muted mb-0">01 June 2019 - 09:30 AM</p>
              </div>
            </div>
          </li>
          <li className="list-group-item align-items-center">
            <div className="media">
              <img
                src={`${AWS_BUCKET}/assets/images/widgets/project4.jpg`}
                className="mr-3 thumb-sm align-self-center rounded-circle"
                alt="..."
              />
              <div className="media-body align-self-center">
                <h5 className="mt-0 mb-1">Virtual visit</h5>
                <p className="text-muted mb-0">04 June 2019 - 07:30 AM</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default TodaySchedule
