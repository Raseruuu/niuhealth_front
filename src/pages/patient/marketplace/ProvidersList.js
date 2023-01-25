import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer'

export default function ProvidersList() {
  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-title-box'>
                <h4 className='page-title'>Marketplace</h4>
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
                        <h6 className='mb-3 mt-0'>Location</h6>

                        <select
                          className='form-control '
                          style={{ marginBottom: '15px' }}
                        >
                          <option>Hawaii</option>
                          <option>India</option>
                          <option>Usa</option>
                          <option>Canada</option>
                          <option>Thailand</option>
                        </select>

                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox0'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox0'>Central</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox1'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox1'>Diamond Head</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox2'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox2'>Ewa Plain</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox3'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox3'>Hawaii Kai</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox4'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox4'>Kalua</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox5'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox5'>Kaneohe</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox6'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox6'>Leeward</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox7'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox7'>Makakilo</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox8'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox8'>Metro Honolulu</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox9'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox9'>North Shore</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox10'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox10'>Pearl City</label>
                        </div>
                        <div className='checkbox checkbox-success '>
                          <input
                            id='checkbox11'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox11'>Waipahu</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='p-3'>
                        <h6 className='mb-3 mt-0'>Price Range</h6>
                        <input type='text' id='range_doctors_rate' />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='p-3'>
                        <h6 className='mt-0 mb-4'>Ratings</h6>
                        <div className='checkbox checkbox-success'>
                          <input id='checkboxs3' type='checkbox' />
                          <label for='checkboxs3'>
                            {' '}
                            5<i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                          </label>
                        </div>
                        <div className='checkbox checkbox-success'>
                          <input id='checkboxs4' type='checkbox' />
                          <label for='checkboxs4'>
                            {' '}
                            4<i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star light-gray'></i>
                          </label>
                        </div>
                        <div className='checkbox checkbox-success'>
                          <input id='checkboxs5' type='checkbox' />
                          <label for='checkboxs5'>
                            {' '}
                            3<i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star light-gray'></i>
                            <i className='mdi mdi-star light-gray'></i>
                          </label>
                        </div>
                        <div className='checkbox checkbox-success'>
                          <input id='checkboxs6' type='checkbox' />
                          <label for='checkboxs6'>
                            {' '}
                            2<i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star text-warning'></i>
                            <i className='mdi mdi-star light-gray'></i>
                            <i className='mdi mdi-star light-gray'></i>
                            <i className='mdi mdi-star light-gray'></i>
                          </label>
                        </div>
                        <div className='checkbox checkbox-success'>
                          <input id='checkboxs7' type='checkbox' />
                          <label for='checkboxs7'>
                            {' '}
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
                <div className='col-sm-12'>
                  <div className='page-title-box'>
                    <div className='float-right'>
                      <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>
                          <Link to='/patient/marketplace'>Marketplace</Link>
                        </li>
                        <li className='breadcrumb-item'>
                          <Link to=''>Family medicine</Link>
                        </li>
                        <li className='breadcrumb-item active'>
                          Child Medical Checkup
                        </li>
                      </ol>
                    </div>
                    <h3 className='page-title'>Child Medical Checkup</h3>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-6'>
                  <div className='form-group'>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Search Doctors...'
                        aria-label='Search Doctors...'
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

              <div>
                <div className='row'>
                  <div className='col-12'>
                    <div className='card'>
                      <div className='card-body doctor'>
                        <div className='met-profile'>
                          <div className='row'>
                            <div className='col-lg-4 align-self-center mb-3 mb-lg-0'>
                              <div className='met-profile-main'>
                                <div className='met-profile-main-pic'>
                                  <Link to='marketplace-3-book.html'>
                                    <img
                                      src='../assets/images/users/user-4.jpg'
                                      alt=''
                                      className='rounded-circle'
                                    />
                                  </Link>
                                </div>
                                <div className='met-profile_user-detail'>
                                  <Link to='marketplace-3-book.html'>
                                    <h5 className='met-user-name'>Rosa Dodson</h5>
                                  </Link>
                                  <p className='mb-0 met-user-name-post'>
                                    Pediatrician
                                  </p>
                                  <p>
                                    <label for='checkbox3'>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='col-lg-4 ml-auto'>
                              <ul className='list-unstyled personal-detail'>
                                <li className='mt-2'>
                                  <i className='far fa-money-bill-alt text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b> Rate </b> : $35-$70
                                </li>
                                <li className=''>
                                  <i className='dripicons-message mr-2 text-info font-18'></i>{' '}
                                  <b> Feedbacks </b> : 24
                                </li>
                                <li className='mt-2'>
                                  <i className='dripicons-location text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b>Location</b> : Central, Hawaii
                                </li>
                              </ul>
                              <div className=''>
                                <Link to='../checkout'>
                                  <button
                                    type='button'
                                    className='btn btn-success btn-md m-1'
                                  >
                                    Book Appointment
                                  </button>
                                </Link>
                                <Link to='marketplace-3-profile.html'>
                                  <button
                                    type='button'
                                    className='btn btn-outline-success btn-md m-1'
                                  >
                                    View Profile
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <div className='card'>
                      <div className='card-body doctor'>
                        <div className='met-profile'>
                          <div className='row'>
                            <div className='col-lg-4 align-self-center mb-3 mb-lg-0'>
                              <div className='met-profile-main'>
                                <div className='met-profile-main-pic'>
                                  <Link to='marketplace-3-book.html'>
                                    <img
                                      src='../assets/images/users/user-4.jpg'
                                      alt=''
                                      className='rounded-circle'
                                    />
                                  </Link>
                                </div>
                                <div className='met-profile_user-detail'>
                                  <Link to='marketplace-3-book.html'>
                                    <h5 className='met-user-name'>Darwin Stone</h5>
                                  </Link>
                                  <p className='mb-0 met-user-name-post'>
                                    Pediatrician / ENT
                                  </p>
                                  <p>
                                    <label for='checkbox3'>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='col-lg-4 ml-auto'>
                              <ul className='list-unstyled personal-detail'>
                                <li className='mt-2'>
                                  <i className='far fa-money-bill-alt text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b> Rate </b> : $50-$80
                                </li>
                                <li className=''>
                                  <i className='dripicons-message mr-2 text-info font-18'></i>{' '}
                                  <b> Feedbacks </b> : 24
                                </li>
                                <li className='mt-2'>
                                  <i className='dripicons-location text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b>Location</b> : Central, Hawaii
                                </li>
                              </ul>
                              <div className=''>
                                <Link to='../checkout'>
                                  <button
                                    type='button'
                                    className='btn btn-success btn-md m-1'
                                  >
                                    Book Appointment
                                  </button>
                                </Link>
                                <Link to='marketplace-3-profile.html'>
                                  <button
                                    type='button'
                                    className='btn btn-outline-success btn-md m-1'
                                  >
                                    View Profile
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <div className='card'>
                      <div className='card-body doctor'>
                        <div className='met-profile'>
                          <div className='row'>
                            <div className='col-lg-4 align-self-center mb-3 mb-lg-0'>
                              <div className='met-profile-main'>
                                <div className='met-profile-main-pic'>
                                  <Link to='marketplace-3-book.html'>
                                    <img
                                      src='../assets/images/users/user-4.jpg'
                                      alt=''
                                      className='rounded-circle'
                                    />
                                  </Link>
                                </div>
                                <div className='met-profile_user-detail'>
                                  <Link to='marketplace-3-book.html'>
                                    <h5 className='met-user-name'>Janice Castro</h5>
                                  </Link>
                                  <p className='mb-0 met-user-name-post'>
                                    Pediatrician / Orthopedic
                                  </p>
                                  <p>
                                    <label for='checkbox3'>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                      <i className='mdi mdi-star text-warning'></i>
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='col-lg-4 ml-auto'>
                              <ul className='list-unstyled personal-detail'>
                                <li className='mt-2'>
                                  <i className='far fa-money-bill-alt text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b> Rate </b> : $40-$75
                                </li>
                                <li className=''>
                                  <i className='dripicons-message mr-2 text-info font-18'></i>{' '}
                                  <b> Feedbacks </b> : 24
                                </li>
                                <li className='mt-2'>
                                  <i className='dripicons-location text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b>Location</b> : Central, Hawaii
                                </li>
                              </ul>
                              <div className=''>
                                <Link to='../checkout'>
                                  <button
                                    type='button'
                                    className='btn btn-success btn-md m-1'
                                  >
                                    Book Appointment
                                  </button>
                                </Link>
                                <Link to='marketplace-3-profile.html'>
                                  <button
                                    type='button'
                                    className='btn btn-outline-success btn-md m-1'
                                  >
                                    View Profile
                                  </button>
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
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
