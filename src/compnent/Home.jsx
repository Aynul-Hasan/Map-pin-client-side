import React,{useState,useEffect, useContext} from 'react'
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import {FaMapPin,FaStar,FaMapMarkerAlt} from "react-icons/fa"
import {format} from "timeago.js"
import Pin from './Pin';
import Modal from './Modal'
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import { BsArrowRepeat } from "react-icons/bs";


const Home = () => {
    const [user, setUser] = useState('')
    const {state} = useContext(UserContext)
    const [pinsData, setpinsData] = useState([])
    const [click, setclick] = useState(null)
    const [newPin, setNewPin] = useState(null)
    const [onLocation, setonLocation] = useState(false)
    const [isGet, setisGet] = useState(false)
    const [viewport, setViewport] = useState({
        latitude: 23.777176,
        longitude: 90.4376,
        zoom: 5,
        s:false
      });   
  // console.log(user) 
  
  // watch visitor's location
  const watchLocation=()=> {
    // console.log(onLocation) 
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(curLocation, handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  
  const handleError=(error)=> {
    let errorStr;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorStr = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorStr = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorStr = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        errorStr = 'An unknown error occurred.';
        break;
      default:
        errorStr = 'An unknown error occurred.';
    }
    console.error('Error occurred: ' + errorStr);
  }
  const curLocation=(position)=>{
    setonLocation({latitude:position.coords.latitude, longitude:position.coords.longitude,zoom:16}) 
  }

  // open pop up 

  const openPopup=(id)=>{
    // console.log(id)
    setclick(id)

  }
  // create pin
  const createPin=(e)=>{
   if(state.states){
    const [long,lat]= e.lngLat
    setNewPin({
      latitude:lat,
      longitude:long,
      zoom:14
    })
   }else{
    toast.warn('You cannot create pin, unless login', {
      position: "top-center",
      autoClose: 7000,
      });   
   }
  }
  // get all pins to database
  const getPin=async()=>{
    try{
     
      const data = await fetch('https://tranquil-citadel-86665.herokuapp.com/pins',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }
      })
      // console.log(data)
      const res= await data.json()
      setpinsData(res)
      setUser(state.name)
      // console.log(res) 
    }catch(err){
      console.log(err.toString())
    }
 }
//  console.log(window)
  useEffect(() => {
   getPin()
  //  watchLocation()
  },[isGet])
    return (
        <>
        <div className="container-fluid p-0">
       
       <ReactMapGL
            {...viewport}
            width="100vw"
            height="100vh"
            transitionDuration="200"
            mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
            onViewportChange={nextViewport=> setViewport(nextViewport)}
            mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
            onDblClick={createPin}
         >
          <div className="modal-btn"> <Modal></Modal></div>
          {pinsData.map((pin)=>{ 
            return(
              <>
              <Marker latitude={pin.lat} longitude={pin.long}  offsetLeft={-20} offsetTop={-10}>
              <FaMapPin className={user===pin.name?"user-pin":"pin"} onClick={()=>openPopup(pin._id)}/>
           </Marker>
           {pin._id===click? ( <Popup
          latitude={pin.lat}
          longitude={pin.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() =>setclick(false)}
          anchor="left" >
          <div className='card border-0 popup-size'>
            <div className="card-body">
            
            <h6 className="card-subtitle mb-2 text-muted">Place:<span>{pin.title}</span></h6>
            <p>
            <FaStar className='color-fa'></FaStar>
            <FaStar className='color-fa'></FaStar>
            <FaStar className='color-fa'></FaStar>
            <FaStar className='color-fa'></FaStar>
            <FaStar className='color-fa'></FaStar>
            </p>
            <p>{pin.desc}</p>
            <h6 className="card-subtitle mb-2">Created by <span>{pin.name}</span></h6>
            <p className="text-muted">{format(pin.createdAt)}</p> 
            </div>
          </div>
        </Popup> ):''
         }
          </>
            )})}
        
        {newPin && state.states&&(<Popup
          latitude={newPin?.latitude}
          longitude={newPin?.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() =>setNewPin(false)}
          anchor="top" >
          <div className='card-size'>
           <Pin isGet={setisGet}  lat={newPin?.latitude} long={newPin?.longitude} />
          </div>
        </Popup>)}
        <ToastContainer/>
          {onLocation===false?'':( <Marker latitude={onLocation?.latitude} longitude={onLocation?.longitude} zoom={onLocation?.zoom} offsetLeft={-20} offsetTop={-10}>
            <button className="btn-location" data-bs-toggle="tooltip" data-bs-placement="top" title="You are here!!">
            <FaMapMarkerAlt/>
          </button>
          </Marker>)}
         </ReactMapGL>
         
         <button className='location-btn' onClick={watchLocation}> <FaMapMarkerAlt className='size'/></button>
         <button className="reload-btn" onClick={getPin}><BsArrowRepeat></BsArrowRepeat></button>
        </div>
        </>
    )
}
export default Home
