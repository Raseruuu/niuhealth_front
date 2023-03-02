import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import CardItem from '../../../components/cards/Card'
import { AWS_BUCKET, AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function Bucket() {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [patientID,setPatientID] = useState("")
  const {bucketid}=useParams()
  const [item,setItem]=useState({BucketName:"",BucketId:"",FrontImage:"",BackImage:""})
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    
    async function getList() {
      await axiosPrivate
        .post(
          // getMyInsuranceBuckets
          'getMyInsuranceBuckets',
          { Email: auth.email },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data, Message } = res.data

          if (Status) {
            setList(data.Buckets)
            setPatientID(res.data.Data.PatientId)
            setItem(data.Buckets.filter((item)=>item.BucketId===bucketid)[0] )
            console.log(data.Buckets.filter((item)=>item.BucketId===bucketid)[0] )
          } 
          else {
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
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          {/* {(list.length===0)?
          <div className='row figmaFirstBox'>
            <div className='col-sm-12'>
              <div
                className='alert alert-warning alert-warning-shadow mb-0 alert-dismissible fade show'
                role='alert'
              >
                <button
                  type='button'
                  className='close'
                  data-dismiss='alert'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>
                    <i className='mdi mdi-close'></i>
                  </span>
                </button>
                You currently have no active insurance documents submitted. Please upload a 
                document. If you don’t have insurance, please subscribe to
                <a href=''>our monthly plan</a>
              </div>
            </div>
          </div>:null
          } */}
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-title-box'>
                <h4 className='page-title'>Insurance</h4>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='header-title mt-0 mb-3'> {item.BucketName}</h4>
                  Created: {moment(item.DateUploaded).format('hh:mm a MM/DD/YY')}
                  <br/>
                  <div className='row m-5'>
                    
                     <CardItem className={"m-2 col lg-4"}>
                      <div className=''>
                        Front Image<br/><br/>
                        <img style={{width:'250px',objectFit:'cover'}} src={`${AWS_BUCKET_SERVICES}insurance/${patientID}/${item.BucketName}/${item.FrontImage}`}></img>
                        </div>
                     </CardItem>
                     <CardItem className={"m-2 col lg-4"}>
                     <div className='m-2 col lg-6'>
                     Back Image<br/><br/>
                        <img  style={{width:'250px',objectFit:'cover'}} src={`${AWS_BUCKET_SERVICES}insurance/${patientID}/${item.BucketName}/${item.FrontImage}`}></img>
                        </div>
                     </CardItem>
                  </div>
                  <div className='file-box-content'>

                     

                    {/* <div className='file-box'>
                      <a href='#' className='download-icon-link'>
                        <i className='dripicons-download file-download-icon'></i>
                      </a>
                      <div className='text-center'>
                        <i className='far fa-file-code text-danger'></i>
                        <h6 className='text-truncate'>Insurance.pdf</h6>
                        <small className='text-muted'>
                          15 March 2022 / 8MB
                        </small>
                      </div>
                    </div> */}
                  </div>

                  <Link to='..'>
                    <button
                      type='button'
                      className='float-right btn btn-danger btn-round waves-effect waves-light mt-2'
                    >
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className='footer text-center text-sm-left'>
          &copy; 2022 NU Health
        </footer>
      </div>
    </div>
  )
}

export default Bucket
