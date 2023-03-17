import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { useStateContext } from "../../../context/ind";
import BasicInfo from "./basic-info";
import ContactInfo from "./contact-info";
import FamMedHistory from "./Family-past-history";
import FormBar from "./form-bar";
import PastMedInfo from "./past-medical-info";
import { useAuth0 } from "@auth0/auth0-react";
import { Web3Storage } from 'web3.storage'
import './form.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app, database, storage } from "../../../firebaseConfig.js";
import {
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
async function getdoc(docRef) {
    const docSnap = await getDoc(docRef);
    return docSnap;
  }
function Form({member,setupdate,update,setisread}){
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2MmMzMzA3OTkxRmM0Nzg0NzNmMmMwMDFmNzBCMGFFQTE2ZjM0NzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzczNDIxNDI0NTAsIm5hbWUiOiJzdG9yZTIifQ.K2OCaGVt86PlyD7Tyq71NMCrxwuxK9xmflbYNe0_cIo" })
    const {
        addPatient,
        getAllPatients,
        contract,
        getPatient,
        getMembers,
        getPublicInfo,
      } = useStateContext();
    const [publicdata,setpublicdata]=useState({})
    const [privatedata,setprivatedata]=useState({})
    const [activeStep, setActiveStep] = React.useState(0);
    const [push,setpush]=useState(0);
    const { loginWithRedirect, isAuthenticated, user,logout } = useAuth0();
const [uid, setuuid] = useState("");
  useEffect(() => {
    const docRf = doc(database, "users", `${user?.sub?.substring(14)}`);
    getdoc(docRf).then((df) => {
      console.log(df.data());
      setuuid(df?.data()?.uid);
    });
  }, []);
// useEffect(()=>{
//     if(push===1){
//         push=0;
//         addPatient(publicdata,)
//     }
// },[push])
async function setdoc(id, uid) {
    await setDoc(doc(database, "users", id), {
      uid: uid,
    });
    await updateDoc(doc(database, "users", id), {
      name: publicdata.name,
    })
    // const docRf = doc(database, "users", `${id}`);
    // getdoc(docRf).then((df) => {
    //   // setdocref(df);
    //   // if (df._document) setbool(1);
    // });
  }


  console.log(uid);
  

  async function check(uuid) {
    console.log(uuid);
    const obj = await getPublicInfo(uuid);
    // console.log(obj);
    // setdisplay(obj);
    return obj;
  }
  const handleAddMember = async (e) => {
    e?.preventDefault();
    var uuid = uuidv4();

    
    var a = await check(uuid);
    // console.log(a);
    if (a === "") {
    } else {
      alert("data already exist");
      return;
    }

    // const fileInput = document.querySelector('input[type="file"]');
    // const rootCid = await client.put(fileInput.files);
    // const imageURL =
    //   "https://" + rootCid + ".ipfs.w3s.link/" + fileInput.files[0].name;

    const p = await getPublicInfo(uid);
    var puid = p.uid;
    console.log(puid,'hemlu');
    console.log(publicdata,'public sfsdfszdfsedzgvsdg',privatedata);

    await addPatient(publicdata, privatedata,"anurag", uid, uuid).then(async()=>{
      await setdoc(uuid,uuid).then(()=>{
        setupdate(!update)
      })
     
    })
  };

    const handleAddUser = async (e) => {
        e?.preventDefault();
        // console.log(publicdata.profile);
        const rootCid = await client.put(publicdata.profile);
         const imageURL =
      "https://" + rootCid + ".ipfs.w3s.link/" + publicdata.profile[0].name;
      // console.log(imageURL);
    
        // await setDoc(doc(database, "users", uuid), {
        //   id
        // });
    
        // var name = document.getElementById("name-text").value;
        // var code = document.getElementById("code-text").value;
        console.log(uid,'water')
        var a = await check(uid);
        console.log('done');
        
        // console.log(a);
        if (a === "") {
        } else {
          alert("data already exist");
          return;
        }
        var tempPdata=publicdata;
        tempPdata.profile=imageURL;

        // const fileInput = data.imageURL;
        // console.log(fileInput.name)
        
        
        // setdata(t);
        console.log(publicdata)
        
    
       
          
        
        await addPatient(tempPdata,privatedata, 'c', uid, uid).then(async()=>{
          await updateDoc(doc(database, "users", user?.sub?.substring(14)), {
            name: publicdata.name,
          }).then(()=>{
            setupdate(!update);
            setisread(0);
          }
    
          )
        })
       
        // setuuid(uid);
      };
    return(

        <div style={{height:'90vh',width:'100%',color:"black",marginLeft:'3vw'}}>
            <div style={{height:'10vh',display:'flex',alignItems:'center'}}>
                {
                    member?
                    <h1 style={{fontSize:'3.5vw'}}> Add Member Details</h1>
                    :
                    <h1 style={{fontSize:'3.5vw'}}> Add Your Details</h1>
                }
           

            </div>
            <div style={{display:'flex',backgroundColor:'white',width:'100%',justifyContent:"space-around",alignItems:'center'}}>
            <FormBar member={member} activeStep={activeStep} setActiveStep={setActiveStep} handleAddUser={handleAddUser} handleAddMember={handleAddMember} />
            <div style={{display:'flex',justifyContent:'center'}} >{
                activeStep===0?
                <BasicInfo member={member} publicdata={publicdata} setpublicdata={setpublicdata} />
                :
                activeStep===1?
                <ContactInfo privatedata={privatedata} setprivatedata={setprivatedata} />:
                activeStep===2?
                <PastMedInfo privatedata={privatedata} setprivatedata={setprivatedata}  />
                
                :null


                }
            </div>


            </div>
           
            

        </div>
    );



}
export default Form;


