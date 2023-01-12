import { Component, useMemo, useRef } from 'react'
import { useEffect, useState } from 'react'
import TableCard, {
  ContainerFluid,
  PageWrapper,
  TableTitle,
} from '../../components/table/Tables'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { TimeZoneSelect } from '../../components/clinics/ClinicSchedule'
import './icon.css'
import useAuth from '../../hooks/useAuth'
import { AWS_BUCKET_SERVICES, AWS_BUCKET_PROFILES } from '../../constants'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import moment from 'moment'

function ProfileEdit() {
  const { auth, setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [profile, setProfile] = useState(auth)
  const [disableForm, setDisableForm] = useState(true)
  const [timeZone, setTimeZone] = useState('+00:00')
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [cityActive,setCityActive]=useState(false)
  const imgRef = useRef()

  function dateFormat(date) {
    return moment(date).format('YYYY-MM-DD') // moment can initialize passing empty params
  }

  async function handleSubmit() {
    const formData = new FormData()
    
    console.log('list', profile)
    // setProfile({ ...profile, address: address1 + ', ' + address2 })
    formData.append('Email', auth.email)
    formData.append('FirstName', profile.first_name)
    formData.append('MiddleName', profile.middle_name)
    formData.append('LastName', profile.last_name)
    formData.append('ContactInfo', profile.contact_info)
    formData.append('Address', profile.address)
    
    formData.append("CountryID",profile.country_id)
    formData.append("CityID",profile.country_city_id)
    formData.append('DateOfBirth', profile.date_of_birth)
    formData.append('LocalTimeZone', profile.local_time_zone)
    if (typeof profile.picture != 'string') {
      formData.append('Image', profile.picture)
    }

    await axiosPrivate
      .post('updatePatientDetails', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res)
        const { Status, Data: data = [], Message } = res.data

        if (Status) {
          setAuth((prev) => ({ ...prev, profile }))
          Swal.fire('Successfully Updated Your Profile.')
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
    setDisableForm((prev) => !prev)
    setProfile(auth)
  }

  function handleInputChange(e) {
    const name = e.target.name
    const value = e.target.value
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

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
          console.log(res)
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

    getCountries()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  async function getCities() {
    const result = await axiosPrivate
      .post('getCities', {
        CountryID: profile.country_id,
        Email: auth.email,
      })
      .then((res) => {
        console.log(res)
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

    async function getProfileDetails() {
      await axiosPrivate
        .post(
          'getPatientDetails',
          { Email: auth.email },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data
          const details = data[0]

          if (Status && details?.email) {
            setProfile(details)
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

    getProfileDetails()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (!profile?.country_id || profile?.country_id === 'undefined') return

    
    getCities()
  }, [profile.country_id])

  return (
    <form>
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
                          ref={imgRef}
                        />

                        <img
                          alt=""
                          onClick={() => {
                            Swal.fire({
                              title: 'Profile Picture',
                              html: `<img width="250px" height="250px" src="${AWS_BUCKET_SERVICES}${profile.picture}"></img>`,

                              // { AWS_BUCKET_SERVICES } + profile.picture,
                            })
                          }}
                          src={AWS_BUCKET_SERVICES + profile.picture}
                          className="rounded-circle profile-pic"
                          style={{ margin: 'unset' }}
                        />

                        {disableForm ? null : (
                          <button
                            type="button"
                            className="btn btn-success btn-round waves-effect waves-light mt-2"
                            onClick={triggerFileInput}
                          >
                            Upload
                          </button>
                        )}

                        {/* {!disableForm ? (
                          <span
                            className="fro-profile_main-pic-change"
                            onClick={() => {
                              Swal.fire({
                                title: 'Profile Picture',
                                imageUrl:
                                  { AWS_BUCKET_SERVICES } + profile.picture,
                              })
                            }}
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: '103px',
                            }}
                          >
                            
                            <i className="fas fa-camera upload-button"></i>
                          </span>
                        ) : null} */}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group row">
                        <label
                          for="example-text-input"
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
                          for="example-text-input"
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
                          for="example-text-input"
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
                      <div className="form-group row">
                        <label
                          for="example-email-input"
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
                            value={profile.email}
                            onChange={handleInputChange.bind(this)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="example-tel-input"
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
                      
                      <div className='form-group row'>
                            <label
                              for='example-text-input'
                              className='col-sm-2 col-form-label text-right'
                            >
                              Address
                            </label>
                            <div className='col-sm-10'>
                              <input
                                disabled = {disableForm}
                                className='form-control'
                                type='text'
                                id='example-text-input'
                                
                                value={profile.address}
                                onChange={handleInputChange.bind(this)}
                                // value={list.address}
                                // onChange={(e)=>setList({...list,address:e.target.value})}
                              />
                            </div>
                          </div>
                       
                          
                          <div className='form-group row' style={{marginLeft:"80px"}}>
                           
                            <label className='col-sm-2 col-form-label text-right'>
                              Country
                            </label>
                            
                            <div className='col-sm-4'>
                              <select className='form-control' 
                                disabled = {disableForm} 
                                name="country_id"
                                value={profile.country_id}
                                onChange={
                                  handleInputChange.bind(this)}
                                // value={country_id} 
                                onClick={
                                  (e)=>{
                                    getCities(e.target.value)}} >
                                 <option value={''}>Select</option>
                                {countries.map((country)=>
                                (<option value={country.country_id} >{country.description}</option>)
                                )}
                              </select>
                            </div>
                            <label className='col-sm-2 col-form-label text-right'>
                              City
                            </label>
                            <div className='col-sm-4'>
                              <select 
                                className='form-control' 
                                disabled = {(disableForm)} 
                                name="city_id"
                                value={profile.country_city_id}
                                onChange={handleInputChange.bind(this)}>
                             <option>Select</option>
                             {cities.map((city) => (
                                <option value={city.city_id}>
                                  {city.description}
                                </option>
                              ))}
                                
                              </select>
                            </div>
                          </div>
                      <div className="form-group row">
                        <label
                          for="example-date-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Local Timezone
                        </label>
                        <div className="col-sm-8">
                          <TimeZoneSelect
                            value={timeZone}
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
                          for="example-date-input"
                          className="col-sm-2 col-form-label text-right"
                        >
                          Date of Birth
                        </label>
                        <div className="col-sm-4">
                          <input
                            disabled={disableForm}
                            className="form-control"
                            type="date"
                            placeholder={'mm/dd/yyyy'}
                            name="date_of_birth"
                            defaultValue={dateFormat(profile.date_of_birth)}
                            value={dateFormat(profile.date_of_birth)}
                            onChangeCapture={handleInputChange.bind(this)}
                          />
                        </div>
                      </div>
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
