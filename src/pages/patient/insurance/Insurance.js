import { Link } from "react-router-dom"

function Insurance() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row figmaFirstBox">
            <div className="col-sm-12">
              <div
                className="alert alert-warning alert-warning-shadow mb-0 alert-dismissible fade show"
                role="alert"
              >
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="mdi mdi-close"></i>
                  </span>
                </button>
                Your insurance document has expired. Please upload a valid
                document. If you don’t have insurance, please subscribe to
                <a href="">our monthly plan</a>
              </div>
            </div>
          </div>

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
                  <h4 className="header-title mt-0 mb-3">Insurance Document</h4>

                  <div className="file-box-content">
                    <div className="file-box">
                      <a href="#" className="download-icon-link">
                        <i className="dripicons-download file-download-icon"></i>
                      </a>
                      <div className="text-center">
                        <i className="far fa-file-alt text-primary"></i>
                        <h6 className="text-truncate">
                          Insurance Michael Steffan
                        </h6>
                        <small className="text-muted">
                          06 March 2022 / 5MB
                        </small>
                      </div>
                    </div>
                    <div className="file-box">
                      <a href="#" className="download-icon-link">
                        <i className="dripicons-download file-download-icon"></i>
                      </a>
                      <div className="text-center">
                        <i className="far fa-file-code text-danger"></i>
                        <h6 className="text-truncate">Insurance.pdf</h6>
                        <small className="text-muted">
                          15 March 2022 / 8MB
                        </small>
                      </div>
                    </div>
                  </div>

                  <Link to="upload">
                    <button
                      type="button"
                      className="btn btn-success btn-round waves-effect waves-light"
                    >
                      Upload New Documents
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer text-center text-sm-left">
          &copy; 2022 NU Health
        </footer>
      </div>
    </div>
  )
}

export default Insurance
