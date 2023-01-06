import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AWS_BUCKET, AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

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
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            {/* <div className='float-right'>
              <ol className='breadcrumb'>
                <button
                  type='button'
                  className='btn btn-success waves-effect waves-light'
                  onClick={() => navigate('create')}
                >
                  New Clinic Schedule
                </button>
              </ol>
            </div> */}
            <h4 className='page-title'>Clinics</h4>
          </div>
        </div>
      </div>

      <div className='row'>
        {list.map((item) => (
          <div className='col-sm-12 col-md-6'>
            <div class='card flex-sm-col flex-md-row overflow-hidden'>
              <img
                class='card-img-top'
                style={{ 
                  // width: 'unset', 
                  width:'200px', height:'150px',objectFit: 'cover'}}
                // src={`${AWS_BUCKET_SERVICES}/assets/images/users/user-10.jpg`}
                src={AWS_BUCKET_SERVICES+item.picture_file}
                // style={{}}
                alt=''
              />
              <div class='card-body'>
                <h5 class='card-title'>{item.clinic_name || 'Clinic Name Sample'}</h5>
                <p class='card-text mb-0'>{item.address}</p>
                <p className='text-muted mb-0'>
                  {item.services || 'Neurologist / Sleep Doctor / Surgeon'}
                </p>
                <p className='mb-0'>{item.working_hours || `Mon 8am - 5pm`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Clinics
