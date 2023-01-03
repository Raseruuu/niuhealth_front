import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AWS_BUCKET } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import TableCard, { TableTextLink , TableTitle } from "../../../components/table/Tables"

function Clinics() {
  const navigate = useNavigate()
  const { auth, setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getList() {
      await axiosPrivate
        .post(
          'getClinics',
          { Email: auth.email || 'jmmalunao@gmail.com' },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
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

      <TableTitle title="Clinics">
        <div className='float-right'>
          <ol className='breadcrumb'>
            <button
              type='button'
              className='btn btn-success waves-effect waves-light'
              onClick={() => navigate('create')}
            >
              New Clinic Schedule
            </button>
          </ol>
        </div>
      </TableTitle>
      <TableCard headers={["Clinic","Address","Services","Working Hours","Action"]}>
        {list.map((item, index) => {
          return (
            <tr key={item?.recno || index}>
              <td>
                <img
                  src={`${AWS_BUCKET}/assets/images/users/user-10.jpg`}
                  alt='user-10'
                  className='thumb-sm rounded-circle mr-2'
                />
                {item.clinic_name}
              </td>
              <td>{item.address}</td>
              <td>{item.services}</td>
              <td>{item.working_hours}</td>

              <td>
                <Link to='#' className='mr-2'>
                  <i className='fas fa-edit text-info font-16'></i>
                </Link>
                <Link to='#'>
                  <i className='fas fa-trash-alt text-danger font-16'></i>
                </Link>
              </td>
            </tr>
          )
        })}
      </TableCard>
      
    </div>
  )
}

export default Clinics
