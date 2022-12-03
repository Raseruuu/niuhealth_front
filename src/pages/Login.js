function Login() {
  return (
    <div
      className="account-body accountbg"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="container">
        <div className="row vh-100 ">
          <div className="col-12 align-self-center">
            <div className="auth-page">
              <div className="card auth-card shadow-lg">
                <div className="card-body">
                  <div className="px-3">
                    <div style={{ textAlign: "center" }}>
                      <a
                        href="../dashboard/analytics-index.html"
                        className="logo logo-admin"
                      >
                        <img
                          src="../assets/images/nu-health-logo.png"
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
                      action="index.html"
                    >
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-group mb-3">
                          <span className="auth-form-icon">
                            <i className="dripicons-user"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="userpassword">Password</label>
                        <div className="input-group mb-3">
                          <span className="auth-form-icon">
                            <i className="dripicons-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            id="userpassword"
                            placeholder="Enter password"
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
                          <a
                            href="auth-recover-pw.html"
                            className="text-muted font-13"
                          >
                            <i className="dripicons-lock"></i> Forgot password?
                          </a>
                        </div>
                      </div>

                      <div className="form-group mb-0 row">
                        <div className="col-12 mt-2">
                          <button
                            className="btn btn-gradient-success btn-round btn-block waves-effect waves-light"
                            type="button"
                          >
                            Log In <i className="fas fa-sign-in-alt ml-1"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="m-3 text-center text-muted">
                    <p className="">
                      Don't have an account ?{" "}
                      <a
                        href="../authentication/auth-register.html"
                        className="text-primary ml-2"
                      >
                        Create an Account
                      </a>
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
                    <a href="" className="">
                      <i className="fab fa-google google"></i>
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
