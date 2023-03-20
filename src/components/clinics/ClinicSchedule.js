import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { TableTitle } from '../../components/table/Tables'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import { AWS_BUCKET_SERVICES, AWS_BUCKET_PROFILES, APP_URL, API_URL } from '../../constants'

import TimeZoneSelect from  '../time/Timezone'
import ScheduleSelect from  '../time/Hours'

import ProfileEdit from '../../pages/patient/Profile'
import UploadImage from '../form/UploadImage'
import Swal from 'sweetalert2'



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


  // const express = require('express')
  // const cors = require('cors')
  // const app = express()

  
  // app.use(cors({
  //   origin: APP_URL,
  //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }))

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
  // const [oldProfile,setOldProfile]=useState({})
  const { state } = useLocation();
  const [clinicImages,setClinicImages]=useState([{path:'clinics/Default.png'}])
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



//   function blobCreationFromURL(inputURI) {
  
//     var binaryVal;
//     console.log(inputURI)
//     // mime extension extraction
//     var inputMIME = inputURI.split(',')[0].split(':')[1].split(';')[0];

//     // Extract remaining part of URL and convert it to binary value
//     if (inputURI.split(',')[0].indexOf('base64') >= 0)
//         binaryVal = atob(inputURI.split(',')[1]);

//     // Decoding of base64 encoded string
//     else
//         binaryVal = unescape(inputURI.split(',')[1]);

//     // Computation of new string in which hexadecimal
//     // escape sequences are replaced by the character 
//     // it represents

//     // Store the bytes of the string to a typed array
//     var blobArray = [];
//     for (var index = 0; index < binaryVal.length; index++) {
//         blobArray.push(binaryVal.charCodeAt(index));
//     } 
//     const new_blob=new Image([blobArray], {
//         type: inputMIME
//     });
//     console.log("blobb",new_blob)
//     return new_blob

// }
  const onSubmit = async (data) => {
    
    const formData = new FormData();
    console.log(data)
    if (action==='create'){
      formData.append("Email", auth.email);
      formData.append("ClinicName",data.ClinicName)
      formData.append("Specialty",data.Specialty)
      formData.append("ContactInfo",data.ContactInfo)
      formData.append("Address",data.Address)
      formData.append("Address2",data.Address2)
    }
    else if (action==='edit'){
      formData.append("Email", auth.email);
      formData.append("ClinicName",clinicProfile.clinic_name)
      formData.append("ClinicID",clinicID)
      formData.append("Specialty",clinicProfile.specialty)
      formData.append("ContactInfo",clinicProfile.contact_info)
      formData.append("Address",clinicProfile.address)
      formData.append("Address2",clinicProfile.address2)
    }
    
    for (let key in hours) {
      if (hours.hasOwnProperty(key)) {
        formData.append(key,hours[key])
        console.log(key,hours[key])
      }
    }
    formData.append("LocalCurrency", localCurrency);
    formData.append("LocalTimeZone", localTimezone);

    for (var index in clinicImages){
      if (clinicImages[index].file){
        // var clinicBlobObject = downloadImage(AWS_BUCKET_SERVICES+clinicImages[index].path);
        formData.append('Image'+(parseInt(index)+1), clinicImages[index].file)
      }
      // else{
      //   var imageblob = downloadImage(AWS_BUCKET_SERVICES+clinicImages[index].path);
      //   formData.append('Image'+(parseInt(index)+1), imageblob)
      // }
      
    }
    // var clinicBlobObject = downloadImage(AWS_BUCKET_SERVICES+"clinics/Default.png");
    // console.log(clinicBlobObject)
    // for (var index in 5-clinicImages.length){
    //   if (clinicImages[index].file){
    //   formData.append('Image'+(clinicImages.length+parseInt(index)+1), clinicBlobObject)
    //   }
    // }
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
            if (action==="create")
            { 
              alert("Success! You created a new Clinic.")
              navigate('/provider/clinics')
            }
            else if (action==="edit")
              {
              alert("Clinic Info is now updated.")
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
          console.log(res)
          const { Status, Data: data, Message } = res.data
          const details = data

          if (Status) {
            console.log('details',res.data.Data)
            
            // setOldProfile(res.data.Data)
            setClinicProfile(res.data.Data)
            setLocalCurrency(res.data.Data.local_currency)
            setTimeZone(res.data.Data.local_time_zone)
            var tempImgList=[]
            if (res.data.Data.image1!=="clinics/Default.png"){
              tempImgList.push({path:res.data.Data.image1})}
            if (res.data.Data.image2!=="clinics/Default.png"){
              tempImgList.push({path:res.data.Data.image2})}
            if (res.data.Data.image3!=="clinics/Default.png"){
              tempImgList.push({path:res.data.Data.image3})}
            if (res.data.Data.image4!=="clinics/Default.png"){
              tempImgList.push({path:res.data.Data.image4})}
            if (res.data.Data.image5!=="clinics/Default.png"){
              tempImgList.push({path:res.data.Data.image5})}
            
            setClinicImages(tempImgList)
            setImagePreview(true)
            
            // setAuth((prev) => ({ ...prev, ...details }))
            // setTimeZone(details?.local_time_zone)
            // downloadImages()
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
    
    const controller = new AbortController()
    async function downloadImage(imageSrc) {
      // const image = await fetch(imageSrc)

      const image = await axiosPrivate.get(imageSrc
        ,{signal: controller.signal,headers:{
            'Access-Control-Allow-Origin': "*",
            "Content-Type": "image/webp",
            Accept: "application/json, text/plain,image/webp,image/png, */*"
          }}
        
        )
        
        
      
      const imageBlob = await image.blob().then((res)=>{
        if (res){
          console.log("BLOB",imageBlob)
          return imageBlob}})
     
      // const imageURL = URL.createObjectURL(imageBlog)
    
    }
    // Download and Reupload 
    // for (var index in clinicImages){
    //   if (clinicImages[index].file){
    //     // var clinicBlobObject = downloadImage(AWS_BUCKET_SERVICES+clinicImages[index].path);
    //     // formData.append('Image'+(parseInt(index)+1), clinicImages[index].file)
    //     console.log(clinicImages[index].file)
    //   }
    //   else{
    //     var imageblob = downloadImage(AWS_BUCKET_SERVICES+clinicImages[index].path);


    //     console.log(imageblob)
    //     setImages({...images,file:imageblob})
    //     // formData.append('Image'+(parseInt(index)+1), imageblob)
    //   }
      
    // }
    // let isMounted = true
    // const controller = new AbortController()
    
    
    // let fileReader, isCancel = false;
    // if (clinicProfile.picturefile) {
    //   fileReader = new FileReader();
    //   fileReader.onload = (e) => {
    //     const { result } = e.target;
    //     if (result && !isCancel) {
    //       // setFileDataURL(result)
    //       // console.log('result',result)
    //       setClinicProfile({
    //         ...clinicProfile,
    //         picture:result 
    //       })
    //       setImagePreview(true)
    //       onChangeImage({
    //         ...clinicImages
    //       })
    //     }
    //   }
    //   fileReader.readAsDataURL(clinicProfile.picturefile);
    // }
    // return () => {
    //   isCancel = true;
    //   if (fileReader && fileReader.readyState === 1) {
    //     fileReader.abort();
    //   }
    // }
    

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
                            action={action}
                            
                            />
                       
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
                          className={`form-control ${
                            errors.Address ? 'is-invalid' : ''
                          }`}
                          type='text'
                          id='Address'
                          required
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
                          required
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
                        <div className='form-group row' >
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
                    <button
                      type='button'
                      className='btn btn-gradient-danger waves-effect waves-light'
                      onClick={() => Swal.fire({html:"This clinic cannot be deleted due to an active booking."})}
                      style={{marginRight:'10px'}}
                    >
                      Delete
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
