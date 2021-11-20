import React,{useState} from 'react'
import {SyncLoader} from 'react-spinners'

const Signup = () => {
  
    const [errorMsg, seterrorMsg] = useState('')
    const [loding, setloding] = useState(false)
    const [Data, setData] = useState({
        name:'',email:"",password:''
    })
let name,value;
const getValue=(e)=>{
    e.preventDefault()
    name=e.target.name;
    value=e.target.value
    setData({...Data,[name]:value})
}
const postSignupdata=async(e)=>{
    e.preventDefault()
    setloding(true)
    const {name,email,password}=Data
    console.log(name, email, password)
    try{
        const data= await fetch("https://tranquil-citadel-86665.herokuapp.com/sign",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name,email,password
            })
        })
        const res =await data.json()
        setTimeout(()=>{
            setloding(false)
        },1000)
        
        if(res?.status==='406'||res.status==='422'){
           seterrorMsg(res.error) 
        }else{
            seterrorMsg('')
            setData({name:"",email:'',password:''})
         
        }
        

    }catch(err){

    }
}
    return (
        <>
         <div className="container-fluid">
             <form method='post'>
             <div className="form-floating">
                    <input type="text"  value={Data?.name} className={errorMsg===''?"form-control ":"form-control border-danger"}  onChange={getValue} name="name" id="floatingInput" placeholder="Name"/>
                    <label for="floatingInput">Name</label>
                    </div>
                    <label className='text-danger' htmlFor="">{errorMsg}</label>
             <div className="form-floating">
                    <input type="email" value={Data?.email} className={errorMsg===''?"form-control ":"form-control border-danger"} onChange={getValue} name="email" id="floatingInput" placeholder="Email"/>
                    <label for="floatingInput">Email address</label>
                    </div>   
                    <label className='text-danger' htmlFor="">{errorMsg}</label>
                    <div className="form-floating">
                    <input type="password" value={Data?.password} className={errorMsg===''?"form-control ":"form-control border-danger"} onChange={getValue} name="password" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                    </div>
                    <label  className='text-danger' htmlFor="">{errorMsg}</label>
                <button onClick={postSignupdata} className="btn btn-outline-dark w-100 mt-4" type='submit'>Signup</button>   
             </form>
             <div className={loding===true?"spinner-div":"d-none"}>
                      <SyncLoader/> 
              </div>
         </div>
            
        </>
    )
}

export default Signup
