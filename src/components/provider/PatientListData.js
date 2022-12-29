import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AWS_BUCKET } from '../../constants'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { MdOutlineEmail, MdPhone } from 'react-icons/md'

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
          'getPatients',
          { Email: auth.email || 'jmmalunao@gmail.com' },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const data = res.data || []

          isMounted && setList(data.slice(0, limit))
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }

    getList()

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
          {item.first_name} {item.middle_name} {item.last_name}
        </Link>
      </td>
      <td>
        <a href={`emailto:${item.email}`}>
          <MdOutlineEmail /> {item.email}
        </a>
      </td>
      <td>
        <a href={`tel:${item.contact_info}`}>
          <MdPhone /> {item.contact_info}
        </a>
      </td>
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
