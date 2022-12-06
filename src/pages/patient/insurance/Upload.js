import { Link } from "react-router-dom"
import Footer from "../../../components/Footer"

function Upload() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="page-title">Insurance</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-3">
                    Upload your insurance document to enjoy free service
                  </h4>

                  <div>
                    <input
                      type="file"
                      id="input-file-now"
                      className="dropify"
                    />
                  </div>

                  <p>
                    <small className="text-muted">
                      If you want to capture the document photos using mobile
                      camera, sign in on your mobile and you will get navigate
                      directly to this page
                    </small>
                  </p>
                  <p>The document will be checked during your first visit</p>

                  <Link to="">
                    <button
                      type="button"
                      className="btn btn-success btn-round waves-effect waves-light"
                    >
                      Upload Documents
                    </button>
                  </Link>
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

export default Upload
