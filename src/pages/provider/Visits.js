import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardItem, { CardLongItem } from '../../components/cards/Card'
import Calendar from '../../components/provider/calendar/Calendar'
import TableCard from '../../components/table/Tables'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { AWS_BUCKET, AWS_BUCKET_PROFILES, AWS_BUCKET_SERVICES } from '../../constants'

import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'

import moment from 'moment'
import styled from "@emotion/styled"
import Multiselect from 'multiselect-react-dropdown'
import { StatusTextVisit } from '../../components/status/Status'
import Swal from 'sweetalert2'
import RingLoading from '../../components/lottie/RingLoading'



export const StyleWrapper = styled.div`
.optionListContainer {
  position: sticky;
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
    2: 'Cancelled By Patient',
    3: 'Cancelled By Provider',
    4: "Approved",
  }
  return (
    <span className={`virtualvisitbadge badge badge-md ${statusColor[status]}`}>
      {statusText[status]}
    </span>
  )
}

function hourformat(hourstr){
 const hour=parseInt(hourstr)
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
function Visits() {
  const navigate = useNavigate()
  const timenow=moment()
  const [isLoading, setIsLoading] = useState(true)
  const [appointmentList, setAppointmentList] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg,setErrMsg]=useState('')
  const [patientList, setPatientList] = useState([])
  const [clinicList, setClinicList] = useState([])
  const [clinicIDList, setClinicIDList] = useState([])
  const [statusFilter, setStatusFilter] = useState( [true,true,true,true,true,true])
  const statusdict=
      [
        "For Approval",
        "Completed",
        "Cancelled by Patient",
        "Cancelled by Provider",
        "Approved",
        "Started"
      ]
  const [showFilterWindow,setShowFilterWindow]=useState(false)
  const [activeFilter,setActiveFilter]=useState('')
  const [searchString,setSearchString]=useState('')
  const [filterList,setFilterList]=useState([])
  const [transFilter,setTransFilter]=useState([true,true]);
  const [listOriginal,setListOriginal] = useState([])
  const myModal=useRef();
  const [updateVisit,setUpdateVisit]=useState(true)
  const [showModal,setShowModal]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },

  } = useForm();
  function formatLongtxt(string=""){

    if (string?.length>20){
      return string.substring(0,20)+"..."}
    return string
  }
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
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getSched() {
      await axiosPrivate
        .post(
          'getProviderAppointments',
          { Email: auth.email || sessionStorage.getItem('email') },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            // console.log("Provider_appointments",data)
            const sorted_data=(data.sort((itemA,itemB)=>{return moment(itemA.trans_date_time).diff(itemB.trans_date_time)})).reverse()
            isMounted && setAppointmentList(sorted_data)
            setListOriginal(sorted_data)
            setIsLoading(false) 
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          setIsLoading(false)
          console.error(err)
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
          setPatientList(Data.Patients)
          
        })
        .catch((err) => {
          console.error(err)
        })
    }
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
          // console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            // console.log("Clinics",data)
            setClinicList(data)
            var clinics=[]
            var clinicObjects=[]
            data.map((item)=>{
              // console.log("clinsss",clinics)
              if (clinics.includes(item.clinic_id)){
                pass
              }
              else{
                clinicObjects=(
                  [...clinicObjects,{name:item.clinic_name,id:item.clinic_id}])
                clinics.push(item.clinic_id)
                
                return {name:item.clinic_name,id:item.clinic_id}
              }
            
            })
            console.log("ClinicOBj",clinicObjects)
            setClinicIDList(clinicObjects)
            
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
          setErrMsg(err.message)
        })
    }
    getPatientList()
    getClinicList()
    getSched()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [updateVisit])
  let morning_options=[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7]
  
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
                  id='create-visit'
                  // onclick='openModal()'
                  onClick={()=>{
                    setShowModal(true)
                  }}
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  New Visit
                </button>
              </ol>
            </div> */}
            <h4 className='page-title'>Visits</h4>
          </div>
        </div>
      </div>


      <div className="card">
                  <div className="card-body">
                      <div className="col-lg-12">
                        <h5 className="mt-1 ">Filters</h5>
                        
                        <ul className='nav nav-pills m-2' id='pills-tab' role='tablist'>
                          {/* <li className='nav-item col-xl-5 m-2' >
                            <div className="row-xl-12">
                                  <form onSubmit={handleSubmit} >
                                  <div className="form-group">
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Visits..."
                                        aria-label="Search Visits..."
                                        onChange={(e)=>setSearchString(e.target.value)}
                                      />
                                      <span className="input-group-append">
                                        <button className="btn btn-success" style={{zIndex:0}} type="submit">
                                          {(isLoading&&searchString>=3)?"Going...":'Go!'}
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                  </form>
                              </div>
                              </li> */}
                            <li className='nav-item m-2'>
                              <a
                                className='nav-link'
                                id='service_category_tab'
                                data-toggle='pill'
                                href='#service_category'
                                onClick={(e)=>{
                                  // setShowFilterWindow(!showFilterWindow)
                                  
                                  setActiveFilter("service_category")
                                  if (activeFilter==='service_category'){
                                    setShowFilterWindow(!showFilterWindow)}
                                  else if (activeFilter!=='service_category'){
                                    setShowFilterWindow(true)
                                  }
                                  // else {
                                  //   setShowFilterWindow(false)
                                    
                                  // }
                                }}
                              >
                                Clinic
                              </a><div className='tab-content detail-list position-absolute' id='pills-tabContent'>
                              <div className='tab-pane position-absolute' style={{zIndex:4 }}  id='service_category'>
                                {showFilterWindow&&activeFilter==='service_category'?
                                <CardItem> 
                      
                                  <div className="p-3" style={{minWidth:'340px'}}>
                                    <h6 className=" mt-0" >Clinics</h6>
                                    <div className='header-title'>
                                      {filterList.length>0?appointmentList.length+" result( s )":""}
                                    </div>
                                    {/* <div className="checkbox checkbox-success " > */}
                                    <StyleWrapper>
                                      <Multiselect
                                        style={{zIndex:3 ,minWidth:'500px'}}
                                        options={clinicIDList} // Options to display in the dropdown
                                        selectedValues={filterList} // Preselected value to persist in dropdown
                                        onSelect={
                                          (selectedList,selectedItem)=>{
                                              
                                              setFilterList([...filterList,selectedItem])
                                              const clinic_filter=selectedList.map((clinic)=>{return clinic.id})
                                              if (selectedList.length>0)
                                                {setAppointmentList(listOriginal
                                                  .filter((item)=>{
                                                      return(clinic_filter.includes(item.clinic_id)
                                                        )
                                                    }))}
                                              else{
                                                setAppointmentList(listOriginal)
                                              }
                                            }} // Function will trigger on select event
                                        onRemove={
                                          (selectedList,selectedItem)=>{
                                            
                                            
                                              // console.log("selectedList",selectedList)
                                              setFilterList(selectedList)
                                              const clinic_filter=selectedList.map((clinic)=>{return clinic.id})
                                              if (selectedList.length>0)
                                                {setAppointmentList(listOriginal
                                                  .filter((item)=>{
                                                      return(clinic_filter.includes(item.clinic_id)
                                                        )
                                                    }))}
                                              else{
                                                setAppointmentList(listOriginal)
                                              }
                                            }} // Function will trigger on remove event
                                        isObject={true}
                                        showCheckbox={true}
                                        displayValue="name"
                                        // Property name to display in the dropdown options
                                      />
                                      
                                    </StyleWrapper>
                                    {/* </div> */}
                                   
                                  </div>
                                
                          </CardItem>:<></>
                        }
                        </div>
                        </div>
                            </li>
                            <li className='nav-item m-2'>
                              <a
                                className='nav-link'
                                id='price_range_tab'
                                data-toggle='pill'
                                href='#price_range'
                                onClick={(e)=>{
                                  // setShowFilterWindow(!showFilterWindow)
                                  setActiveFilter("price_range")
                                  if (activeFilter==='price_range'){
                                  setShowFilterWindow(!showFilterWindow)}
                                  else if (activeFilter!=='price_range'){
                                    setShowFilterWindow(true)
                                  }
                                  // else {
                                  //   setShowFilterWindow(false)
                                    
                                  // }
                                }}
                              >
                                Status
                              </a><div className='tab-content detail-list position-absolute' id='pills-tabContent'>
                              <div className='tab-pane position-absolute' style={{zIndex:3 }} id='price_range'>
                                {(showFilterWindow&&activeFilter==='price_range')?
                                <CardItem> 
                                    <div className="p-3">
                                      {/* <h6 className=" mt-0">Price Range</h6> */}
                                      <div className='m-1'> 
                                        <h6 className=" mb-2">Status</h6>
                                        {statusdict.map((val,index) => (
                                          <div key={index} className="checkbox checkbox-success" style={{width:240}}>
                                            
                                            <input 
                                              id={`checkboxa${index}`}
                                              type="checkbox" 
                                              defaultChecked={statusFilter[index]}
                                              // checked={}
                                              value={statusFilter[index]}
                                              onChange={
                                                (e)=>{
                                                  
                                                    var newstatusfilter=statusFilter
                                                    if (newstatusfilter[index]===true){
                                                      newstatusfilter[index]=false
                                                    }
                                                    else if (newstatusfilter[index]===false){
                                                      newstatusfilter[index]=true
                                                    }
                                                    setStatusFilter(newstatusfilter)
                                                    // console.log('filter',newstatusfilter)

                                                    
                                                }}
                                                />
                                            <label htmlFor={`checkboxa${index}`}>
                                              {val}
                                              
                                            </label>
                                          </div>
                                        ))}
                                      </div>
                                      <div className='m-1'> 
                                          <button className='m-1 btn btn-round btn-success' onClick={()=>{
                                            const filter =statusFilter.map((filt,index)=>{if (filt===true){return index}else{return(false)}})
                                            
                                            setAppointmentList(listOriginal
                                              .filter((item)=>{
                                                return(filter.includes(parseInt(item.status))
                                                  )
                                                }))
                                          }}>Apply</button>
                                          {/* <button className='m-1 btn btn-round btn-outline-info' onClick={()=>{
                                            const filter =statusFilter.map((filt,index)=>{if (filt===true){return index}})
                                            setStatusFilter([true,true,true,true,true,true])
                                            setAppointmentList(listOriginal)
                                          }}>Reset</button> */}
                                      </div>
                                    </div>
                                          
                                  </CardItem> :<></>}
                                </div></div>
                            </li>
                            <li className='nav-item m-2'>
                              <a
                                className='nav-link'
                                id='payment_history_detail_tab'
                                data-toggle='pill'
                                href='#ratings'
                                onClick={(e)=>{
                                  // setShowFilterWindow(!showFilterWindow)
                                  setActiveFilter("ratings")
                                  if (activeFilter==='ratings'){
                                  setShowFilterWindow(!showFilterWindow)}
                                  else if (activeFilter!=='ratings'){
                                    setShowFilterWindow(true)
                                  }
                                  // else {
                                  //   setShowFilterWindow(false)
                                    
                                  // }
                                }}
                              >
                                Visit Type
                              </a>
                              <div className='tab-content detail-list position-absolute' id='pills-tabContent'>
                              <div className='tab-pane position-absolute ' style={{zIndex:3}} id='ratings'>
                              {(showFilterWindow&&activeFilter==='ratings')?
                              <CardItem>
                                <div className="p-3">
                                  <h6 className="mt-0 ">Visit Type</h6>
                                  {["Virtual Visit","In-Person Visit"].map((val,index) => (
                                    <div key={index} className="checkbox checkbox-success" style={{width:240}}>
                                      
                                      <input 
                                        id={`checkboxa${index}`}
                                        type="checkbox" 
                                        defaultChecked={transFilter[index]}
                                        // checked={}
                                        value={transFilter[index]}
                                        onChange={
                                          (e)=>{
                                            
                                              var newstatusfilter=transFilter
                                              if (newstatusfilter[index]===true){
                                                newstatusfilter[index]=false
                                              }
                                              else if (newstatusfilter[index]===false){
                                                newstatusfilter[index]=true
                                              }
                                              setTransFilter(newstatusfilter)
                                              // console.log('filter',newstatusfilter)

                                              
                                          }}
                                          />
                                      <label htmlFor={`checkboxa${index}`}>
                                        {val}
                                        
                                      </label>
                                    </div>
                                  ))}
                                    
                                </div>
                                <div className='m-1'> 
                                    <button className='m-1 btn btn-round btn-success' onClick={()=>{
                                      const filter =transFilter.map((filt,index)=>{if (filt===true){return index+1}else{return(false)}})
                                      // console.log('filterrrr',filter)
                                      setAppointmentList(listOriginal
                                        .filter((item)=>{
                                          return(filter.includes(parseInt(item.trans_type))
                                            )
                                          }))
                                    }}>Apply</button>
                                          
                                      </div>
                            </CardItem>:<></>}
                    </div></div>
                            </li>
                            
                          
                          </ul>
                    </div>
                  </div>
              </div>

      {/* <!-- Calendar --> */}      
      <div className='col position-absolute '>
        <div className='col-12 mr-2 '  style={{marginLeft:-25}}>
          <CardItem>
          <h5 className="mt-1 ">View</h5>
                        
            <ul className='nav nav-pills mb-0' id='pills-tab' role='tablist'>
              <li className='nav-item'>
                <a
                  className='nav-link active'
                  id='calendar_view_tab'
                  data-toggle='pill'
                  href='#calendar_view'
                >
                  Calendar
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  id='list_view_tab'
                  data-toggle='pill'
                  href='#list_view'
                >
                  List
                </a>
              </li>
            
              </ul>
          </CardItem>
        </div>
        <div className='tab-content detail-list' style={{ marginTop:-20 ,marginLeft:-25, width: '100%'}} id='pills-tabContent'>
          
        <div className='tab-pane fade show active' id='calendar_view'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-body'>
                <Calendar allowCall={true} dateList={appointmentList} />
                <div style={{ clear: 'both' }}></div>
              </div>
            </div>
          </div>
        </div>
      
        <div className='tab-pane fade show' id='list_view'>
          {/* <div className='col-lg-12'> */}
          {(appointmentList.length!==0)?
              <TableCard headers={["Patient","Service Name","Category","Clinic","Appointment Time","Visit Type", "Status","Action"]}>
              {appointmentList.map((item,index)=>{
                const appointmentTime=`${item.trans_date_time.replace(/-/g, "/").slice(0,10)} ${(item.trans_start+":00:00")} `
                // console.log(appointmentTime)
                const appointmentPeriod=[moment(appointmentTime),moment(appointmentTime).add(1, 'hours')]
                const formatPeriod=[
                  appointmentPeriod[0].format("MMM DD YY"),
                  appointmentPeriod[0].format("hh:mm"),
                  appointmentPeriod[1].format("hh:mm a"),
                ]
                const appointmentIsOver= (moment().isAfter(appointmentPeriod[1]))
                
                const withinAppointmentPeriod=timenow.isAfter(appointmentPeriod[0])&&appointmentPeriod[1].isAfter(timenow)
                // const withinAppointmentPeriod=false
                // console.log("AppPer",withinAppointmentPeriod)
                return(
                <tr key={index} className={withinAppointmentPeriod?'bg-light':''}>
                <td>
                  <Link
                    to={"/provider/patient/profile/"+item.patient_id}
                    state={{
                      selectedUser: item,
                    }}
                  >
                    <div className="row">
                      <div className="col">
                        {/* <img
                          src={AWS_BUCKET_SERVICES+"profiles/pictures/"+item.picture}
                          alt=""
                          className="thumb-sm rounded-circle mr-2"
                          style={{objectFit:'cover'}}
                        /> */}
                        {item.full_name} 
                      </div>
                    </div>
                  </Link>
                </td>

                <td>
                {formatLongtxt(item.service_name)}
                </td>
                <td>
                {formatLongtxt(item.category)}
                </td>
                <td>
                {formatLongtxt(item.clinic_name)}
                </td>
                <td>
                {formatPeriod[0]}<br/>{formatPeriod[1]}-{formatPeriod[2]}
                
                </td>
                <td>
                {item.trans_type==="1"?"Virtual Visit":(item.trans_type==="2")?"In-Person Visit":""}
                </td>
                <td>
                <StatusTextVisit status={item.status}/>
                </td>
                <td>
                  <button 
                    className={withinAppointmentPeriod?'btn btn-success':'btn btn-outline-purple' }
                    onClick={()=>{
                      
                      Swal.fire({
                        titleText: `Appointment Details:`,
                        html:`<div class='text-left'>
                        <b class="text-center"> ${ appointmentIsOver?"<div class='text-purple'>The Appointment period is over.</div>":withinAppointmentPeriod?"<div class='text-success'>Appointment is Now!</div>":""}</b> 
                        Date: <strong>${formatPeriod[0]}, ${formatPeriod[1]} - ${formatPeriod[2]}</strong><br/><br/>
                      Name: ${item.full_name}<br/>
                      Email: ${item.email}<br/>
                      Phone: ${item.contact_info}<br/>
                      </div>`,
                      confirmButtonText:  
                        (withinAppointmentPeriod?"Start Zoom Meeting":'OK'),
                      showCancelButton: true,
                      // showCancelButton:true
                      
                      
                      })
                        .then(
                          async (response)=>
                        {
                          // console.log(response)
                          if (response?.isConfirmed&&withinAppointmentPeriod){
                            await axiosPrivate
                          .post(
                            'providerStartAppointment',
                            { Email: auth.email,
                              MeetingID: item.appointment_id,
                            },
                            // {
                            //   signal: controller.signal,
                            // }
                          )
                          .then((res) => {
                            if (res.data?.Status ) {
                              Swal.fire({title:'Virtual Visit',html:'Zoom Meeting will start.'}).then(({isConfirmed})=>{
                                if (isConfirmed) {
                                  navigate('/virtualvisit/room', {
                                      state: {
                                        MeetingID: res.data.Data.MeetingID,
                                        Password: res.data.Data.Passcode },
                                    })
                                }
                              })
                              
                            } else {
                              Swal.fire(res.data?.Message)
                            }
                          })
                          .catch((err) => console.error(err))
                          }
                      })
                    }}
                  >{(withinAppointmentPeriod)?"Start Visit":"View Visit"}</button>
                  
                  
                
                </td>
                </tr>

              )})}
                      
              </TableCard>:<><CardLongItem className={'col-lg-12'}>{(isLoading)?
              <h4>
        <div className='d-flex justify-content-center'>
          <RingLoading size={200}/>
          </div>
        </h4>
      
      :"No Appointments."}</CardLongItem></>}
            {/* </div> */}
          </div>
        </div>
      </div>
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
                  <input required className="form-control" type="text" id="visitTitle" {...register("VisitTitle")}/>
                  <label  className="col-form-label">Patient</label>
                  <select required className="form-control" {...register("PatientID")}>
                      <option>Select Patient...</option>
                        {patientList.map((item,index)=>{
                                return(
                                <option key={index} value={item.patient_id}>{item.first_name} {item.last_name}</option>)
                              })}
                  </select>
                  
                  <label  className="col-form-label">Clinic</label>
                  <select required className="form-control" {...register("ClinicID")}>
                              <option>Select Clinic...</option>
                              {clinicList.map((item)=>{
                                return(
                                <option value={item.clinic_id}>{item.clinic_name} </option>)
                              })}
                          </select>
                  <label htmlFor="date" className="col-form-label">Visit Date</label>
                  <input required className="form-control" defaultValue={moment().format('yy-mm-dd')} type="date" id="date" {...register("Date")}/>
                  
                  <label htmlFor="time" className="col-form-label">Time</label>
                  {/* <input className="form-control" pattern="[0-9]{2}:[0]{2}" defaultValue={moment().format('HH:MM a')} type="time" id="time" {...register("Time")}/> */}
                  <select
                    required 
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

export default Visits
