import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { TableTitle } from '../../components/table/Tables'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import { AWS_BUCKET_SERVICES, AWS_BUCKET_PROFILES } from '../../constants'

import TimeZoneSelect from  '../time/Timezone'
import ProfileEdit from '../../pages/patient/Profile'
import UploadImage from '../form/UploadImage'
function CurrencySelect({ setLocalCurrency, value,disabled }){
  return(
    <div class="row">
      <select 
        value={value}
        disabled={disabled}
        onChange={(e)=>setLocalCurrency(e.target.value)}
        className="col-sm form-control" 
        style={{marginLeft:"10px",marginRight:"20px",maxWidth:400}}>
        <option value={""}>Select </option>
        <option value={"USD"}>US Dollar (USD) </option>
        <option value={"EUR"}>European Euro (EUR)</option>
        <option value={"JPY"}>Japanese Yen (JPY)</option>
        <option value={"GBP"}>Sterling Pound (GBP)</option>
        <option value={"CHF"}>Swiss Franc (CHF)</option>
        <option value={"CAD"}>Canadian Dollar (CAD)</option>
        </select>
  </div>
  )
}

function hourformat(hour){
    if (hour>12){
      return (hour-12)+" PM"
    }
    else if (hour===12){
      return (12)+" PM"
    }
    else if (hour===0){
      return (12)+" AM"
    }
    else{
      return hour+" AM"
    }
  }
function ScheduleSelect({hours,setHours,weekday,disabled}){
  // hours = 0
  let morning_options=[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7]
  let night_options=[20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,]
  
  return(
    <div class="column" style={{paddingLeft:"20px"}}>
      <div class = "row">
        <div>Start Time </div>
        <div class = "col">
      <select
        disabled={disabled}
        onChange={(e)=>{
        setHours({...hours,['Hours'+weekday+'Start']:e.target.value});
        console.log(hours)
      }
      }
        className="col-sm form-control float-right" style={{ minWidth: '116px',marginLeft:"10px",marginRight:"10px",width:"30px"}}>   
        {morning_options.map((option)=>(
          <option value={option}>{hourformat(option)}</option>
          ))}
        <option value={null}>N/A</option>
      </select>
      </div>
      </div>
      <div class = "row">
        <div>End Time </div>
        <div class = "col">
        <select  
          disabled={disabled}
          onChange={(e)=>{
            setHours({...hours,['Hours'+weekday+'End']:e.target.value});
            console.log(hours)
          }
          }
          className="col-sm form-control float-right" style={{minWidth: '116px',marginLeft:"10px",marginRight:"10px",width:40}}>
          {night_options.map((option2)=>(
            <option value={option2}>{hourformat(option2)}</option>
            ))}
          <option value={null}>N/A</option>
        </select>
        </div>
      </div>
  </div>
  )
}

export default function ClinicSchedule() {
  const { auth } = useAuth()
  const { action, clinicID } = useParams()
  // console.log(useParams())
  const axiosPrivate = useAxiosPrivate()
  const [isSuccess, setIsSuccess] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState(null)
  const alertBtnRef = useRef()
  const [localCurrency,setLocalCurrency]=useState("USD")
  const [localTimezone,setTimeZone]=useState("+8")
  const [clinicProfile,setClinicProfile]=useState({})
  const { state } = useLocation();
  const [clinicImages,setClinicImages]=useState([])
  const [imagepreview, setImagePreview] = useState(false)
  const imgRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm()
  const navigate = useNavigate()
  // default hours:
  const [hours,setHours]=useState({
    'HoursMonStart':8,
    'HoursMonEnd':20,
    'HoursTueStart':8,
    'HoursTueEnd':20,
    'HoursWedStart':8,
    'HoursWedEnd':20,
    'HoursThuStart':8,
    'HoursThuEnd':20,
    'HoursFriStart':8,
    'HoursFriEnd':20,
    'HoursSatStart':8,
    'HoursSatEnd':20,
    'HoursSunStart':8,
    'HoursSunEnd':20
    })
  
    function handleInputChange(e) {
      const name = e.target.name
      const value = e.target.value
      setClinicProfile((prev) => ({ ...prev, [name]: value }))
    }
  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data)
    
    formData.append("Email", auth.email);
    formData.append("ClinicName",data.ClinicName)
    formData.append("Specialty",data.Specialty)
    formData.append("Contact_info",data.Contact_info)
    formData.append("Address",data.Address)
    for (let key in hours) {
      if (hours.hasOwnProperty(key)) {
        formData.append(key,hours[key])
        console.log(key,hours[key])
      }
    }
    formData.append("LocalCurrency", localCurrency);
    formData.append("LocalTimeZone", localTimezone);
    for (var index in clinicImages){
      
      formData.append('image'+(parseInt(index)+1), clinicImages[index].file)
    }
    
    let endpoint=(
      (action==='edit')?
      "providerUpdateClinicDetails":
      (action==='create')?
      "createClinic":
      "none")
    if (endpoint!="none"){
      await axiosPrivate
        .post(endpoint, 
          formData,{
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: function (ProgressEvent) {
              console.log(
                "uploadprogress: " +
                  (ProgressEvent.loaded / ProgressEvent.total) * 100 +
                  "%"
              );
            },
          }
        )
        .then((res) => {
          return res.data
        })
        .then((data) => {
          const { Status, Message } = data || {}
          // setFeedbackMsg(Message)
          if (Status) {
            setIsSuccess(true)
            alert("Success! You created a new Clinic.")
          } else {
            setIsSuccess(false)
            
            alert((action==='create')?"Failed to create a new Clinic.":(action==='edit')?"Failed to update Clinic.":null)
          }
        })
        .catch((err) => {
          console.log(err)
          // setFeedbackMsg(err)
        })
    }
  }
  useEffect(() => {
    const controller = new AbortController()

    async function getClinicDetails() {
      await axiosPrivate
        .post(
          'getClinicDetails',
          { Email: auth.email, ClinicID:clinicID },
          {
            signal: controller.signal
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data, Message } = res.data
          const details = data

          if (Status) {
            console.log('details',res.data.Data)
            setClinicProfile(res.data.Data)
            var tempImgList=[]
            if (res.data.Data.image1){tempImgList.push({path:res.data.Data.image1,file:null})}
            if (res.data.Data.image2){tempImgList.push({path:res.data.Data.image2,file:null})}
            if (res.data.Data.image3){tempImgList.push({path:res.data.Data.image3,file:null})}
            if (res.data.Data.image4){tempImgList.push({path:res.data.Data.image4,file:null})}
            if (res.data.Data.image5){tempImgList.push({path:res.data.Data.image5,file:null})}
            
            setClinicImages(tempImgList)
            setImagePreview(true)
            // setOldProfile(register)
            // setAuth((prev) => ({ ...prev, ...details }))
            // setTimeZone(details?.local_time_zone)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    if (action==='profile'||action==='edit'){
      getClinicDetails()
    }
    else if (action==='create'){

      setClinicProfile({...clinicProfile, image1:{path:"clinics/Default.png"}})
    }
  }, [])
  // useEffect(() => {
  //   reset()
  // }, [isSuccess])
  
  function triggerFileInput() {
    if (imgRef.current) {
      imgRef.current.click()
    }
  }
  const handleImageInputChange = (e) => {
    const [file] = e.target.files;
    console.log("FILE HERE: ",file);
    setClinicProfile({
      ...clinicProfile,
      picturefile:file
    })
  };

  useEffect(() => {
    // let isMounted = true
    // const controller = new AbortController()
    let fileReader, isCancel = false;
    if (clinicProfile.picturefile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          // setFileDataURL(result)
          // console.log('result',result)
          setClinicProfile({
            ...clinicProfile,
            picture:result 
          })
          setImagePreview(true)
        }
      }
      fileReader.readAsDataURL(clinicProfile.picturefile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
    

  }, [clinicProfile])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container-fluid'>
        <TableTitle title={"Clinic Profile"}>
          
              <div className='float-right'>
                {/* <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/admin'>NU Health</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link to='/admin/clinics'>Clinics</Link>
                  </li>
                  <li className='breadcrumb-item active'>
                    New Clinic Schedule
                  </li>
                </ol> */}
              </div>
        </TableTitle>

        <div className='row '>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-body'>
              {/* <div class="row" style={{ marginTop: "10px", marginBottom:"40px"}}>
                  <div class="col-lg-12">
                    <label htmlFor="exampleFormControlSelect2">
                      Upload Clinic Image
                    </label>
                    <div class="uploadPicContainer">
                      <input
                        type="file"
                        id="input-file-now-custom-1"
                        class="dropify"
                        accept="image/*"
                        capture="user"
                        multiple
                        required
                        {...register("Image", {
                          required:true
                        })}
                        onChange={(e) => {
                          console.log(e.target.files);
                        }}
                      />
                      {errors.image ? (
                        <div className="text-danger">Please choose file</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {feedbackMsg ? (
                  <div className='row' >
                    <div className='col-lg-6'>
                      <div
                        className={`alert  alert-dismissible fade show ${
                          isSuccess ? 'alert-success' : 'alert-danger'
                        }`}
                        role='alert'
                      >
                        {feedbackMsg}
                        <button
                          type='button'
                          className='close'
                          data-dismiss='alert'
                          aria-label='Close'
                          ref={alertBtnRef}
                        >
                          <span aria-hidden='true'>&times;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null} */}
                <div className='row'>
                  <div className='col'>
                      <div className='form-group row'>
                        
                        
                        
                        {clinicImages.map((clinicImage,index)=>(
                          
                          <UploadImage 
                            id={index} 
                            images={clinicImages} 
                            setImages={setClinicImages} 
                            previewImage={clinicImage} 
                            formData={clinicProfile} 
                            setFormData={setClinicProfile} 
                            imagepreview={imagepreview} 
                            setImagePreview={setImagePreview}
                            action={action}/>
                        // <UploadImage id={3} formData={clinicProfile} setFormData={setClinicProfile} imagepreview={imagepreview}/>
                        // <UploadImage id={4} formData={clinicProfile} setFormData={setClinicProfile} imagepreview={imagepreview}/>
                        // <UploadImage id={5} formData={clinicProfile} setFormData={setClinicProfile} imagepreview={imagepreview}/>
                       
                        ))}
                        {(clinicImages.length<4&&(action==='edit'||action==='create'))?(
                        <button className="btn btn-gradient-success waves-effect waves-light" minWidth="200px" height="150px" onClick={()=>{if (clinicImages.length<4){setClinicImages([...clinicImages,{path:'clinics/Default.png'}])}}}>+</button>
                        ):(clinicImages.length===0)?(
                          <UploadImage 
                            id={index} 
                            images={clinicImages} 
                            setImages={setClinicImages} 
                            previewImage={clinicImage} 
                            formData={clinicProfile} 
                            setFormData={setClinicProfile} 
                            imagepreview={imagepreview} 
                            setImagePreview={setImagePreview}
                            action={action}/>
                        //   <div className="d-flex flex-column justify-content-center align-items-center">
                        //   <input
                        //     hidden
                        //     type="file"
                        //     id="input-file-now-custom-1"
                        //     accept="image/*"
                        //     capture="user"
                        //     name="Image"
                        //     ref={imgRef}
                        //     // value={clinicProfile.Image}
                        //     onChange={handleImageInputChange}
                        //   />
        
                        //   <img
                        //     alt=""
                        //     style={{objectFit: 'cover', margin: 'unset' ,width:200,height:150}}

                        //     onClick={() => {
                        //       Swal.fire({
                        //         // title: 'Profile Picture',
                        //         html: `<img width="200px" height="150px" src="${!imagepreview?AWS_BUCKET_SERVICES + clinicProfile.picture_file: (clinicProfile.picture)}"></img>`,
                        //         // { AWS_BUCKET_SERVICES } + profile.picture,
                        //       })
                        //     }}
                        //     src={!imagepreview?AWS_BUCKET_SERVICES + clinicProfile.picture_file: (clinicProfile.picture)}
                        //     className="ob"
                        //     // style={{ margin: 'unset' }}
                        //   />

                        //     <button
                        //       type="button"
                        //       className="btn btn-gradient-success waves-effect waves-light"
                              
                        //       onClick={triggerFileInput}
                              
                        //     >
                        //       Upload
                        //     </button>
                        // </div>
                        ):null}
                        
                        
                        
                    </div>
                  </div>
                  
                </div>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='name'
                          className='col-form-label text-right'
                        >
                          Clinic Name
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.Name ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='name'
                          disabled={action==='profile'}
                          name="clinic_name"
                          value={clinicProfile.clinic_name}
                          onChange={handleInputChange.bind(this)}
                          // onChange={(e)=>setClinicProfile({...clinicProfile,clinic_name:e.target.value})}
                          {...register('ClinicName')}
                        />
                        {errors.name ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic name.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                {/* </div>

                <div className='row'> */}
                  <div className='col-lg-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='example-text-input'
                          className='col-form-label text-right'
                        >
                          Specialty
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.Specialty ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='Specialty'
                          disabled={action==='profile'}
                          value={clinicProfile.specialty}
                          name="specialty"
                          onChange={handleInputChange.bind(this)}
                          {...register('Specialty')}
                        />
                        {errors.specialty ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic's service specialty.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='Contact_info'
                          className='col-form-label text-right'
                        >
                          Contact Info
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.contact_info ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='Contact_info'
                          disabled={action==='profile'}
                          name="contact_info"
                          value={clinicProfile.contact_info}
                          onChange={handleInputChange.bind(this)}
                          {...register('Contact_info')}
                        />
                        {errors.contact_info ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic's contact info.
                          </div>
                          
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='example-text-input'
                          className='col-form-label text-right'
                        >
                          Address
                        </label>
                      </div>
                      <div className='col-md-12'>
                        <input
                          className={`form-control ${
                            errors.Address ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='Address'
                          disabled={action==='profile'}
                          value={clinicProfile.address}
                          name="address"
                          onChange={handleInputChange.bind(this)}
                          {...register('Address')}
                        />
                        {errors.Address ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic address.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='local_currency'
                          className='col-form-label text-right'
                        >
                          Local Currency
                        </label>
                      </div>
                      <div className='col-md-12'>
                        {/* <input
                          className={`form-control ${
                            errors.Services ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='local_currency'
                          {...register('local_currency', { required: true })}
                        /> */}{}
                        <CurrencySelect 
                          value={clinicProfile.specialty}
                          onChange={handleInputChange.bind(this)}
                          disabled={action==='profile'} 
                          register={register} 
                          localCurrency ={localCurrency} 
                          setLocalCurrency={setLocalCurrency}
                        />
                        {errors.local_currency ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic's local currency(s).
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='local_time_zone'
                          className='col-form-label text-right'
                        >
                          Local Time Zone
                        </label>
                      </div>
                      <div className='col-md-12'>
                        {/* <input
                          className={`form-control ${
                            errors.Services ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='local_time_zone'
                          {...register('local_time_zone', { required: true })}
                        /> */}
                        <TimeZoneSelect 
                          setTimeZone={setTimeZone}
                          disabled={action==='profile'}/>
                        {errors.local_time_zone ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic's local time zone(s).
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>         
                <div className='row'>
                  <div >
                    <div >
                      <div className='col-md-12'>
                        <label
                          htmlFor='Working_hours'
                          className='col-form-label text-right'
                        >
                          Working Hours
                        </label>
                      </div>
                      <div className='col-lg-12'  >
                        <div className='form-group col' >
                          <div className='row'>
                            <div className='col-md-4' >
                              <h5>Sunday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Sun" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-4'>
                              <h5>Monday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Mon" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-4'>
                              <h5>Tuesday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Tue" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-4'>
                              <h5>Wednesday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Wed" disabled={action==='profile'}/>
                            </div>
                          
                            {/* <div className='row'> */}
                            
                            <div className='col-md-4'>
                              <h5>Thursday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Thu" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-4'>
                              <h5>Friday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Fri" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-4'>
                              <h5>Saturday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Sat" disabled={action==='profile'}/>
                            </div>
                            <div>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                

                <div className='row'>
                 { (action==='profile')?(
                  <div className='col-lg-12'>
                    <button
                      type='button'
                      className='btn btn-gradient-success waves-effect waves-light'
                      onClick={() =>navigate('/provider/clinics/edit/'+clinicID)}
                      style={{marginRight:'10px'}}
                    >
                      Edit Clinic
                    </button>
                    <button
                      type='button'
                      className='btn btn-gradient-info waves-effect waves-light'
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </button>
                  </div>):
                  (action==='edit')?(
                  <div className='col-lg-12'>
                    <button
                      type='submit'
                      className='btn btn-gradient-success waves-effect waves-light'
                      disabled={isSubmitting}
                    >
                      Save
                    </button>{' '}
                    <button
                      type='button'
                      className='btn btn-gradient-info waves-effect waves-light'
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='btn btn-gradient-info waves-effect waves-light'
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    </div>):
                    (action==='create')?(
                      <div className='col-lg-12'>
                        <button
                          type='submit'
                          className='btn btn-gradient-success waves-effect waves-light'
                          disabled={isSubmitting}
                        >
                          Save
                        </button>{' '}
                        <button
                          type='button'
                          className='btn btn-gradient-info waves-effect waves-light'
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </button>
                        </div>):null
                  }
                  
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
