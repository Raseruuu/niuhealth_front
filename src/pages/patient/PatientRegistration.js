import { useEffect, useState } from 'react'
import { get, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../../components/Footer'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth'
import TimeZoneSelect from '../../components/time/Timezone';
function PatientRegistration() {
    const navigate = useNavigate()
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [password,setPassword]=useState('');
    const { email } = useParams();
    const [profile,setProfile]=useState({local_time_zone:"+8:00"});
    const controller = new AbortController()
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitSuccessful },

    } = useForm();
    
  async function handleRegisterForm(data){
    const controller = new AbortController()
   
    await axiosPrivate
    .post("updatePatientDetails", 
      {...data,
      Email:email,
      FirstName:profile?.first_name,
      MiddleName:profile?.middle_name,
      LastName:profile?.last_name,
      LocalTimeZone:profile?.local_time_zone
      }
      ,
        {signal: controller.signal}
    
    )
    .then((res) => {
    console.log(res);
    const { Status, Data: data = [], Message } = res.data;

    if (Status) {
        Swal.fire({icon: 'success',html:`${Message}`})
        .then(()=>{
          Swal.fire({icon:'success',html:`Logging you in...`}).then(()=>{
            navigate((`/`), { replace: true })
            
          })
          
        
        })

        
        
        
    } else {
        Swal.fire({icon: 'error',html:`${Message}`})
        if (Message){

        }
        throw new Error(Message);

    }
    })
    
  }
   
      

      

  useEffect(()=>{
    let isMounted = true
    const controller = new AbortController()
    async function getProfileDetails() {
      
      await axiosPrivate
        .post(
          'getPatientDetails',
          { Email: email},
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          // console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            setProfile(res.data.Data[0])
            console.log("ProfileData!",res.data.Data[0])
            
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
          { Email: 'patient1@gmail.com'},
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          // console.log(res)
          const { Status, Data: data = [], Message } = res.data

          if (Status) {
            setCountries(res.data.Data)
            console.log(res.data.Data)
            
          } else {
            throw new Error(Message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    getProfileDetails()
    getCountries()
    
   
    return()=>{
  
      isMounted = false
      controller.abort()
      
    }
  },[]) 
      

      
  return (
    <div className='page-wrapper'>
      <div className='page-content'>
          <div className="container-fluid">
    {/* <!-- end page title end breadcrumb --> */}
        <div className="row "> 
        <div className="col-lg-6">
          <div className="card">
              <div className="card-body">
              <h3>Thanks for registering  to NIU Health Social.</h3>
              <h5>We need a few more items to get started</h5>
              <div className="form-group row">
                <div className="col-md-12">
          <label htmlFor="contactno" className="col-form-label text-right">Phone Number</label>
          <input className="form-control" type="text" id="contactno" {...register("ContactInfo")}/>
        </div>
    </div>
  
    <form onSubmit={handleSubmit(handleRegisterForm)}>
        <div className="form-group row">
          <div className="col-md-12">
            <label htmlFor="example-text-input" className="col-form-label text-right" >Address Line 1</label></div>
                <div className="col-md-12">
                    <input className="form-control" type="text" id="Address1" {...register("Address1")} />
            </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <label htmlFor="example-text-input" className="col-form-label text-right" >Address Line 2</label></div>
                <div className="col-md-12">
                    <input className="form-control" type="text" id="Address2" {...register("Address2")} />
            </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <label htmlFor="example-text-input" className="col-form-label text-right" >Zip Code</label></div>
                <div className="col-md-12">
                    <input className="form-control" type="text" id="ZIPCode" {...register("ZIPCode")} />
            </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <label htmlFor="example-text-input" className="col-form-label text-right">Province</label></div>
                <div className="col-md-12">
                    <input className="form-control" type="text" id="Province" {...register("Province")} />
            </div>
        </div>
        <div className="form-group row">
            <div className="col-md-6">
                <label htmlFor="example-text-input" className="col-form-label text-right">Country</label>
            <select 
              className="form-control" 
              {...register("CountryID")}
              >
                <option>Choose Country...</option>
                {countries?.map((country_item,index)=>(
                  <option value={country_item.country_id} key={index}>
                    {country_item.description}
                  </option>
                ))}
            </select>
        </div>
        <div className="form-group row pl-2">
          <div className="col-md-12 ">
            <label htmlFor="example-text-input" className="col-form-label text-right">City</label></div>
                <div className="col-md-12">
                    <input className="form-control" type="text" id="example-text-input" {...register("City")} />
            </div>
        </div>
        {/* <div className="col-md-6">
            <label htmlFor="example-text-input" className="col-form-label text-right">City</label>
                <select className="form-control">
                <option>Choose City...</option>
                {cities?.map((city,index)=>(
                  <option value={city.country_id} key={index}>
                    {city.description}
                  </option>
                ))}
            </select>
            </div>
        </div> */}
        
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
              className="form-control"
              type="date"
              placeholder={'mm-dd-yyyy'}
              name="DateOfBirth"
              {...register("DateOfBirth")}
              // defaultValue={dateFormat(profile.date_of_birth)}
              // value={dateFormat(date_of_birth)}
              // onChangeCapture={handleInputChange.bind(this)}
            />
          </div>
        </div>
         
              <div className="wizard_btn" style={{marginBottom: "50px"}}> 
                  <button 
                      // onClick={()=>{
                      //     navigate('/', { replace: true })}} 
                      type="submit" 
                      className="btn btn-success btn-round waves-effect waves-light figmaBigButton float-left postRegBtn">
                          Continue
                  </button>            
              </div>
        </form>
            </div>
        </div>     
                              
    </div>



<div className="col-lg-6">

    <div className="card row-lg-8 ">
        <div className="card-body">
            <div className="media">
                <div className="media-body align-self-center">
                    <h3 className="mt-0 mb-1">How can NIU help you?</h3>
                </div>
            

      <div className="pricingTable1 text-center row-lg-4">
          <ul className="list-unstyled pricing-content-2 text-left py-3 border-0 mb-0">
              <li>Unlimited access to Virtual and In-Person Visits</li>
              <li>Unlimited access to NIU Health In-Person Visits</li>
              <li>With health insurance, you get a free subscription and unlimited visits</li>
              <li>Without health insurance, you pay just $9.99 per month for unlimited visits</li>
          </ul>
      </div>
                    </div>
                  </div>                            
                </div>
              </div>
            </div>
          </div>
        <Footer />
      </div>
    </div>
  )
}

export default PatientRegistration
