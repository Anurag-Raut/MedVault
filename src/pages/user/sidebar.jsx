import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faBook, faDeleteLeft, faPen, faSearch, faTrash, faUmbrella, faUser } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ind";
import { useAuth0 } from "@auth0/auth0-react";

function Sidebar(){
    const navigate=useNavigate();
    const [show,setshow]=useState(0);
    const { loginWithRedirect, isAuthenticated, user,logout } = useAuth0();
    const { connect, address } = useStateContext();
    console.log(user);
    return (

        <motion.div  onHoverEnd={()=>{setshow(0);}} onHoverStart={()=>{setshow(1)}} whileHover={{width:'17%'}} style={{height:'100vh' ,width:'4vw',backgroundColor:'#0ad0b2',flexDirection:'column',display:'flex',justifyContent:"space-between"}}>
                <div class="profile d-flex" style={{height:'50px'}}>
                    {
                        show?
                        <motion.div class='d-flex' >
                            
                            <FontAwesomeIcon  icon={faUser} style={{marginTop:'15px'}} />
                            <motion.h1 onClick={logout} animate={{x:0}} initial={{x:'-100px'}} transition={{duration:0.3}} exit={{x:'-100px'}} >{user.name}</motion.h1>
                        </motion.div>
                        
                        
                        :<FontAwesomeIcon style={{marginTop:'10px',marginBottom:'10px'}} icon={faUser} />
                       
                    }
               
                </div>
                {/* <div style={{height:'30px',width:'30px',backgroundColor:'white',marginTop:'20px'}}>
                    <Link class="nav-link" to="addmember">add Member</Link>
                    </div> */}
                <div class="conten" style={{display:'flex',flexDirection:'column' }}>
                {
                    <div class='d-flex' style={{height:'50px',marginLeft:'1vw'}} onClick={()=>navigate('')} >
                           <div><FontAwesomeIcon   icon={faPen} /></div>
                           {
                            show?
                            <motion.h4 style={{marginLeft:'1vh'}} animate={{x:0}} initial={{x:'-100px'}} transition={{duration:0.3}} exit={{x:'-100px'}}>write</motion.h4>
                             :null
                           }
                    </div>
                        
                     

                       
                    }
                     {
                         <div class='d-flex' style={{height:'50px',marginLeft:'1vw'}} onClick={()=>navigate('read')} >
                         <div><FontAwesomeIcon   icon={faSearch} /></div>
                         {
                          show?
                          <motion.h4 style={{marginLeft:'1vh'}} animate={{x:0}} initial={{x:'-100px'}} transition={{duration:0.3}} exit={{x:'-100px'}}>read</motion.h4>
                           :null
                         }
                  </div>
                    }
                    {
                        <div class='d-flex' style={{height:'50px',marginLeft:'1vw'}} onClick={()=>navigate('addmember')} >
                        <div><FontAwesomeIcon   icon={faAdd} /></div>
                        {
                         show?
                         <motion.h4 style={{marginLeft:'1vh'}} animate={{x:0}} initial={{x:'-100px'}} transition={{duration:0.3}} exit={{x:'-100px'}}>Add Member</motion.h4>
                          :null
                        }
                 </div>
                    }
                     {
                        <div class='d-flex' style={{height:'50px',marginLeft:'1vw'}} onClick={()=>navigate('delete')}>
                        <div><FontAwesomeIcon   icon={faTrash} /></div>
                        {
                         show?
                         <motion.h4 style={{marginLeft:'1vh'}} animate={{x:0}} initial={{x:'-100px'}} transition={{duration:0.3}} exit={{x:'-100px'}}>Delete</motion.h4>
                          :null
                        }
                 </div>
                    }
                    

                </div>
                <div class="sign-out">
                <button onClick={connect}> connect</button>
                </div>

        </motion.div>
    );

}
export default Sidebar;