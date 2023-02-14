
import { Link ,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
function Register() {
    const axiosPrivate = useAxiosPrivate();
    const [password,setPassword]=useState('');
    
    const [confirmPassword,setConfirmPassword]=useState('');
    
    const navigate = useNavigate()
    const [hasLowercase,setHasLowercase]=useState("✖");
    const [hasUppercase,setHasUppercase]=useState("✖");
    const [hasNumber,setHasNumber]=useState("✖");
    const [has8chars,setHas8chars]=useState("✖");
    const [hasSpecialCharacter,setHasSpecialCharacter]=useState("✖");
    const [hasSpaceOnEnd,setHasSpaceOnEnd]=useState("✖");
    
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
    return( 
    <div className="account-body accountbg" style={{ width: "100vw", height: "108vh" }}>

        {/* <!-- Log In page --> */}
        <div className="container">
            <div className="row vh-108 " >  
                <div className="col-12 align-self-center" style={{ justifyContent:'center'}} >
                    <div className="auth-page" >
                        <div className="card auth-card shadow-lg m-3"  style={{ width: "450px"}}>
                            <div className="card-body  ">
                                <div className="px-3">
                                    <div style={{textAlign: 'center'}}>
                                        <Link to="../dashboard/analytics-index.html" className="logo logo-admin">
                                            <img src="../assets/images/nu-health-logo.png" height="55" alt="logo" className="auth-logo"/>
                                        </Link>
                                    </div>
                                    
                                    <div className="text-center auth-logo-text">
                                        <h4 className="mt-0 mb-3 mt-5">Free Register for NIU Health</h4>  
                                    </div>
    
                                    
                                    <form className="form-horizontal auth-form my-4" onSubmit={handleSubmit(handleRegisterForm)}>
            
                                        <div className="form-group">
                                            <label htmlFor="first_name">First Name</label> 
                                            {(errors.FirstName)?
                                            <label className="text-danger float-right" >Please fill out this field.</label>:null}
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-user"></i> 
                                                </span>                                                                                                              
                                                <input 
                                                    // className={`form-control }
                                                    type="text"
                                                    className={`form-control ${errors.FirstName ? 'is-invalid' : ''}`} 
                                                    id="first_name" 
                                                    disabled={isSubmitting}
                                                    placeholder="Enter First Name" 
                                                    {...register("FirstName", { required: true, maxLength: 20 })}/>
                                            </div>                                    
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="middle_name">Middle Name</label>
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-user"></i> 
                                                </span>                                                                                                              
                                                <input 
                                                type="text" 
                                                className={`form-control ${errors.MiddleName ? 'is-invalid' : ''}`} 
                                                id="middle_name" 
                                                disabled={isSubmitting}
                                                placeholder="Enter Middle Name" 
                                                {...register("MiddleName")}/>
                                            </div>                                    
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="last_name">Last Name</label>
                                            {(errors.LastName)?
                                            <label className="text-danger float-right" >Please fill out this field.</label>:null}
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-user"></i> 
                                                </span>                                                                                                              
                                                <input type="text" 
                                                    className={`form-control ${errors.LastName ? 'is-invalid' : ''}`} 
                                                    id="last_name" 
                                                    disabled={isSubmitting}
                                                    placeholder="Enter Last Name" 
                                                    {...register("LastName", { required: true, maxLength: 20 })}/>
                                            </div>                                    
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            {(errors.Email)?
                                            <label className="text-danger float-right" >Please fill out this field.</label>:null}
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-mail"></i> 
                                                </span>                                                                                                              
                                                <input 
                                                type="email" 
                                                disabled={isSubmitting}
                                                className={`form-control ${errors.Email ? 'is-invalid' : ''}`} 
                                                id="useremail" 
                                                placeholder="Enter Email" 
                                                {...register("Email", { required: true })}/>
                                            </div>                                    
                                        </div>
            
                                        <div className="form-group">
                                            <label htmlFor="userpassword">Password</label>  
                                            {(errors.Password)?
                                            <label className="text-danger float-right" >Please fill out this field.</label>:null}                                         
                                            <div className="input-group mb-3"> 
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-lock"></i> 
                                                </span>                                                       
                                                <input 
                                                    type="password" 
                                                    className={`form-control ${errors.Password ? 'is-invalid' : ''}`} 
                                                    id="userpassword" 
                                                    disabled={isSubmitting}
                                                    placeholder="Enter password" 
                                                    value={password}
                                                    required
                                                    // pattern="[a-z][A-Z][0-9]{1,15}"
                                                    onChange={(e)=>{setPassword(e.target.value);console.log(password)}}
                                                    // {...register("Password", { required: true, maxLength: 20 })}
                                                    
                                                    
                                                    />
                                            </div>                               
                                        </div>
    
                                        <div className="form-group">
                                            <label htmlFor="conf_password">Confirm Password </label>    
                                            {(errors.ConfirmPassword)?
                                            <label className="text-danger float-right" >Please confirm your password.</label>:null}                                             
                                            <div className="input-group mb-3"> 
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-lock-open"></i> 
                                                </span>                                                       
                                                <input 
                                                    type="password" 
                                                    className={`form-control ${errors.ConfirmPassword ? 'is-invalid' : ''}`} 
                                                    id="conf_password" 
                                                    disabled={isSubmitting}
                                                    placeholder="Enter Confirm Password" 
                                                    value={confirmPassword}
                                                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                                    // {...register("ConfirmPassword", { required: true, maxLength: 20 })}
                                                    />
                                            </div>  
                                            
                                            {/* <div className="form-group">
                                                <label htmlFor="mo_number">Mobile Number</label>                                            
                                                <div className="input-group mb-3"> 
                                                    <span className="auth-form-icon">
                                                        <i className="dripicons-phone"></i> 
                                                    </span>                                                       
                                                    <input type="text" className="form-control" id="mo_number" placeholder="Enter Mobile Number"/>
                                                </div>                               
                                            </div> */}
                                        </div>
            
                                        <div className="form-group row mt-4">
                                            <div className="col-sm-12">
                                                <div className="custom-control custom-switch switch-success">
                                                {(errors.Terms)?
                                                <label className="text-danger float-right" >You must agree to the Terms of Use.</label>: (<br/>)}
                                                    <input type="checkbox" className="custom-control-input" id="customSwitchSuccess" {...register("Terms",{required:true})}/>

                                                    <label className="custom-control-label text-muted" htmlFor="customSwitchSuccess">By registering you agree to the 
                                                        <a href="#" onClick={()=>{Swal.fire({title:"Terms Of Use",html:"<br>Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit<br>"})}} className="text-primary"> Terms of Use</a>
                                                    </label>
                                                   
                                                </div>
                                            </div>                                            
                                        </div>
                                        <PasswordChecker password={password} errors={errors}></PasswordChecker>
                                        <div className="form-group mb-0 row">
                                            <div className="col-12 mt-2">
                                                {/* <Link to="../figma_virtual_visit/welcome-step1.html"/> */}
                                                <button className="btn btn-gradient-success btn-round btn-block waves-effect waves-light" type="submit">
                                                    {isSubmitting?("Registering..."):("Register")} 
                                                    <i className="fas fa-sign-in-alt ml-1"></i>
                                                </button>
                                            </div>
                                        </div>                           
                                    </form>
                                </div>
                                
                                <div className="m-3 text-center text-muted">
                                    <p className="">Already have an account ? <Link to="/login" className="text-primary ml-2">Log in</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>         
            </div>
        </div>
        </div>
        )
}

export default Register;


