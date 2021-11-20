import React,{useState,useContext} from 'react'
import Signup from './Signup'
import Login from './Login'
import { UserContext } from '../App'


const Modal = () => {
    const {state,dispatch} = useContext(UserContext)
    const [Click, setClick] = useState({tag:false,value:`Signup`,title:'Login'})
    // console.log(state)
    if(state.states){
        window.document.body?.classList.remove('modal-open')
        window.document.body.children[6]?.classList.remove('modal-backdrop')
        document.getElementById('exampleModal')?.classList.remove('show')
        
        // console.log(document?.getElementsByClassName('overlays'))
    }else{
        // window.document.body.children[6]?.classList.add('modal-backdrop')
    }
    const Render=()=>{
        if(state.states){
            return(
                <button onClick={getLogout} className='btn-outline-dark btn'>Logout</button>
            )
        }else{
            return(
                (<button type="button" className="btn btn-outline-dark " data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Login
                    </button>)
            )
        }
    }
    const getLogout=()=>{
        fetch('https://tranquil-citadel-86665.herokuapp.com/logout',{
            method:"GET",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include'
           }).then((res)=>{
            dispatch({type:"USER",payload:{states:false,user:''}})
           })
    }
    return (
        <>
                  <Render/>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className={state.states?'d-none':"modal-content"}>
                        <div className="modal-header text-center  bg-dark">
                            <h5 className="modal-title  text-white" id="exampleModalLabel">{Click.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body modal-bg">
                         {Click.tag===true?<Signup/>:<Login/>}
                        </div>
                       <div className="modal-footer bg-dark">
                          <button className='btn btn-dark' onClick={()=>{
                              Click.tag===false?setClick({tag:true,value:'login',title:'Signup'}):setClick({tag:false,value:`signup`,title:'Login'})
                          }}>{Click.value}</button>
                        </div>
                        </div>
                    </div>
                    </div>
                                
        </>
    )
}

export default Modal
