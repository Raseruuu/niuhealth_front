
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
    // const [hasLowercase,setHasLowercase]=useState("✖");
    // const [hasUppercase,setHasUppercase]=useState("✖");
    // const [hasNumber,setHasNumber]=useState("✖");
    // const [has8chars,setHas8chars]=useState("✖");
    // const [hasSpecialCharacter,setHasSpecialCharacter]=useState("✖");
    // const [hasSpaceOnEnd,setHasSpaceOnEnd]=useState("✖");
    
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
        <div class="container">
            <div class="row vh-100 ">
                <div class="col-12 align-self-center">
                    <div class="auth-page">
                        <div class="card auth-card shadow-lg">
                            <div class="card-body">
                                <div class="px-3">
                                    <div style={{textAlign: "center"}}>
                                        <a href="../dashboard/analytics-index.html" class="logo logo-admin"><img src="../assets/images/nu-health-logo.png" height="55" alt="logo" class="auth-logo"/></a>
                                    </div>
                                    
                                    <div class="text-center auth-logo-text">
                                        <h4 class="mt-0 mb-3 mt-5">Reset Password</h4>
                                        <p class="text-muted mb-0">{(action==="send-verif-email")?"Enter your Email and instructions will be sent to you!":"Please enter your old and new password."}</p>  
                                    </div> 
    
                                    
                                    <form class="form-horizontal auth-form my-4" onSubmit={handleSubmit(handleReset)}>
                                       { (action==="send-verif-email")?(
                                        <div class="form-group">
                                            {(errors.Email)?
                                                <div className="text-danger">

                                                </div>:null
                                            }
                                            <label htmlFor="useremail">Email</label>
                                            <div class="input-group mb-3">
                                                <span class="auth-form-icon">
                                                    <i class="dripicons-mail"></i> 
                                                </span>                                                                                                              
                                                <input type="email" class="form-control" id="useremail" required placeholder="Enter Email" {...register("Email")}/>
                                            </div>                                    
                                        </div>   )   
                                        :(action==="send-verif-code")?(
                                        <div class="form-group">
                                            <label htmlFor="password">New Password</label>
                                            <div class="input-group mb-3">
                                                <span class="auth-form-icon">
                                                    <i class="dripicons-lock"></i> 
                                                </span>                                                                                                              
                                                <input type="password" class="form-control" id="useremail" required placeholder="Enter New Password" {...register("password")}/>
                                            </div> 
                                            <label htmlFor="password">Confirm Password</label>
                                            <div class="input-group mb-3">
                                                <span class="auth-form-icon">
                                                    <i class="dripicons-lock"></i> 
                                                </span>                                                                                                              
                                                <input type="password" class="form-control" id="useremail" required placeholder="Enter Confirm Password" {...register("password")}/>
                                            </div> 
                                            <label htmlFor="verificationcode">Enter the 6 digit code sent to your email {email}</label>
                                            <div class="input-group mb-3">
                                                                                                                                                            
                                                {/* <input type="email" class="form-control" id="useremail" required placeholder="Enter Email" {...register("Email")}/>
                                                 */}
                                                 <ReactCodeInput onComplete={(e)=>handleReset(e)} values={verificationCode} onChange={(e)=>{setVerificationCode(e)}}/>


                                            </div>                                    
                                        </div>

                                        ):null
                                        }
                                        
                                        <div class="form-group mb-0 row">
                                            <div class="col-12 mt-2">
                                                <button class="btn btn-gradient-success btn-round btn-block waves-effect waves-light" type="submit">Submit <i class="fas fa-sign-in-alt ml-1"></i></button>
                                            </div>
                                        </div>                         
                                    </form>
                                </div>
                                
                                <div class="m-3 text-center text-muted">
                                    <p class="">Remember It ?  <Link to="/login" class="text-primary ml-2">Sign in here</Link></p>
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


