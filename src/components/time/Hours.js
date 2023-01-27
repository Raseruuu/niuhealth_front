
function hourformat(hour){
    if (hour>12){
      return ((hour-12<10)?"0":"")+(hour-12)+":00 PM"
    }
    else if (hour===12){
      return (12)+":00 PM"
    }
    else if (hour===0){
      return (12)+":00 AM"
    }
    else{
      return ((hour<10)?"0":"")+hour+":00 AM"
    }
  }

export default function ScheduleSelect({hours,setHours,weekday,disabled,oldHours}){
  // hours = 0
  let morning_options=[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7]
  let night_options=[20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,]
  
  return(
    <div className="column" style={{maxWidth:'250px', paddingLeft:"20px"}}>
      
      {/* <input type="checkbox" id="weekday" name="weekday" 
        value={weekday} onChange={
          ()=>setHours(
            {...hours,['Hours'+weekday+'Start']:null,['Hours'+weekday+'End']:null
            })}>      
      </input> */}
      <div className = "row">
        <div>Start Time </div>
        <div className = "col">
          <select
            disabled={disabled}
            value={hours['Hours'+weekday+'Start']}
            onChange={(e)=>{
            setHours({...hours,['Hours'+weekday+'Start']:e.target.value});
            console.log("hours = oldhours",hours===oldHours)
          }
          }
            className="col-sm form-control float-right" style={{ minWidth: '116px',marginLeft:"10px",marginRight:"10px",width:"30px"}}>   
            {morning_options.map((option, index)=>(
              <option key={index} value={option}>{hourformat(option)}</option>
              ))}
              
            <option value={null}>--:--</option>
          </select>
        </div>
      </div>
      <div className = "row">
        <div>End Time </div>
        <div className = "col">
          <select  
            disabled={disabled}
            value={hours['Hours'+weekday+'End']}
            onChange={(e)=>{
              setHours({...hours,['Hours'+weekday+'End']:e.target.value});
              console.log(hours)
            }
            }
            className="col-sm form-control float-right" style={{minWidth: '116px',marginLeft:"10px",marginRight:"10px",width:40}}>
            {night_options.map((option2,index)=>(
              <option key={index} value={option2}>{hourformat(option2)}</option>
              ))}
            <option value={null}>--:--</option>
          </select>
        </div>
      </div>
  </div>
  )
}