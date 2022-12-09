import { Link } from "react-router-dom"

function Services() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            <div className='float-right'>
              <ol className='breadcrumb'>
                <Link to='manage'>
                  <button
                    type='button'
                    className='btn btn-success waves-effect waves-light'
                  >
                    New Service
                  </button>
                </Link>
              </ol>
            </div>
            <h4 className='page-title'>Services</h4>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-3'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-lg-12'>
                  <h5 className='mt-0 mb-4'>Filter</h5>

                  <div className='p-3'>
                    <h6 className='mb-3 mt-0'>My Clinics</h6>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox0' type='checkbox' checked />
                      <label for='checkbox0'>BLK Hospital</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox1' type='checkbox' checked />
                      <label for='checkbox1'>Linda's Clinic</label>
                    </div>
                    <div className='checkbox checkbox-success '>
                      <input id='checkbox2' type='checkbox' />
                      <label for='checkbox2'>Sony Center Clinic</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-12'>
                  <div className='p-3'>
                    <h6 className='mt-0 mb-4'>Ratings</h6>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox3' type='checkbox' />
                      <label for='checkbox3'>
                        {" "}
                        5<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox4' type='checkbox' />
                      <label for='checkbox4'>
                        {" "}
                        4<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox5' type='checkbox' />
                      <label for='checkbox5'>
                        {" "}
                        3<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox6' type='checkbox' />
                      <label for='checkbox6'>
                        {" "}
                        2<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                    <div className='checkbox checkbox-success'>
                      <input id='checkbox7' type='checkbox' />
                      <label for='checkbox7'>
                        {" "}
                        1<i className='mdi mdi-star text-warning'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                        <i className='mdi mdi-star light-gray'></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-lg-9'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='form-group'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search Service...'
                    aria-label='Search Service...'
                  />
                  <span className='input-group-append'>
                    <button className='btn btn-success' type='button'>
                      Go!
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
              <div className='card e-co-product'>
                <a href=''>
                  <img
                    src='../assets/images/products/img-1.png'
                    alt=''
                    className='img-fluid'
                  />
                </a>
                <div className='card-body product-info'>
                  <a href='' className='product-title'>
                    Scaling and polishing session
                  </a>
                  <p>Lorem ipsum dolor sit amet consecutetur.</p>
                  <div className='d-flex justify-content-between my-2'>
                    <p className='product-price'>$329.00 </p>
                    <ul className='list-inline mb-0 product-review align-self-center'>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star-half text-warning'></i>
                      </li>
                    </ul>
                  </div>
                  <a href='../pages/manage-service.html'>
                    <button
                      type='button'
                      className='btn btn-gradient-success waves-effect waves-light'
                    >
                      Manage
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='card e-co-product'>
                <a href=''>
                  <img
                    src='../assets/images/products/img-1.png'
                    alt=''
                    className='img-fluid'
                  />
                </a>
                <div className='card-body product-info'>
                  <a href='' className='product-title'>
                    Scaling and polishing session
                  </a>
                  <p>Lorem ipsum dolor sit amet consecutetur.</p>
                  <div className='d-flex justify-content-between my-2'>
                    <p className='product-price'>$329.00 </p>
                    <ul className='list-inline mb-0 product-review align-self-center'>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star-half text-warning'></i>
                      </li>
                    </ul>
                  </div>
                  <a href='../pages/manage-service.html'>
                    <button
                      type='button'
                      className='btn btn-gradient-success waves-effect waves-light'
                    >
                      Manage
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='card e-co-product'>
                <a href=''>
                  <img
                    src='../assets/images/products/img-1.png'
                    alt=''
                    className='img-fluid'
                  />
                </a>
                <div className='card-body product-info'>
                  <a href='' className='product-title'>
                    Scaling and polishing session
                  </a>
                  <p>Lorem ipsum dolor sit amet consecutetur.</p>
                  <div className='d-flex justify-content-between my-2'>
                    <p className='product-price'>$329.00 </p>
                    <ul className='list-inline mb-0 product-review align-self-center'>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star-half text-warning'></i>
                      </li>
                    </ul>
                  </div>
                  <a href='../pages/manage-service.html'>
                    <button
                      type='button'
                      className='btn btn-gradient-success waves-effect waves-light'
                    >
                      Manage
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='card e-co-product'>
                <a href=''>
                  <img
                    src='../assets/images/products/img-1.png'
                    alt=''
                    className='img-fluid'
                  />
                </a>
                <div className='card-body product-info'>
                  <a href='' className='product-title'>
                    Scaling and polishing session
                  </a>
                  <p>Lorem ipsum dolor sit amet consecutetur.</p>
                  <div className='d-flex justify-content-between my-2'>
                    <p className='product-price'>$329.00 </p>
                    <ul className='list-inline mb-0 product-review align-self-center'>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star-half text-warning'></i>
                      </li>
                    </ul>
                  </div>
                  <a href='../pages/manage-service.html'>
                    <button
                      type='button'
                      className='btn btn-gradient-success waves-effect waves-light'
                    >
                      Manage
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='card e-co-product'>
                <a href=''>
                  <img
                    src='../assets/images/products/img-1.png'
                    alt=''
                    className='img-fluid'
                  />
                </a>
                <div className='card-body product-info'>
                  <a href='' className='product-title'>
                    Scaling and polishing session
                  </a>
                  <p>Lorem ipsum dolor sit amet consecutetur.</p>
                  <div className='d-flex justify-content-between my-2'>
                    <p className='product-price'>$329.00 </p>
                    <ul className='list-inline mb-0 product-review align-self-center'>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star text-warning'></i>
                      </li>
                      <li className='list-inline-item'>
                        <i className='mdi mdi-star-half text-warning'></i>
                      </li>
                    </ul>
                  </div>
                  <a href='../pages/manage-service.html'>
                    <button
                      type='button'
                      className='btn btn-gradient-success waves-effect waves-light'
                    >
                      Manage
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
