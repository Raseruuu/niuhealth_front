import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AWS_BUCKET } from "../../../constants"
import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

// Provider list of patients
function PatientList() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])

  /*
  For Status:
  Confined -  badge-soft-purple
  Deceased - badge-soft-danger
  Follow-up Checkup - badge-soft-success
  */

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getList() {
      await axiosPrivate
        .post(
          "getPatients",
          { Email: auth.email || "jmmalunao@gmail.com" },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { StatusCode: statusCode, Data: data = [], Message } = res.data

          if (statusCode === 200) {
            setList(data)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }

    isMounted && getList()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

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
                    {list.map((item) => (
                      <tr>
                        <td>
                          <Link
                            to='profile'
                            state={{
                              selectedUser: item,
                            }}
                          >
                            <img
                              src={`${AWS_BUCKET}/assets/images/users/user-10.jpg`}
                              alt=''
                              className='thumb-sm rounded-circle mr-2'
                            />
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <span className='badge badge-md badge-soft-purple'>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <Link
                            to='profile/edit'
                            state={{
                              selectedUser: item,
                            }}
                            className='mr-2'
                          >
                            <i className='fas fa-edit text-info font-16'></i>
                          </Link>
                          <Link
                            to='profile/delete'
                            state={{
                              selectedUser: item,
                            }}
                          >
                            <i className='fas fa-trash-alt text-danger font-16'></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
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
