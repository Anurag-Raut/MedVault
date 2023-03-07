
import React, { useEffect } from "react";
import { useState } from "react";
// import { useStateContext } from './context';
import { useStateContext } from "../../context/ind";

// import { create } from 'ipfs-http-client'
// import { ImageUpload } from 'react-ipfs-uploader'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged, signOut } from "firebase/auth";
import { app, database, storage } from '../../firebaseConfig.js'
import { setDoc ,collection, addDoc, getDocs,getDoc, doc, updateDoc, deleteDoc ,onSnapshot,query,where} from "firebase/firestore";
import { Web3Storage } from 'web3.storage';
import { useAuth0 } from "@auth0/auth0-react";
import Bar from "./read/bar";
import Basicinfo from "./read/bacsicInfo";
import Contactinfo from "./read/contactindo";
import FamilyMedHistory from "./read/pasthistory";
import PastRecords from "./read/pastReports";

async function getdoc(docRef) {
    const docSnap = await getDoc(docRef);
    return docSnap;
  }
function ReadContent({member,muid}){
    console.log(muid);
    const [imageUrl, setImageUrl] = useState('')
    const {connect,address}=useStateContext();
    const [display,setdisplay] =useState({});
    const [privatedisplay,setprivatedisplay] =useState('');
    const [id,setid] =useState('');
    const [code,setCode]=useState('');
    const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2MmMzMzA3OTkxRmM0Nzg0NzNmMmMwMDFmNzBCMGFFQTE2ZjM0NzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzczNDIxNDI0NTAsIm5hbWUiOiJzdG9yZTIifQ.K2OCaGVt86PlyD7Tyq71NMCrxwuxK9xmflbYNe0_cIo' })
    const { loginWithRedirect ,isAuthenticated,user} = useAuth0();
    const { addPatient,getAllPatients,contract,getPatient,getPublicInfo } = useStateContext();
    const [parray,setparray]=useState([]);
    const [uid,setuuid]=useState('');
    const [activeStep,setActiveStep]=useState(0);
    useEffect(()=>{
       if(member){
        
        
}
else{
    const docRf = doc(database, "users", `${user?.sub?.substring(14)}`);
    getdoc(docRf).then((df)=>{
    //   console.log(df.data());
    var id=df?.data()?.uid?df?.data()?.uid:null;
      setuuid(df?.data()?.uid);
        if(id){
        handleFindPublicInfo(id);}

    })
    
}

      },[])
      useEffect(()=>{
        if(member===1){
            setuuid(muid);
            handleFindPublicInfo(muid);
        }

      },[muid])
    const handleFind = async (e)=>{
        e?.preventDefault();
        console.log(uid,'dsvsv',code)
        
        const obj=await getPatient(uid,code);
        if(obj===''){
            alert('invalid key')
        }
        
        setprivatedisplay(obj);
    }

    const handleFindPublicInfo = async (uid)=>{
     
        const obj=await getPublicInfo(uid);
        // if(obj===''){
        //     alert('invalid key')
        // }
        // console.log(obj);
        setdisplay(obj);
        

        
    } 
    
   
    // console.log(display?.imageUrl);
  const [name, setname] = useState('');
    

     
   

     



    return(
        <div style={{color:'black',display:'flex',width:'100%'}}>
            <Bar member={member} activeStep={activeStep} setActiveStep={setActiveStep} />

            <div style={{backgroundColor:'white',display:'flex',flex:1}} >

        {
            activeStep===0?
            <Basicinfo member={member} data={display} />
            :
            activeStep===1?
            <Contactinfo member={member} data={privatedisplay} handleFind={handleFind} setCode={setCode}/>
            :
            
            activeStep===2?
            <FamilyMedHistory member={member} data={privatedisplay} handleFind={handleFind} setCode={setCode} />

            :
            activeStep===3?
            <PastRecords data={privatedisplay} handleFind={handleFind} setCode={setCode} />
            :

            null

            

        }
            </div>
      
        {/* <form onSubmit={handleFind}>
            <div class='d-flex' style={{alignItems:'center'}}>
           {' Name:  '}<h1>{display?.name}</h1>

            </div>
            <div class='d-flex' style={{alignItems:'center'}}>
           {' Email:  '}<h3>{display?.email}</h3>

            </div>

           


        <input onChange={(e)=>{setCode(e.target.value)}} type="text" />
        
        <button  type="submit" style={{height:'40px',width:'40px'}}></button>
            <h3>{display?.name}</h3>
            <a target="_blank" href={display?.imageURL}  alt="" >
                document
                </a>
        </form> */}

      


        </div>

    )
}
export default ReadContent;





