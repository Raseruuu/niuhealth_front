import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams} from "react-router-dom";
import { AWS_BUCKET, AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { TableTitle } from '../../../components/table/Tables'

import CardItem from '../../../components/cards/Card'
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
          { Email: auth.email},
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
      
      <TableTitle title={"Clinics"}>
      <div className='float-right overflow-visible '>
              <ol className='breadcrumb'>
                <button
                  type='button'
                  className='btn btn-success waves-effect waves-light'
                  onClick={() => navigate('create')}
                >
                  New Clinic
                </button>
              </ol>
            </div>
      </TableTitle>
      
      <div className='row'>
        {list.map((item,index) => (
          <div key={index} className='col-sm-12 col-md-6' >
            <Link to={"profile/"+item.clinic_id}>
            <div className='card flex-sm-col flex-md-row overflow-hidden'>
              
              <img
                className='card-img-top'
                style={{ 
                  // width: 'unset', 
                  width:'200px', height:'150px',objectFit: 'cover'}}
                // src={`${AWS_BUCKET_SERVICES}/assets/images/users/user-10.jpg`}
                src={AWS_BUCKET_SERVICES+item.picture_file}
                // style={{}}
                alt=''
              />
              <div className='card-body'>
                
                <h5 className='card-title'>{item.clinic_name}</h5>
                <p className='card-text mb-0'>{item.address}</p>
                <p className='text-muted mb-0'>
                  {item.specialty}
                </p>
                <p className='mb-0'>{item.working_hours || `Mon 8am - 5pm`}</p>
                
              </div>
              
            </div></Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Clinics
