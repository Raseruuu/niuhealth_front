import ReactCodeInput from 'react-verification-code-input';
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link,useLocation,useNavigate, useParams } from "react-router-dom";

// import useAuth from "../hooks/useAuth";
import { useState } from 'react';
import Swal from 'sweetalert2';
export default function Verify (){
    
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate()
    const [error,setError] = useState();
    const [showbutton,setShowbutton] = useState(false);
    const [verificationCode,setVerificationCode]=useState([])
    // const { auth } = useAuth();
    const {email}  = useParams();
    console.log("VER",email)
    async function cognitoConfirmSignUp(data){
        console.log("VER",email)
        await axiosPrivate
        .post("cognitoConfirmSignUp", {
            // Email:auth.email,
            // Email:"teamkizunavisual@gmail.com",
            Email:email,
            ConfirmationCode:data
        }
          
        )
        .then((res) => {
          console.log(res);
          const { Status, Data: data = [], Message } = res.data;
          if (Status) {
            console.log(res)
            Swal.fire({icon:'success',text:Message})
            navigate('/registration')
          } else {
            setError(res.Message)
            Swal.fire({icon:'error',text:Message})
            throw new Error(Message);

          }
        })
        // .catch((err) => {
        //   alert(err.message || "Creating new services failed."); // TODO: change to SweetAlert
        //   console.error(err);
        // });
      }
    return(
            <div className="account-body accountbg "  style={{ width: "100vw", height: "100vh" }}>
        <div className=" clsLoginWrapper enableLodestarStyles enableLodestarLineHeight verifyEMail " style={{ margin:'auto',width: '50%',padding: '10px'}}>

        <div className="align-self-center m-3"   >
        <div className="card auth-card shadow-lg "  style={{ width: "450px"}}>
                            <div className="card-body  ">
            <table className="center">
                <tbody><tr>
                    <td className="clsGlobalLayoutSideColumn">&nbsp;</td>
                    <td className="clsGlobalLayoutContentCell">
                        <form  id="ctlForm" name="ctlForm" method="post" className="clsJspOuterForm" noValidate="novalidate">

                            <div className="clsJspForm verify_mail_cont" style={{position:'relative', top:0, left:0, width:'100%'}}>

                            <div className="lodestarLoginLogo">
                            <img alt="NIU Health" className='logo-sm' style={{width:'150px',height:'75px'}} src="https://drcoco-bucket.s3.us-west-1.amazonaws.com/public/assets/images/nu-health-logo.png"/>
                            </div>

                            <div style={{paddingTop: "20px"}}>
                                <h3>Please verify your email</h3>
                                <p>You're almost there! We sent a verification email to <span className="bold">{email}</span></p>
                                <p>if you dont see the email, you may need to check your spam folder</p>
                                <h5>Please enter the 6 digit code we sent you</h5>
                                <div style={{paddingTop: "20px"}}>
                                    <ReactCodeInput onComplete={(e)=>cognitoConfirmSignUp(e)} values={verificationCode} onChange={(e)=>{setVerificationCode(e)}}/>
                                </div>
                                
                                {(error)?<p className="error" style={{paddingTop: "20px"}}>Wrong verification code. Make sure to enter<br/> the right code or ask for code resending</p>
                                :null}
                                <br/>
                                
                                <Link to="#" onClick={()=>setShowbutton(!showbutton)}>
                                    <p className="bold">Still can't find the email?</p>
                                </Link>
                                {(showbutton)?
                                (   <>
                                    <div>
                                        <button type="button" className="btn btn-gradient-success btn-round btn-block waves-effect waves-light">Resend Verification Email</button>
                                    </div>
                                    </>
                                ):
                                    null
                                }
                                {/* <p className="paragraph_S" style={{paddingTop: "20px"}}>Verification email has been resent. Not received?<br/>Request a new one in <span className="bold">54 seconds</span></p>
                                <p>or</p> */}
                                {/* <div>
                                    <button 
                                        onClick={()=>{
                                            navigate('/registration', { replace: true })}} 
                                        className="btn btn-gradient-success btn-round btn-block waves-effect waves-light">Verify Email Later</button>
                                </div> */}
                            </div>
                            </div>
                        </form>
                        
                    </td>
                    <td className="clsGlobalLayoutSideColumn">&nbsp;</td>
                </tr>
            </tbody>
            </table>
            </div></div></div>
            </div>
    </div>
    );
}