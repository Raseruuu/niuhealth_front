import { Link } from "react-router-dom"
import { AWS_BUCKET } from "../../constants"

function PatientDetails() {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title mt-0 mb-3">Patient Details</h4>
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Patient</th>
                <th>Email</th>
                <th>Phone No</th>

                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <img
                    src={`${AWS_BUCKET}/assets/images/users/user-10.jpg`}
                    alt=""
                    className="thumb-sm rounded-circle mr-2"
                  />
                  Donald Gardner
                </td>
                <td>xyx@gmail.com</td>
                <td>+123456789</td>

                <td>
                  <span className="badge badge-md badge-soft-purple">
                    Confined
                  </span>
                </td>
                <td>
                  <Link to="#" className="mr-2">
                    <i className="fas fa-edit text-info font-16"></i>
                  </Link>
                  <Link href="#">
                    <i className="fas fa-trash-alt text-danger font-16"></i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={`${AWS_BUCKET}/assets/images/users/user-9.jpg`}
                    alt=""
                    className="thumb-sm rounded-circle mr-2"
                  />
                  Matt Rosales
                </td>
                <td>xyx@gmail.com</td>
                <td>+123456789</td>
                <td>
                  <span className="badge badge-md badge-soft-purple">
                    Confined
                  </span>
                </td>
                <td>
                  <Link to="#" className="mr-2">
                    <i className="fas fa-edit text-info font-16"></i>
                  </Link>
                  <Link to="#">
                    <i className="fas fa-trash-alt text-danger font-16"></i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={`${AWS_BUCKET}/assets/images/users/user-8.jpg`}
                    alt=""
                    className="thumb-sm rounded-circle mr-2"
                  />
                  Michael Hill
                </td>
                <td>xyx@gmail.com</td>
                <td>+123456789</td>

                <td>
                  <span className="badge badge-md badge-soft-danger">
                    Deceased
                  </span>
                </td>
                <td>
                  <Link to="#" className="mr-2">
                    <i className="fas fa-edit text-info font-16"></i>
                  </Link>
                  <Link to="#">
                    <i className="fas fa-trash-alt text-danger font-16"></i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={`${AWS_BUCKET}/assets/images/users/user-7.jpg`}
                    alt=""
                    className="thumb-sm rounded-circle mr-2"
                  />
                  Nancy Flanary
                </td>
                <td>xyx@gmail.com</td>
                <td>+123456789</td>
                <td>
                  <span className="badge badge-md badge-soft-purple">
                    Confined
                  </span>
                </td>
                <td>
                  <Link to="#" className="mr-2">
                    <i className="fas fa-edit text-info font-16"></i>
                  </Link>
                  <Link to="#">
                    <i className="fas fa-trash-alt text-danger font-16"></i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={`${AWS_BUCKET}/assets/images/users/user-6.jpg`}
                    alt=""
                    className="thumb-sm rounded-circle mr-2"
                  />
                  Dorothy Key
                </td>
                <td>xyx@gmail.com</td>
                <td>+123456789</td>
                <td>
                  <span className="badge badge-md badge-soft-primary">
                    Confined
                  </span>
                </td>
                <td>
                  <Link to="#" className="mr-2">
                    <i className="fas fa-edit text-info font-16"></i>
                  </Link>
                  <Link to="#">
                    <i className="fas fa-trash-alt text-danger font-16"></i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={`${AWS_BUCKET}/assets/images/users/user-5.jpg`}
                    alt=""
                    className="thumb-sm rounded-circle mr-2"
                  />
                  Joseph Cross
                </td>
                <td>xyx@gmail.com</td>
                <td>+123456789</td>
                <td>
                  <span className="badge badge-md badge-soft-success">
                    Follow-up Checkup
                  </span>
                </td>
                <td>
                  <Link to="#" className="mr-2">
                    <i className="fas fa-edit text-info font-16"></i>
                  </Link>
                  <Link to="#">
                    <i className="fas fa-trash-alt text-danger font-16"></i>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PatientDetails
