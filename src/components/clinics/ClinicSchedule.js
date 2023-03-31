import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { TableTitle } from '../../components/table/Tables'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import { AWS_BUCKET_SERVICES, AWS_BUCKET_PROFILES } from '../../constants'

import TimeZoneSelect from  '../time/Timezone'
import ScheduleSelect from  '../time/Hours'

import ProfileEdit from '../../pages/patient/Profile'
import UploadImage from '../form/UploadImage'
import Swal from 'sweetalert2'
import RingLoading from '../lottie/RingLoading'
import CardItem, { CardLongItem } from '../cards/Card'
function CurrencySelect({ setLocalCurrency, value,disabled }){
  return(
    <div className="row">
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
  const [oldProfile,setOldProfile]=useState({})
  const { state } = useLocation();
  const [clinicImages,setClinicImages]=useState([{path:'clinics/Default.png'}])
  const [imagepreview, setImagePreview] = useState(false)
  const imgRef = useRef()
  const [isLoading,setIsLoading]=useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm()
  const navigate = useNavigate()
  // default hours:
  const [hours,setHours]=useState({
    'HoursMonStart':6,
    'HoursMonEnd':18,
    'HoursTueStart':6,
    'HoursTueEnd':18,
    'HoursWedStart':6,
    'HoursWedEnd':18,
    'HoursThuStart':6,
    'HoursThuEnd':18,
    'HoursFriStart':6,
    'HoursFriEnd':18,
    'HoursSatStart':6,
    'HoursSatEnd':18,
    'HoursSunStart':6,
    'HoursSunEnd':18
    })
  
    function handleInputChange(e) {
      const name = e.target.name
      const value = e.target.value
      setClinicProfile((prev) => ({ ...prev, [name]: value }))
    }
  // async function onChangeImage(data){
    
  //   const formData = new FormData();
  //   for (var index in clinicImages){
      
  //     formData.append('Image'+(parseInt(index)+1), data[index].file)
  //   }

  //   await axiosPrivate
  //       .post('providerUploadClinicImage', 
  //         { 
  //           ...formData,
  //           Email:auth.email,
  //           ClinicID:profile.clinicID
  //         },
          
  //         {
  //           headers: { "Content-Type": "multipart/form-data" },
  //           onUploadProgress: function (ProgressEvent) {
  //             console.log(
  //               "uploadprogress: " +
  //                 (ProgressEvent.loaded / ProgressEvent.total) * 100 +
  //                 "%"
  //             );
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         return res.data
  //       })
  //       .then((data) => {
  //         const { Status, Message } = data || {}
  //         // setFeedbackMsg(Message)
  //         if (Status) {
  //           setIsSuccess(true)
            

  //         } else {
  //           setIsSuccess(false)
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })

  // }

  const onSubmit = async (data) => {
    
    const formData = new FormData();
    if (action==='create'){
      formData.append("Email", auth.email);
      formData.append("ClinicName",data.ClinicName)
      formData.append("Specialty",data.Specialty)
      formData.append("ContactInfo",data.ContactInfo)
      formData.append("Address",data.Address)
      
      if (data.Address2.length!==0){
          formData.append("Address2",data.Address2)
      }
    }
    else if (action==='edit'){
      formData.append("Email", auth.email);
      formData.append("ClinicName",clinicProfile.clinic_name)
      formData.append("ClinicID",clinicID)
      formData.append("Specialty",clinicProfile.specialty)
      formData.append("ContactInfo",clinicProfile.contact_info)
      formData.append("Address",clinicProfile.address)
      if (clinicProfile?.address2.length!==0){
        formData.append("Address2",clinicProfile.address2)
      }
    }
    
    for (let key in hours) {
      if (hours.hasOwnProperty(key)){

        formData.append(key,hours[key])
      }
    }
    formData.append("LocalCurrency", localCurrency);
    formData.append("LocalTimeZone", localTimezone);
    for (var index in clinicImages){
      if (clinicImages[index].file){
        // console.log(clinicImages[index].file!=={})
        formData.append('Image'+(parseInt(index)+1), clinicImages[index].file)
      }
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
              // console.log(
              //   "uploadprogress: " +
              //     (ProgressEvent.loaded / ProgressEvent.total) * 100 +
              //     "%"
              // );
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
            if (action==="create")
            { 
              Swal.fire("Success! You created a new Clinic.")
              navigate('/provider/clinics/profile/'+clinicID)

            }
            else if (action==="edit")
              {
              Swal.fire("Clinic Info is now updated.")
              navigate('/provider/clinics/profile/'+clinicID)
              }

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
          const { Status, Data: data, Message } = res.data
          const details = data

          if (Status) {
            setOldProfile(res.data.Data)
            setClinicProfile(res.data.Data)
            setLocalCurrency(res.data.Data.local_currency)
            setTimeZone(res.data.Data.local_time_zone)
            var tempImgList=[]
            if (res.data.Data.image1!="clinics/Default.png"){tempImgList.push({path:res.data.Data.image1})}
            if (res.data.Data.image2!="clinics/Default.png"){tempImgList.push({path:res.data.Data.image2})}
            if (res.data.Data.image3!="clinics/Default.png"){tempImgList.push({path:res.data.Data.image3})}
            if (res.data.Data.image4!="clinics/Default.png"){tempImgList.push({path:res.data.Data.image4})}
            if (res.data.Data.image5!="clinics/Default.png"){tempImgList.push({path:res.data.Data.image5})}
            if (tempImgList.length===0){tempImgList.push({path:"clinics/Default.png"})}
            console.log(tempImgList)
            setClinicImages(tempImgList)
            setHours({
              'HoursMonStart':parseInt(data.hours_mon_start)||data.hours_mon_start,
              'HoursMonEnd':parseInt(data.hours_mon_end)||data.hours_mon_end,
              'HoursTueStart':parseInt(data.hours_tue_start)||data.hours_tue_start,
              'HoursTueEnd':parseInt(data.hours_tue_end)||data.hours_tue_end,
              'HoursWedStart':parseInt(data.hours_wed_start)||data.hours_wed_start,
              'HoursWedEnd':parseInt(data.hours_wed_end)||data.hours_wed_end,
              'HoursThuStart':parseInt(data.hours_thu_start)||data.hours_thu_start,
              'HoursThuEnd':parseInt(data.hours_thu_end)||data.hours_thu_end,
              'HoursFriStart':parseInt(data.hours_fri_start)||data.hours_fri_start,
              'HoursFriEnd':parseInt(data.hours_fri_start)||data.hours_fri_start,
              'HoursSatStart':parseInt(data.hours_sat_start)||data.hours_sat_start,
              'HoursSatEnd':parseInt(data.hours_sat_end)||data.hours_sat_end,
              'HoursSunStart':parseInt(data.hours_sun_start)||data.hours_sun_start,
              'HoursSunEnd':parseInt(data.hours_sun_end)||data.hours_sun_end
              })
            
            setImagePreview(true)
            // setAuth((prev) => ({ ...prev, ...details }))
            // setTimeZone(details?.local_time_zone)
            setIsLoading(false)
          } else {
            
            setIsLoading(false)
            throw new Error(Message)
          }
        })
        .catch((err) => {
          
          setIsLoading(false)
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
          setClinicProfile({
            ...clinicProfile,
            picture:result 
          })
          setImagePreview(true)
          // onChangeImage({
          //   ...clinicImages
          // })
        }
      }
      fileReader.readAsDataURL(clinicProfile.picturefile);
    }
    return () => {
      if (action==='create'){
        setIsLoading(false)
      }
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
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/provider'>NIU Health</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link to='/provider/clinics'>Clinics</Link>
                  </li>
                  <li className='breadcrumb-item active'>
                    {(action==="create")?"New Clinic":(action==="edit")?"Edit Clinic":"Clinic"}
                  </li>
                </ol>
              </div>
        </TableTitle>

        <div className='row mt-1'>
          {isLoading?
            <CardLongItem><h4>
              <div className='d-flex justify-content-center'>
                <RingLoading size={200}/>
                </div>
              </h4>
            </CardLongItem>
          :<>
            <div className='col-lg-12'>
            <div className='card'>
              <div className='card-body'>
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
                      
                        ))}
                        {(clinicImages.length<5&&(action==='edit'||action==='create'&&(clinicImages[clinicImages.length-1]?.path!="clinics/Default.png")))?(
                        <button
                          className="btn btn-gradient-success waves-effect waves-light"
                          height="150px"
                          onClick={(e)=>{
                            e.preventDefault();
                            if (clinicImages.length<=4)
                              {setClinicImages([...clinicImages,{path:'clinics/Default.png'}])}
                            }}>+</button>
                        ):(clinicImages.length===0)?(
                          // <UploadImage 
                          //   id={0} 
                          //   images={clinicImages} 
                          //   setImages={setClinicImages} 
                          //   previewImage={clinicImages[0]} 
                          //   formData={clinicProfile} 
                          //   setFormData={setClinicProfile} 
                          //   imagepreview={imagepreview} 
                          //   setImagePreview={setImagePreview}
                          //   action={action}/>
                          <div className="d-flex flex-column justify-content-center align-items-center">
                          <input
                            hidden
                            type="file"
                            id="input-file-now-custom-1"
                            accept="image/*"
                            capture="user"
                            name="Image"
                            ref={imgRef}
                            // value={clinicProfile.Image}
                            onChange={handleImageInputChange}
                          />
                          
                          <img
                            alt=""
                            style={{objectFit: 'cover', margin: 'unset' ,width:200,height:150}}

                            onClick={() => {
                              Swal.fire({
                                // title: 'Profile Picture',
                                html: `<img width="200px" height="150px" src="${!imagepreview?AWS_BUCKET_SERVICES + clinicProfile.picture_file: (clinicProfile.picture)}"></img>`,
                                // { AWS_BUCKET_SERVICES } + profile.picture,
                              })
                            }}
                            src={!imagepreview?AWS_BUCKET_SERVICES + clinicProfile.picture_file: (clinicProfile.picture)}
                            className="ob"
                            // style={{ margin: 'unset' }}
                          />

                            <button
                              type="button"
                              className="btn btn-gradient-success waves-effect waves-light"
                              
                              onClick={triggerFileInput}
                              
                            >
                              Upload
                            </button>
                        </div>
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
                        {(action==="create")?(
                        <input
                          className={`form-control ${
                            errors.ClinicName ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='ClinicName'
                          name="clinic_name"
                          {...register('ClinicName')}
                        />):
                        
                        (<input
                          className={`form-control ${
                            errors.ClinicName ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='clinic_name'
                          disabled={action==='profile'}
                          name="clinic_name"
                          value={clinicProfile.clinic_name}
                          onChange={handleInputChange.bind(this)}
                          // {...register('ClinicName')}
                          // onChange={(e)=>setClinicProfile({...clinicProfile,clinic_name:e.target.value})}
                          // {...register('clinic_name')}
                        />)
                        }
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
                      {(action==="create")?(
                        <input
                          className={`form-control ${
                            errors.Specialty ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='Specialty'
                          disabled={action==='profile'}
                          name="specialty"
                          {...register('Specialty')}
                        />):
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
                          // {...register('Specialty')}
                        />}
                        {errors.Specialty ? (
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
                      {(action==="create")?(
                        <input
                          className={`form-control ${
                            errors.ContactInfo ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='contact_info'
                          disabled={action==='profile'}
                          name="contact_info"
                          {...register('ContactInfo')}
                        />):<input
                          className={`form-control ${
                            errors.ContactInfo ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='contact_info'
                          disabled={action==='profile'}
                          name="contact_info"
                          value={clinicProfile.contact_info}
                          onChange={handleInputChange.bind(this)}
                        />}
                        {errors.ContactInfo ? (
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
                  
                </div>
                <div className='row'>
                <div className='col-md-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='example-text-input'
                          className='col-form-label text-right'
                        >
                          Address Line 1
                        </label>
                      </div>
                      <div className='col-md-12'>
                        {(action==="create")?(
                        <input
                          required
                          className={`form-control ${
                            errors.Address ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='Address'
                          disabled={action==='profile'}
                          name="address"
                          {...register('Address')}
                        />):
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
                          // {...register('Address')}
                        />}
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
                  <div className='col-md-6'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <label
                          htmlFor='example-text-input'
                          className='col-form-label text-right'
                        >
                          Address Line 2
                        </label>
                      </div>
                      <div className='col-md-12'>
                        {(action==="create")?(
                        <input
                          className={`form-control ${
                            errors.Address2 ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='Address2'
                          disabled={action==='profile'}
                          name="address2"
                          {...register('Address2')}
                        />):
                        <input
                          className={`form-control ${
                            errors.Address2 ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='Address2'
                          disabled={action==='profile'}
                          value={clinicProfile.address2}
                          name="address2"
                          onChange={handleInputChange.bind(this)}
                          // {...register('Address2')}
                        />}
                        {errors.Address2 ? (
                          <div
                            className='invalid-feedback'
                            style={{ display: 'block' }}
                          >
                            Please enter clinic address line 2.
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
                          value={localCurrency}
                          onChange={handleInputChange.bind(this)}
                          disabled={action==='profile'} 
                          register={register} 
                          // localCurrency ={clinicProfile.localCurrency} 
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
                          value={localTimezone}
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
                        <div className='form-group row m-2 mb-4' >
                          {/* <div className='row'> */}
                            <div className='col-md-3' >
                              <h5>Sunday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Sun" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Monday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Mon" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Tuesday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Tue" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Wednesday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Wed" disabled={action==='profile'}/>
                            </div>
                          
                            {/* <div className='row'> */}
                            
                            <div className='col-md-3'>
                              <h5>Thursday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Thu" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Friday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Fri" disabled={action==='profile'}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Saturday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Sat" disabled={action==='profile'}/>
                            </div>
                            <div>
                            {/* </div> */}
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
                      onClick={(e) =>{navigate('/provider/clinics/edit/'+clinicID);e.preventDefault()}}
                      style={{marginRight:'10px'}}
                      
                    >
                      Edit Clinic
                    </button>
                    <button
                      type='button'
                      className='btn btn-gradient-info waves-effect waves-light'
                      onClick={() => navigate('/provider/clinics')}
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
                      
                      style={{marginRight:'10px'}}
                    >
                      Save
                    </button>{' '}
                    {/* <button
                      type='button'
                      className='btn btn-gradient-danger waves-effect waves-light'
                      onClick={() => Swal.fire({html:"This clinic cannot be deleted due to an active booking."})}
                      style={{marginRight:'10px'}}
                    >
                      Delete
                    </button> */}
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
                          {isSubmitting?"Saving...":"Save"}
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
          </>
        }
          
        </div>
      </div>
    </form>
  )
}
