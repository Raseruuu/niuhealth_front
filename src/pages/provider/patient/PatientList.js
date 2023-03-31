import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PatientListData from '../../../components/provider/PatientListData'
import TableCard, { ContainerFluid, TableTitle } from '../../../components/table/Tables'
// import   from "../../../components/table/Tables"
import { AWS_BUCKET, AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import useDebounce from '../../../hooks/useDebounce'
import Pagination from "react-js-pagination";
import { CardLongItem } from '../../../components/cards/Card'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import RingLoading from '../../../components/lottie/RingLoading'
// Provider list of patients

function PatientList() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [patientList, setPatientList] = useState([])
  
  const [clinicList, setClinicList] = useState([])
  const [visitTarget, setVisitTarget] = useState({})
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [pageNum,setPageNum]=useState(1)
  const [pageLimit,setPageLimit]=useState(10)
  const [visitType,setVisitType]=useState("Virtual")
  const [clinicIDList, setClinicIDList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [service, setService] = useState("")
  const [pagesMax,setPagesMax] = useState(1)
  // itemsCountPerPage
  /*
  For Status:
  Confined -  badge-soft-purple
  Deceased - badge-soft-danger
  Follow-up Checkup - badge-soft-success
  */
  let morning_options=[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7]
  function hideModal(){
    // Swal.fire("This Happened")
    $('#myModal').hide();
    $('.modal-backdrop').hide();
  }
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },

  } = useForm();
  async function createInPersonVisit(data) {
    const controller = new AbortController()
    const patient_obj=visitTarget
    await axiosPrivate
    
      .post(
        'providerCreateAppointment',
        { ...data,
          Type:(visitType==="Virtual"?"1":"2"),
          PatientID:patient_obj.patient_id,
          Email: auth?.email || sessionStorage.getItem('email'),
          ServiceID: service.service_id

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
            title: "Appointment Created",
            html: `When: ${hourformat(data.Time)}`,
            icon: 'info'
            
          })
          // setUpdateVisit(!updateVisit)
          hideModal()
         
        }
        else{
          Swal.fire({
            title: "Error",
            html: `${Message}`,
            icon: 'warning'
            
          })
          hideModal()
        }
      })
      .catch((err) => {
        console.error(err)
        hideModal()
      })
  }
  async function getServicesList() {
    const controller = new AbortController()
    await axiosPrivate
      .post(
        ('getServices'),
        { 
          Email: auth.email || sessionStorage.getItem('email'),
          Search: search
        },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        const { Status, Data: data = [], Message } = res.data

        if (Status) {
          setIsLoading(false)
          const serviceList=res.data.Data
          setServiceList(serviceList)
          
          // setSeListOriginal(serviceList)
          // const serviceCategories=serviceList.map((item,index)=>{return item.category})
          // console.log(serviceCategories)
          // setCategoryOptions(serviceCategories )
        } else {
          throw new Error(Message)
        }
      })
      .catch((err) => {
        console.error(err)
        setErrMsg(err.message)
      })
  }
  async function getList() {
    const controller = new AbortController()
    setIsLoading(true)

    await axiosPrivate
      .post(
        searchText ? 'searchPatient' : 'getPatients',
        { 
          Email: auth.email,
          Search: searchText,
          PageNumber:pageNum,
          RowPerPage:10
        },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        setIsLoading(false)
        console.log(res)
        const { Data = [] } = res.data

        if (searchText?.length>0){
          setPatientList(Data)
        }
        else{
          setPatientList(Data.Patients)
          console.log(Data)
          setPagesMax(Data.MaxPage)
        }
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(err)
        setErrMsg(err.message)
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
        console.log(res)
        const { Status, Data: data = [], Message } = res.data

        if (Status) {
          // console.log("Clinics",data)
          setClinicList(data)
          setClinicIDList(data?.map((item)=>{return {name:item.clinic_name,id:item.clinic_id}}))
          
        } else {
          throw new Error(Message)
        }
      })
      .catch((err) => {
        console.error(err)
        setErrMsg(err.message)
      })
  }
  async function handleSubmitSearch(event) {
    event.preventDefault()
    setPageNum(1)
    if (searchText?.length < 3) {
      return
    }

    await getList()
  }
  
  useEffect(() => {
    if (searchText?.length === 0) {
      getList()
    }
  }, [searchText])
  useEffect(() => {
    getServicesList()
    getClinicList()
  }, [])
  useEffect(() => {
    setIsLoading(true)
    getList()
  }, [pageNum])

  return (
    <ContainerFluid>
      <TableTitle title="Patients">
        <div className="float-left">
          <form onSubmit={handleSubmitSearch}>
            
            <div
              className="input-group"
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
            >
              <input
                type="text"
                className="form-control"
                style={{ maxWidth: '300px' }}
                placeholder="Search Patients..."
                aria-label="Search Patients..."
                onChange={(e) => setSearchText(e.target.value)}
              />

              <span className="input-group-append">
                <button className="btn btn-success" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </span>
            </div>
          </form>
        </div>
      </TableTitle>
      {/* <CardLongItem> */}
      {/* {(patientList.length>pageLimit)?
      
            <div className='justify-content-center d-flex' style={{alignItems:'center',flexDirection:'column'}}>
              
              <Pagination
                activePage={pageNum}
                itemsCountPerPage={pageLimit}
                totalItemsCount={patientList.length||[]}
                pageRangeDisplayed={5}
                // onPageChange={}
                itemclassName="page-item "
                linkClass="page-link float-center"
                onChange={(e)=>{
                  console.log(e);
                  setPageNum(e)}}
                        />
              <div className='row-lg-12 h-2'>Page {pageNum}</div> 
                  </div>:<></>} */}
        {/* {isLoading ? 'Loading please wait...' : null} */}
        {/* {errMsg ? <span style={{ color: 'red' }}>{errMsg}</span> : null}
        {patientList.length <= 0 && searchText.length > 0
          ? '0 record found.'
          : null} */}
          {/* </CardLongItem> */}
      {(patientList?.length>0)?<>
        <TableCard
        headers={[
          'Patient',
          'Email',
          'Phone No.',
          'Status',
          'Insurance',
          'Action'
        ]}
      >
        
        <PatientListData 
          limit={pageLimit} 
          pagenum={(searchText.length>0)?pageNum:1} 
          list={patientList} 
          showModal={
            (patient)=>{
              setVisitTarget(patient)
              $("#myModal").modal()
              $('#myModal').show();
              $('.modal-backdrop').show();
              
              }} 
          />
        
      </TableCard>
      <CardLongItem>
      {(patientList.length>0)?
      
            <div className='justify-content-center d-flex' style={{alignItems:'center',flexDirection:'column'}}>
              
              <Pagination
                activePage={pageNum}
                itemsCountPerPage={pageLimit}
                totalItemsCount={(searchText.length>0)?patientList.length:patientList?.length*pagesMax+1}
                pageRangeDisplayed={10}
                // onPageChange={}
                itemclassName="page-item "
                linkClass="page-link float-center"
                onChange={(e)=>{
                  // console.log(e);
                  if (searchText.length<3){
                    setIsLoading(true)
                    setPatientList([])
                  }
                  setPageNum(e)}}
                        />
              <div className='row-lg-12 h-2 m-1'>Page {pageNum}</div> 
                  </div>:<></>}
        {/* {isLoading ? 'Loading please wait...' : null} */}
        {/* {errMsg ? <span style={{ color: 'red' }}>{errMsg}</span> : null}
        {list.length <= 0 && searchText.length > 0
          ? '0 record found.'
          : null} */}
          </CardLongItem>
        </>:<CardLongItem><h5>
      {(isLoading)?
        <CardLongItem><h4>    
          <div className='d-flex justify-content-center'>
            <RingLoading size={200}/>
          </div>
        </h4>
      </CardLongItem>:
     "No Results."}</h5></CardLongItem>
        }
         {/* {showModal===false?null: */}
          <div id="myModal" className={"modal fade show"} role="form">
            <div className="modal-dialog" style={{maxWidth: '500px', margin: '1.75rem auto'}}>

              {/* <!-- Modal content--> */}
              <div className="modal-content">

                <div className="modal-header">
                  
                  <h4 className="modal-title">Book an Appointment</h4>
                </div>
                <form id="create-appointment" onSubmit={handleSubmit(createInPersonVisit)}>
                <div className="modal-body">
                  
                  <div className="nuModalCont visitRequestModal">
                    
                    <div className="" >
                      <div className='row m-2 ' >
                      
                        <img
                          src={AWS_BUCKET_SERVICES+"profiles/pictures/"+visitTarget.picture}
                          alt=""
                          className="rounded-circle mr-2 m-2"
                          style={{objectFit:'cover', height:'80px',width:'80px'}}
                        />
                        <div className='m-2 d-flex justify-content-center align-items-center'><h5>{visitTarget.first_name} {visitTarget.last_name}<div className="text-muted">Patient</div></h5></div>
                      </div>
                      <label htmlFor="title" className="col-form-label">Visit Title</label>
                      <input required className="form-control" type="text" id="visitTitle" {...register("Title")}/>
                      {/* <label  className="col-form-label">Patient</label>
                      <select required className="form-control" {...register("PatientID")}>
                          <option>Select Patient...</option>
                            {patientList.map((item,index)=>{
                                    return(
                                    <option key={index} value={item.patient_id}>{item.first_name} {item.last_name}</option>)
                                  })}
                      </select> */}
                      <label htmlFor="type" className="col-form-label">Visit Type</label>
                      <div className='row-sm-12 d-flex justify-content-center align-items-center'>
                      
                        <button type="button" id="inperson" name="visit_type" 
                          className={'m-1 col-lg-5 form-button btn waves-effect waves-light btn-'+(visitType==="In-Person"?"":"outline-")+'purple'}
                          onClick={()=>{setVisitType('In-Person')}} >
                             In-Person Visit
                        </button>
                        <button type="button" id="virtual" name="visit_type"
                          className={'m-1 col-lg-5 form-button btn waves-effect waves-light btn-'+(visitType==="Virtual"?"":"outline-")+'purple'}
                          onClick={()=>{setVisitType('Virtual')}} >
                            Virtual Visit
                            </button>
                      </div>
                      <label  className="col-form-label">Service</label>
                      <select required className="form-control" 
                        onChange={(e)=>{
                        const [chosenService]=serviceList.filter((item)=>{return (e.target.value===item.service_id)})
                        setService(chosenService)}}
                        // {...register("ServiceID")}
                        >
                                  <option value="" 
                                    >
                                        Select Service...
                                  </option>
                                  {serviceList?.map((item)=>{
                                    return(
                                    <option value={item.service_id}>{item.service_name} </option>)
                                  })}
                              </select>
                      <label  className="col-form-label">Clinic</label>
                      <select required className="form-control" {...register("ClinicID")}>
                                  <option value="">Select Clinic...</option>
                                  {clinicList.filter((item,index)=>{
                                    
                                    const serviceClinics=service?.clinic_ids?.split(',')
                                    return (serviceClinics?.includes(item.clinic_id))
                                  }
                                )?.map((item)=>{
                                    return(
                                    <option value={item.clinic_id}>{item.clinic_name} </option>)
                                  })
                                  
                                  }
                              </select>
                      
                      <label htmlFor="date" className="col-form-label">Visit Date</label>
                      <input required 
                        className="form-control" 
                        min={moment().format("YYYY-MM-DD")}
                        defaultValue={moment().add(1,"days").format("YYYY-MM-DD")}
                        type="date" id="date" {...register("Date")}/>
                      
                      <label htmlFor="time" className="col-form-label">Time</label>
                      {/* <input className="form-control" pattern="[0-9]{2}:[0]{2}" defaultValue={moment().format('HH:MM a')} type="time" id="time" {...register("Time")}/> */}
                      <select
                        required 
                        {...register("Time")}
                        className="form-control">   
                        {morning_options.map((option, index)=>(
                          <option key={index} value={option}>{hourformat(option)}</option>
                          ))}
                          
                        {/* <option value={null}>--:--</option> */}
                      </select>
                      {/* <label  className="col-form-label">Internal Notes</label>
                      <textarea className="form-control" rows="5" id="message" {...register("InternalNotes")}></textarea> */}
                      
                    </div>
                  </div>
              

                </div>
                <div className="modal-footer">
                <div className="nuBtnContMod">
                  <button type="submit" className="btn btn-purple waves-effect waves-light" id="create-visit">Save Visit</button>
                  </div>
                  <button type="button" className="btn btn-outline-danger"
                  data-target="#myModal" data-dismiss="modal"
                  onClick={(e)=>{
                    e.preventDefault()
                    $('#myModal').hide();
                    $('.modal-backdrop').hide();
                  }
                  }
                  >Close</button>
                </div>
                </form>
              </div>

            </div>
           
          </div>
        
    </ContainerFluid>
  )
}
export default PatientList
