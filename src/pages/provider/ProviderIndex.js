import Activity from '../../components/provider/Activity'
import Calendar from '../../components/provider/calendar/Calendar'
import TodaySchedule from '../../components/provider/calendar/TodaySchedule'
import WelcomeCard from '../../components/provider/WelcomeCard'
import PatientListData from '../../components/provider/PatientListData'
import PatientQueue from '../../components/provider/PatientQueue'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import TableCard from '../../components/table/Tables'
import CardLongItem from '../../components/cards/Card'
import { CardImg } from 'react-bootstrap'
import CardItem from '../../components/cards/Card'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import moment from 'moment'

function hourformat(hour){
  if (hour>12){
    return ((hour-12<10)?"0":"")+(hour-12)+":00 PM"
  }
  else if (hour===12){
    return (12)+":00 PM"
  }
  else if (hour===0){
    return (12)+":00 AM"
  }
  else{
    return ((hour<10)?"0":"")+hour+":00 AM"
  }
}
function ProviderIndex() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [patientList, setPatientList] = useState([])
  
  const [clinicList, setClinicList] = useState([])
  const myModal=useRef();
  const [updateVisit,setUpdateVisit]=useState(true)
  
  const [showModal,setShowModal]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },

  } = useForm();
  async function createInPersonVisit(data) {
    const controller = new AbortController()

    await axiosPrivate
      .post(
        'createInPersonVisit',
        { ...data,Email: auth?.email || sessionStorage.getItem('email'),

      },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        const { Status, Message } = res.data
        if (Status){
          document.getElementById("create-appointment").reset();
          
          Swal.fire({
            title: "In-Person Appointment Created.",
            html: ``,
            icon: 'info'
            
          })
          setUpdateVisit(!updateVisit)
          $('#myModal').hide();
          $('.modal-backdrop').hide();
         
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // Swal.fire({
                    
  //   title: `In-Person Visit`,
  //       customClass: 'swal-wide',
  //       html:`
  //         <div class='col-lg-12 p-1'>
  //           <i class='fas fa-user-nurse fa-fw fa-4x' style={{color: '#303e67'}}></i>
  //           <i class='fas fa-comment fa-fw fa-4x' style={{color: '#303e67'}}></i>
  //           <i class='fas fa-user fa-fw fa-4x' style={{color: '#303e67'}}></i>
  //           <div class='col'>
  //             <label>o</label>
              
  //             <label>Choose A Patient</label>
  //             <select>
  //               ${patientList.map((item)=>{
  //                 console.log(item.first_name)
  //                 return(
  //                 <option value={item.patient_id}>{item.first_name} {item.last_name}</option>)
  //               })}
  //             </select>
  //           </div>
  //         </div>
  //       `
  //     }).then((isConfirmed)=>{
  //       if (isConfirmed){
  //         createInPersonVisit()
  //       }
  //     })
  useEffect(() => {
     
    async function getClinicList() {
      const controller = new AbortController()

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
            console.log("Clinics",data)
            setClinicList(data)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }
    async function getPatientList() {
      const controller = new AbortController()

      await axiosPrivate
        .post(
          'getPatients',
          { Email: auth?.email || sessionStorage.getItem('email') },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Data = [] } = res.data
          setPatientList(Data)
        })
        .catch((err) => {
          console.error(err)
        })
    }

    getPatientList()
    getClinicList()
  }, [updateVisit])
  let morning_options=[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7]
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-box"></div>
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <WelcomeCard />
        </div>
        <div className="col-4">
          <CardItem>
            <i className='fas fa-user-nurse fa-fw fa-4x' style={{color: '#303e67'}}></i>
            <i className='fas fa-comment fa-fw fa-4x' style={{color: '#303e67'}}></i>
            <i className='fas fa-user fa-fw fa-4x' style={{color: '#303e67'}}></i>
            
            <h4>You can start an In-Person Visit with a Patient here.</h4>
            <h6> small text</h6>
            <div className='align-item-center'>
              <button
                className='btn btn-outline-success btn-round' 
                onClick={()=>{
                  setShowModal(true)
                }}
                data-toggle="modal"
                data-target="#myModal"
                
                >
                New Visit
              </button>
            </div>
          </CardItem>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4 className="header-title mt-0 mb-3">Virtual Visit Queue</h4>
          <div className="table-responsive">
            
                <PatientQueue limit={6} stopPolling={showModal} />
          </div>
        </div>
      </div>
      {/* <!-- Calendar --> */}
      <div className="row">
        {/* <div className='col-lg-4'>
          <TodaySchedule />
        </div> */}
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Calendar />
              <div style={{ clear: 'both' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* <div className="col-lg-4">
          <Activity />
        </div> */}

        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title mt-0 mb-3">Patient Details</h4>
              {(patientList.length>0)?
                <TableCard
                  headers={[
                    'Patient',
                    'Email',
                    'Phone No.',
                    'Status',
                    'Insurance',
                  ]}
                > 
                
                    <PatientListData list={patientList} />
                </TableCard>:
                <CardLongItem><h4>There are no Patients to display.</h4></CardLongItem> 
              }
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row">
            <div className="col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className=" d-flex justify-content-between">
                    <img
                      src="../assets/images/widgets/monthly-re.png"
                      alt=""
                      height="75"
                    />
                    <div className="align-self-center">
                      <h2 className="mt-0 mb-2 font-weight-semibold">
                        $24,955
                        <span className="badge badge-soft-success font-11 ml-2">
                          <i className="fas fa-arrow-up"></i> 8.6%
                        </span>
                      </h2>
                      <h4 className="title-text mb-0">Monthly Revenue</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-3">Patients Report</h4>
                  <div className="">
                    <div id="d2_performance" className="apex-charts"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="row">
                <div className="col-sm-3">
                  <div className="card crm-data-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4 align-self-center">
                          <div className="icon-info">
                            <i className="far fa-smile rounded-circle bg-soft-success"></i>
                          </div>
                        </div>
                        <div className="col-8 text-right">
                          <p className="text-muted font-14">Total Patients</p>
                          <h3 className="mb-0">528</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card crm-data-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4 align-self-center">
                          <div className="icon-info">
                            <i className="far fa-user rounded-circle bg-soft-pink"></i>
                          </div>
                        </div>
                        <div className="col-8 text-right">
                          <p className="text-muted font-14">Old Patients</p>
                          <h3 className="mb-0">31</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card crm-data-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4 align-self-center">
                          <div className="icon-info">
                            <i className="far fa-handshake rounded-circle bg-soft-purple"></i>
                          </div>
                        </div>
                        <div className="col-8 text-right">
                          <p className="text-muted font-14">New Patients</p>
                          <h3 className="mb-0">396</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card crm-data-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4 align-self-center">
                          <div className="icon-info">
                            <i className="dripicons-arrow-up rounded-circle bg-soft-warning"></i>
                          </div>
                        </div>
                        <div className="col-8 text-right">
                          <p className="text-muted font-14">Patient Growth</p>
                          <h3 className="mb-0">12%</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0">Patients' Gender</h4>
                  <div id="CrmDashChart" className="flot-chart"></div>
                </div>
              </div>
            </div>
          </div> */}

      {/* <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0">Patients by Geo</h4>
                  <div className="row">
                    <div className="col-lg-8">
                      <div
                        id="world-map-markers"
                        className="crm-dash-map drop-shadow-map"
                      ></div>
                    </div>
                    <div className="col-lg-4 align-self-center">
                      <div className="">
                        <span className="text-secondary">Location 1</span>
                        <small className="float-right text-muted ml-3 font-13">
                          81%
                        </small>
                        <div
                          className="progress mt-2"
                          style={{ height: "3px" }}
                        >
                          <div
                            className="progress-bar bg-pink"
                            role="progressbar"
                            style={{ width: "81%", borderRadius: "5px" }}
                            aria-valuenow="81"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="text-secondary">Location 2</span>
                        <small className="float-right text-muted ml-3 font-13">
                          68%
                        </small>
                        <div
                          className="progress mt-2"
                          style={{ height: "3px" }}
                        >
                          <div
                            className="progress-bar bg-secondary"
                            role="progressbar"
                            style={{ width: "68%", borderRadius: "5px" }}
                            aria-valuenow="68"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-secondary">Location 3</span>
                        <small className="float-right text-muted ml-3 font-13">
                          48%
                        </small>
                        <div
                          className="progress mt-2"
                          style={{ height: "3px" }}
                        >
                          <div
                            className="progress-bar bg-purple"
                            role="progressbar"
                            style={{ width: "48%", borderRadius: "5px" }}
                            aria-valuenow="48"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="text-secondary">Location 14</span>
                        <small className="float-right text-muted ml-3 font-13">
                          32%
                        </small>
                        <div
                          className="progress mt-2"
                          style={{ height: "3px" }}
                        >
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "32%", borderRadius: "5px" }}
                            aria-valuenow="32"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="card">
                <div className="card-body dash-info-carousel">
                  <h4 className="mt-0 header-title mb-4">Admissions</h4>
                  <div
                    id="carousel_2"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="media">
                          <img
                            src="../assets/images/users/user-1.jpg"
                            className="mr-2 thumb-lg rounded-circle"
                            alt="..."
                          />
                          <div className="media-body align-self-center">
                            <h4 className="mt-0 mb-1 title-text text-dark">
                              Rene Sta. Maria
                            </h4>
                            <p className="text-muted mb-0">Mood Disorders</p>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="media">
                          <img
                            src="../assets/images/users/user-2.jpg"
                            className="mr-2 thumb-lg rounded-circle"
                            alt="..."
                          />
                          <div className="media-body align-self-center">
                            <h4 className="mt-0 mb-1 title-text">
                              Janice Smith
                            </h4>
                            <p className="text-muted mb-0">
                              Congestive Heart Failure
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="media">
                          <img
                            src="../assets/images/users/user-3.jpg"
                            className="mr-2 thumb-lg rounded-circle"
                            alt="..."
                          />
                          <div className="media-body align-self-center">
                            <h4 className="mt-0 mb-1 title-text">John Bacon</h4>
                            <p className="text-muted mb-0">
                              Urinary Tract Infection
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carousel_2"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carousel_2"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                  <div className="row my-3">
                    <div className="col-sm-6">
                      <p className="mb-0 text-muted font-13">
                        <i className="mdi mdi-album mr-2 text-secondary"></i>
                        Admission
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-muted font-13">
                        <i className="mdi mdi-album mr-2 text-warning"></i>
                        Re-Admission
                      </p>
                    </div>
                  </div>
                  <div
                    className="progress bg-warning mb-3"
                    style={{ height: "5px" }}
                  >
                    <div
                      className="progress-bar bg-secondary"
                      role="progressbar"
                      style={{ width: "65%" }}
                      aria-valuenow="65"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0 text-muted text-truncate align-self-center">
                      <span className="text-success">
                        <i className="mdi mdi-trending-up"></i>1.5%
                      </span>{" "}
                      Up From Last Week
                    </p>
                    <button
                      type="button"
                      className="btn btn-gradient-primary btn-sm"
                    >
                      Leads Report
                    </button>
                  </div>
                  <div className="bg-light p-3 mt-3 d-flex justify-content-between">
                    <div>
                      <h2 className="mb-1 font-weight-semibold">202</h2>
                      <p className="text-muted mb-0">Active Patients</p>
                    </div>
                    <div className="img-group align-self-center">
                      <Link className="user-avatar user-avatar-group" to="">
                        <img
                          src={`${AWS_BUCKET}/assets/images/users/user-6.jpg`}
                          alt="user"
                          className="rounded-circle thumb-xs"
                        />
                      </Link>
                      <Link className="user-avatar user-avatar-group" to="">
                        <img
                          src={`${AWS_BUCKET}/assets/images/users/user-2.jpg`}
                          alt="user"
                          className="rounded-circle thumb-xs"
                        />
                      </Link>
                      <Link className="user-avatar user-avatar-group" to="">
                        <img
                          src={`${AWS_BUCKET}/assets/images/users/user-3.jpg`}
                          alt="user"
                          className="rounded-circle thumb-xs"
                        />
                      </Link>
                      <Link className="user-avatar user-avatar-group" href="">
                        <img
                          src={`${AWS_BUCKET}/assets/images/users/user-4.jpg`}
                          alt="user"
                          className="rounded-circle thumb-xs"
                        />
                      </Link>
                      <Link
                        to=""
                        className="avatar-box thumb-xs align-self-center"
                      >
                        <span className="avatar-title bg-soft-info rounded-circle font-13 font-weight-normal">
                          +25
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {showModal===false?null:
          <div id="myModal" className={showModal?"modal fade":"modal fade show"} role="form" ref={myModal}>
            <div className="modal-dialog" style={{maxWidth: '500px', margin: '1.75rem auto'}}>

              {/* <!-- Modal content--> */}
              <div className="modal-content">

                <div className="modal-header">
                  
                  <h4 className="modal-title">In-Person Visit</h4>
                </div>
                <form id="create-appointment" onSubmit={handleSubmit(createInPersonVisit)}>
                <div className="modal-body">
                  
                <div className="nuModalCont visitRequestModal">
                
                <div className="" >
                  
                  <label htmlFor="visitTitle" className="col-form-label">Visit Title</label>
                  <input className="form-control" type="text" id="visitTitle" {...register("VisitTitle")}/>
                  <label  className="col-form-label">Patient</label>
                  <select className="form-control" {...register("PatientID")}>
                      <option>Select Patient...</option>
                        {patientList.map((item,index)=>{
                                return(
                                <option key={index} value={item.patient_id}>{item.first_name} {item.last_name}</option>)
                              })}
                  </select>
                  
                  <label  className="col-form-label">Clinic</label>
                  <select className="form-control" {...register("ClinicID")}>
                              <option>Select Clinic...</option>
                              {clinicList.map((item)=>{
                                return(
                                <option value={item.clinic_id}>{item.clinic_name} </option>)
                              })}
                          </select>
                  <label htmlFor="date" className="col-form-label">Visit Date</label>
                  <input className="form-control" defaultValue={moment().format('yy-mm-dd')} type="date" id="date" {...register("Date")}/>
                  
                  <label htmlFor="time" className="col-form-label">Time</label>
                  {/* <input className="form-control" pattern="[0-9]{2}:[0]{2}" defaultValue={moment().format('HH:MM a')} type="time" id="time" {...register("Time")}/> */}
                  <select
                    {...register("Time")}
                    className="form-control">   
                    {morning_options.map((option, index)=>(
                      <option key={index} value={option}>{hourformat(option)}</option>
                      ))}
                      
                    <option value={null}>--:--</option>
                  </select>
                  <label  className="col-form-label">Internal Notes</label>
                  <textarea className="form-control" rows="5" id="message" {...register("InternalNotes")}></textarea>
                  
                </div>
              </div>
              

                </div>
                <div className="modal-footer">
                <div className="nuBtnContMod">
                  <button type="submit" className="btn btn-success waves-effect waves-light" id="create-visit">Save Visit</button>
                  </div>
                  <button type="button" className="btn btn-outline-danger"
                  data-target="#myModal" data-dismiss="modal"
                  onClick={(e)=>{
                    setShowModal(false);
                    $('#myModal').hide();
                    $('.modal-backdrop').hide();
                  }
                  }
                  >Close</button>
                </div>
                </form>
              </div>

            </div>
           
          </div>}
    </div>
  )
}

export default ProviderIndex
