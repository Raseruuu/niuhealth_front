import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AWS_BUCKET } from "../../constants"
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

function PatientListData({ limit }) {
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
            setList(data.slice(0, limit))
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

  return list.map((item, index) => (
    <tr key={item?.recno || index}>
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
        <span className='badge badge-md badge-soft-purple'>{item.status}</span>
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
  ))
}

export default PatientListData
