import { Component, useMemo, useRef } from 'react'
import { useEffect, useState } from 'react'
import TableCard, {
  ContainerFluid,
  PageWrapper,
  TableTitle,
} from '../../components/table/Tables'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
// import { TimeZoneSelect } from '../clinics/ClinicSchedule'

import TimeZoneSelect from  '../time/Timezone'
import ScheduleSelect from  '../time/Hours'

import './icon.css'
import useAuth from '../../hooks/useAuth'
import { AWS_BUCKET_SERVICES, AWS_BUCKET_PROFILES } from '../../constants'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import moment from 'moment'

function ProfileEdit() {
  const { auth, setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [profile, setProfile] = useState({
    ...auth,
    hours_sun_end: "20",
    hours_sun_start: "8",
    hours_mon_end: "20",
    hours_mon_start: "8",
    hours_tue_end: "20",
    hours_tue_start: "8",
    hours_wed_end: "20",
    hours_wed_start: "8",
    hours_thu_end: "20",
    hours_thu_start: "8",
    hours_fri_end: "20",
    hours_fri_start: "8",
    hours_sat_end: "20",
    hours_sat_start: "8",
    picture: (auth.userType==='Patient'?"profiles/pictures/":"")+"Default.jpg",
    contact_info: "",
    practice: "",
    provider_description: "",
    provider_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    local_time_zone: "",
    address:"",
    country_city_id:"",
    country_id:"0",
    date_of_birth:"2000-01-01",
    picturefile:"",
    facebook:"",
    twitter:"",
    instagram:"",
    othersocial:"",
    email:auth.email
  })
  const [oldProfile, setOldProfile] = useState({})
  const [disableForm, setDisableForm] = useState(true)
  const [timeZone, setTimeZone] = useState('+00:00')
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [cityActive, setCityActive] = useState(false)
  const [imagepreview, setImagePreview] = useState(false)
  const imgRef = useRef()
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
  const [oldHours,setOldHours]=useState({
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
  function dateFormat(date) {
    return moment(date).format('YYYY-MM-DD') // moment can initialize passing empty params
  }

  async function handleSubmit() {
    const formData = new FormData()
    if (auth.userType==="Patient"){
      formData.append('Email', auth.email)
      formData.append('FirstName', profile.first_name)
      formData.append('MiddleName', profile.middle_name)
      formData.append('LastName', profile.last_name)
      formData.append('ContactInfo', profile.contact_info)
      formData.append('Address', profile.address)
      formData.append('CountryID', profile.country_id)
      formData.append('CityID', profile.country_city_id)
      formData.append('DateOfBirth', profile.date_of_birth)
      formData.append('LocalTimeZone', profile.local_time_zone)
    }
    if (auth.userType==="Provider"){
      formData.append('Email', auth.email)
      formData.append('Name', profile.provider_name)
      formData.append('ProviderDescription', profile.provider_description)
      formData.append('Practice', profile.practice)
      formData.append('ContactInfo', profile.contact_info)
      
      for (let key in hours) {
        if (hours.hasOwnProperty(key)) {
          formData.append(key,hours[key])
          console.log(key,hours[key])
        }
      }
      
      // formData.append('ContactInfo', profile.contact_info)
      // formData.append('Address', profile.address)
      // formData.append('CountryID', profile.country_id)
      // formData.append('CityID', profile.country_city_id)
      // formData.append('DateOfBirth', profile.date_of_birth)
      // formData.append('LocalTimeZone', profile.local_time_zone)
    }
    if (typeof profile.picturefile === 'object'){
      formData.append('Image', profile.picturefile ,"profile_pic")
    }
    
    let profile_endpoint2=((auth.userType==='Provider')?"providerUpdateDetails":(auth.userType==='Patient')?"updatePatientDetails":"none")
    await axiosPrivate
      
      .post(profile_endpoint2, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: function (ProgressEvent) {
          console.log(
            "uploadprogress: " +
              (ProgressEvent.loaded / ProgressEvent.total) * 100 +
              "%"
          );
        },
      })
      .then((res) => {
        const { Status, Data: data = [], Message } = res.data

        if (Status) {
          setAuth((prev) => ({ ...prev, profile }))
          setOldProfile(profile)
          Swal.fire('Successfully Updated Your Profile.')
          setDisableForm(!disableForm)
        } else {
          throw new Error(Message)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function triggerFileInput() {
    if (imgRef.current) {
      imgRef.current.click()
    }
  }

  function handleCancelEdit() {
    setImagePreview(false)
    setDisableForm((prev) => !prev)
    setProfile(oldProfile)
    setHours(oldHours)
    
    
  }

  function handleInputChange(e) {
    const name = e.target.name
    const value = e.target.value
    setProfile((prev) => ({ ...prev, [name]: value }))
  }
  function FormTextField({ label, name, value, onChange }) {
    return (
      <div className="form-group row">
        <label
          htmlFor="example-text-input"
          className="col-sm-2 col-form-label text-right"
        >
          {label}
        </label>
        <div className="col-sm-10">
          <input
            disabled={disableForm}
            className="form-control"
            type="text"
            name={name}
            value={value}
            onChange={onChange.bind(this)}
            required
          />
        </div>
      </div>
)
}
  const handleImageInputChange = (e) => {
    const [file] = e.target.files;
    console.log("FILE HERE: ",file);
    setProfile({
      ...profile,
      picturefile:file
    })
  };
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    let fileReader, isCancel = false;
    if (profile.picturefile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          // setFileDataURL(result)
          setProfile({
            ...profile,
            picture:result 
          })
          
          setImagePreview(true)
        }
      }
      fileReader.readAsDataURL(profile.picturefile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
    

  }, [profile])
  async function getCities() {
    const result = await axiosPrivate
      .post('getCities', {
        CountryID: profile.country_id,
        Email: auth.email,
      })
      .then((res) => {
        const { Status, Data: data = [], Message } = res.data

        if (Status) {
          setCities(res.data.Data)
        }
      })

    return result || []
  }
  // Get Profile details
  // use our useAuth hooks to update user information, it should be centralized to this context hook
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    let profile_endpoint=(auth.userType==='Patient'?'getPatientDetails':(auth.userType==='Provider')?'getProviderDetails':null)
    async function getProfileDetails() {
      await axiosPrivate
        .post(
          profile_endpoint,
          { Email: auth.email },
          {
            signal: controller.signal
          }
        )
        .then((res) => {
          
          const { Status, Data: data = [], Message } = res.data
          const details = data[0]
         
          if (Status) {
            setProfile(details)
            // console.log('deets',details,moment(details.date_of_birth).format('yyyy-MM-dd'))
            
            // setProfile({...profile, date_of_birth:(moment(details.date_of_birth).format('yyyy-MM-dd'))})
            setHours({
              HoursSunStart:  details.hours_sun_start,
              HoursSunEnd:    details.hours_sun_end,
              HoursMonStart:  details.hours_mon_start,
              HoursMonEnd:    details.hours_mon_end,
              HoursTueStart:  details.hours_tue_start,
              HoursTueEnd:    details.hours_tue_end,
              HoursWedStart:  details.hours_wed_start,
              HoursWedEnd:    details.hours_wed_end,
              HoursThuStart:  details.hours_thu_start,
              HoursThuEnd:    details.hours_thu_end,
              HoursFriStart:  details.hours_fri_end,
              HoursFriEnd:    details.hours_fri_start,
              HoursSatStart:  details.hours_sat_start,
              HoursSatEnd:    details.hours_sat_end
              })
            setOldHours({
              HoursSunStart:  details.hours_sun_start,
              HoursSunEnd:    details.hours_sun_end,
              HoursMonStart:  details.hours_mon_start,
              HoursMonEnd:    details.hours_mon_end,
              HoursTueStart:  details.hours_tue_start,
              HoursTueEnd:    details.hours_tue_end,
              HoursWedStart:  details.hours_wed_start,
              HoursWedEnd:    details.hours_wed_end,
              HoursThuStart:  details.hours_thu_start,
              HoursThuEnd:    details.hours_thu_end,
              HoursFriStart:  details.hours_fri_end,
              HoursFriEnd:    details.hours_fri_start,
              HoursSatStart:  details.hours_sat_start,
              HoursSatEnd:    details.hours_sat_end
              })
            
            setOldProfile(details)
            setAuth((prev) => ({ ...prev, ...details }))
            setTimeZone(details?.local_time_zone)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    async function getCountries() {
      await axiosPrivate
        .post(
          'getCountries',
          { Email: auth.email },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          // console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            isMounted && setCountries(data)
            setCityActive(true)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    setAuth((prev) => ({ ...prev, profile,name:profile.first_name })) 
    getProfileDetails()
    if (auth.userType==='Patient'){
      getCountries()}
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  useEffect(() => {
    
    if (!profile?.country_id || profile?.country_id === 'undefined'|| profile?.country_id === '') return
    getCities()
  }, [profile.country_id])

  return (
    <form >
      <PageWrapper>
        <ContainerFluid>
          <TableTitle title="My Profile" />
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <input
                          hidden
                          type="file"
                          id="input-file-now-custom-1"
                          accept="image/*"
                          capture="user"
                          name="Image"
                          ref={imgRef}
                          onChange={handleImageInputChange}
                        />
                            {/* {auth.userType} */}
                        <img
                          alt=""
                          style={{objectFit: 'cover', margin: 'unset' ,width:100,height:100}}
                          onClick={() => {
                            Swal.fire({
                              title: 'Profile Picture',
                              html: `<img height="300px" src="${!imagepreview?AWS_BUCKET_SERVICES:""}${!imagepreview&&auth.userType==='Provider'?"providers/":""}${profile.picture}"></img>`,
                              // { AWS_BUCKET_SERVICES } + profile.picture,
                            })
                          }}
                          src={!imagepreview?AWS_BUCKET_SERVICES +(auth.userType==='Provider'?"providers/":"")+profile.picture: (profile.picture)}
                          className="rounded-circle profile-pic"
                          // style={{ margin: 'unset' }}
                        />

                        {disableForm ? null : (
                          <button
                            type="button"
                            className="btn btn-success btn-round waves-effect waves-light mt-2"
                            onClick={triggerFileInput}
                            
                          >
                            Change
                          </button>
                        )}

                      </div>
                    </div>
                    
                    <div className="col">
                      {(auth.userType==='Provider')?
                     ( <div className="form-group row">
                          <label
                            htmlFor="example-text-input"
                            className="col-sm-2 col-form-label text-right"
                          >
                            Full Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              disabled={disableForm}
                              className="form-control"
                              type="text"
                              name="provider_name"
                              value={profile.provider_name}
                              
                              onChange={handleInputChange.bind(this)}
                              required
                              
                            />
                        </div>
                      </div>):
                      ((auth.userType==='Patient'))?
                      (<>
                        <div className="form-group row">
                          <label
                            htmlFor="example-text-input"
                            className="col-sm-2 col-form-label text-right"
                          >
                            First Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              disabled={disableForm}
                              className="form-control"
                              type="text"
                              name="first_name"
                              value={profile.first_name}
                              onChange={handleInputChange.bind(this)}
                              required
                            />
                        </div>
                      </div>
                      
                      <div className="form-group row">
                        <label
                          htmlFor="example-text-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Middle Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            disabled={disableForm}
                            className="form-control"
                            type="text"
                            name="middle_name"
                            value={profile.middle_name}
                            onChange={handleInputChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="example-text-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Last Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            disabled={disableForm}
                            className="form-control"
                            type="text"
                            name="last_name"
                            value={profile.last_name}
                            onChange={handleInputChange.bind(this)}
                          />
                        </div>
                      </div>
                      </>
                      ):null}
                      <div className="form-group row">
                        <label
                          htmlFor="example-email-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Email
                        </label>
                        <div className="col-sm-10">
                          <input
                            disabled={true}
                            className="form-control"
                            type="email"
                            name="email"
                            value={auth.email}
                            // onChange={handleInputChange.bind(this)}
                          />
                        </div>
                      </div>
                      {/* <div className="form-group row">
                        <label
                          htmlFor="example-tel-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Facebook
                        </label>
                        <div className="col-sm-10">
                          <input
                            disabled={disableForm}
                            className="form-control"
                            type="tel"
                            name="facebook"
                            value={profile.facebook}
                            onChange={handleInputChange.bind(this)}
                          />
                        </div>
                      </div> */}
                      {(auth.userType==='Provider')?(
                      <>
                      <div className="form-group row">
                        <label
                          htmlFor="example-tel-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          About Me
                        </label>
                        <div className="col-sm-10">
                          <textarea
                            disabled={disableForm}
                            className="form-control"
                            type="tel"
                            rows="4"
                            name="provider_description"
                            value={profile.provider_description}
                            onChange={handleInputChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                      <label
                        htmlFor="example-tel-input"
                        className="col-sm-2 col-form-label text-right"
                      >
                        Specialization
                      </label>
                      <div className="col-sm-10">
                        <input
                          disabled={disableForm}
                          className="form-control"
                          type="tel"
                          name="practice"
                          value={profile.practice}
                          onChange={handleInputChange.bind(this)}
                        />
                      </div>
                    </div>
                    </>):null}
                      <div className="form-group row">
                        <label
                          htmlFor="example-tel-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Contact Info
                        </label>
                        <div className="col-sm-10">
                          <input
                            disabled={disableForm}
                            className="form-control"
                            type="tel"
                            name="contact_info"
                            value={profile.contact_info}
                            onChange={handleInputChange.bind(this)}
                          />
                        </div>
                      </div>
                     
                      {(auth.userType==='Patient')?(
                      <div className="form-group row">
                        <label
                          htmlFor="example-text-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Address
                        </label>
                        <div className="col-sm-10">
                          <input
                            disabled={disableForm}
                            className="form-control"
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleInputChange.bind(this)}
                          />
                        </div>
                      </div>):null}
                      {(auth.userType==='Patient')?(
                        <>
                      <div
                        className="form-group row"
                        style={{ marginLeft: '80px' }}
                      >
                        <label className="col-sm-2 col-form-label text-right">
                          Country
                        </label>

                        <div className="col-sm-4">
                          <select
                            className="form-control"
                            disabled={disableForm}
                            name="country_id"
                            value={profile.country_id}
                            onChange={handleInputChange.bind(this)}
                          >
                            <option value={''}>Select</option>
                            {countries.map((country,index) => (
                              <option value={country.country_id} key ={index}>
                                {country.description}
                              </option>
                            ))}
                          </select>
                        </div>
                        <label className="col-sm-2 col-form-label text-right">
                          City
                        </label>
                        <div className="col-sm-4">
                          <select
                            className="form-control"
                            disabled={disableForm}
                            name="country_city_id"
                            value={profile.country_city_id}
                            onChange={handleInputChange.bind(this)}
                          >
                            <option>Select</option>
                            {cities.map((city,index) => (
                              <option value={city.city_id}  key ={index}>
                                {city.description}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                     
                      <div className="form-group row">
                        <label
                          htmlFor="example-date-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Local Timezone
                        </label>
                        <div className="col-sm-8">
                          <TimeZoneSelect
                            value={profile.local_time_zone}
                            setTimeZone={(selected) =>
                              setProfile((prev) => ({
                                ...prev,
                                local_time_zone: selected,
                              }))
                            }
                            disabled={disableForm}
                          />
                        </div>
                      </div>
                      
                      <div className="form-group row">
                        <label
                          htmlFor="example-date-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Date of Birth
                        </label>
                        <div className="col-sm-4">
                          <input
                            disabled={disableForm}
                            className="form-control"
                            type="date"
                            placeholder={'mm-dd-yyyy'}
                            name="date_of_birth"
                            // defaultValue={dateFormat(profile.date_of_birth)}
                            value={dateFormat(profile.date_of_birth)}
                            onChangeCapture={handleInputChange.bind(this)}
                          />
                        </div>
                      </div></>
                      ):
                      <div className='col-lg-12'  >
                        <div className='form-group row' >
                          {/* <div className='row'> */}
                            <div className='col-md-3' >
                              <h5>Sunday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Sun" disabled={disableForm} oldHours={oldHours}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Monday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Mon" disabled={disableForm} oldHours={oldHours}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Tuesday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Tue" disabled={disableForm} oldHours={oldHours}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Wednesday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Wed" disabled={disableForm} oldHours={oldHours}/>
                            </div>
                          
                            {/* <div className='row'> */}
                            
                            <div className='col-md-3'>
                              <h5>Thursday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Thu" disabled={disableForm} oldHours={oldHours}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Friday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Fri" disabled={disableForm} oldHours={oldHours}/>
                            </div>
                            <div className='col-md-3'>
                              <h5>Saturday</h5>
                              <ScheduleSelect hours= {hours} setHours={setHours} weekday="Sat" disabled={disableForm} oldHours={oldHours}/>
                            </div>
                            <div>
                            {/* </div> */}
                          </div>
                          {/* </div> */}
                        </div>
                      </div>
                      
                      
                      }
                    </div>
                  </div>

                  <div className="row">
                    <div className="col text-right">
                      {!disableForm ? (
                        <button
                          style={{ marginRight: '10px' }}
                          onClick={handleSubmit}
                          type="button"
                          className="btn btn-success btn-round waves-effect waves-light"
                          disabled={profile===oldProfile&&(hours===oldHours)}
                        >
                          Submit
                        </button>
                      ) : null}

                      {disableForm ? (
                        <button
                          style={{ marginRight: '10px' }}
                          onClick={() => setDisableForm((prev) => !prev)}
                          type="button"
                          className="btn btn-success btn-round waves-effect waves-light"
                        >
                          Edit Profile
                        </button>
                      ) : null}

                      {!disableForm ? (
                        <button
                          type="button"
                          className="btn btn-danger btn-round waves-effect waves-light"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContainerFluid>
      </PageWrapper>
    </form>
  )
}

export default ProfileEdit
