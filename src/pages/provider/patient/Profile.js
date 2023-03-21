import { Link, useLocation, useParams } from "react-router-dom"
import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from "../../../constants"
import TableCard, { TableTitle } from "../../../components/table/Tables"
import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import CardItem from "../../../components/cards/Card"
import { useCallback } from "react"
import ImageViewer from 'react-simple-image-viewer';

// TODO: check other UI if it has same layout
import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"
import moment from "moment"
import { StatusTextInsurance2, StatusTextInsurance3 } from "../../../components/status/Status"

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

const StatusText = ({ status }) => {
  const statusColor = {
    0: 'badge-soft-purple',
    1: "badge-soft-success",
    2: 'badge-soft-danger',
    3: 'badge-soft-danger',
    4: "badge-soft-success",
  }
  const statusText = {
    0: 'For Approval',
    1: "Completed",
    2: 'Cancelled By You',
    3: 'Cancelled By Doctor',
    4: "Approved",
  }
  return (
    <span className={`virtualvisitbadge badge badge-md ${statusColor[status]}`}>
      {statusText[status]}
    </span>
  )
}

const StatusIcon = ({ icontype }) => {
  const StatusColor = {
    0: 'text-purple',
    2: 'text-danger',
    3: 'text-danger',
    1:"text-success",
    4:"text-success",
  }
  return (
    <div className="task-priority-icon">
      <i className={`fas fa-circle ${StatusColor[icontype]}`}></i>
    </div>
  )
}

function PatientProfile() {
  const { action,id } = useParams()
  const [profile,setProfile] = useState({})
  const [insuranceList,setInsuranceList] = useState([])
  const [profileDetails,setProfileDetails] = useState({})
  const [paymentHistory,setPaymentHistory] = useState([ ])
  const [validDateEnd,setValidDateEnd] = useState(moment().format("YYYY-MM-DD"))
  
  const [validDateStart,setValidDateStart] = useState(moment().format("YYYY-MM-DD"))
  const [appointmentslist,setAppointmentsList] = useState([])
  setAppointmentsList
  const [isLoading, setIsLoading] = useState(true)
  const [ins_view,setIns_view] = useState(false)
  
  const [ins_index,setIns_index] = useState(0)
  // const [item,setItem]=useState({BucketName:"",BucketId:"",FrontImage:"",BackImage:""})
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  
  const [refreshProfile,setRefreshProfile]=useState(false)
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images,setImages] = useState( []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  // let {
  //   state: { selectedUser },
  // } = useLocation()

  // console.log("selectedUser", selectedUser)
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    
    async function getProfileDetails() {
      await axiosPrivate
        .post(
          'providerGetPatientDetails',
          { Email: auth.email ,PatientID:id},
          {
            signal: controller.signal
          }
        )
        .then((res) => {
          
          const { Status, Data: data = [], Message } = res.data
          const details = data[0]
         
          if (Status) {
            setProfile(details)
            setIsLoading(false)
            console.log('deets',res.data.Data )
            setInsuranceList(res.data.Data.InsuranceBuckets)

            setProfileDetails(res.data.Data.Details) 
            setPaymentHistory(res.data.Data.Payments)
            setAppointmentsList(res.data.Data.Appointments)

          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          setIsLoading(false)
          console.error(err)
        })
    }
    getProfileDetails()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [refreshProfile])










  // return (
  //   <div>
  //     Profile from Provider
  //     <p>Selected Patient: {JSON.stringify(selectedUser)}</p>
  //     <p>Action: {action}</p>
  //   </div>
  // )
  return (
    <div className='container-fluid'>
      <TableTitle title="Patient Profile">
        <div className='float-right'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/provider'>NIU Health</Link>
            </li>
            <li className='breadcrumb-item'>
              <Link to='/provider/patient'>Patients</Link>
            </li>
            <li className='breadcrumb-item active'>{profileDetails.first_name} {profileDetails.middle_name} {profileDetails.last_name}</li>
          </ol>
        </div>
      </TableTitle>
      
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body  met-pro-bg'>
              <div className='met-profile'>
                <div className='row'>
                  <div className='col-lg-4 align-self-center mb-3 mb-lg-0'>
                    <div className='met-profile-main'>
                      <div className='met-profile-main-pic'>
                
                        <img
                          src={(profileDetails.picture)?(AWS_BUCKET_SERVICES+'profiles/pictures/'+profileDetails.picture):AWS_BUCKET_SERVICES+'profiles/pictures/Default.jpg'}
                          alt=''
                          className='rounded-circle'
                          style={{width:125,height:125,objectFit:'cover'}}
                        />
                        {/* <span className='fro-profile_main-pic-change'>
                          <i className='fas fa-camera'></i>
                        </span> */}
                      </div>
                      <div className='met-profile_user-detail'>
                        <h5 className='met-user-name'>{profileDetails.first_name} {profileDetails.middle_name} {profileDetails.last_name}</h5>
                        <div className="row col-md-12">
                          <div className="m-1">
                            <span className={ (profileDetails.subscription_plan == 0) ? "badge badge-md badge-soft-danger" : "badge badge-md badge-soft-success m-1" }>{ (profileDetails.subscription_plan == false) ? "Not subscribed" : "Subscribed" }</span></div>
                          <div>
                          <div className="m-1">
                            <span className={ (profileDetails.has_insurance == false) ? "badge badge-md badge-soft-danger" : "badge badge-md badge-soft-success m-1" }>{ (profileDetails.has_insurance == false) ? "Not insured" : "Insured" }</span></div>
                          </div>
                        </div>
                        {/* <p className='mb-0 met-user-name-post'>
                          {selectedUser.status}
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 ml-auto'>
                    <ul className='list-unstyled personal-detail'>
                      <li className=''>
                        <i className='dripicons-phone mr-2 text-info font-18'></i>{" "}
                        <b> Phone </b> : {profileDetails.contact_info}
                      </li>
                      <li className='mt-2'>
                        <i className='dripicons-mail text-info font-18 mt-2 mr-2'></i>{" "}
                        <b> Email </b> : {profileDetails.email}
                      </li>
                      <li className='mt-2'>
                        <i className='dripicons-location text-info font-18 mt-2 mr-2'></i>{" "}
                        <b>Location</b> : {profileDetails.address}
                      </li>
                    </ul>
                    <div className='button-list btn-social-icon'>
                      {/* <button type='button' className='btn btn-blue btn-circle'>
                        <i className='fab fa-facebook-f'></i>
                      </button>

                      <button
                        type='button'
                        className='btn btn-secondary btn-circle ml-2'
                      >
                        <i className='fab fa-twitter'></i>
                      </button>

                      <button
                        type='button'
                        className='btn btn-pink btn-circle  ml-2'
                      >
                        <i className='fab fa-dribbble'></i>
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <ul className='nav nav-pills mb-0' id='pills-tab' role='tablist'>
                {/* <li className='nav-item'>
                  <a
                    className='nav-link active'
                    id='general_detail_tab'
                    data-toggle='pill'
                    href='#general_detail'
                  >
                    General
                  </a>
                </li> */}
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    id='appointments_list_detail_tab'
                    data-toggle='pill'
                    href='#appointments_list'
                  >
                    Appointments
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    id='payment_history_detail_tab'
                    data-toggle='pill'
                    href='#payment_history'
                  >
                    Payment History
                  </a>
                </li>
               
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    id='insurance_detail_tab'
                    data-toggle='pill'
                    href='#insurance'
                    onClick={()=>{
                      if (ins_view){
                        setIns_view(false)
                      }
                      
                    }}
                  >
                    Insurance
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='tab-content detail-list' id='pills-tabContent'>
            <div className='tab-pane fade show' id='general2_detail'>
              <div className='row'>
                <div className='col-xl-4'>
                  {/* <div className='card'>
                    <div className='card-body'>
                      <div className=' d-flex justify-content-between'>
                        <img
                          src={`${AWS_BUCKET}/assets/images/widgets/monthly-re.png`}
                          alt=''
                          height='75'
                        />
                        <div className='align-self-center'>
                          <h2 className='mt-0 mb-2 font-weight-semibold'>
                            $955
                            <span className='badge badge-soft-success font-11 ml-2'>
                              <i className='fas fa-arrow-up'></i> 8.6%
                            </span>
                          </h2>
                          <h4 className='title-text mb-0'>Total Expense</h4>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between bg-purple p-3 mt-3 rounded'>
                        <div>
                          <h4 className='mb-1 font-weight-semibold text-white'>
                            $1,255
                          </h4>
                          <p className='text-white mb-0'>Balance</p>
                        </div>
                        <div>
                          <h4 className=' mb-1 font-weight-semibold text-white'>
                            12 <small>Days</small>
                          </h4>
                          <p className='text-white mb-0'>Confinement</p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className='card'>
                    <div className='card-body dash-info-carousel'>
                      <h4 className='mt-0 header-title mb-4'>
                        Recent Checkups
                      </h4>
                      <div
                        id='carousel_1'
                        className='carousel slide'
                        data-ride='carousel'
                      >
                        <div className='carousel-inner'>
                          <div className='carousel-item'>
                            <div className='media'>
                              <img
                                src={`${AWS_BUCKET}/assets/images/users/user-1.jpg`}
                                className='mr-2 thumb-lg rounded-circle'
                                alt='...'
                              />
                              <div className='media-body align-self-center'>
                                <h4 className='mt-0 mb-1 title-text text-dark'>
                                  Dr. Myrtlle Sison
                                </h4>
                                <p className='text-muted mb-0'>Cardiologist</p>
                              </div>
                            </div>
                          </div>
                          <div className='carousel-item'>
                            <div className='media'>
                              <img
                                src={`${AWS_BUCKET}/assets/images/users/user-2.jpg`}
                                className='mr-2 thumb-lg rounded-circle'
                                alt='...'
                              />
                              <div className='media-body align-self-center'>
                                <h4 className='mt-0 mb-1 title-text'>
                                  Dr. Maria Sandoval
                                </h4>
                                <p className='text-muted mb-0'>Cardiologist</p>
                              </div>
                            </div>
                          </div>
                          <div className='carousel-item active'>
                            <div className='media'>
                              <img
                                src={`${AWS_BUCKET}/assets/images/users/user-3.jpg`}
                                className='mr-2 thumb-lg rounded-circle'
                                alt='...'
                              />
                              <div className='media-body align-self-center'>
                                <h4 className='mt-0 mb-1 title-text'>
                                  Dr. Denisse McLaren
                                </h4>
                                <p className='text-muted mb-0'>Urologist</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a
                          className='carousel-control-prev'
                          href='#carousel_1'
                          role='button'
                          data-slide='prev'
                        >
                          <span
                            className='carousel-control-prev-icon'
                            aria-hidden='true'
                          ></span>
                          <span className='sr-only'>Previous</span>
                        </a>
                        <a
                          className='carousel-control-next'
                          href='#carousel_1'
                          role='button'
                          data-slide='next'
                        >
                          <span
                            className='carousel-control-next-icon'
                            aria-hidden='true'
                          ></span>
                          <span className='sr-only'>Next</span>
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* <div className='col-lg-8'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='float-lg-right float-none eco-revene-history justify-content-end'>
                        <ul className='nav'>
                          <li className='nav-item'>
                            <Link className='nav-link active' to='#'>
                              This Week
                            </Link>
                          </li>
                          <li className='nav-item'>
                            <Link className='nav-link' to='#'>
                              Last Week
                            </Link>
                          </li>
                          <li className='nav-item'>
                            <Link className='nav-link' to='#'>
                              Last Month
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <h4 className='header-title mt-0'>Expense</h4>
                      <canvas
                        id='bar'
                        className='drop-shadow w-100'
                        height='350'
                      ></canvas>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className='row'>

                <div className='col-lg-4'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='mt-0 header-title'>Patient Diagnosis</h4>
                      <p className='text-muted mb-4'>
                        High blood pressure, diabetic, under monitored
                        medication
                      </p>
                      <textarea
                        className='form-control'
                        rows='3'
                        id='clipboardTextarea'
                        defaultValue={` `}
                      ></textarea>
                      <div className='mt-3'>
                        <button
                          type='button'
                          className='btn btn-gradient-secondary btn-clipboard m-2'
                          data-clipboard-action='copy'
                          data-clipboard-target='#clipboardTextarea'
                        >
                          <i className='fas fa-video'></i> Start Virtual Call
                        </button>{" "}
                        <button
                          type='button'
                          className='btn btn-gradient-primary btn-clipboard m-2'
                          data-clipboard-action='cut'
                          data-clipboard-target='#clipboardTextarea'
                        >
                          <i className='fab fa-rocketchat'></i> Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className='col-lg-8'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='header-title mt-0 mb-4'>
                        Latest Activity
                      </h4>
                      <div
                        className='slimscroll profile-activity-height'
                        style={{ overflowY: "scroll" }}
                      >
                        <div className='activity'>
                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-checkbox-marked-circle-outline bg-soft-success'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Patient
                                  </span>
                                  updated the status of{" "}
                                  <Link to='' className='text-dark'>
                                    Invoice #1234
                                  </Link>
                                  to Paid
                                </p>
                                <span className='text-muted'>10 Min ago</span>
                              </div>
                            </div>
                          </div>

                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-timer-off bg-soft-pink'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Dr. Peterson
                                  </span>
                                  scheduled a virtual visit on{" "}
                                  <Link to='' className='text-dark'>
                                    Dec 2, 2022
                                  </Link>
                                </p>
                                <span className='text-muted'>50 Min ago</span>
                              </div>
                            </div>
                          </div>

                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-alert-decagram bg-soft-purple'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Dr. Lim
                                  </span>
                                  completed a virtual meet.{" "}
                                  <Link to='' className='text-dark'>
                                    Checkup #112233
                                  </Link>{" "}
                                  was saved to archive.
                                </p>
                                <span className='text-muted'>10 hours ago</span>
                              </div>
                            </div>
                          </div>

                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-clipboard-alert bg-soft-warning'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Patient
                                  </span>
                                  completed a{" "}
                                  <Link to='' className='text-dark'>
                                    Bloodtest
                                  </Link>{" "}
                                  on Laboratory A.
                                </p>
                                <span className='text-muted'>Yesterday</span>
                              </div>
                            </div>
                          </div>
                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-clipboard-alert bg-soft-secondary'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Dr. Maricris Jowels
                                  </span>
                                  was added to the group, group name is{" "}
                                  <Link to='' className='text-dark'>
                                    Physicians
                                  </Link>
                                </p>
                                <span className='text-muted'>14 Nov 2022</span>
                              </div>
                            </div>
                          </div>
                          <div className='activity-info'>
                            <div className='icon-info-activity'>
                              <i className='mdi mdi-clipboard-alert bg-soft-info'></i>
                            </div>
                            <div className='activity-info-text'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <p className='text-muted mb-0 font-14 w-75'>
                                  <span className='text-dark font-14'>
                                    Patient
                                  </span>
                                  request a virtual visit to{" "}
                                  <Link to='' className='text-dark'>
                                    Dr. Nefario
                                  </Link>{" "}
                                  on Dec. 1, 2022.
                                </p>
                                <span className='text-muted'>15 Nov 2022</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className='tab-pane fade show active' id='appointments_list'>
              <div className='row-lg-12'>
                    {(appointmentslist.length!==0)?
                      <TableCard headers={["Description","Service Description","Appointment Time", "Status"]}>
                      {appointmentslist.map((item,index)=>(
                        <tr key={index}>
                        <td>
                          <Link
                            to={"/provider/profiles/"+item.provider_id}
                            // state={{
                            //   selectedUser: item,
                            // }}
                          >
                            <div className="row">
                              <div className="col">
                                <img
                                  src={AWS_BUCKET_SERVICES+"providers/"+item.image}
                                  alt=""
                                  className="thumb-sm rounded-circle mr-2"
                                  style={{objectFit:'cover'}}
                                />
                                {item.provider_name} 
                              </div>
                            </div>
                          </Link>
                        </td>

                        <td>
                        {item.service_description}
                        </td>
                        <td>
                        {moment(item.trans_date_time).format('hh:mm a MM/DD/YY')}
                        </td>
                       
                        <td>
                        <StatusText status={item.status}/>
                        </td>
                        </tr>

                      ))}
                      
                      </TableCard>:<><CardItem className={'col-lg-12'}>{(isLoading)?"Loading...":"No Appointments."}</CardItem></>}
                  
                </div>
            </div>
            <div className='tab-pane fade' id='payment_history'>
              <div className='row-lg-12'>
                    {(paymentHistory.length!==0)?
                      <TableCard headers={["Description","Payment Time", "Amount"]}>
                      {paymentHistory.map((item,index)=>(
                        <tr key={index}>
                        <td>
                        <NavLink onClick={
                            async ()=>{
                              await axiosPrivate.post("getStripeReceipt",{Email:profileDetails.email,ChargeID:item.trans_id})
                              .then((res)=>{
                                console.log(res)
                                const receipt_link=res.data.Data
                                Swal.fire({
                                  html:`Would you like to view your receipt?`,
                                  title:"Payment Receipt",
                                  showConfirmButton:true,
                                  showCancelButton:true
                                })
                                .then((result)=>{
                                  if (result.isConfirmed){
                                  // navigate(receipt_link,{replace:true})
                                    openInNewTab(receipt_link)
                                  }
                                  else{
                                    console.log("uguu")
                                  }
                                })
                              })
                              }}>
                            {item.description} 
                          </NavLink>
                        </td>
                        <td>
                        {moment(item.payment_date_time).format('hh:mm a MM/DD/YY')}
                        </td>
                        {/* <td>
                        <a href={item.receipt}>View<i className="fa fa-receipt"></i></a>
                        </td> */}
                        <td>
                        $ {item.amount} USD
                        </td>
                        </tr>

                      ))}
                      
                      </TableCard>:<><CardItem className={'col-lg-12'}>{(isLoading)?"Loading...":"No Payment History results."}</CardItem></>}
                  
                </div>
            </div>
            <div className='tab-pane fade' id='insurance'>
              
              <div className='row m-2'>
              <div className='card col-lg-12'>
                <div className='card-body m-2'>
                {(!ins_view)?<>
                <div className='file-box-content'>
                    {(insuranceList.length===0)?
                      <>
                        <CardItem>{(isLoading)?`Loading...`:(`${profileDetails.first_name} has no submitted Insurance Documents.`)}</CardItem>
                      </>:<></>}
                    {insuranceList.map((item,index) => (
                      <Link
                      // className="btn-success waves"
                          key={index}
                          style={{background:'none', marginLeft:'2px' }}
                          onClick={()=>{
                                setIns_view(true);
                                setIns_index(index);
                                setImages([
                                  `${AWS_BUCKET_SERVICES}insurance/${id}/${insuranceList[index].BucketName}/${insuranceList[index].FrontImage}`,
                                  `${AWS_BUCKET_SERVICES}insurance/${id}/${insuranceList[index].BucketName}/${insuranceList[index].BackImage}`
                                ])
                                
                                setValidDateStart(insuranceList[index].start_date)
                                setValidDateEnd(insuranceList[index].end_date)
                              }
                            }
                        
                        >
                          <div className='file-box'>
                            
                              {/* <i className='dripicons-download file-download-icon'></i> */}
                            
                            <div className='text-center'>
                            <img width={'51px'} height={'66px'} style={{objectFit:'cover'}} src={`${AWS_BUCKET_SERVICES}insurance/${id}/${item.BucketName}/${item.FrontImage}`}></img>
                              <i className={(item.Archive == 1) ? 'far fa-folder text-gray ml-3' : 'far fa-folder text-success ml-3'}></i>

                              <h6 className='text-truncate'>
                                {item.BucketName}
                              </h6>
                              {/* <span className="virtualvisitbadge badge badge-md badge-soft-purple">{((insuranceList[index].Status)==="1")?"Approved":(insuranceList[index].Status==="0")?"For Approval":(insuranceList[index].Status==="2")?"Rejected":""}</span> */}
                              <StatusTextInsurance3 status={insuranceList[index].Archive}/><br/>
                              <StatusTextInsurance2 status={(insuranceList[index].Status)}/><br/>
                              <small className='text-muted'>
                              {moment(item.DateUploaded).format('MM/DD/YY')}
                                {/* 06 March 2022 / 5MB */}
                              </small>
                            </div>
                          </div>
                        </Link>
                    ))}

                  </div>

                </>:<>
                  <h2 className=' mt-0 mb-3 col'>  Insurance Entry</h2><br/>
                     <label className='col-form-label'> <b> Title:  </b></label> <br/>
                      <h3 className="ml-2">{insuranceList[ins_index].BucketName}</h3><br/>
                      <b className="mr-2">Created:</b> {moment(insuranceList[ins_index].DateUploaded).format('hh:mm a MMMM DD, YYYY')}<br/>
                      <b className="mr-2">Active Status: </b> <StatusTextInsurance3 status={insuranceList[ins_index].Archive}/> <br/>
                      <b className="mr-2">Approval Status: </b><StatusTextInsurance2 status={(insuranceList[ins_index].Status)}/><br/>
                      {(insuranceList[ins_index].Status)==="1" ? 
                      
                      <><b className="mr-2">Approved Date:</b> {moment(insuranceList[ins_index].DateApproved).format('MM/DD/YY')}<br/></>:<></>}
                      
                      <br/>
                      <div className="col-lg-6">
                        <div className="row text-center align-item col-lg-12">
                          <div className="col">
                            
                            <label htmlFor="date" className="col-form-label"><b> Date Start</b></label><br/>
                            
                            {moment(insuranceList[ins_index].start_date).format("MMMM DD, YYYY ")}
                          </div>
                            <div className="col">
                            <label htmlFor="date" className="col-form-label"><b> Date End</b></label><br/>
                            
                            {moment(insuranceList[ins_index].end_date).format("MMMM DD, YYYY ")}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row text-center align-item col-lg-12">
                          <div className="col">
                            
                            <label htmlFor="date" className="col-form-label"> <b>Validated Date Start</b></label><br/>
                            
                            {moment(insuranceList[ins_index].validated_start_date).format("MMMM DD, YYYY")}
                          </div>
                            <div className="col">
                            <label htmlFor="date" className="col-form-label"><b> Validated Date End</b></label><br/>
                            
                            {moment(insuranceList[ins_index].validated_end_date).format("MMMM DD, YYYY")}
                          </div>
                        </div>
                      </div>
                      <div className='row m-4'>
                        
                        <CardItem className={"m-2 col lg-4"}  >
                          <div className='' onClick= {() => openImageViewer(0)}>
                            Front Image<br/><br/>
                            <img style={{width:'250px',objectFit:'cover'}} src={`${AWS_BUCKET_SERVICES}insurance/${id}/${insuranceList[ins_index].BucketName}/${insuranceList[ins_index].FrontImage}`}></img>
                            </div>
                        </CardItem>
                        <CardItem className={"m-2 col lg-4"} >
                          <div className='m-2 col lg-4'  onClick= {() => openImageViewer(1)}>
                            Back Image<br/><br/>
                              <img  style={{width:'250px',objectFit:'cover'}} src={`${AWS_BUCKET_SERVICES}insurance/${id}/${insuranceList[ins_index].BucketName}/${insuranceList[ins_index].BackImage}`}></img>
                            </div>
                        </CardItem>
                        
                      </div>
                      
                     {(insuranceList[ins_index].Status)==="0"&&insuranceList[ins_index].Archive==="0"?<>
                      <h3> <i className="fas fa-exclamation-triangle" style={{color:'#f14b4b'}}/> Insurance Approval Required</h3>
                      <h5 className="text-muted">Validated dates must match with insurance documents </h5></>:<></>}
                      <div className="float-right col text-center align-item col-lg-12">
                        {(insuranceList[ins_index].Status)==="0"&&insuranceList[ins_index].Archive==="0"?
                        <>
                        <div>
                           
                            
                          
                          <div className="row">
                          
                          <div className="col-lg-3">
                          
                            <label htmlFor="date" className="col-form-label">Validated Date Start</label>
                              <input required 
                                className="form-control" 
                                // min={moment().add(1,"days").format("YYYY-MM-DD")}
                                // defaultValue={moment().add(1,"days").format("YYYY-MM-DD")}
                                type="date" id="date" value={validDateStart} onChange={(e)=>{setValidDateStart(e.target.value)}}/>
                          </div>
                          <div className="col-lg-3">
                            <label htmlFor="date" className="col-form-label">Validated Date End</label>
                              <input required 
                                className="form-control" 
                                min={moment().add(1,"days").format("YYYY-MM-DD")}
                                // defaultValue={moment().add(1,"days").format("YYYY-MM-DD")}
                                type="date" id="date" value={validDateEnd} onChange={(e)=>{setValidDateEnd(e.target.value)}}/>
                          </div>
                          
                          </div>
                         
                          
                        </div>
                         <button
                         type='button'
                         
                         onClick={()=>{
                           Swal.fire({
                             title:"Approve Insurance",
                             html:`Would you like to validate this Insurance entry?`,
                             showCancelButton:true
                           })
                             .then( async (res)=>{
                               if (res.isConfirmed){
                                 
                                 await axiosPrivate.post("providerApproveInsurance",
                                 {
                                   Email:auth.email,
                                   PatientID:id,
                                   InsuranceID:insuranceList[ins_index].BucketId,
                                   ValidatedStartDate:validDateStart,
                                   ValidatedEndDate:validDateEnd
                                 })
                                 .then((res)=>{
                                   const {Status,Message}=res.data
                                   if (Status){
                                     Swal.fire({
                                       title:"Insurance Approved",
                                       icon:"success",
                                       text:"This insurance is now validated as of "+moment().format("MMMM DD, yyyy")})
                                     setIns_view(false)
                                     setRefreshProfile(!refreshProfile)

                                   }
                                   else{
                                     const msg=Message
                                     Swal.fire({title:"Error",icon:"error",text:`${msg}`})
                                   }
                                 })
                               }})
                               
                           }
                         }
                         className='m-1 btn btn-outline-success waves-effect waves-light mt-2'
                       >
                         Approve
                       </button>
                       <button
                         type='button'
                         onClick={()=>{
                           Swal.fire({title:"Reject Insurance",html:`Are you sure you want to reject this patient's insurance?<br><div class="text-muted">It can not be applied when availing services.<div>`,showCancelButton:true})
                           .then(async (res)=>{if (res.isConfirmed){
                             await axiosPrivate.post("providerRejectInsurance",
                                 {
                                   Email:auth.email,
                                   PatientID:id,
                                   InsuranceID:insuranceList[ins_index].BucketId
                                 })
                                 .then((res)=>{
                                   const {Status,Message}=res.data
                                   if (Status){
                                   
                                     Swal.fire({title:"Insurance Rejected",icon:"success",text:"This insurance is now rejected."})
                                     setIns_view(false)
                                     setRefreshProfile(!refreshProfile)
                                   }
                                   else{
                                     const msg=Message
                                     Swal.fire({title:"Error",icon:"error",text:`${msg}`})
                                   }
                                 })

                           }
                           })
                         }}
                         className='m-1 btn btn-outline-danger waves-effect waves-light mt-2'
                       >
                         Reject
                       </button>
                       
                       </>
                        :<>
                        
                        </>}
                        <button
                          type='button'
                          onClick={()=>{
                            setIns_view(false)
                          }}
                          className='m-1  btn btn-outline-purple waves-effect waves-light mt-2'
                        >
                          Back
                        </button>
                       </div>
                      </>}
                 </div>
              </div>
            </div>
            </div>
            
          </div>
        </div>
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

export default PatientProfile

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}