import imgLogo from "../assets/images/nu-health-logo.png"
import img500 from "../assets/images/500.jpg"
import img404 from "../assets/images/404.jpg"
import { Link } from "react-router-dom"

function ErrorPage45({ statusCode }) {
  return (
    <div className="account-body accountbg" style={{ width: "100vw" }}>
      <div className="container">
        <div className="row vh-100 ">
          <div className="col-12 align-self-center">
            <div className="auth-page">
              <div className="card auth-card shadow-lg">
                <div className="card-body">
                  <div className="px-3">
                    <div style={{ textAlign: "center" }}>
                      <Link to="/" className="logo logo-admin">
                        <img
                          src={imgLogo}
                          height="55"
                          alt="logo"
                          className="auth-logo"
                        />
                      </Link>
                    </div>
                    <img
                      src={statusCode === 404 ? img404 : img500}
                      alt="Error 500"
                      className="d-block mx-auto mt-4"
                      height="250"
                    />
                    <div className="text-center auth-logo-text mb-4">
                      <h4 className="mt-0 mb-3 mt-5">
                        {statusCode === 404
                          ? "Looks like you've got lost..."
                          : "Somthing went wrong"}
                      </h4>
                      <Link
                        to={statusCode === 404 ? "/" : -1}
                        className="btn btn-sm btn-gradient-success"
                      >
                        Back to Dashboard
                      </Link>
                    </div>
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

export default ErrorPage45
