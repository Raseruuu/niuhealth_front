import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import CardItem from '../../../components/cards/Card'
import { AWS_BUCKET, AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import ImageViewer from 'react-simple-image-viewer';
import { useCallback } from 'react'

import styled from "@emotion/styled"
import { StatusTextInsurance2 } from '../../../components/status/Status'


export const StyleWrapper = styled.div`
  .styles-module_image__2hdkJ{
    height : 800px;
    margin-bottom : 120px;
    
    }
  .styles-module_wrapper__1I_qj{
    margin-top : 70px;
    background-color :rgba(0 0 0 / 50%);
  }
  img{
    z-index : 50;
    opacity: 1.0 !important;
  }
`
function Bucket() {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [patientID,setPatientID] = useState("")
  const {bucketid}=useParams()
  const [insuranceBucketName,setInsuranceBucketName]=useState('')
  const [item,setItem]=useState({BucketName:"",BucketId:"",FrontImage:"",BackImage:""})
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  
  
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images,setImages] = useState( []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
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
            const item=data.Buckets.filter((item)=>item.BucketId===bucketid)[0]
            console.log(data.Buckets.filter((item)=>item.BucketId===bucketid)[0] )
            const front=data.Buckets.filter((item)=>item.BucketId===bucketid)[0].FrontImage
            const back =data.Buckets.filter((item)=>item.BucketId===bucketid)[0].BackImage
            const bucketName=data.Buckets.filter((item)=>item.BucketId===bucketid)[0].BucketName
            setInsuranceBucketName(bucketName)
            var tempImageList=[]
            if (item.image1!==""){
              tempImageList.push(`${AWS_BUCKET_SERVICES}insurance/${item.image1}`)
            }
            if (item.image2!==""){
              tempImageList.push(`${AWS_BUCKET_SERVICES}insurance/${item.image2}`)
            }
            if (item.image3!==""){
              tempImageList.push(`${AWS_BUCKET_SERVICES}insurance/${item.image3}`)
            }
            if (item.image4!==""){
              tempImageList.push(`${AWS_BUCKET_SERVICES}insurance/${item.image4}`)
            }
            if (item.image5!==""){
              tempImageList.push(`${AWS_BUCKET_SERVICES}insurance/${item.image5}`)
            }
            if (item.image6!==""){
              tempImageList.push(`${AWS_BUCKET_SERVICES}insurance/${item.image6}`)
            }
            setImages([...tempImageList])
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
                <div className='card-body '>
                  <button 
                    className='btn btn-outline-danger btn-round float-right' 
                    onClick={
                      ()=>{
                        Swal.fire({
                          icon:'warning',
                          html:`Are you sure you want to Delete this Insurance?`,
                          showCancelButton: true,
                          confirmButtonText:'Yes'
                        })
                        .then( 
                          
                          async (isConfirm)=>{
                            console.log('isConfirm',isConfirm)
                            if (isConfirm.isConfirmed===true){
                              await axiosPrivate
                                .post(
                                  // getMyInsuranceBuckets
                                  'patientDeleteInsurance',
                                  { Email: auth.email,
                                    InsuranceBucketID: bucketid },
                                 
                                )
                                .then((res) => {
                                  const { Status, Data: data, Message } = res.data
                                  if (Status) {
                                    Swal.fire({icon:'info',html:`"${insuranceBucketName}" has been deleted.`})
                                    navigate('/patient/insurance')
                                  }
                                  else {
                                    throw new Error(Message)
                                  }
                                }
                                )
                                .catch((err) => {
                                  console.error(err)
                                  setErrMsg(err.message)
                                  Swal.fire({
                                    icon:'warning',
                                    html:`${err.message}`
                                  })
                                })
                            }
                        })
                      }}>
                  Delete 
                <i className="fa fa-trash ml-2" style={{color: 'red',fontSize:'18px'}}></i>
                </button>
                  <h4 className='header-title mt-0 mb-3'> {item.BucketName}</h4>
                  <b>Approval Status:</b> <StatusTextInsurance2 status={item.status}/><br/>
                          
                  <b>Created:</b> {moment(item.DateUploaded).format('hh:mm a MM/DD/YY')}<br/>
                  <br/>
                  {(item.status==="0")||(item.status==="2")?
                  <div className="col-lg-6">
                        <div className="row text-center align-item col-lg-12">
                          <div className="col">
                            
                            <label htmlFor="date" className="col-form-label"><b> Date Start</b></label><br/>
                            
                            {moment(item.start_date).format("MMMM DD, YYYY ")}
                          </div>
                            <div className="col">
                              <label htmlFor="date" className="col-form-label"><b> Date End</b></label><br/>
                              {moment(item.end_date).format("MMMM DD, YYYY ")}
                        </div>
                    </div>
                  </div>
                  :(item.status==="1")?
                  <div className="col-lg-6">
                        <div className="row text-center align-item col-lg-12">
                          <div className="col">
                            
                            <label htmlFor="date" className="col-form-label"><b> Date Start</b></label><br/>
                            
                            {moment(item.validated_start_date).format("MMMM DD, YYYY ")}
                          </div>
                            <div className="col">
                              <label htmlFor="date" className="col-form-label"><b> Date End</b></label><br/>
                              {moment(item.validated_end_date).format("MMMM DD, YYYY ")}
                        </div>
                    </div>
                  </div>:<></>}
                  <div className='row m-5'>


                     {images.map((image,index)=>{
                      return(
                      <CardItem className={"m-2 col lg-4"} >
                      <div className='m-2 col lg-4'  onClick= {() => openImageViewer(index)}>
                          File {index+1}<br/><br/>
                          <img  style={{width:'250px',objectFit:'cover'}} src={image}></img>
                          </div>
                      </CardItem>)
                      })
                    }

                    
                     
                  </div>
                  {/* <div className='file-box-content'> */}

                     

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
                  {/* </div> */}
                  <Link to='..'>
                    <button
                      type='button'
                      className='float-right btn btn-outline-purple btn-round waves-effect waves-light mt-2'
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
      {isViewerOpen && (
        <div style={{marginTop:'100px'}}>
          <StyleWrapper>
            <ImageViewer
              src={ images }
              currentIndex={ currentImage }
              disableScroll={ true   }
              closeOnClickOutside={ true }
              onClose={ closeImageViewer }
            />
          </StyleWrapper>
        </div>
      )}
    </div>
  )
}

export default Bucket
