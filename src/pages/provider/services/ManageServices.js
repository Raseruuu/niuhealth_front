import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AWS_BUCKET } from "../../../constants";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import UploadImage from '../../../components/form/UploadImage'
import Multiselect from "multiselect-react-dropdown";
import Swal from "sweetalert2";
import styled from "@emotion/styled"



export const StyleWrapper = styled.div`
.optionListContainer {
  position: sticky;
} 

`
function ManageServices() {

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { action,id } = useParams();
  const { state } = useLocation();
  const [clinicList, setClinicList] = useState([]);
  const [clinicIDList, setClinicIDList] = useState([])
  const [serviceClinicList,setServiceClinicList]=useState([])
  const [images, setImages] = useState([{path:'services/Default.png',file:{}}]);
  const [service, setService] = useState({
    service_name:"",service_description:"",
    image1:"",image2:"",image3:"",image4:"",image5:"",
    service_description:"",service_name:""
  });
  const [imagepreview, setImagePreview] = useState(true);
  const [isLoading,setIsLoading]=useState(true);
  const [categoryOptions,setCategoryOptions]=useState([{id:"",name:""}])
  const [isSuccess, setIsSuccess] = useState(false);
  const [category,setCategory]=useState("");
  // const placeholderimage = `${AWS_BUCKET}/assets/images/users/user-4.jpg`;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },

  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // if (data?.image.length > 0) {
    //   for (let index = 0; index < data?.image.length; index++) {
    //     formData.append("Image"+parseInt(index+1), data.image[index], data.image[index].name);
    //   }
    // }
    console.log("images",images)
    console.log("service",service)
    
    
    if ((images.length > 0 )&& images[0].path!=='services/Default.png'){
      for (let index = 0; index < images.length; index++) {
        if (images[index].file){
          formData.append("Image"+parseInt(index+1), images[index].file);

        }
      }
    }
    // formData.append("ServiceName", data.name);
    formData.append("Email", auth.email);
    // formData.append("ServiceType", data.type);
    if (action==='update'){
      console.log('formdaataaa',service)
      formData.append("ServiceID", id);
      formData.append("Price", service.cost_price);
      formData.append("Status", service.status);
      
      formData.append("Name", service.service_name);
      formData.append("ServiceName", service.service_name);
      formData.append("Description", service.service_description);
      formData.append("Category", service.category);
      formData.append("ClinicIDs", [...service.clinic_ids]);
    }
    else if (action==='new'){
      console.log('formdaataaa',data)
      
      formData.append("ServiceName", data.name);
      formData.append("ServiceDescription", data.description);
      console.log('category',category)
      formData.append("CategoryID", category);
      formData.append("CostPrice", data.rate);

      formData.append("Status", (Boolean(data.active)*1));
      formData.append("ClinicIDs", data.clinic);
    }
    // formData.append("ClinicIDs",(JSON.stringify(data.clinic)));
    
    await axiosPrivate
      .post((action==='new')?"createService":(action==='update')?"updateService":"", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (ProgressEvent) {
          console.log(
            "uploadprogress: " +
              (ProgressEvent.loaded / ProgressEvent.total) * 100 +
              "%"
          );
        },
      })
      .then((res) => {
        console.log(res);
        const { Status, Data: data = [], Message } = res.data;

        if (Status) {
          Swal.fire(Message)
          navigate('/provider/services');
        } else {
          throw new Error(Message);
        }
      })
      .catch((err) => {
        alert(err.message || "Creating new services failed."); // TODO: change to SweetAlert
        console.error(err);
      });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function getServiceCategories() {
    await axiosPrivate
      .post(('getServiceCategories'),{Email:auth.email}, {
        signal: controller.signal,
      })
      .then((res)=>{
        console.log('res',res.data.Status)
        const {Status,Data, Message}=res.data
        if (Status){
          
          setCategoryOptions(Data.map((item)=>{
            
            return {id:item.id,name:item.name}
          }))
          
          console.log("categoryOptions",Data.map((item)=>{
            return {
              id:   item.id,
              name: item.name}
          }))
          
            
        }
      
      })
      .catch((err) => {
        console.error(err)
        setErrMsg(err.message)
      })
    }
    async function getClinicList() {
      await axiosPrivate
        .post(
          "getClinics",
          { Email: auth.email },
          {
            Accept: 'application/json',
            headers: { 'Content-Type': 'multipart/form-data' },
            signal: controller.signal
          }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data;

          if (Status) {
            isMounted && setClinicList(data);
            const clinicidlist=data.map((item)=>{return {name:item.clinic_name,id:item.clinic_id}})
            setClinicIDList(clinicidlist)
            console.log(data.map((item)=>{return {name:item.clinic_name,id:item.clinic_id}}))
            if (action==='update'){
              getServiceDetails(clinicidlist);
            }
           
          } else {
            throw new Error(Message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    async function getServiceDetails(clinicIDList) {
      await axiosPrivate
        .post(
          "providerGetService",
          { Email: auth.email,ServiceID:id },
          {
            signal: controller.signal,
            onUploadProgress:ProgressEvent=>
              {console.log("uploadprogress: "+ProgressEvent.loaded/ProgressEvent.total*100+"%" )}
          }
        )
        .then((res) => {
          const { Status, Data: data = [], Message } = res.data;

          if (Status) {
            
            setService(data);
            setIsLoading(false)
            const clinic_list_temp=data.clinic_ids.split(",").map((clinicID,index)=>{if (clinicIDList[index].id===clinicID){return {id:clinicIDList[index].id,name:clinicIDList[index].name}}})
            setServiceClinicList(clinic_list_temp)
            console.log("temp",clinic_list_temp)
            console.log("ServiceDetails",)

            var imagetemp=[]
            if (data.image1!=="Default.png"){
              imagetemp.push({path:"services/"+data.image1})
            }
            if (data.image2!=="Default.png"){
              imagetemp.push({path:"services/"+data.image2})
            }
            if (data.image3!=="Default.png"){
              imagetemp.push({path:"services/"+data.image3})
            }
            if (data.image4!=="Default.png"){
              imagetemp.push({path:"services/"+data.image4})
            }
            if (data.image5!=="Default.png"){
              imagetemp.push({path:"services/"+data.image5})
            }
            setImages(imagetemp)

          } else {
            throw new Error(Message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    
    getClinicList();
    getServiceCategories();
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-box">
            <div className="float-right">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">NIU Health</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/provider/services">Services</Link>
                </li>
                <li className="breadcrumb-item active">{action==='new'?"Create":action==="update"?"Update":"Manage"} Service</li>
              </ol>
            </div>
            <h4 className="page-title">Services</h4>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="mt-0 header-title">
                  {action === "new" ? "Create New" : "Update"} Service
                </h4>
                <p className="text-muted mb-3">
                  Service Info will tell Patient users all about your work.
                </p>
                
                <div className="row" style={{ marginBottom: "30px" }}>
                  <div className="col-md-12">
                    <label className="mb-3">Service Name</label>
                    {action==='update'?<>
                        <input
                          required
                          className="form-control"
                          type="text"
                          value={service.service_name}
                          onChange={((e)=>{setService({...service,service_name:e.target.value})})}
                        />
                    </>:
                      <input
                        required
                        className="form-control"
                        type="text"
                        {...register("name", {
                          value: state?.selectedService?.name,
                        })}
                      />
                    }
                   
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "30px" }}>
                {/*
                  <div className="col-md-6">
                    <label className="mb-3">Choose Service Type</label>
                    <select
                      required

                      className="select2 form-control mb-3 custom-select select2-hidden-accessible"
                      style={{ width: "100%", height: "36px" }}
                      tabindex="-1"
                      aria-hidden="true"
                      {...register("type", {
                        value: state?.selectedService?.type,
                      })}
                    >
                      <option>Select</option>
                      <optgroup label="Allergy and Immunology">
                        <option value="AK">Allergy care</option>
                        <option value="HI">Immunology medicine</option>
                      </optgroup>
                      <optgroup label="Anesthesiology">
                        <option value="CA">Critical care medicine</option>
                        <option value="CA">Hospice and palliative care</option>
                        <option value="CA">Pain medicine</option>
                        <option value="CA">Pediatric anesthesiology</option>
                        <option value="CA">Sleep medicine</option>
                      </optgroup>
                      <optgroup label="Dermatology">
                        <option value="AZ">Dermatopathology</option>
                        <option value="AZ">Pediatric dermatology</option>
                        <option value="AZ">Procedural dermatology</option>
                      </optgroup>
                      <optgroup label="Diagnostic radiology">
                        <option value="AL">Abdominal radiology</option>
                        <option value="AL">Breast imaging</option>
                        <option value="AL">Cardiothoracic radiology</option>
                        <option value="AL">Cardiovascular radiology</option>
                        <option value="AL">Chest radiology</option>
                        <option value="AL">Emergency radiology</option>
                        <option value="AL">
                          Endovascular surgical neuroradiology
                        </option>
                        <option value="AL">Gastrointestinal radiology</option>
                        <option value="AL">Genitourinary radiology</option>
                        <option value="AL">Head and neck radiology</option>
                        <option value="AL">Interventional radiology</option>
                        <option value="AL">Musculoskeletal radiology</option>
                        <option value="AL">Neuroradiology</option>
                        <option value="AL">Nuclear radiology</option>
                        <option value="AL">Pediatric radiology</option>
                        <option value="AL">Radiation oncology</option>
                        <option value="AL">
                          Vascular and interventional radiology
                        </option>
                      </optgroup>
                      <optgroup label="Emergency medicine">
                        <option value="CT">
                          Anesthesiology critical care medicine
                        </option>
                        <option value="CT">Emergency medical services</option>
                        <option value="CT">
                          Hospice and palliative medicine
                        </option>
                        <option value="CT">
                          Internal medicine / Critical care medicine
                        </option>
                        <option value="CT">Medical toxicology</option>
                        <option value="CT">Pain medicine</option>
                        <option value="CT">Pediatric emergency medicine</option>
                        <option value="CT">Sports medicine</option>
                        <option value="CT">
                          Undersea and hyperbaric medicine
                        </option>
                      </optgroup>
                    </select>
                  </div>
*/}               
                  <div className="col-md-6">
                    <label
                      htmlFor="example-text-input"
                      className="col-form-label text-right"
                    >
                      Category
                    </label>
                    {action==='new'?
                    <Multiselect

                    style={{zIndex:3}}
                    options={categoryOptions} // Options to display in the dropdown
                    selectedValues={[categoryOptions[0]]} // Preselected value to persist in dropdown
                    // {...register("category", {
                    //   value: service.category,
                    // })}
                    onSelect={(selectedItem)=>{console.log(selectedItem,"newservice",{...service,category:selectedItem[0].id});setService({...service,category:selectedItem[0].id});setCategory(selectedItem[0].id)}} // Function will trigger on select event
                    onRemove={(selectedItem)=>{setService({...service,category:selectedItem});setCategory(selectedItem)}} // Function will trigger on remove event
                    isObject={true}
                    singleSelect={true}
                    
                    displayValue="name" // Property name to display in the dropdown options
                  />:<> 
                  {(isLoading)?<></>:
                    <Multiselect

                        style={{zIndex:3}}
                        options={categoryOptions} // Options to display in the dropdown
                        selectedValues={[categoryOptions[parseInt(service.category)-1]]} // Preselected value to persist in dropdown
                        // {...register("category", {
                        //   value: service.category,
                        // })}
                        onSelect={(selectedItem)=>{console.log(selectedItem,"newservice",{...service,category:selectedItem[0].id});setService({...service,category:selectedItem[0].id});setCategory(selectedItem[0].id)}} // Function will trigger on select event
                        onRemove={(selectedItem)=>{setService({...service,category:selectedItem});setCategory(selectedItem)}} // Function will trigger on remove event
                        isObject={true}
                        singleSelect={true}
                        
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    }</>
                      }
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="example-text-input"
                      className="col-form-label text-right"
                    >
                      Price / Rate
                    </label>
                     {action==="update"?
                     <input
                      required
                      value={service.cost_price}
                      className="form-control"
                      type="number"
                      step={"0.01"}
                      onChange={((e)=>{setService({...service,cost_price:e.target.value})})}
                    />:
                    <input
                      required
                      value={service.cost_price}
                      className="form-control"
                      type="number"
                      step={"0.01"}
                      {...register("rate", {
                        value: state?.selectedService?.rate,
                      })}
                    />
                  }
                  </div>
                </div> 
                
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="message">Description</label>
                          {action==="update"?<>
                          <textarea
                            required
                            className="form-control"
                            rows="5"
                            
                            value={service.service_description}
                            onChange={((e)=>{setService({...service,service_description:e.target.value})})}
                          ></textarea>
                          </>:
                            <textarea
                            required
                            className="form-control"
                            rows="5"
                            
                            {...register("description", {
                              value: service.service_description,
                            })}
                          ></textarea>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="form-group"><label htmlFor="message">Activity {service.status==='1'}</label>
                    <div className="custom-control custom-switch switch-success">
                      {(action==='new')?
                        <input
                          id="customSwitchSuccess"
                          type="checkbox"
                          className="custom-control-input"
                          {...register("active")}
                        />:
                        <input
                          id="customSwitchSuccess"
                          type="checkbox"
                          className="custom-control-input"
                          value={service.status==="1"}
                          onChange={((e)=>{setService({...service,status:e.target.value})})}
                        />
                        }
                      
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitchSuccess"
                      >
                        Active
                      </label>
                    </div>
                    </div>
                  </div>

                  <div className="form-group col-lg-6">
                    {/* <div className=" col"> */}
                      <label htmlFor="exampleFormControlSelect2">
                        Clinic Availability (Choose all that applies)
                      </label>
                      {/* {(action==='new')?<select
                        multiple
                        required
                        className="select2 form-control mb-3 custom-select select2-hidden-accessible" style={{height:140}}
                        {...register("clinic")}
                      >
                        {clinicList.map((clinic) => {
                          // console.log("uguu",clinic)
                          return(
                          <option 
                            value={clinic.clinic_id}>
                            {clinic.clinic_name}
                          </option>
                              )})}
                            </select>:

                            <>{isLoading?<></>:<select
                            multiple
                            required
                            className="select2 form-control mb-3 custom-select select2-hidden-accessible" style={{height:140}}
                            value = {service.clinic_id}
                            
                          >
                            {clinicList.map((clinic) => {
                              // console.log("uguu",clinic)
                              return(
                              <option 
                                value={clinic.clinic_id}>
                                {clinic.clinic_name}
                              </option>
                      )})}
                    </select>}
                      </>} */}<br/>
                      <StyleWrapper>
                        <Multiselect
                          style={{zIndex:3 ,width:'100%'}}
                          options={clinicIDList} // Options to display in the dropdown
                          selectedValues={serviceClinicList} // Preselected value to persist in dropdown
                          onSelect={
                            (selectedList,selectedItem)=>{
                                var selected_ID_List= selectedList.map((clinic)=>{return clinic.id})
                               
                                setService({...service,clinic_ids:selected_ID_List})
                               
                              }} // Function will trigger on select event
                          onRemove={
                            (selectedList,selectedItem)=>{
                                var selected_ID_List= selectedList.map((clinic)=>{return clinic.id})
                               
                                setService({...service,clinic_ids:selected_ID_List})
                               
                              }}// Function will trigger on remove event
                          isObject={true}
                          showCheckbox={true}
                          displayValue="name"
                          // Property name to display in the dropdown options
                        />
                        
                      </StyleWrapper>


                    {/* </div> */}
                  </div>
                </div>

                <div className="row" style={{ marginTop: "40px" }}>
                  <div className="col-lg-12">
                    <label htmlFor="exampleFormControlSelect2">
                     Service Image
                    </label>
                    {/* <form method='post' className='card-box'> */}
                    <div className="row">
                    {images.map((image,index)=>(
                          
                          <UploadImage 
                            id={index} 
                            images={images} 
                            setImages={setImages} 
                            previewImage={image} 
                            formData={service} 
                            setFormData={setService} 
                            imagepreview={imagepreview} 
                            setImagePreview={setImagePreview}
                            action={action}/>
                       
                        ))}
                        {(images.length<=5&&(images[images.length-1]?.path!="services/Default.png"))?(
                        <button
                          className="btn btn-gradient-success waves-effect waves-light"
                          height="150px"
                          onClick={(e)=>{
                            e.preventDefault();
                            if (images.length<=4)
                              {setImages([...images,{path:'services/Default.png'}])}
                            }}>+</button>
                        ):null}
                        </div>
                   
                  </div>
                </div>

                <div className="row" style={{ marginTop: "40px" }}>
                  <div className="col-lg-12">
                    {isSuccess ? (
                      <div className="alert alert-success" role="alert">
                        File successfully uploaded.
                      </div>
                    ) : null}
                    {!isSuccess ? (
                      <>
                        <button
                          type="submit"
                          className="btn btn-gradient-success waves-effect waves-light"
                        >
                          {isSubmitting ? "Please wait..." : "Save"}
                        </button>
                        <button
                          type='button'
                          className='btn btn-gradient-info waves-effect waves-light'
                          onClick={() => navigate(-1)}
                          style={{ marginLeft: "10px" }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => navigate(-1)}

                        type="button"
                        className="btn btn-gradient-info waves-effect waves-light"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManageServices;
