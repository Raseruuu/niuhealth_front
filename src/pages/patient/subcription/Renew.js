import Footer from "../../../components/Footer"

function Renew() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="container-fluid">
          <div
            className="spacetop alert alert-warning alert-warning-shadow mb-0 alert-dismissible fade show"
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
            Your insurance document has expired. Please upload a valid document.
            If you don’t have insurance, please subscribe to our
            <a href="">monthly plan</a>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <h4 className="page-title">Subscription and Payment</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="pricingTable1 text-center">
                    <img
                      src="../assets/images/widgets/p-5.svg"
                      alt=""
                      className=""
                      height="100"
                    />
                    <h6 className="title1 py-3 mt-2 mb-0">
                      Plus plan <small className="text-muted">Per Month</small>
                    </h6>
                    <ul className="list-unstyled pricing-content-2 pb-3">
                      <li>Lorem ipsum</li>
                      <li>Dolor sit amet</li>
                      <li>Consectetur adipiscing</li>
                      <li>Nulla quis accumsan</li>
                      <li>Sed auctor</li>
                    </ul>
                    <div className="text-center">
                      <h3 className="amount">
                        $9.99
                        <small className="font-12 text-muted">/month</small>
                      </h3>
                    </div>
                    <a href="#" className="pricingTable-signup mt-3">
                      subscribe now
                    </a>
                  </div>
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

export default Renew
