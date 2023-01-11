import { Component } from "react";
import { useEffect, useState } from 'react'
import TableCard, { ContainerFluid, PageWrapper, TableTitle } from "../../components/table/Tables"
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { TimeZoneSelect } from "../../components/clinics/ClinicSchedule"
import './icon.css';
import useAuth from '../../hooks/useAuth'
import { AWS_BUCKET_SERVICES,AWS_BUCKET_PROFILES } from "../../constants"
import {useLocation } from "react-router-dom"
import Swal from 'sweetalert2'
import moment from 'moment'
function ProfileEdit(formData) {
  
  const { auth, setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [list, setList] = useState({})
  const [oldList, setOldList] = useState({})
  const [disableForm, toggleDisableForm] = useState(true)
  const [timeZone,setTimeZone]=useState("+00:00")
  const date = new Date()
  const [address1,setAddress1]=useState("")
  const [address2,setAddress2]=useState("")
  const [countries,setCountries]=useState(["China","America","Japan"])
  const [cities,setCities]=useState(["Tokyo","Kyoto","Ikebukuro"])
  function dateFormat(date) {
    return moment(date).format('YYYY-MM-DD')
  }
  // let {
  //   state: { selectedUser },
  // } = useLocation()

  // console.log("selectedUser ", selectedUser)
  function InputImage({list,setList}){
    return(
      <input
      type="file"
      id="input-file-now-custom-1"
      className="dropify"
      accept="image/*"
      capture="user"
      multiple
      onChange={((e)=>setList({...list,picture:e.target.files[0]}))}
      />
    )
  }
  async function getCities(countryID) {
      await axiosPrivate
        .post(
          'getCities',{
            CountryID   :countryID,
            Email:auth.email}
          )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data
  
          if (Status) {
            setCities(res.data.Data)
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  
  function handleSubmit(list){
    const formData = new FormData();
    
    console.log("list",list)
    setList({...list,address:address1+", "+address2})
    formData.append("Email",auth.email)
    formData.append("FirstName",list.first_name)
    formData.append("MiddleName",list.middle_name)
    formData.append("LastName",list.last_name)
    formData.append("ContactInfo",list.contact_info)
    formData.append("Address",list.address)
    formData.append("DateOfBirth",list.date_of_birth)
    formData.append("LocalTimeZone",timeZone)
    if (typeof list.picture!="string"){
      formData.append("Image",list.picture)}
    // Image:list.image
    async function updatePatient() {
      await axiosPrivate
        .post(
          'updatePatientDetails',
          formData
          , {
            headers: { "Content-Type": "multipart/form-data" }
          })
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data
  
          if (Status) {
            setList(data)
            Swal.fire("Successfully Updated Your Profile.")
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    updatePatient()
  
    // isMounted && getList()
  
    // return () => {
    //   isMounted = false
    //   controller.abort()
    // }
  }
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    
    async function getList() {
      await axiosPrivate
        .post(
          'getPatientDetails',
          { Email: auth.email
          },
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            setList(res.data.Data[0])
            setTimeZone(res.data.Data[0].local_time_zone)
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
            { Email: auth.email
            },
            {
              signal: controller.signal,
            }
          )
          .then((res) => {
            console.log(res)
            const { Status, Data: data = [], Message } = res.data

            if (Status) {
              setCountries(res.data.Data)
              
            } else {
              throw new Error(Message)
            }
          })
          .catch((err) => {
            console.error(err)
          })
      }
    isMounted && getList()
    getCountries()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  return (
    
      <PageWrapper>
        <ContainerFluid>
          <TableTitle title="My Profile"/>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='card'>
                <div className='card-body'>
                  <form onSubmit={()=>handleSubmit(list)}>
                    <div className='row'>
                      <div className='met-profile-main '>
                        <div className='met-profile-main-pic' style={{position: 'relative'}}>
                        <div className="uploadPicContainer">
                          <InputImage list={list} setList={setList} />
                          <div className='row'> 
                            <img
                              onClick={()=>{
                                Swal.fire({
                                  title:"Profile Picture",
                                  imageUrl:{AWS_BUCKET_SERVICES}+list.picture
                                  // html:`<img src={{AWS_BUCKET}+`/assets/images/users/user-4.jpg"}></img>`
                                })
                              }}
                              src={AWS_BUCKET_SERVICES+list.picture}
                              alt=''
                              className='rounded-circle profile-pic'
                            />
                          {(!disableForm)?(
                          <span className='fro-profile_main-pic-change' 
                            onClick={()=>{
                              Swal.fire({
                                title:"Profile Picture",
                                imageUrl:{AWS_BUCKET_SERVICES}+list.picture
                              })
                            }}
                            style={{position: 'absolute', bottom: 0, left: '103px'}}>
                            {/* <i className='fas fa-camera'></i> */}
                            
                            <i className='fas fa-camera upload-button'>
                              
                              </i>
                              
                            
                            
                            </span>
                            
                         ):<></>}
                         </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className='col'> */}
                        <div className='col'>
                          
                          
                          <div className='form-group row'>
                            <label
                              for='example-text-input'
                              className='col-sm-2 col-form-label text-right'
                            >
                              FirstName
                            </label>
                            <div className='col-sm-10'>
                              <input
                                disabled = {disableForm}
                                className='form-control'
                                type='text'
                                id='example-text-input'
                                value={list.first_name}
                                onChange={(e)=>setList({...list,first_name:e.target.value})}
                                required
                              />
                            </div>
                          </div>
                          <div className='form-group row'>
                            <label
                              for='example-text-input'
                              className='col-sm-2 col-form-label text-right'
                            >
                              MiddleName
                            </label>
                            <div className='col-sm-10'>
                              <input
                                disabled = {disableForm}
                                className='form-control'
                                type='text'
                                id='example-text-input'
                                value={list.middle_name}
                                onChange={(e)=>setList({...list,middle_name:e.target.value})}
                              />
                            </div>
                          </div>
                          <div className='form-group row'>
                            <label
                              for='example-text-input'
                              className='col-sm-2 col-form-label text-right'
                            >
                              LastName
                            </label>
                            <div className='col-sm-10'>
                              <input
                                disabled = {disableForm}
                                className='form-control'
                                type='text'
                                id='example-text-input'
                                value={list.last_name}
                                onChange={(e)=>setList({...list,last_name:e.target.value})}
                              />
                            </div>
                          </div>
                          <div className='form-group row'>
                            <label
                              for='example-email-input'
                              className='col-sm-2 col-form-label text-right'
                            >
                              Email
                            </label>
                            <div className='col-sm-10'>
                              <input
                                disabled = {true}
                                className='form-control'
                                type='email'
                                id='example-email-input'
                                
                                value={list.email}
                                onChange={(e)=>setList({...list,email:e.target.value})}
                              />
                            </div>
                          </div>
                          <div className='form-group row'>
                            <label
                              for='example-tel-input'
                              className='col-sm-2 col-form-label text-right'
                            >
                              Contact Info
                            </label>
                            <div className='col-sm-10'>
                              <input
                                disabled = {disableForm}
                                className='form-control'
                                type='tel'
                                id='example-tel-input'
                                value={list.contact_info}
                                onChange={(e)=>setList({...list,contact_info:e.target.value})}
                              />
                            </div>
                          </div>


                          <div className='form-group row'>
                            <label className='col-sm-2 col-form-label text-right'>
                              Country
                            </label>
                            
                            <div className='col-sm-4'>
                              <select className='form-control' 
                                disabled = {disableForm} 
                                value={address1} 
                                onChange={
                                  (e)=>{
                                    setAddress1(e.target.value); getCities(e.target.value)}} >
                                 <option value={''}>Select</option>
                                {countries.map((country)=>
                                (<option value={country.country_id} >{country.description}</option>)
                                )}
                              </select>
                            </div>
                            {(address2)?(<>
                            <label className='col-sm-2 col-form-label text-right'>
                              City
                            </label>
                            <div className='col-sm-4'>
                              <select 
                                className='form-control' 
                                disabled = {disableForm} 
                                value={address2} 
                                onChange={
                                  (e)=>{
                                    setAddress2(e.target.value)}}>
                             
                              {cities.map((city)=>
                                (<option value={city.city_id} >{city.description}</option>)
                                )}
                                <option>Select</option>
                              </select>
                            </div></>):<></>}
                          </div>
                          <div className='form-group row'>
                            <label
                              for='example-date-input'
                              className='col-sm-2 col-form-label text-right'
                            >
                              Local Timezone
                            </label>
                            <div className='col-sm-8'>
                            <TimeZoneSelect value={timeZone} setTimeZone={setTimeZone}  disabled = {disableForm}/>
                            </div>
                          </div>
                          <div className='form-group row'>
                            <label
                              for='example-date-input'
                              className='col-sm-2 col-form-label text-right'
                            >
                              Date of Birth
                            </label>
                            <div className='col-sm-4'>
                              <input
                                disabled = {disableForm}
                                className='form-control'
                                type='date'
                                placeholder={'mm/dd/yyyy'}
                                id='example-date-input'
                                defaultValue={dateFormat(list.date_of_birth)}
                                value={dateFormat(list.date_of_birth)}
                                onChange={(e)=>setList({...list,date_of_birth:e.target.value})}
                              />
                            </div>
                          </div>
                          
                          {!disableForm?(
                          <button
                            onClick={()=>
                              {toggleDisableForm(!disableForm);
                              setList(oldList)}}
                            type='button'
                            className='float-right btn btn-danger btn-round waves-effect waves-light'>
                            Cancel
                          </button>)
                          :<></>
                          }
                          <button
                            style={{marginRight:'10px'}}
                            onClick={()=>
                              {
                                if(disableForm===true){
                                toggleDisableForm(!disableForm)
                                }
                                else{
                                  handleSubmit(list);
                                  // getList();
                                }
                                
                            }}
                            type='button'
                            className='float-right btn btn-success btn-round waves-effect waves-light'
                        >
                            {disableForm?(<>Edit Profile</>):(<>Submit</>)}
                          </button>
                          
                        </div>
                      {/* </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ContainerFluid>
      </PageWrapper>
  )}


export default ProfileEdit
