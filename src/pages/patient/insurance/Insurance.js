import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import CardItem from '../../../components/cards/Card'
import { AWS_BUCKET, AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function Insurance() {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [patientID,setPatientID] = useState("")
  
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    setIsLoading(true)
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
            
            setIsLoading(false)
            setList(data.Buckets)
            setPatientID(res.data.Data.PatientId)
          } 
          else {
            throw new Error(Message)
          }
          
        })
        .catch((err) => {
          
          setIsLoading(false)
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
                  <h4 className='header-title mt-0 mb-3'>Insurance Folders</h4>

                  <div className='file-box-content'>
                    {(list.length===0)?
                      <>
                        <CardItem>{(isLoading)?`Loading...`:(`You have no submitted Insurance Documents.`)}</CardItem>
                      </>:<></>}
                    {list.map((item) => (
                      <Link
                      // className="btn-success waves"
                      style={{background:'none', marginLeft:'2px'}}
                      to={`/patient/insurance/folders/${item.BucketId}`}
                      // onClick={()=>Swal.fire(
                      //   {html: 
                      //     `
                      //       Front Page<br>
                      //       <img src='${AWS_BUCKET_SERVICES}insurance/${patientID}/${item.BucketName}/${item.FrontImage}'></img>
                      //       `
                      //   })}
                      
                    >
                      <div className='file-box'>
                        
                          {/* <i className='dripicons-download file-download-icon'></i> */}
                        
                        <div className='text-center'>
                        <img width={'51px'} height={'66px'} style={{objectFit:'cover'}} src={`${AWS_BUCKET_SERVICES}insurance/${patientID}/${item.BucketName}/${item.FrontImage}`}></img>
                          <i className='far fa-folder text-primary ml-3'></i>
                          <h6 className='text-truncate'>
                            {item.BucketName}
                          </h6>
                          <div className='virtualvisitbadge btn-round btn-purple m-1 p-1'>
                          {item.status==="0"?"For Approval":(item.status==="1")?"Approved":"Rejected"}<br/>
                          </div>
                          <small className='text-muted'>
                          {"Uploaded "+moment(item.DateUploaded).format('hh:mm a MM/DD/YY')}
                            {/* 06 March 2022 / 5MB */}
                          </small>
                        </div>
                      </div>
                        </Link>
                    ))}

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
                 
                  <Link to='upload'>
                    <button
                      type='button'
                      className='float-right btn btn-success btn-round waves-effect waves-light mt-2 m-2'
                    >
                      New Insurance
                    </button>
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className='footer text-center text-sm-left'>
          &copy; 2022 NIU Health
        </footer>
      </div>
    </div>
  )
}

export default Insurance
