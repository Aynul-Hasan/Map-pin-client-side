import React,{useState} from 'react'
import {useHistory } from 'react-router-dom'
import {SyncLoader} from 'react-spinners'

const Pin = (props) => {
    const history= useHistory();
    const [message, setmessage] = useState('')
    const [load, setload] = useState(false)
    const [pinData, setPinData] = useState({name:'',title:"",desc:'',rating:''})
    let name, value;
    const getData=(e)=>{
        e.preventDefault()
        name=e.target.name;
        value=e.target.value
        setPinData({...pinData,[name]:value})
    }
    const postData=async(e)=>{
        e.preventDefault()
        setload(true)
        const {name,title,desc,rating}=pinData
        const {lat,long,setisGet}=props
        try{
            const data= await fetch('https://tranquil-citadel-86665.herokuapp.com/pin',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name,title,desc,rating,lat,long
                 })
            })
            const res= await data.json()
            setTimeout(()=>{        
                setload(false)
            },1000)
           
            // console.log(res.status)
            if(res.status===422){
                setmessage(`${res.error}`)
            }else{
                setisGet(true)
                setmessage(``)
                setPinData({}) 
                history.push("/")   
                   
            }

        }catch(err){

        }

    }
    
    return (
        <>
          <div className="my-1">
            <h6 className='text-center mx-auto'>Create pin</h6>
          <form method="post">
                <input type="text" onChange={getData}  className={message===''?'form-control ':"form-control border-danger"} placeholder="Userame" name="name" />
                    <label className=" text-danger" for="inlineRadio1">{message}</label>
                <input type="text" onChange={getData}  className={message===''?'form-control my-2 ':"form-control border-danger"} placeholder="Title" name='title' />
                    <label className="text-danger" for="inlineRadio1">{message}</label>
                <input type="text" onChange={getData}  className={message===''?'form-control ':"form-control border-danger"} placeholder='Description' name="desc" />
                    <label className="text-danger" for="inlineRadio1">{message}</label> <br />              
                <label className={message===''?"form-check-label ":"form-check-label text-danger"} for="inlineRadio1">Rating</label><br />
                <div className="form-check form-check-inline me-2">
                <input onChange={getData}  className="form-check-input" type="radio" name="rating" id="inlineRadio1" value="1"/>
                <label className="form-check-label" for="inlineRadio1">1</label>
                </div>

                <div  className="form-check form-check-inline me-2">
                <input onChange={getData}  className="form-check-input" type="radio" name="rating" id="inlineRadio2" value="2"/>
                <label className="form-check-label" for="inlineRadio2">2</label>
                </div>
                   
                <div className="form-check form-check-inline me-2">
                <input onChange={getData}  className="form-check-input" type="radio" name="rating" id="inlineRadio1" value="3"/>
                <label className="form-check-label" for="inlineRadio1">3</label>
                </div>
                    
                <div className="form-check form-check-inline me-2">
                <input onChange={getData}  className="form-check-input" type="radio" name="rating" id="inlineRadio2" value="4"/>
                <label className="form-check-label" for="inlineRadio2">4</label>
                </div>
                 
                <div className="form-check form-check-inline me-2">
                <input  onChange={getData} className="form-check-input" type="radio" name="rating" id="inlineRadio1" value="5"/>
                <label className="form-check-label" for="inlineRadio1">5</label>
                </div>
                <label className=" text-danger" for="inlineRadio1">{message}</label>       
                <br />

                <button type='submit' onClick={postData} className="btn btn-outline-dark mt-3 w-100">Save</button>
                {/* <ToastContainer /> */}
            </form>
           
          <div className={load=== true?'over':'d-none'}>
          <SyncLoader/>
          </div>
          </div>
            
        </>
    )
}

export default Pin
