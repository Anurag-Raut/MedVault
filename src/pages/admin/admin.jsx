import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDash from "./dashboard-admin";
import UserInfo from "./userinfo";
import { useStateContext } from "../../context/ind";
import Sidebar from "./sidebar-admin";
function Admin(){
    const {connect}=useStateContext();
    const [display,setdisplay]=useState({});
    
    return(
        <div class='d-flex'>
            <Sidebar/>
            <div style={{width:'500px'}}>
            <Routes>
        
        <Route path='dashboard' element={<AdminDash display={display} setdisplay={setdisplay} />} />
        <Route path='userInfo' element={<UserInfo data={display}/>} />
        </Routes>

            </div>
            
        

        </div>
       
        
        
       
    
    
    
    )


}
export default Admin;