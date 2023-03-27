import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import CardItem, { CardLongItem } from '../../../components/cards/Card'
import Footer from '../../../components/Footer'
import { AWS_BUCKET,AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import Multiselect from 'multiselect-react-dropdown';
import { Card } from 'react-bootstrap'

import styled from "@emotion/styled"
import RingLoading from '../../../components/lottie/RingLoading'



export const StyleWrapper = styled.div`
.optionListContainer {
  position: sticky;
} 

`
export default function Marketplace() {
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [listOriginal, setListOriginal] = useState([])
   const [toggleFilter, setToggleFilter] = useState(false)
  const priceRangeRef = useRef()
  const effectRun = useRef(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(true)
  const [starFilter, setStarFilter]=useState([5,4,3,2,1,0])
  const [filterlist,setFilterList] = useState([])
  const [priceRangeMin,setPriceRangeMin]=useState(0)
  const [priceRangeMax,setPriceRangeMax]=useState(2000)
  const [showFilterWindow,setShowFilterWindow]=useState(false)
  const [searchString,setSearchString]=useState("")
  const [categoryOptions,setCategoryOptions]=useState([])
  const [activeFilter,setActiveFilter]=useState('')
  const [dropPosition,setDropPosition]=useState({x:0,y:0})
  // const [starFilter1, setStarFilter1]=useState(true)
  // const [starFilter2, setStarFilter2]=useState(true)
  // const [starFilter3, setStarFilter3]=useState(true)
  // const [starFilter4, setStarFilter4]=useState(true)
  // const [starFilter5, setStarFilter5]=useState(true)
  
  const controller = new AbortController()
  function formatLongtxt(string="",limit=50){

    if (string?.length>limit){
      return string.substring(0,limit)+"..."}
    return string
  }
  async function getList() {
    if (searchString.length>=3||searchString!==""){
      await axiosPrivate
      .post(('patientSearchService'), {
        Email:auth.email,
        Search:searchString,
      },
        {signal: controller.signal})
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
          
          const serviceList=res.data.Data
          setList(serviceList)
          setListOriginal(serviceList)
          const serviceCategories=serviceList.map((item,index)=>{return item.category})
          setCategoryOptions(serviceCategories)
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
                      <div className="col-lg-12">
                        <h5 className="mt-1 ">Filters</h5>
                        
                        <ul className='nav nav-pills' id='pills-tab' role='tablist'>
                          <li className='nav-item col-xl-5 mt-2 mb-0' >
                            <div className="row-xl-12">
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
                                        <button className="btn btn-success" style={{zIndex:0}} type="submit">
                                          {(isLoading&&searchString>=3)?"Going...":'Go!'}
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                  </form>
                              </div>
                          </li>
                            <li className='nav-item m-2 mt-0 '>
                              <a
                                className='nav-link'
                                id='service_category_tab'
                                data-toggle='pill'
                                href='#service_category'
                                onClick={(e)=>{
                                  // setShowFilterWindow(!showFilterWindow)
                                  
                                  setActiveFilter("service_category")
                                  if (activeFilter==='service_category'){
                                    setShowFilterWindow(!showFilterWindow)}
                                  else if (activeFilter!=='service_category'){
                                    setShowFilterWindow(true)
                                  }
                                  // else {
                                  //   setShowFilterWindow(false)
                                    
                                  // }
                                }}
                              >
                                Service Category
                              </a>
                            <div className='tab-content detail-list position-absolute' id='pills-tabContent'>
                              <div className='tab-pane position-absolute' style={{zIndex:4 }}  id='service_category'>
                                {showFilterWindow&&activeFilter==='service_category'?
                                <CardItem> 
                      
                                  <div className="p-3" style={{width:400}}>
                                    <h6 className=" mt-0" >Service Categories</h6>
                                    <StyleWrapper>
                                      <Multiselect
                                        style={{zIndex:3}}
                                        options={categoryOptions} // Options to display in the dropdown
                                        selectedValues={filterlist} // Preselected value to persist in dropdown
                                        onSelect={
                                          (selectedList,selectedItem)=>{
                                              setFilterList(selectedList)
                                              if (selectedList.length>0)
                                                {setList(listOriginal
                                                  .filter((item)=>{
                                                      return(selectedList.includes((item.category))
                                                        )
                                                    }))}
                                              else{
                                                setList(listOriginal)
                                              }
                                            }} // Function will trigger on select event
                                        onRemove={
                                          (selectedList,selectedItem)=>{
                                              console.log("selectedList",selectedList)
                                              setFilterList(selectedList)
                                              if (selectedList.length>0)
                                                {setList(listOriginal
                                                  .filter((item)=>{
                                                      return(selectedList.includes((item.category))
                                                        )
                                                    }))}
                                              else{
                                                setList(listOriginal)
                                              }
                                            }} // Function will trigger on remove event
                                        isObject={false}
                                        showCheckbox={true}
                                        
                                        displayValue="name" // Property name to display in the dropdown options
                                      />
                                      
                                    </StyleWrapper>
                                  </div>
                                
                          </CardItem>:<></>
                        }
                        </div>
                        </div>
                            </li>
                            <li className='nav-item m-2'>
                              <a
                                className='nav-link'
                                id='price_range_tab'
                                data-toggle='pill'
                                href='#price_range'
                                onClick={(e)=>{
                                  // setShowFilterWindow(!showFilterWindow)
                                  setActiveFilter("price_range")
                                  if (activeFilter==='price_range'){
                                  setShowFilterWindow(!showFilterWindow)}
                                  else if (activeFilter!=='price_range'){
                                    setShowFilterWindow(true)
                                  }
                                  // else {
                                  //   setShowFilterWindow(false)
                                    
                                  // }
                                }}
                              >
                                Price Range
                              </a><div className='tab-content detail-list position-absolute' id='pills-tabContent'>
                              <div className='tab-pane position-absolute' style={{zIndex:3 }} id='price_range'>
                                {(showFilterWindow&&activeFilter==='price_range')?
                                <CardItem> 
                                    <div className="p-3">
                                      {/* <h6 className=" mt-0">Price Range</h6> */}
                                      <div className='m-1'> 
                                      <h6 className=" mb-0">Minimum</h6>
                                      <input
                                        ref={priceRangeRef}
                                        type="number"
                                        step={10}
                                        value={priceRangeMin}
                                        // id="range_doctors_rate"
                                        onChange={(e)=>{
                                          console.log('price',e.target.value)
                                          setPriceRangeMin(e.target.value)
                                          if ((priceRangeMax-e.target.value)>=0)
                                            {setList(listOriginal
                                              .filter((item)=>{
                                                const price=parseFloat(item.cost_price)
                                                  return( 

                                                    e.target.value<=price&&priceRangeMax>=price
                                                    )
                                                }))
                                              }

                                        }}
                                      />
                                      </div>
                                      <div className='m-1'> 
                                      <h6 className=" mb-0">Maximum</h6>
                                      
                                      <input
                                        ref={priceRangeRef}
                                        type="number"
                                        step={10}
                                        // id="range_doctors_rate"
                                        value={priceRangeMax}
                                        onChange={(e)=>{
                                          console.log('price',e.target.value)
                                          setPriceRangeMax(e.target.value)
                                          if ((e.target.value-priceRangeMin)>=0)
                                            {setList(listOriginal
                                              .filter((item)=>{
                                                
                                                  const price=parseFloat(item.cost_price)
                                                  return( 
                                                    (priceRangeMin<=price)&&(e.target.value>=price)
                                                    )
                                                }))
                                            }
                                        }}
                                      />
                                      </div>
                                    </div>
                                          
                                  </CardItem> :<></>}
                                </div></div>
                            </li>
                            <li className='nav-item m-2'>
                              <a
                                className='nav-link'
                                id='payment_history_detail_tab'
                                data-toggle='pill'
                                href='#ratings'
                                onClick={(e)=>{
                                  // setShowFilterWindow(!showFilterWindow)
                                  setActiveFilter("ratings")
                                  if (activeFilter==='ratings'){
                                  setShowFilterWindow(!showFilterWindow)}
                                  else if (activeFilter!=='ratings'){
                                    setShowFilterWindow(true)
                                  }
                                  // else {
                                  //   setShowFilterWindow(false)
                                    
                                  // }
                                }}
                              >
                                Ratings
                              </a>
                              <div className='tab-content detail-list position-absolute' id='pills-tabContent'>
                              <div className='tab-pane position-absolute ' style={{zIndex:3}} id='ratings'>
                              {(showFilterWindow&&activeFilter==='ratings')?
                              <CardItem>
                                <div className="p-3">
                                  <h6 className="mt-0 ">Ratings</h6>
                                  
                                
                                {[5,4,3,2,1,0].map((val,index) => (
                                    <div key={val} className="checkbox checkbox-success" style={{width:140}}>
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
                                        {(val===0)?'Unrated':val}
                                        {Array.apply(null, { length: val }).map(
                                          (e, i) => (
                                            <i key={i} className="mdi mdi-star text-warning"></i>
                                          )
                                        )}
                                      </label>
                    </div>
                      ))}
                     
        

                    </div>
                </CardItem>:<></>}
                </div></div>
                            </li>
                            
                          
                          </ul>
                  
                    </div>
                    
                  </div>
              </div>
              
              <div className="col-lg-12">
                
                <div className="row">
                {(isLoading)?<CardLongItem><div className='d-flex justify-content-center'><RingLoading size={200}/></div></CardLongItem>:
                (searchString.length>0 &&list.length===0)?<CardItem>No Results.</CardItem>:
                <>
                  {
                  list.map((item, index) => (
                    <div key={index} className="col-xl-3" style={{minWidth:'200px'}}>
                      <div className="card e-co-product" style={{minHeight:'700px'}} >
                      {/* {AWS_BUCKET_SERVICES+ item.images} */}
                        <Link to={"booking/"+item.service_id} state={{ ...item }}>
                          <img
                            src={(AWS_BUCKET_SERVICES+ item.images)}
                            alt=""
                            // style={{width:'200px', height:'200px',objectFit: 'cover'}}
                            style={{ 
                              // width: 'unset', 
                               maxWidth:'200px',minHeight:'200px',
                               width:'100%', height:'100%',objectFit: 'cover'}}
                            className="img-fluid"
                          />
                        </Link>
                        <div className="card-body product-info">
                          <Link
                            to={"booking/"+item.service_id}
                            className="product-title"
                            state={{ ...item }}
                          >
                            <div className='text-title' style={{marginBottom:0}}><h4>{item.service_name}</h4>
                            </div>
                          </Link>
                          <br/>
                          <div className='row-lg-3'>
                          <b>Description : </b><br/>{formatLongtxt(item.service_description,160)}<br/>
                          <b>Category :</b><br/> {item.category}<br/>
                          </div>
                          <br/> 
                          <h4 className='met-user-name'>{item.provider_name}</h4><br/> 
                          <div className='text-muted' style={{marginTop:-20}}>Provider</div>
                          
                          <div className="d-flex justify-content-between my-2 row">
                            <p className="product-price m-2">${item.cost_price}</p>
                            <div className="row product-review align-self-center">
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
                          <div className="d-flex align-items-end justify-content-between my-2 row">
                            <button 
                              onClick={()=>{navigate("/patient/marketplace/booking/"+item.service_id,{state:{ ...item}})}}
                              className='btn btn-success'>Book Appointment</button>
                            <button 
                              onClick={()=>{navigate("/patient/marketplace/provider/"+(item?.provider_id))}}
                              className='btn btn-outline-success'>View Profile</button>
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
