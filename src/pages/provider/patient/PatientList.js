import { Link, useNavigate } from "react-router-dom"
import { AWS_BUCKET } from "../../../constants"

// Provider list of patients
function PatientList() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            <h4 className='page-title'>Patients</h4>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table'>
                  <thead className='thead-light'>
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
                        <Link
                          to='profile'
                          state={{
                            selectedUser: {
                              name: "Donald Gardner",
                              email: "xyx@gmail.com",
                              status: "Confined",
                            },
                          }}
                        >
                          <img
                            src={`${AWS_BUCKET}/assets/images/users/user-10.jpg`}
                            alt=''
                            className='thumb-sm rounded-circle mr-2'
                          />
                          Donald Gardner
                        </Link>
                      </td>
                      <td>xyx@gmail.com</td>
                      <td>+123456789</td>
                      <td>
                        <span className='badge badge-md badge-soft-purple'>
                          Confined
                        </span>
                      </td>
                      <td>
                        <Link
                          to='profile/edit'
                          state={{
                            selectedUser: {
                              name: "Donald Gardner",
                              email: "xyx@gmail.com",
                              status: "Confined",
                            },
                          }}
                          className='mr-2'
                        >
                          <i className='fas fa-edit text-info font-16'></i>
                        </Link>
                        <Link
                          to='profile/delete'
                          state={{
                            selectedUser: {
                              name: "Donald Gardner",
                              email: "xyx@gmail.com",
                              status: "Confined",
                            },
                          }}
                        >
                          <i className='fas fa-trash-alt text-danger font-16'></i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          to='profile'
                          state={{
                            selectedUser: {
                              name: "Matt Rosales",
                              email: "xyx@gmail.com",
                              status: "Confined",
                            },
                          }}
                        >
                          <img
                            src={`${AWS_BUCKET}/assets/images/users/user-9.jpg`}
                            alt=''
                            className='thumb-sm rounded-circle mr-2'
                          />
                          Matt Rosales
                        </Link>
                      </td>
                      <td>xyx@gmail.com</td>
                      <td>+123456789</td>
                      <td>
                        <span className='badge badge-md badge-soft-purple'>
                          Confined
                        </span>
                      </td>
                      <td>
                        <Link
                          to='profile/edit'
                          state={{
                            selectedUser: {
                              name: "Matt Rosales",
                              email: "xyx@gmail.com",
                              status: "Confined",
                            },
                          }}
                          className='mr-2'
                        >
                          <i className='fas fa-edit text-info font-16'></i>
                        </Link>
                        <Link
                          to='profile/delete'
                          state={{
                            selectedUser: {
                              name: "Matt Rosales",
                              email: "xyx@gmail.com",
                              status: "Confined",
                            },
                          }}
                        >
                          <i className='fas fa-trash-alt text-danger font-16'></i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          to='profile'
                          state={{
                            selectedUser: {
                              name: "Michael Hill",
                              email: "xyx@gmail.com",
                              status: "Deceased",
                            },
                          }}
                        >
                          <img
                            src={`${AWS_BUCKET}/assets/images/users/user-8.jpg`}
                            alt=''
                            className='thumb-sm rounded-circle mr-2'
                          />
                          Michael Hill
                        </Link>
                      </td>
                      <td>xyx@gmail.com</td>
                      <td>+123456789</td>
                      <td>
                        <span className='badge badge-md badge-soft-danger'>
                          Deceased
                        </span>
                      </td>
                      <td>
                        <Link
                          to='profile/edit'
                          state={{
                            selectedUser: {
                              name: "Michael Hill",
                              email: "xyx@gmail.com",
                              status: "Deceased",
                            },
                          }}
                          className='mr-2'
                        >
                          <i className='fas fa-edit text-info font-16'></i>
                        </Link>
                        <Link
                          to='profile/delete'
                          state={{
                            selectedUser: {
                              name: "Michael Hill",
                              email: "xyx@gmail.com",
                              status: "Deceased",
                            },
                          }}
                        >
                          <i className='fas fa-trash-alt text-danger font-16'></i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          to='profile'
                          state={{
                            selectedUser: {
                              name: "Nancy Flanary",
                              email: "xyx@gmail.com",
                              status: "Confined",
                            },
                          }}
                        >
                          <img
                            src={`${AWS_BUCKET}/assets/images/users/user-7.jpg`}
                            alt=''
                            className='thumb-sm rounded-circle mr-2'
                          />
                          Nancy Flanary
                        </Link>
                      </td>
                      <td>xyx@gmail.com</td>
                      <td>+123456789</td>
                      <td>
                        <span className='badge badge-md badge-soft-purple'>
                          Confined
                        </span>
                      </td>
                      <td>
                        <Link
                          to='profile/edit'
                          state={{
                            selectedUser: {
                              name: "Nancy Flanary",
                              status: "Confined",
                              email: "xyx@gmail.com",
                            },
                          }}
                          className='mr-2'
                        >
                          <i className='fas fa-edit text-info font-16'></i>
                        </Link>
                        <Link
                          to='profile/delete'
                          state={{
                            selectedUser: {
                              name: "Nancy Flanary",
                              status: "Confined",
                              email: "xyx@gmail.com",
                            },
                          }}
                        >
                          <i className='fas fa-trash-alt text-danger font-16'></i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          to='profile'
                          state={{
                            selectedUser: {
                              name: "Dorothy Key",
                              status: "Confined",
                              email: "xyx@gmail.com",
                            },
                          }}
                        >
                          <img
                            src={`${AWS_BUCKET}/assets/images/users/user-6.jpg`}
                            alt=''
                            className='thumb-sm rounded-circle mr-2'
                          />
                          Dorothy Key
                        </Link>
                      </td>
                      <td>xyx@gmail.com</td>
                      <td>+123456789</td>
                      <td>
                        <span className='badge badge-md badge-soft-primary'>
                          Confined
                        </span>
                      </td>
                      <td>
                        <Link
                          to='profile'
                          state={{
                            selectedUser: {
                              name: "Dorothy Key",
                              status: "Confined",
                              email: "xyx@gmail.com",
                            },
                          }}
                          className='mr-2'
                        >
                          <i className='fas fa-edit text-info font-16'></i>
                        </Link>
                        <Link
                          to='profile'
                          state={{
                            selectedUser: {
                              name: "Dorothy Key",
                              status: "Confined",
                              email: "xyx@gmail.com",
                            },
                          }}
                        >
                          <i className='fas fa-trash-alt text-danger font-16'></i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          to='profile'
                          state={{
                            selectedUser: {
                              name: "Joseph Cross",
                              status: "Follow-up Checkup",
                              email: "xyx@gmail.com",
                            },
                          }}
                        >
                          <img
                            src={`${AWS_BUCKET}/assets/images/users/user-5.jpg`}
                            alt=''
                            className='thumb-sm rounded-circle mr-2'
                          />
                          Joseph Cross
                        </Link>
                      </td>
                      <td>xyx@gmail.com</td>
                      <td>+123456789</td>
                      <td>
                        <span className='badge badge-md badge-soft-success'>
                          Follow-up Checkup
                        </span>
                      </td>
                      <td>
                        <Link
                          to='profile/edit'
                          state={{
                            selectedUser: {
                              name: "Joseph Cross",
                              email: "xyx@gmail.com",
                              status: "Follow-up Checkup",
                            },
                          }}
                          className='mr-2'
                        >
                          <i className='fas fa-edit text-info font-16'></i>
                        </Link>
                        <Link
                          to='profile/delete'
                          state={{
                            selectedUser: {
                              name: "Joseph Cross",
                              email: "xyx@gmail.com",
                              status: "Follow-up Checkup",
                            },
                          }}
                        >
                          <i className='fas fa-trash-alt text-danger font-16'></i>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PatientList
