import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AWS_BUCKET } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

import {TableTitle} from "../../../components/table/Tables"
import CardItem from "../../../components/cards/Card"
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
      
      

      <div className='row'>
        {list.map((item) => (
          <CardItem image={`${AWS_BUCKET}/assets/images/users/user-10.jpg`}>
            <h5 class='card-title'>{item.clinic_name || 'Clinic Name Sample'}</h5>
                    <p class='card-text mb-0'>{item.address}</p>
                    <p className='text-muted mb-0'>
                        {item.services || 'Neurologist / Sleep Doctor / Surgeon'}
                    </p>
                    <p className='mb-0'>{item.working_hours || `Mon 8am - 5pm`}</p>
          </CardItem>
        ))}
      </div>
    </div>
  )
}

export default Clinics
