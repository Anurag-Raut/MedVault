import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ind";
// import useAuth0 from "@auth0/auth0-react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut } from "firebase/auth";
import { app, database, storage } from '../../firebaseConfig.js';
import { useAuth0 } from "@auth0/auth0-react";

import { setDoc ,collection, addDoc, getDocs,getDoc, doc, updateDoc, deleteDoc ,onSnapshot,query,where} from "firebase/firestore";
async function getdoc(docRef) {
    const docSnap = await getDoc(docRef);
    return docSnap;
  }
function Delete({member,muid,update,setupdate,setisread}){
    
    const {connect,address}=useStateContext();
    const [uid,setuuid]=useState('');
    const { loginWithRedirect ,isAuthenticated,user} = useAuth0();
  
    const { addPatient,getAllPatients,contract,getPatient,deletePatient } = useStateContext();
    const [code,setcode]=useState('');
    useEffect(()=>{
        if(member){
         
         
 }
 else{
     const docRf = doc(database, "users", `${user?.sub?.substring(14)}`);
     getdoc(docRf).then((df)=>{
     //   console.log(df.data());
     var id=df?.data()?.uid?df?.data()?.uid:null;
       setuuid(df?.data()?.uid);
        //  if(id){
        //  handleFindPublicInfo(id);}
 
     })
     
 }
 
       },[])
       useEffect(()=>{
         if(member===1){
             setuuid(muid);
            //  handleFindPublicInfo(muid);
         }
 
       },[muid])

    async function handleDelete(){
        console.log(uid,code)
        const a=await deletePatient(uid,code);
        // console.log(a);
       
        if(a===1){
            await deleteDoc(doc(database, "users", `${user?.sub?.substring(14)}`));
            setupdate(!update);
            setisread(1);
            alert('Patient Deleted')
        }
        else{
            alert('Patient Not found')
        }
    }
    return (
        <div>
           
           <div>
        <h2 class="label">Code </h2>
        <TextField
          inputProps={{
            style: {
              height: "30px",
              width: "35vw",
              fontSize: "20px",
            },
          }}
          id="code-box"
          label="Code"
          variant="standard"
          onChange={(e)=>{setcode(e.target.value)}}
         
         
         
        />
      </div>


  
        
        <button  class="btn btn-primary" type="submit" style={{marginTop:'30px'}} onClick={()=>{handleDelete()}} >Submit code</button>

        </div>
       


    );

}
export default Delete;