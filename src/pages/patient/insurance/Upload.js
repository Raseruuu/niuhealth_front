import { Link } from "react-router-dom"
import Footer from "../../../components/Footer"

function Upload() {
  return (
    <div class="page-wrapper">
      <div class="page-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="page-title-box">
                <h4 class="page-title">Insurance</h4>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="header-title mt-0 mb-3">
                    Upload your insurance document to enjoy free service
                  </h4>

                  <div>
                    <input type="file" id="input-file-now" class="dropify" />
                  </div>

                  <p>
                    <small class="text-muted">
                      If you want to capture the document photos using mobile
                      camera, sign in on your mobile and you will get navigate
                      directly to this page
                    </small>
                  </p>
                  <p>The document will be checked during your first visit</p>

                  <Link to="">
                    <button
                      type="button"
                      class="btn btn-success btn-round waves-effect waves-light"
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
