import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import CardItem from '../../../components/cards/Card'
import Footer from '../../../components/Footer'
import { AWS_BUCKET,AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import Multiselect from 'multiselect-react-dropdown';
export default function Marketplace() {
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [listOriginal, setListOriginal] = useState([])
   const [toggleFilter, setToggleFilter] = useState(false)
  const priceRangeRef = useRef()
  const effectRun = useRef(false);
  const { auth } = useAuth();
  const [isLoading,setIsLoading]=useState(true)
  const [starFilter, setStarFilter]=useState([])
  const [filterlist,setFilterList] = useState([])
  const [searchString,setSearchString]=useState("")
  // const [starFilter1, setStarFilter1]=useState(true)
  // const [starFilter2, setStarFilter2]=useState(true)
  // const [starFilter3, setStarFilter3]=useState(true)
  // const [starFilter4, setStarFilter4]=useState(true)
  // const [starFilter5, setStarFilter5]=useState(true)
  
  const controller = new AbortController()

  async function getList() {
    if (searchString.length>=3||searchString!==""){
      await axiosPrivate
      .post(('patientSearchService'), {
        Email:auth.email,
        Search:searchString,
        signal: controller.signal,
      })
      .then((res) => {
        setIsLoading(false)
        setList(res.data.Data)
        setListOriginal(res.data.Data)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(err)
        setErrMsg(err.message)
      })
    }
    else{
      await axiosPrivate
        .get(('getAllServices'), {
          signal: controller.signal,
        })
        .then((res) => {
          setIsLoading(false)
          setList(res.data.Data)
          setListOriginal(res.data.Data)
        })
        .catch((err) => {
          setIsLoading(false)
          console.error(err)
          setErrMsg(err.message)
        })
    }
  }
  useEffect(() => {
    if (priceRangeRef.current) {
      window.$('#range_doctors_rate').ionRangeSlider({
        type: 'double',
        skin: 'modern',
        grid: true,
        min: 0,
        max: 1000,
        from: 20,
        to: 200,
      })
    }
    getList()
    return () => {
      controller.abort()
    }
  }, [])
  async function handleSubmit(event) {
    setIsLoading(true)
    event.preventDefault()
    
    getList()
  }

  return (
    <div className="figma mt-5">
      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-title-box">
                  <h4 className="page-title">Marketplace</h4>
                </div>
              </div>
            </div>

            <div className="row-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <h5 className="mt-0 mb-4">Filters</h5>
                       
                        
                        <div className="p-3">
                          <h6 className="mb-1 mt-0">Service Categories</h6>
                          <div className="checkbox checkbox-success ">
                           
                            <Multiselect
                              options={[
                                        "Allergy and immunology",
                                        "Anesthesiology",
                                        "Anticoagulation",
                                        "Blood (Hematology)",
                                        "Breast Care"]} // Options to display in the dropdown
                              selectedValues={filterlist} // Preselected value to persist in dropdown
                              onSelect={(selectedList,selectedItem)=>{setFilterList([...filterlist,value])}} // Function will trigger on select event
                              onRemove={(selectedList,selectedItem)=>{setFilterList(selectedList)}} // Function will trigger on remove event
                              isObject={false}
                              showCheckbox={true}
                              displayValue="name" // Property name to display in the dropdown options
                            />
                            
                          </div>
                          
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3">
                        <div className="p-3">
                          <h6 className="mb-3 mt-0">Price Range</h6>
                          <input
                            ref={priceRangeRef}
                            type="text"
                            id="range_doctors_ratex"
                            onChange={(e)=>{console.log(priceRangeRef)}}
                          />
                        </div>
                      </div>
                        <div className="row-lg-9">
                            <div className="p-3">
                              <h6 className="mt-0 mb-2">Ratings</h6>
                              <Multiselect
                              options={[
                                        {name:"5 Stars",id: 5},
                                        {name:"4 Stars",id: 4},
                                        {name:"3 Stars",id: 3},
                                        {name:"2 Stars",id: 2},
                                        {name:"1 Stars",id: 1}]} // Options to display in the dropdown
                              selectedValues={starFilter} // Preselected value to persist in dropdown
                              onSelect={(selectedList,selectedItem)=>{setStarFilter([...filterlist,value])}} // Function will trigger on select event
                              onRemove={(selectedList,selectedItem)=>{setStarFilter(selectedList)}} // Function will trigger on remove event
                              // isObject={false}
                              // showCheckbox={true}
                              displayValue="name" // Property name to display in the dropdown options
                            />
                              {/* {[5,4,3,2,1,0].map((val,index) => (
                                <div key={val} className="checkbox checkbox-success">
                                  <input 
                                    id={`checkboxa${val}`}
                                    type="checkbox" 
                                    defaultChecked={starFilter[index]===val}
                                    onChange={
                                      (e)=>{
                                        
                                          var newstarfilter=starFilter
                                          var checked=false
                                          if (newstarfilter[index]===val){
                                            
                                            newstarfilter[index]=false
                                          }
                                          else {
                                            newstarfilter[index]=parseInt(val)
                                            checked=true
                                          }
                                          setStarFilter(newstarfilter)
                                          setList(listOriginal
                                            .filter((item)=>{
                                                return(newstarfilter.includes(parseInt(item.average_ratings))
                                                  )
                                              }))
                                      }}
                                      />
                                  <label htmlFor={`checkboxa${val}`}>
                                    {val}
                                    {Array.apply(null, { length: val }).map(
                                      (e, i) => (
                                        <i key={i} className="mdi mdi-star text-warning"></i>
                                      )
                                    )}
                                  </label>
                                </div>
                              ))} */}
                

                            </div>
                        </div>
                    </div>
                  </div>
              </div>

              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6">
                    <form onSubmit={handleSubmit} >
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Service..."
                          aria-label="Search Service..."
                          onChange={(e)=>setSearchString(e.target.value)}
                        />
                        <span className="input-group-append">
                          <button className="btn btn-success" style={{zIndex:0}} type="button">
                            {(isLoading&&searchString>=3)?"Going...":'Go!'}
                          </button>
                        </span>
                      </div>
                    </div>
                    </form>
                  </div>
                </div>

                <div className="row">
                {(isLoading)?<CardItem>Loading...</CardItem>:
                (searchString.length>0 &&list.length===0)?<CardItem>No Results...</CardItem>:
                <>
                  {
                  list
                  .map((item, index) => (
                    <div key={index} className="col-lg-3" style={{minWidth:'200px'}}>
                      <div className="card e-co-product" >
                      {/* {AWS_BUCKET_SERVICES+ item.images} */}
                        <Link to="booking" state={{ ...item }}>
                          <img
                            src={(AWS_BUCKET_SERVICES+ item.images)}
                            alt=""
                            style={{width:'200px', height:'200px',objectFit: 'cover'}}
                            className="img-fluid"
                          />
                        </Link>
                        <div className="card-body product-info">
                          <Link
                            to="booking"
                            className="product-title"
                            state={{ ...item }}
                          >
                            {item.service_description}
                          </Link>
                          <p>
                            {item.provider_name}<br/> 
                            <div className='text-muted'>Provider</div>
                            </p>
                          <div className="d-flex justify-content-between my-2 row">
                            <p className="product-price">${item.cost_price}</p>
                            <div className="mb-0 row product-review align-self-center">
                              <div className='col-md-10 m-3'>
                              {(item.average_ratings===0)?<>Unrated</>:
                              <Rating
                                fillColor="#ffb822"
                                emptyColor="white"
                                SVGstrokeColor="#f1a545"
                                SVGstorkeWidth={1}
                                size={17}
                                allowFraction={true}
                                initialValue={item.average_ratings}
                                readonly={true} 
                              />}
                               {/* ({item.average_ratings}) */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}</>}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  )
}

const Filter = () => {}
