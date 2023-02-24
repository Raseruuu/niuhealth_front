
import { Link ,useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import ReactCodeInput from "react-verification-code-input";
function ForgotPassword() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const {action,email}=useParams();
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    
    const [oldPassword,setOldPassword]=useState('');
    const [confirmOldPassword,setConfirmOldPassword]=useState('');
    
    const [verificationCode,setVerificationCode]=useState([])
    const [hasLowercase,setHasLowercase]=useState("✖");
    const [hasUppercase,setHasUppercase]=useState("✖");
    const [hasNumber,setHasNumber]=useState("✖");
    const [has8chars,setHas8chars]=useState("✖");
    const [hasSpecialCharacter,setHasSpecialCharacter]=useState("✖");
    const [hasSpaceOnEnd,setHasSpaceOnEnd]=useState("✖");
    const [cityActive, setCityActive] = useState(false)
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
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    
      } = useForm();
      const endpoint=((action==="send-verif-email")?"cognitoForgotPassword":(action==="send-verif-code")?"cognitoConfirmForgotPassword":"")
      
      async function handleReset(data){
        const my_email=data.Email
        if (endpoint!=""){
            await axiosPrivate
            .post(endpoint, (action==="send-verif-email")?{...data}:{ConfirmationCode:(verificationCode),Email:email,Password:password}
            
            )
            .then((res) => {
            console.log(res);
            const { Status, Data: data = [], Message } = res.data;
            
        
        
            if (Status) {
                Swal.fire({icon: 'success',html:`${Message}`})
                .then(()=>{
                    console.log(my_email)
                    if(action==="send-verif-email"){
                        navigate(`/forgot-password/send-verif-code/to/${my_email}`)
                    }
                }
                )
            } else {
                Swal.fire({icon: 'error',html:`${Message}`})
                if (Message){

                }
                throw new Error(Message);

            }
            })
        }
        
        
      }
      
    return( 
    <div className="account-body accountbg" style={{ width: "100vw", height: "108vh" }}>
        <div className="container">
            <div className="row vh-100 ">
                <div className="col-12 align-self-center">
                    <div className="auth-page">
                        <div className="card auth-card shadow-lg">
                            <div className="card-body">
                                <div className="px-3">
                                    <div style={{textAlign: "center"}}>
                                        <a href="../dashboard/analytics-index.html" className="logo logo-admin"><img  src="https://drcoco-bucket.s3.us-west-1.amazonaws.com/public/assets/images/nu-health-logo.png" height="55" alt="logo" className="auth-logo"/></a>
                                    </div>
                                    
                                    <div className="text-center auth-logo-text">
                                        <h4 className="mt-0 mb-3 mt-5">Reset Password</h4>
                                        <p className="text-muted mb-0">{(action==="send-verif-email")?"Enter your Email and instructions will be sent to you!":"Please enter your old and new password."}</p>  
                                    </div> 
    
                                    
                                    <form className="form-horizontal auth-form my-4" onSubmit={handleSubmit(handleReset)}>
                                       { (action==="send-verif-email")?(
                                        <div className="form-group">
                                            {(errors.Email)?
                                                <div className="text-danger">

                                                </div>:null
                                            }
                                            <label htmlFor="useremail">Email</label>
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-mail"></i> 
                                                </span>                                                                                                              
                                                <input type="email" className="form-control" id="useremail" required placeholder="Enter Email" {...register("Email")}/>
                                            </div>                                    
                                        </div>   )   
                                        :(action==="send-verif-code")?(
                                        <div className="form-group">
                                            <label htmlFor="password">New Password</label>
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-lock"></i> 
                                                </span>                                                                                                              
                                                <input
                                                type="password"
                                                className="form-control" 
                                                id="useremail" 
                                                required 
                                                placeholder="Enter New Password" 
                                                onChange={(e)=>{setPassword(e.target.value);console.log(password)}}
                                                // {...register("password")}
                                                />
                                            </div> 
                                            <label htmlFor="password">Confirm Password</label>
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-lock"></i> 
                                                </span>                                                                                                              
                                                <input type="password" className="form-control" id="useremail" required placeholder="Enter Confirm Password" {...register("password")}/>
                                            </div> 

                                            <PasswordChecker password={password} errors={errors}></PasswordChecker>
                                            <label htmlFor="verificationcode">Enter the 6 digit code sent to your email {email}</label>
                                            <div className="input-group mb-3">
                                                                                                                                                            
                                                {/* <input type="email" className="form-control" id="useremail" required placeholder="Enter Email" {...register("Email")}/>
                                                 */}
                                                 <ReactCodeInput style={{height:'20px' ,fontFamily:"Roboto"}} onComplete={(e)=>handleReset(e)} values={verificationCode} onChange={(e)=>{setVerificationCode(e)}}/>


                                            </div>                                    
                                        </div>

                                        ):null
                                        }
                                        
                                        <div className="form-group mb-0 row">
                                            <div className="col-12 mt-2">
                                                <button className="btn btn-gradient-success btn-round btn-block waves-effect waves-light" type="submit">Submit <i className="fas fa-sign-in-alt ml-1"></i></button>
                                            </div>
                                        </div>                         
                                    </form>
                                </div>
                                
                                <div className="m-3 text-center text-muted">
                                    <p className="">Remember It ?  <Link to="/login" className="text-primary ml-2">Sign in here</Link></p>
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

export default ForgotPassword;


