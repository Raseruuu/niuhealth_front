import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";

import {USERTYPE} from '../constants'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
function Login( text=null ) {
  
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },

  } = useForm();
  
  const effectRun = useRef(false);
  const navigate = useNavigate()
  console.log(text)
  async function logoutCurrentUser(){
  await axiosPrivate
    .get(
      "http://ebsdrcocophp01prod-env.eba-y6pjrhe2.us-west-1.elasticbeanstalk.com/niuhealth-api/api/getusers",
      {headers:{
        
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"}} )
    .then((res) => {
      console.log(res);
      // const { StatusCode, Data: data = [], Message } = res.data;
    })
    

  }
  async function handleLogin(data){
    const controller = new AbortController()

    console.log("data",data)
    await axiosPrivate
    .post("cognitoSignIn", {...data},
    {
      signal: controller.signal,
    }
      
    )
    .then((res) => {
      console.log(res); 
      const { StatusCode, Data: data = {}, Message } = res.data;
      
      if (StatusCode===200) {
        sessionStorage.setItem('email', res.data.Email)
        sessionStorage.setItem('name', res.data.Name)
        sessionStorage.setItem('access_token', res.data.Tokens.access_token)
        sessionStorage.setItem('id_token', res.data.Tokens.id_token)
        sessionStorage.setItem('refresh_token',  res.data.Tokens.refresh_token)
        sessionStorage.setItem('token_type',  res.data.Tokens.token_type)
        sessionStorage.setItem('expires_in',  res.data.Tokens.expires_in)
        sessionStorage.setItem('transactionType',  res.data.TransactionType)
        sessionStorage.setItem('userType',  res.data.UserType)
        sessionStorage.setItem('has_insurance', res.data.has_insurance)
        sessionStorage.setItem('isLoggedIn', true)
        Swal.fire({ icon: 'success',html:`${Message}`}).then(()=>{
          navigate((`/`), { replace: true })
        })
      } else {
        Swal.fire({ icon: 'error',html:`${Message}`})
        throw new Error(Message);
      }
    })
    .catch((err) => {
      Swal.fire({ icon: 'error',html:`Login Error. ${err}`})
    })}
  useEffect(()=>{
   
    let isMounted = true
    const controller = new AbortController()
   
    // logoutCurrentUser()
    return()=>{
      
      isMounted = false
      controller.abort()
      
    }
  },[])
  return (
    <div
      className="account-body accountbg"
      style={{ width: "100vw", height: "100vh" ,
      //  backgroundPosition: 'center',
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover'
      }}
    >
      <div className="container">
        <div className="row vh-100 ">
          <div className="col-12 align-self-center">
            <div className="auth-page">
              <div className="card auth-card shadow-lg ">
                <div className="card-body">
                  <div className="px-3">
                    <div style={{ textAlign: "center" }}>
                      <a
                        href="/"
                        className="logo logo-admin"
                      >
                        <img
                          src="https://drcoco-bucket.s3.us-west-1.amazonaws.com/public/assets/images/nu-health-logo.png"
                          height="55"
                          alt="logo"
                          className="auth-logo"
                        />
                      </a>
                    </div>

                    <div className="text-center auth-logo-text">
                      <h4 className="mt-0 mb-3 mt-5">Let's Get Started</h4>
                      <p className="text-muted mb-0">
                        Sign in to continue to NU Health.
                      </p>
                    </div>

                    <form
                      className="form-horizontal auth-form my-4"
                      onSubmit={handleSubmit(handleLogin)}
                      // action="index.html"
                    >
                      <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <div className="input-group mb-3">
                          <span className="auth-form-icon">
                            <i className="dripicons-user"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            placeholder="Enter Email"
                            {...register("Email")}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-group mb-3">
                          <span className="auth-form-icon">
                            <i className="dripicons-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            required
                            {...register("Password")}
                          />
                        </div>
                      </div>

                      <div className="form-group row mt-4">
                        <div className="col-sm-6">
                          <div className="custom-control custom-switch switch-success">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitchSuccess"
                            />
                            <label
                              className="custom-control-label text-muted"
                              htmlFor="customSwitchSuccess"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-6 text-right">
                          <Link
                            className="text-muted font-13"
                            to={"/forgot-password/send-verif-email"}
                          >
                            <i className="dripicons-lock"></i> Forgot password?
                          </Link>
                        </div>
                      </div>

                      <div className="form-group mb-0 row">
                        <div className="col-12 mt-2">
                          <button
                            className="btn btn-gradient-success btn-round btn-block waves-effect waves-light"
                            type="submit"
                          >
                            {isSubmitting?"Logging in...":"Log In"} <i className="fas fa-loading ml-1"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="m-3 text-center text-muted">
                    <p className="">
                      Don't have an account ?{" "}
                      <Link
                        to={"/register"}
                        className="text-primary ml-2"
                      >
                        Create an Account
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="account-social text-center mt-4">
                <h6 className="my-4">Or Login With</h6>
                <ul className="list-inline mb-4">
                  <li className="list-inline-item">
                    <a href="" className="">
                      <i className="fab fa-facebook-f facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="" className="">
                      <i className="fab fa-twitter twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a 
                      href= "https://niuhealth.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost/niuhealth/cburl&response_type=CODE&client_id=qr8mf1ainc3tjmcv9gc0ltehu&scope=email+openid"
                      className="">
                      <i className="fab fa-google google"></i>
                      {/* Google */}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
