import React,{useState,useContext} from 'react'
import {SyncLoader} from 'react-spinners'
import { UserContext } from '../App'

const Login = () => {
    const {dispatch} = useContext(UserContext)
    const [loding, setloding] = useState(false)
    const [msg, setmsg] = useState('')
    const [Data, setData] = useState({
        email:"",password:''
    })
let name,value;
const getValue=(e)=>{
    e.preventDefault()
    name=e.target.name;
    value=e.target.value
    setData({...Data,[name]:value})
}
const getLogin=async(e)=>{
    e.preventDefault()
    setloding(true)
    const {email,password}=Data
    try{
        const res=await fetch('https://tranquil-citadel-86665.herokuapp.com/log',{
            method:"POSt",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const data=await res.json();
        // console.log(data)
        setTimeout(()=>{
            setloding(false)
        },1000)
        if(data.status==='422'||data.status==='406'){
            setmsg(data.error)
        }else{
            dispatch({type:"USER" ,payload:{states:true,name:`${data.user}`}})
            setmsg('')
            setData({email:"",password:''})
        }


    }catch(err){

    }
  
}
    return (
        <>
          <div className="container-fluid">
            <form method=''>
            <div className="form-floating ">
        <input type="email" onChange={getValue} className={msg===''?"form-control":"form-control border-danger"} name="email" value={Data?.email}  id="floatingInput" placeholder="Email"/>
        <label for="floatingInput">Email address</label>
        </div>
         <label for="floatingInput" className='text-danger mb-4'>{msg}</label>
        <div className="form-floating">
        <input type="password" onChange={getValue} className={msg===''?"form-control":"form-control border-danger"} name="password" value={Data?.password} id="floatingPassword" placeholder="Password"/>
        <label for="floatingPassword">Password</label>
        </div>
         <label for="floatingInput" className='text-danger'>{msg}</label>
        <button onClick={getLogin} className="btn btn-outline-dark w-100 mt-4" type='submit'>Login</button>
            </form>
        </div>
        <div className={loding===true?"spinner-div":"d-none"}>
                      <SyncLoader/> 
                    </div>
            
        </>
    )
}

export default Login
