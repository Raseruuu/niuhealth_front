import moment, { min } from 'moment'
import moment_tz from 'moment-timezone'
// function hourformat(hour){
//     if (hour>12){
//       return (hour-12)+" PM"
//     }
//     else if (hour===12){
//       return (12)+" PM"
//     }
//     else if (hour===0){
//       return (12)+" AM"
//     }
//     else{
//       return hour+" AM"
//     }
//   }
function HMFormat(minutes) {
    let offsetoperator=""
    if (minutes>0){offsetoperator="+"}
    else if(minutes<0){offsetoperator="-";minutes=minutes*-1}
    var hours = Math.floor(minutes / 60);
    // Getting the minutes.
    var min = minutes % 60;
    let dig=""
    if (min<10){ dig="0"}
    return offsetoperator+hours+":"+dig+min
  }
function hourFormat(minutes) {
return HMFormat(minutes*-1)
} 

function TimeZoneSelect({setTimeZone,value, disabled=false,required=false}){
  
    var timezonecountries = moment.tz.countries()
    var timezoneoptions=[]
    for(var i in timezonecountries){
        let pushobject=moment.tz.zonesForCountry(timezonecountries[i], true)[0]
        timezoneoptions.push(pushobject)
    }
    let sorted_timezoneoptions=timezoneoptions.sort((a, b) => (moment(a.offset) > moment(b.offset)) ? 1 : -1)
    let tzOptions=[]
    for (var i in sorted_timezoneoptions){
        let alreadyinlist=false
        for (var j in sorted_timezoneoptions){
            if (sorted_timezoneoptions[i]===sorted_timezoneoptions[j]){
                alreadyinlist=true}
            // console.log(alreadyinlist)
        }
        if (!alreadyinlist){
            tzOptions.push(sorted_timezoneoptions[i])
        }
    }
    // console.log('timessszoneoptions',sorted_timezoneoptions)
    // console.log('timezoneoptions',tzOptions)
    
    // let sorted_timezoneoptions=timezoneoptions.sort(function(a, b) { 
    //   return a.offset - b.offset;
    // });
    
    
    return(
      <div className="row">
          
        <select 
          className="col-sm form-control" 
          disabled={disabled}
          required={required} 
          value={value}
          style={{marginLeft:"10px",marginRight:"20px",maxWidth:400}}
          onChange={(e)=>{setTimeZone(e.target.value)}}
          
          >
          <option>Select a Timezone</option>
          {sorted_timezoneoptions.map((timezone,index)=>(
            <option key={index} value={hourFormat(timezone.offset)}>UTC {hourFormat(timezone.offset)} {timezone.name}</option>
          ))}
          {/* <option value={"+00:00"}>(UTC+00:00) Coordinated Universal Time </option>
          <option value={"+01:00"}>(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna </option>
          <option value={"+01:00"}>(UTC+01:00) Brussels, Copenhagen, Madrid, Paris </option>
          <option value={"+01:00"}>(UTC+01:00) West Central Africa </option>
          <option value={"+01:00"}>(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague </option>
          <option value={"+01:00"}>(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb </option>
          <option value={"+01:00"}>(UTC+01:00) Windhoek </option>
          <option value={"+02:00"}>(UTC+02:00) Athens, Bucharest, Istanbul </option>
          <option value={"+02:00"}>(UTC+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius </option>
          <option value={"+02:00"}>(UTC+02:00) Cairo </option>
          <option value={"+02:00"}>(UTC+02:00) Damascus </option>
          <option value={"+02:00"}>(UTC+02:00) Cairo </option>
          <option value={"+02:00"}>(UTC+02:00) Amman</option>
          <option value={"+02:00"}>(UTC+02:00) Harare, Pretoria </option>
          <option value={"+02:00"}>(UTC+02:00) Jerusalem</option>
          <option value={"+02:00"}>(UTC+02:00) Beirut</option>
          <option value={"+03:00"}>(UTC+03:00) Baghdad</option>
          <option value={"+03:00"}>(UTC+03:00) Minsk </option>
          <option value={"+03:00"}>(UTC+03:00) Kuwait, Riyadh</option>
          <option value={"+03:00"}>(UTC+03:00) Nairobi</option>
          <option value={"+3:30"}>(UTC+03:30) Tehran</option>
          <option value={"+4:00"}>(UTC+04:00) Moscow, St. Petersburg, Volgograd</option>
          <option value={"+4:00"}>(UTC+04:00) Tbilisi</option>
          <option value={"+4:00"}>(UTC+04:00) Yerevan</option>
          <option value={"+4:00"}>(UTC+04:00) Abu Dhabi, Muscat</option>
          <option value={"+4:00"}>(UTC+04:00) Baku</option>
          <option value={"+4:00"}>(UTC+04:00) Port Louis</option>
          <option value={"+4:30"}>(UTC+04:30) Kabul</option>
          <option value={"+5:00"}>(UTC+05:00) Tashkent</option>
          <option value={"+5:00"}>(UTC+05:00) Islamabad, Karachi</option>
          <option value={"+5:30"}>(UTC+05:30) Sri Jayewardenepura Kotte </option>
          <option value={"+5:30"}>(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi </option>
          <option value={"+5:45"}>(UTC+05:45) Kathmandu </option>
          <option value={"+6:00"}>(UTC+06:00) Astana </option>
          <option value={"+6:00"}>(UTC+06:00) Dhaka </option>
          <option value={"+6:00"}>(UTC+06:00) Yekaterinburg </option>
          <option value={"+6:30"}>(UTC+06:30) Yangon </option>
          <option value={"+7:00"}>(UTC+07:00) Bangkok, Hanoi, Jakarta </option>
          <option value={"+7:00"}>(UTC+07:00) Novosibirsk </option>
          <option value={"+8:00"}>(UTC+08:00) Krasnoyarsk </option>
          <option value={"+8:00"}>(UTC+08:00) Ulaanbaatar </option>
          <option value={"+8:00"}>(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi </option>
          <option value={"+8:00"}>(UTC+08:00) Perth </option>
          <option value={"+8:00"}>(UTC+08:00) Kuala Lumpur, Singapore </option>
          <option value={"+8:00"}>(UTC+08:00) Taipei </option>
          <option value={"+9:00"}>(UTC+09:00) Irkutsk </option>
          <option value={"+9:00"}>(UTC+09:00) Seoul </option>
          <option value={"+9:00"}>(UTC+09:00) Osaka, Sapporo, Tokyo </option>
          <option value={"+9:30"}>(UTC+09:30) Darwin </option>
          <option value={"+9:30"}>(UTC+09:30) Adelaide </option>
          <option value={"+10:00"}>(UTC+10:00) Hobart </option>
          <option value={"+10:00"}>(UTC+10:00) Yakutsk </option>
          <option value={"+10:00"}>(UTC+10:00) Brisbane </option>
          <option value={"+10:00"}>(UTC+10:00) Guam, Port Moresby </option>
          <option value={"+10:00"}>(UTC+10:00) Canberra, Melbourne, Sydney </option>
          <option value={"+11:00"}>(UTC+11:00) Vladivostok </option>
          <option value={"+11:00"}>(UTC+11:00) Solomon Islands, New Caledonia </option>
          <option value={"+12:00"}>(UTC+12:00) Coordinated Universal Time+12 </option>
          <option value={"+12:00"}>(UTC+12:00) Fiji, Marshall Islands </option>
          <option value={"+12:00"}>(UTC+12:00) Magadan </option>
          <option value={"+12:00"}>(UTC+12:00) Auckland, Wellington(UTC+13:00) Nuku'alofa </option>
          <option value={"+13:00"}>(UTC+13:00) Nuku'alofa </option>
          <option value={"+13:00"}>(UTC+13:00) Samoa </option>
          <option value={"-12:00"}>(UTC-12:00) International Date Line West</option>
          <option value={"-11:00"}>(UTC-11:00) Coordinated Universal Time-11</option>
          <option value={"-10:00"}>(UTC-10:00) Hawaii</option>
          <option value={"-9:00"}>(UTC-09:00) Alaska</option>
          <option value={"-8:00"}>(UTC-08:00) Baja California</option>
          <option value={"-8:00"}>(UTC-08:00) Pacific Time (US and Canada)</option>
          <option value={"-8:00"}>(UTC-07:00) Chihuahua, La Paz, Mazatlan</option>
          <option value={"-8:00"}>(UTC-07:00) Arizona</option>
          <option value={"-7:00"}>(UTC-07:00) Mountain Time (US and Canada)</option>
          <option value={"-6:00"}>(UTC-06:00) Central America</option>
          <option value={"-6:00"}>(UTC-06:00) Central Time (US and Canada)</option>
          <option value={"-6:00"}>(UTC-06:00) Saskatchewan</option>
          <option value={"-6:00"}>(UTC-06:00) Guadalajara, Mexico City, Monterey</option>
          <option value={"-5:00"}>(UTC-05:00) Bogota, Lima, Quito</option>
          <option value={"-5:00"}>(UTC-05:00) Indiana (East) </option>
          <option value={"-5:00"}>(UTC-05:00) Eastern Time (US and Canada) </option>
          <option value={"-04:30"}>(UTC-04:30) Caracas </option>
          <option value={"-04:00"}>(UTC-04:00) Atlantic Time (Canada) </option>
          <option value={"-04:00"}>(UTC-04:00) Asuncion </option>
          <option value={"-04:00"}>(UTC-04:00) Georgetown, La Paz, Manaus, San Juan </option>
          <option value={"-04:00"}>(UTC-04:00) Cuiaba </option>
          <option value={"-04:00"}>(UTC-04:00) Santiago </option>
          <option value={"-03:30"}>(UTC-03:30) Newfoundland</option>
          <option value={"03:00"}>(UTC-03:00) Brasilia </option>
          <option value={"03:00"}>(UTC-03:00) Greenland </option>
          <option value={"03:00"}>(UTC-03:00) Cayenne, Fortaleza </option>
          <option value={"03:00"}>(UTC-03:00) Buenos Aires </option>
          <option value={"03:00"}>(UTC-03:00) Montevideo </option>
          <option value={"02:00"}>(UTC-02:00) Coordinated Universal Time-2 </option>
          <option value={"-01:00"}>(UTC-01:00) Cape Verde</option>
          <option value={"-01:00"}>(UTC-01:00) Azores </option>
          <option value={"+00:00"}>(UTC+00:00) Casablanca </option>
          <option value={"+00:00"}>(UTC+00:00) Monrovia, Reykjavik </option>
          <option value={"+00:00"}>(UTC+00:00) Dublin, Edinburgh, Lisbon, London </option> */}
          
        </select>
    </div>
    )
  }
export default TimeZoneSelect