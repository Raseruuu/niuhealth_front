import { useEffect, useState } from 'react'
import { get, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth'
function PatientRegistration() {
    const navigate = useNavigate()
    
    const [hasLowercase,setHasLowercase]=useState("✖");
    const [hasUppercase,setHasUppercase]=useState("✖");
    const [hasNumber,setHasNumber]=useState("✖");
    const [has8chars,setHas8chars]=useState("✖");
    const [hasSpecialCharacter,setHasSpecialCharacter]=useState("✖");
    const [hasSpaceOnEnd,setHasSpaceOnEnd]=useState("✖");
    const [cityActive, setCityActive] = useState(false)
    const [city, setCity] = useState('')
    
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [password,setPassword]=useState('');
    
    const controller = new AbortController()
  const [countries, setCountries] = useState([])
  
  const [cities, setCities] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },

  } = useForm();
  async function handleRegisterForm(data){
    setPasswordCheck(
        (password?.match(/[a-z]/)?.length>0)||
        (password?.match(/[A-Z]/)?.length>0)||
        (password?.match(/[0-9]/)?.length>0)||
        (password?.length>=8)||
        (password?.match(/[^\x00-\x7F]/))||
        (!(password?.charAt(0)===" "||password?.charAt(password?.length-1)===" "))
      );
    if (!passwordCheck){
        Swal.fire({ icon: 'error',html:`Password not allowed.`})
        console.log(passwordCheck)
    }
    else if (confirmPassword!==password){
        Swal.fire({ icon: 'error',html:`Password fields do not match.`})

    }
    else(
        await axiosPrivate
        .post("cognitoSignUp", {...data,Password:password}
        
        )
        .then((res) => {
        console.log(res);
        const { Status, Data: data = [], Message } = res.data;
        
    
    
        if (Status) {
            Swal.fire({icon: 'success',html:`${Message}`})
            .then(()=>{
                
                sessionStorage.setItem('email', data.Email)
                navigate(`/verify/${data.Email}`,  { replace: true })}
            )
        } else {
            Swal.fire({icon: 'error',html:`${Message}`})
            if (Message){

            }
            throw new Error(Message);

        }
        })
    )
    
  }
   
      

      async function getCities(countryID) {
        const result = await axiosPrivate
          .post('getCities', {
            CountryID: countryID,
            Email: 'patient1@gmail.com',
          })
          .then((res) => {
            const { Status, Data: data = [], Message } = res.data
    
            if (Status) {
              setCities(res.data.Data)
            }
          })
    
        return result || []
      }

      function check(Condition){
        if (Condition===true){
            return ("✓")}
        else if (Condition===false){ 
            return ("✖")}
        
      }
      const  [passwordCheck,setPasswordCheck]=useState(
        (password?.match(/[a-z]/)?.length>0)||
        (password?.match(/[A-Z]/)?.length>0)||
        (password?.match(/[0-9]/)?.length>0)||
        (password?.length>=8)||
        (password?.match(/[^\x00-\x7F]/))||
        (!(password?.charAt(0)===" "||password?.charAt(password?.length-1)===" "))
      );

      function PasswordChecker({}){
        useEffect(()=>{
            setHasLowercase(check(password?.match(/[a-z]/)?.length>0))
            setHasUppercase(check(password?.match(/[A-Z]/)?.length>0))
            setHasNumber(check(password?.match(/[0-9]/)?.length>0))
            setHas8chars(check(password?.length>=8))
            setHasSpecialCharacter(check(password?.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)?.length>0))
            setHasSpaceOnEnd(check(!(password?.charAt(0)===" "||password?.charAt(password?.length-1)===" ")))
        
        
          },[password])
        return(
        <>
            {(passwordCheck&&password.length>0)?(<>
            <div className={hasLowercase==="✓"?"text-success":"text-danger"}>
                {`${hasLowercase}  Password must contain a lower case letter`}<br/>
            </div>
            <div className={hasUppercase==="✓"?"text-success":"text-danger"}>
            {`${hasUppercase} Password must contain an upper case letter`}<br/>
            </div>
            <div className={hasNumber==="✓"?"text-success":"text-danger"}>
            {hasNumber} Password must contain a number<br/>
            </div>
            <div className={has8chars==="✓"?"text-success":"text-danger"}>
            {has8chars} Password must contain at least 8 characters<br/>
            </div>
            <div className={hasSpecialCharacter==="✓"?"text-success":"text-danger"}>
                {hasSpecialCharacter} Password must contain a special character or a space<br/>
            </div>
            <div className={hasSpaceOnEnd==="✓"?"text-success":"text-danger"}>
                {hasSpaceOnEnd} Password must not contain a leading or trailing space<br/>
            </div>
            </>):null}
        </>
        )
        
      }
      useEffect(()=>{
        let isMounted = true
        const controller = new AbortController()
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
          <input className="form-control" type="text" id="contactno" {...register("Contact")}/>
        </div>
    </div>
  
    <form onSubmit={handleSubmit(handleRegisterForm)}>
    <div className="form-group row">
        <div className="col-md-12">
            <label htmlFor="example-text-input" className="col-form-label text-right" {...register("Address")}>Address</label></div>
                <div className="col-md-12">
                    <input className="form-control" type="text" id="example-text-input" {...register("Contact")} />
                </div>
            </div>
        <div className="form-group row">
            <div className="col-md-6">
                <label htmlFor="example-text-input" className="col-form-label text-right">Country</label>
            <select 
              className="form-control" 
              value={city}
              onChange={(e)=>{getCities(e.target.value);setCity(e.target.value)}}
              >
                <option>Choose Country...</option>
                {countries?.map((country,index)=>(
                  <option value={country.country_id} key={index}>
                    {country.description}
                  </option>
                ))}
            </select>
        </div>
        <div className="col-md-6">
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
        </div>
      
        <div className="form-group row">
            <div className="col-md-12">
                <label htmlFor="example-text-input" className="col-form-label text-right">
                    Subscription may cost more for patients not residing in Hawaii. <a href="">Know more</a></label>
            </div>
        </div>
      
      
          <div className="form-group row">
              <div className="col-md-6">
                  <label htmlFor="example-date-input" className="">Date of Birth</label>
                  <input className="form-control" type="date" value="2011-08-19" id="example-date-input" {...register("Birth date")}/>
              </div>
          </div>		
          <PasswordChecker password={password} errors={errors}></PasswordChecker>
              <div className="wizard_btn" style={{marginBottom: "50px"}}> 
                  <button 
                      onClick={()=>{
                          navigate('/', { replace: true })}} 
                      type="button" 
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
<div>
    
  </div>
                          </div>
                      </div>                            
                  </div>
          </div></div>
    </div>
        <Footer />
      </div>
    </div>
  )
}

export default PatientRegistration
