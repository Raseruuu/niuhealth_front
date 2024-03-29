import { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../../../components/Footer'
import { UploadOneImage } from '../../../components/form/UploadImage'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function Upload() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const formRef = useRef()
  const [errMsg, setErrMsg] = useState()
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()
  const [insuranceCoverage, setInsuranceCoverage] = useState('')
  const [selectedCoverage, setSelectedCoverage] = useState([])
  const [frontImage,setFrontImage]=useState({})
  const [backImage,setBackImage]=useState({})
  const [imageList,setImageList]=useState([{path:""}])
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm()
  function handleTextarea(e) {
    const val = e.target.value
    setInsuranceCoverage(val)

    if (val.length <= 0) {
      setSelectedCoverage([])
    }
  }
  function handleButtonClick(selected) {
    const currentSelected = new Set(selectedCoverage)

    if (currentSelected.has(selected)) return

    currentSelected.add(selected)
    setSelectedCoverage((prev) => [...prev, selected])

    if (insuranceCoverage.trim().length <= 0) {
      setInsuranceCoverage(selected)
    } else {
      setInsuranceCoverage((prev) => `${prev}, ${selected}`)
    }
  }

  const handleUpload = async (data) => {
    // if (!data?.Image[0]) {
    //   return
    // }
    console.log('formdataa',data)
    setIsSuccess(false)
    setErrMsg(null)
    var additional_formdata={}
    for (let index = 0; index < imageList.length; index++) {
      
      additional_formdata["Image"+String(parseInt(index)+1)]=imageList[index].file
    }
    var formdata={...data}
    formdata['StartDate']=moment(data.StartDate.replace(/-/g, "/")).format("YYYY-MM-DD")
    formdata['EndDate']=moment(data.EndDate.replace(/-/g, "/")).format("YYYY-MM-DD")
    // Swal.fire(`Start: ${formdata['StartDate']} <br> End: ${formdata['EndDate']} <br>`)
    try {
      await axiosPrivate
        .post(
          'uploadInsuranceBucket',
          { ...formdata,...additional_formdata,
            // Image: data?.Image[0],
            Email: auth?.email,
            // Title: data.Title,
            // ID: data?.ID,
            // Type: 'Health Insurance',
            // Start: data.Start,
            // End: data.End,
            // Provider: data.Provider,
            // Coverage: data.Coverage
          },
          {
            Accept: 'application/json',
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then((res) => {
          const { Message, Status } = res.data

          if (Status) {
            setIsSuccess(true)
          } 
          else {
            setIsSuccess(false)
            Swal.fire({
              icon:'warning',
              html:`${Message}`
            })
            throw new Error(Message)
          }
        })
        .catch((err) => {
          setErrMsg(err.Message)
          
          throw err
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-title-box'>
                <h4 className='page-title'>Insurance</h4>
              </div>
            </div>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit(handleUpload)}
            id='formUpload'
            encType='multipart/form-data'
          >
            <div className='row'>
              <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='header-title mt-0 mb-3'> 
                      Upload your insurance document to enjoy free/discounted service
                    </h4>
                    <label>
                      Insurance Title
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="BucketName"
                      disabled={isSuccess}
                      {...register('BucketName', { required: true })}
                      required
                    />
                    <br/>
                    <div className='mb-4 m-1'>
                      
                        <label>
                          Start Date
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          placeholder={'mm-dd-yyyy'}
                          name="StartDate"
                          disabled={isSuccess}
                                // defaultValue={dateFormat(profile.date_of_birth)}
                                // value={dateFormat(profile.date_of_birth)}
                          {...register('StartDate', { required: true })}
                                // onChangeCapture={handleInputChange.bind(this)}
                              />
                              <br/>
                        <label>
                          End Date
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          placeholder={'mm-dd-yyyy'}
                          disabled={isSuccess}
                          name="EndDate"
                          {...register('EndDate', { required: true })}
                              />
                    </div>
                    {/* <label>
                      Insurance ID
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="ID"
                      {...register('ID', { required: true })}
                      required
                    />
                     */}
                    {/* <label>Insurance Coverage</label> */}
                    
                    {/* <div>
                    <textarea
                      style={{ margin: '5px 0 0 0' }}
                      className="form-control"
                      rows="3"
                      id="message"
                      placeholder="List which services can be covered by your Insurance "
                      // value={insuranceCoverage}
                      onChange={handleTextarea}
                      {...register('Coverage', { required: true })}
                      maxLength="150"
                    ></textarea>
                    </div>
                    <div
                          className="d-flex  flex-row justify-content-start align-items-center overflow-auto"
                          style={{ height: '80px' }}
                        >
                          {[
                            'Dental', 'General', 'Emergency','Individual Health Insurance','Critical Illness Insurance','Top Up Health Insurance','Hospital Daily Cash'
                          ].map((e) => (
                            <button
                              key={e}
                              type="button"
                              className="btn btn-light btn-sm mr-1 text-nowrap"
                              style={{
                                boxShadow: 'unset',
                                borderRadius: '15px',
                              }}
                              onClick={handleButtonClick.bind(this, e)}
                            >
                              {e}
                            </button>
                          ))}
                    </div> */}
                    <div className='row'>
                  <div className='form-group row-lg-12 mb-4 mt-4 m-1'>
                    {/* <div className='col lg-4'>
                      <label>Front Image</label>
                        <UploadOneImage 
                          disabled={isSuccess}
                          image={frontImage} 
                          setImage={setFrontImage} 
                          previewImage={frontImage} />
                    </div> */}
                    {/* <label className='col-form-label text-right'>Insurance Files</label><br/> */}
                    <div className='col-md-12'>
                        <label
                          htmlFor='insurance'
                          className='col-form-label text-right'
                        >
                          Insurance Files
                        </label>
                      </div>
                      <div className='row-md-12 m-4' style={{width:360}}>
                    {imageList.map((image,index)=>{
                      console.log("imageList",imageList)
                      return(
                      <div key={index} className='col-lg-12 mr-1 p-4 w-100'  style={{height:240}}>
                        
                        
                          <UploadOneImage
                            disabled={isSuccess}
                            image={image} 
                            previewImage={image} 
                            setImage={(img)=>{
                                var newImageList=[...imageList]
                                newImageList[index]=img
                                setImageList(newImageList)
                              }
                            } 
                          
                          />
                        
                        
                    </div>)
                            })}
                           </div>
                           <div className='d-flex justify-content-center text-center'>
                            {imageList.length<=5&&imageList[imageList.length-1].path!="Default.png"?
                            <button
                          className="btn btn-gradient-success waves-effect waves-light"
                          style={{minWidth:"80px", height:"60px"}}
                          disabled={isSuccess}
                          onClick={(e)=>{
                            e.preventDefault();
                            (imageList.length<=4)
                              {setImageList([...imageList,{path:'Default.png'}])}
                            }}>Add File</button>:null}
                            </div>
                            
                             
                    </div>
                    </div>
                    {/* <div>
                      <input
                        type='file'
                        id='input-file-now'
                        className='dropify'
                        accept='image/*'
                        capture='user'
                        {...register('FrontImage', { required: true })}
                      />
                      {errors.Image ? (
                        <div className='text-danger'>Please choose file</div>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type='file'
                        id='input-file-now'
                        className='dropify'
                        accept='image/*'
                        capture='user'
                        {...register('BackImage', { required: true })}
                      />
                      {errors.Image ? (
                        <div className='text-danger'>Please choose file</div>
                      ) : null}
                    </div> */}

                    <p>
                      <small className='text-muted'>
                        If you want to capture the document photos using mobile
                        camera, sign in on your mobile and you will get navigate
                        directly to this page
                      </small>
                    </p>
                    <p>The document will be checked during your first visit</p>

                    {errMsg ? (
                      <div className='alert alert-danger' role='alert'>
                        Upload Failed. {errMsg}
                      </div>
                    ) : null}
                    {isSuccess ? (
                      <div className='alert alert-success' role='alert'>
                        Files successfully uploaded.
                      </div>
                    ) : null}
                    {!isSuccess ? (<>
                      <button
                        type='submit'
                        // onClick={handleUpload}
                        className='btn btn-success btn-round waves-effect waves-light'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Please wait...' : 'Submit Documents'}
                      </button>
                       <Link to='..'>
                       <button
                         type='button'
                         className='float-right btn btn-danger btn-round waves-effect waves-light mt-2'
                       >
                         Back
                       </button>
                     </Link></>
                    ) : (
                      <button
                        type='button'
                        onClick={() => navigate(-1)}
                        className='btn btn-success btn-round waves-effect waves-light'
                      >
                        Go Back
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Upload
