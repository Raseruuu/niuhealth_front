import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer'

export default function ProvidersList() {
  return (
    <div class='page-wrapper'>
      <div class='page-content'>
        <div class='container-fluid'>
          <div class='row'>
            <div class='col-sm-12'>
              <div class='page-title-box'>
                <h4 class='page-title'>Marketplace</h4>
              </div>
            </div>
          </div>

          <div class='row'>
            <div class='col-lg-3'>
              <div class='card'>
                <div class='card-body'>
                  <div class='row'>
                    <div class='col-lg-12'>
                      <h5 class='mt-0 mb-4'>Filter</h5>

                      <div class='p-3'>
                        <h6 class='mb-3 mt-0'>Location</h6>

                        <select
                          class='form-control '
                          style={{ marginBottom: '15px' }}
                        >
                          <option>Hawaii</option>
                          <option>India</option>
                          <option>Usa</option>
                          <option>Canada</option>
                          <option>Thailand</option>
                        </select>

                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox0'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox0'>Central</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox1'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox1'>Diamond Head</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox2'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox2'>Ewa Plain</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox3'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox3'>Hawaii Kai</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox4'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox4'>Kalua</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox5'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox5'>Kaneohe</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox6'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox6'>Leeward</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox7'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox7'>Makakilo</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox8'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox8'>Metro Honolulu</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox9'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox9'>North Shore</label>
                        </div>
                        <div class='checkbox checkbox-success '>
                          <input
                            id='checkbox10'
                            type='checkbox'
                            defaultChecked
                          />
                          <label for='checkbox10'>Pearl City</label>
                        </div>
                        <div class='checkbox checkbox-success '>
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

                  <div class='row'>
                    <div class='col-lg-12'>
                      <div class='p-3'>
                        <h6 class='mb-3 mt-0'>Price Range</h6>
                        <input type='text' id='range_doctors_rate' />
                      </div>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-lg-12'>
                      <div class='p-3'>
                        <h6 class='mt-0 mb-4'>Ratings</h6>
                        <div class='checkbox checkbox-success'>
                          <input id='checkboxs3' type='checkbox' />
                          <label for='checkboxs3'>
                            {' '}
                            5<i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                          </label>
                        </div>
                        <div class='checkbox checkbox-success'>
                          <input id='checkboxs4' type='checkbox' />
                          <label for='checkboxs4'>
                            {' '}
                            4<i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star light-gray'></i>
                          </label>
                        </div>
                        <div class='checkbox checkbox-success'>
                          <input id='checkboxs5' type='checkbox' />
                          <label for='checkboxs5'>
                            {' '}
                            3<i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star light-gray'></i>
                            <i class='mdi mdi-star light-gray'></i>
                          </label>
                        </div>
                        <div class='checkbox checkbox-success'>
                          <input id='checkboxs6' type='checkbox' />
                          <label for='checkboxs6'>
                            {' '}
                            2<i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star light-gray'></i>
                            <i class='mdi mdi-star light-gray'></i>
                            <i class='mdi mdi-star light-gray'></i>
                          </label>
                        </div>
                        <div class='checkbox checkbox-success'>
                          <input id='checkboxs7' type='checkbox' />
                          <label for='checkboxs7'>
                            {' '}
                            1<i class='mdi mdi-star text-warning'></i>
                            <i class='mdi mdi-star light-gray'></i>
                            <i class='mdi mdi-star light-gray'></i>
                            <i class='mdi mdi-star light-gray'></i>
                            <i class='mdi mdi-star light-gray'></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class='col-lg-9'>
              <div class='row'>
                <div class='col-sm-12'>
                  <div class='page-title-box'>
                    <div class='float-right'>
                      <ol class='breadcrumb'>
                        <li class='breadcrumb-item'>
                          <Link to='/patient/marketplace'>Marketplace</Link>
                        </li>
                        <li class='breadcrumb-item'>
                          <Link to=''>Family medicine</Link>
                        </li>
                        <li class='breadcrumb-item active'>
                          Child Medical Checkup
                        </li>
                      </ol>
                    </div>
                    <h3 class='page-title'>Child Medical Checkup</h3>
                  </div>
                </div>
              </div>

              <div class='row'>
                <div class='col-lg-6'>
                  <div class='form-group'>
                    <div class='input-group'>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Search Doctors...'
                        aria-label='Search Doctors...'
                      />
                      <span class='input-group-append'>
                        <button class='btn btn-success' type='button'>
                          Go!
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div class='row'>
                  <div class='col-12'>
                    <div class='card'>
                      <div class='card-body doctor'>
                        <div class='met-profile'>
                          <div class='row'>
                            <div class='col-lg-4 align-self-center mb-3 mb-lg-0'>
                              <div class='met-profile-main'>
                                <div class='met-profile-main-pic'>
                                  <Link to='marketplace-3-book.html'>
                                    <img
                                      src='../assets/images/users/user-4.jpg'
                                      alt=''
                                      class='rounded-circle'
                                    />
                                  </Link>
                                </div>
                                <div class='met-profile_user-detail'>
                                  <Link to='marketplace-3-book.html'>
                                    <h5 class='met-user-name'>Rosa Dodson</h5>
                                  </Link>
                                  <p class='mb-0 met-user-name-post'>
                                    Pediatrician
                                  </p>
                                  <p>
                                    <label for='checkbox3'>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class='col-lg-4 ml-auto'>
                              <ul class='list-unstyled personal-detail'>
                                <li class='mt-2'>
                                  <i class='far fa-money-bill-alt text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b> Rate </b> : $35-$70
                                </li>
                                <li class=''>
                                  <i class='dripicons-message mr-2 text-info font-18'></i>{' '}
                                  <b> Feedbacks </b> : 24
                                </li>
                                <li class='mt-2'>
                                  <i class='dripicons-location text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b>Location</b> : Central, Hawaii
                                </li>
                              </ul>
                              <div class=''>
                                <Link to='../checkout'>
                                  <button
                                    type='button'
                                    class='btn btn-success btn-md m-1'
                                  >
                                    Book Appointment
                                  </button>
                                </Link>
                                <Link to='marketplace-3-profile.html'>
                                  <button
                                    type='button'
                                    class='btn btn-outline-success btn-md m-1'
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

                <div class='row'>
                  <div class='col-12'>
                    <div class='card'>
                      <div class='card-body doctor'>
                        <div class='met-profile'>
                          <div class='row'>
                            <div class='col-lg-4 align-self-center mb-3 mb-lg-0'>
                              <div class='met-profile-main'>
                                <div class='met-profile-main-pic'>
                                  <Link to='marketplace-3-book.html'>
                                    <img
                                      src='../assets/images/users/user-4.jpg'
                                      alt=''
                                      class='rounded-circle'
                                    />
                                  </Link>
                                </div>
                                <div class='met-profile_user-detail'>
                                  <Link to='marketplace-3-book.html'>
                                    <h5 class='met-user-name'>Darwin Stone</h5>
                                  </Link>
                                  <p class='mb-0 met-user-name-post'>
                                    Pediatrician / ENT
                                  </p>
                                  <p>
                                    <label for='checkbox3'>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class='col-lg-4 ml-auto'>
                              <ul class='list-unstyled personal-detail'>
                                <li class='mt-2'>
                                  <i class='far fa-money-bill-alt text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b> Rate </b> : $50-$80
                                </li>
                                <li class=''>
                                  <i class='dripicons-message mr-2 text-info font-18'></i>{' '}
                                  <b> Feedbacks </b> : 24
                                </li>
                                <li class='mt-2'>
                                  <i class='dripicons-location text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b>Location</b> : Central, Hawaii
                                </li>
                              </ul>
                              <div class=''>
                                <Link to='../checkout'>
                                  <button
                                    type='button'
                                    class='btn btn-success btn-md m-1'
                                  >
                                    Book Appointment
                                  </button>
                                </Link>
                                <Link to='marketplace-3-profile.html'>
                                  <button
                                    type='button'
                                    class='btn btn-outline-success btn-md m-1'
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

                <div class='row'>
                  <div class='col-12'>
                    <div class='card'>
                      <div class='card-body doctor'>
                        <div class='met-profile'>
                          <div class='row'>
                            <div class='col-lg-4 align-self-center mb-3 mb-lg-0'>
                              <div class='met-profile-main'>
                                <div class='met-profile-main-pic'>
                                  <Link to='marketplace-3-book.html'>
                                    <img
                                      src='../assets/images/users/user-4.jpg'
                                      alt=''
                                      class='rounded-circle'
                                    />
                                  </Link>
                                </div>
                                <div class='met-profile_user-detail'>
                                  <Link to='marketplace-3-book.html'>
                                    <h5 class='met-user-name'>Janice Castro</h5>
                                  </Link>
                                  <p class='mb-0 met-user-name-post'>
                                    Pediatrician / Orthopedic
                                  </p>
                                  <p>
                                    <label for='checkbox3'>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                      <i class='mdi mdi-star text-warning'></i>
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class='col-lg-4 ml-auto'>
                              <ul class='list-unstyled personal-detail'>
                                <li class='mt-2'>
                                  <i class='far fa-money-bill-alt text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b> Rate </b> : $40-$75
                                </li>
                                <li class=''>
                                  <i class='dripicons-message mr-2 text-info font-18'></i>{' '}
                                  <b> Feedbacks </b> : 24
                                </li>
                                <li class='mt-2'>
                                  <i class='dripicons-location text-info font-18 mt-2 mr-2'></i>{' '}
                                  <b>Location</b> : Central, Hawaii
                                </li>
                              </ul>
                              <div class=''>
                                <Link to='../checkout'>
                                  <button
                                    type='button'
                                    class='btn btn-success btn-md m-1'
                                  >
                                    Book Appointment
                                  </button>
                                </Link>
                                <Link to='marketplace-3-profile.html'>
                                  <button
                                    type='button'
                                    class='btn btn-outline-success btn-md m-1'
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
