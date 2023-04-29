import React, { useState } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut } from "firebase/auth";
import { app, database, storage } from '../../firebaseConfig.js'
import { useEffect } from "react";
import { setDoc ,collection, addDoc, getDocs,getDoc, doc, updateDoc, deleteDoc ,onSnapshot,query,where} from "firebase/firestore";
import { getPublicInfo } from "../../function/public.js";
import { useStateContext } from "../../context/ind";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { motion } from "framer-motion";
function AdminDash({display,setdisplay}){
    const [data,setdata]=useState([]);
    const [uuid,setuuid]=useState('');
    const navigate=useNavigate();
    const [displayPrivate,setdisplayPrivate]=useState({});
      const { addPatient,getAllPatients,contract,getPatient,getPublicInfo } = useStateContext();
    var messageref = collection(database, `/users`);
    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }
    const imagefunc = async (uid)=>{
     
      const obj=await getPublicInfo(uid);
     if(obj?.profile){
      return obj.profile;
     }
     else{
      return '';
     }
      // console.log(obj);
      // setdisplay(obj);

      
  } 
   
      const handleFindPublicInfo = async (uid)=>{
     
        const obj=await getPublicInfo(uid);
        if(obj===''){
            alert('invalid key')
        }
        // console.log(obj);
        setdisplay(obj);

        
    } 
    async function funn (){
     
      const q = query(messageref);
      onSnapshot(q,(data,index) => {
        let temp = [];
        let ids = [];
       
        data.docs.map(async(item) => {
          
          temp.push({ ...item.data() });
          
          // console.log(item.data(),'chibedsgbrdsjkgb');
         
          
          //   console.log(dataId)
        });
        setdata([...temp]);
       
        
      });
      const tempurl=await Promise.all(data.map(async(item,i)=>{
        console.log(item.uid);
        var a=await imagefunc(item.uid);
        var temp=data;
        temp[i].profile=a;
        setdata(temp);
        console.log([...a]);
        return a;
        // console.log(temp[i],a);

      }))
      console.log(tempurl,'sadgvarg');
     

    }
    
      
   console.log(data);
    useEffect(
        () => {
           funn();
        },
       []
        
      );
      const handleOnSelect = async(item) => {
        // the item selected
        setuuid(item.uid);
        await handleFindPublicInfo(item.uid);
        navigate('userInfo')
        
        
       
       
      }
      const handleOnFocus = () => {
       
      }
      const formatResult = (item) => {
        return (
          <div style={{height:'60px',}} class='d-flex'>
            <img style={{height:'40px',width:'40px'}} src={`${item?.profile?item.profile:'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'}`} alt="" />
            {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
            <span style={{   }}> {item?.name}</span>
          </div>
        )
      }

      const handleFind = async (uid,code)=>{
     
        console.log(uid,'dsvsv')
        const obj=await getPatient(uid,code);
        if(obj===''){
            alert('invalid key')
        }
        console.log(obj);
        setdisplayPrivate(obj)
        // setdisplay(obj);
    }



      

    return (
    <motion.div >
       <motion.div    >
       <ReactSearchAutocomplete
            items={data}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            fuseOptions={{ keys: ["name"] }}
            onFocus={handleOnFocus}
            id='hemlu'
            
          />

       </motion.div>

       
         
         
         

    </motion.div>);
}

export default AdminDash;