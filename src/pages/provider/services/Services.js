import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import CardItem from '../../../components/cards/Card'
import { AWS_BUCKET, AWS_BUCKET_SERVICES } from '../../../constants'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import Multiselect from 'multiselect-react-dropdown';
import styled from "@emotion/styled"





export const StyleWrapper = styled.div`
.optionListContainer {
  position: sticky;
} 

`
function Services({ limit }) {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [errMsg, setErrMsg] = useState(null)
  const [list, setList] = useState([])
  const [search,setSearch]=useState('')
  const [showFilterWindow,setShowFilterWindow]=useState(false)
  
  const [starFilter, setStarFilter]=useState([5,4,3,2,1,0])
  const priceRangeRef = useRef()
  const [listOriginal, setListOriginal] = useState([])
  const [filterlist,setFilterList] = useState([])
  const [categoryOptions,setCategoryOptions]=useState([])
  const [priceRangeMin,setPriceRangeMin]=useState(0)
  const [priceRangeMax,setPriceRangeMax]=useState(2000)
  const [activeFilter,setActiveFilter]=useState('')
  const [searchString,setSearchString]=useState("")
  const [isLoading, setIsLoading] = useState(true)
  async function getList() {
    const controller = new AbortController()
    await axiosPrivate
      .post(
        ((search)?'providerSearchService':'getServices'),
        { 
          Email: auth.email || sessionStorage.getItem('email'),
          Search: search
        },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        console.log(res)
        const { Status, Data: data = [], Message } = res.data

        if (Status) {
          setIsLoading(false)
          const serviceList=res.data.Data
          setList(data.slice(0, limit))
          
          setListOriginal(serviceList)
          const serviceCategories=serviceList.map((item,index)=>{return item.category})
          console.log(serviceCategories)
          setCategoryOptions(serviceCategories )
        } else {
          throw new Error(Message)
        }
      })
      .catch((err) => {
        console.error(err)
        setErrMsg(err.message)
      })
  }

 
  
  async function handleSubmit(event) {
    event.preventDefault()

    if (search.length < 3) {
      return
    }

    getList()
  }
  useEffect(() => {
    
      getList()
    
    
  }, [])
 
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='page-title-box'>
            <div className='float-right'>
              <ol className='breadcrumb'>
                <Link to='manage/new'>
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
      <div className="card">
                  <div className="card-body">
                      <div className="col-lg-12">
                        <h5 className="mt-1 ">Filters</h5>
                        
                        <ul className='nav nav-pills m-2' id='pills-tab' role='tablist'>
                          <li className='nav-item col-xl-5 m-2' >
                          <div className='row'>
                            <div className='col-lg-10'>
                              <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                  <div className='input-group'>
                                    <input
                                      type='text'
                                      className='form-control'
                                      placeholder='Search Service...'
                                      aria-label='Search Service...'
                                      // value={search}
                                      onChange={(e)=>setSearch(e.target.value)}
                                    />
                                    <span className='input-group-append'>
                                      <button
                                        className='btn btn-success' 
                                        type='submit'>
                                        Go!
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                              </li>
                            <li className='nav-item m-2'>
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
                              </a><div className='tab-content detail-list position-absolute' id='pills-tabContent'>
                              <div className='tab-pane position-absolute' style={{ width: 420,zIndex:4 }}  id='service_category'>
                                {showFilterWindow&&activeFilter==='service_category'?
                                <CardItem> 
                      
                                  <div className="p-3">
                                    <h6 className=" mt-0" >Service Categories</h6>
                                    <div className="" >
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
      <div className='row'>
        

        <div className='col-lg-12'>
          

          <div className='row m-1'>
            {(isLoading)?<CardItem>Loading...</CardItem>:
            (searchString.length>0 &&list.length===0)?<CardItem>No Results.</CardItem>:
                <>
            {list.map((item, index) => (
              <div key={item?.recno || index} className='col-lg-3'>
                <div className='card e-co-product'>
                
                  <Link to=''>
                    <img
                      style={{width:'200px', height:'200px',objectFit: 'cover'}}
                      src={AWS_BUCKET_SERVICES+item?.images }
                      alt=''
                      className='img-fluid'
                    />
                  </Link>
                  <div className='card-body product-info'>
                  <Link to='' className='product-title'>
                    {/* <div className='col'> */}
                      
                     {item.service_name}<br/>
                    
                        
                      
                    {/* </div> */}
                    </Link>
                    <br/>
                    <div className='row-lg-3'>
                    <b>Description: </b><br/>{item.service_description}<br/>
                    <b>Category :</b><br/> {item.category}<br/>
                    </div>
                    <br/> 
                    <p>{item.description}</p>
                      <div className='d-flex justify-content-between my-2 row'>
                      <p className='product-price m-2'>${item.cost_price}</p>
                      <div className='mb-0 product-review align-self-center'>
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
                        </div>
                      </div>
                    </div>
                    <Link to={'manage/update/'+item.service_id} state={{ selectedService: item }}>
                      <button
                        type='button'
                        className='btn btn-gradient-success waves-effect waves-light'
                      >
                        Manage
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}</>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
