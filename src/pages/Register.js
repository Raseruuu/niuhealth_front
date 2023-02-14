
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    
      } = useForm();
    return( 
    <div className="account-body accountbg">

        {/* <!-- Log In page --> */}
        <div className="container">
            <div className="row vh-100 ">
                <div className="col-12 align-self-center">
                    <div className="auth-page">
                        <div className="card auth-card shadow-lg">
                            <div className="card-body">
                                <div className="px-3">
                                    <div style={{textAlign: 'center'}}>
                                        <Link to="../dashboard/analytics-index.html" className="logo logo-admin">
                                            <img src="../assets/images/nu-health-logo.png" height="55" alt="logo" className="auth-logo"/>
                                        </Link>
                                    </div>
                                    
                                    <div className="text-center auth-logo-text">
                                        <h4 className="mt-0 mb-3 mt-5">Free Register for NU Health</h4>  
                                    </div>
    
                                    
                                    <form className="form-horizontal auth-form my-4" action="index.html" onSubmit={console.log('Uguu')}>
            
                                        <div className="form-group">
                                            <label htmlFor="first_name">First Name</label>
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-user"></i> 
                                                </span>                                                                                                              
                                                <input type="text" className="form-control" id="first_name" placeholder="Enter First Name"/>
                                            </div>                                    
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="middle_name">Middle Name</label>
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-user"></i> 
                                                </span>                                                                                                              
                                                <input type="text" className="form-control" id="middle_name" placeholder="Enter Middle Name"/>
                                            </div>                                    
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="last_name">Last Name</label>
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-user"></i> 
                                                </span>                                                                                                              
                                                <input type="text" className="form-control" id="last_name" placeholder="Enter Last Name"/>
                                            </div>                                    
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <div className="input-group mb-3">
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-mail"></i> 
                                                </span>                                                                                                              
                                                <input type="email" className="form-control" id="useremail" placeholder="Enter Email"/>
                                            </div>                                    
                                        </div>
            
                                        <div className="form-group">
                                            <label htmlFor="userpassword">Password</label>                                            
                                            <div className="input-group mb-3"> 
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-lock"></i> 
                                                </span>                                                       
                                                <input type="password" className="form-control" id="userpassword" placeholder="Enter password"/>
                                            </div>                               
                                        </div>
    
                                        <div className="form-group">
                                            <label htmlFor="conf_password">Confirm Password</label>                                            
                                            <div className="input-group mb-3"> 
                                                <span className="auth-form-icon">
                                                    <i className="dripicons-lock-open"></i> 
                                                </span>                                                       
                                                <input type="password" className="form-control" id="conf_password" placeholder="Enter Confirm Password"/>
                                            </div>  
                                            
                                            <div className="form-group">
                                                <label htmlFor="mo_number">Mobile Number</label>                                            
                                                <div className="input-group mb-3"> 
                                                    <span className="auth-form-icon">
                                                        <i className="dripicons-phone"></i> 
                                                    </span>                                                       
                                                    <input type="text" className="form-control" id="mo_number" placeholder="Enter Mobile Number"/>
                                                </div>                               
                                            </div>
                                        </div>
            
                                        <div className="form-group row mt-4">
                                            <div className="col-sm-12">
                                                <div className="custom-control custom-switch switch-success">
                                                    <input type="checkbox" className="custom-control-input" id="customSwitchSuccess"/>
                                                    <label className="custom-control-label text-muted" htmlFor="customSwitchSuccess">By registering you agree to the Frogetor <a href="#" className="text-primary">Terms of Use</a></label>
                                                </div>
                                            </div>                                            
                                        </div>
            
                                        <div className="form-group mb-0 row">
                                            <div className="col-12 mt-2">
                                                <Link to="../figma_virtual_visit/welcome-step1.html"/>
                                                <button className="btn btn-gradient-success btn-round btn-block waves-effect waves-light" type="button">
                                                    Register 
                                                    <i className="fas fa-sign-in-alt ml-1"></i>
                                                </button>
                                            </div>
                                        </div>                           
                                    </form>
                                </div>
                                
                                <div className="m-3 text-center text-muted">
                                    <p className="">Already have an account ? <a href="../authentication/auth-login.html" className="text-primary ml-2">Log in</a></p>
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