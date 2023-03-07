import React, { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStateContext } from "../../context/ind";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Web3Storage } from "web3.storage";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app, database, storage } from "../../firebaseConfig.js";
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
import Sidebar from "./sidebar";
import RightPanel from "./rightpanel";
import { flexbox } from "@mui/system";
import Form from "./form/form";
async function getdoc(docRef) {
  const docSnap = await getDoc(docRef);
  return docSnap;
}
function WriteContent({member,update,setupdate,setisread}) {
  // let db_connect = dbo.getDb("emrdb");
  const { loginWithRedirect, isAuthenticated, user,logout } = useAuth0();
  const [activeStep, setActiveStep] = useState(0);
  const curr_auth_id = user?.sub?.substring(14);
  const collectionRef = collection(database, "users");
  const [data, setdata] = useState({});
  // user.data=uuidv4();
  // console.log(user);
  const { connect, address } = useStateContext();
  const [display, setdisplay] = useState({});

  const [uid, setuuid] = useState("");
  useEffect(() => {
    const docRf = doc(database, "users", `${user?.sub?.substring(14)}`);
    getdoc(docRf).then((df) => {
      console.log(df.data());
      setuuid(df?.data()?.uid);
    });
  }, []);

  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2MmMzMzA3OTkxRmM0Nzg0NzNmMmMwMDFmNzBCMGFFQTE2ZjM0NzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzczNDIxNDI0NTAsIm5hbWUiOiJzdG9yZTIifQ.K2OCaGVt86PlyD7Tyq71NMCrxwuxK9xmflbYNe0_cIo",
  });

  const {
    addPatient,
    getAllPatients,
    contract,
    getPatient,
    getMembers,
    getPublicInfo,
  } = useStateContext();
  const [parray, setparray] = useState([]);
  const [memberids, setmemberids] = useState([]);
  // const [data,setdata]=useState({name:'anurag'});
  useEffect(() => {
    // console.log(address);
  }, [address]);

  async function check(uuid) {
    console.log(uuid);
    const obj = await getPublicInfo(uuid);
    // console.log(obj);
    setdisplay(obj);
    return obj;
  }
  async function setdoc(id, uid) {
    await setDoc(doc(database, "users", id), {
      uid: uid,
    });
    await updateDoc(doc(database, "users", id), {
      name: data.name,
    })
    // const docRf = doc(database, "users", `${id}`);
    // getdoc(docRf).then((df) => {
    //   // setdocref(df);
    //   // if (df._document) setbool(1);
    // });
  }

  // console.log(display.imageUrl);

  const handleAddUser = async (e) => {
    e?.preventDefault();

    // await setDoc(doc(database, "users", uuid), {
    //   id
    // });

    // var name = document.getElementById("name-text").value;
    // var code = document.getElementById("code-text").value;
    // console.log(name,code,uuid)
    var a = await check(uid);
    // console.log(a);
    if (a === "") {
    } else {
      alert("data already exist");
      return;
    }
    const fileInput = data.imageURL;
    // console.log(fileInput.name)
    const rootCid = await client.put(fileInput.files);
    const imageURL =
      "https://" + rootCid + ".ipfs.w3s.link/" + fileInput.files[0].name;
      console.log(imageURL)
      var t=data;

    t.imageURL=imageURL;
    setdata(t);

    

    await addPatient(data, data.code, uid, uid).then(async()=>{
      await updateDoc(doc(database, "users", curr_auth_id), {
        name: data.name,
      }).then(()=>{
        setupdate(!update)
      }

      )
    })
   
    // setuuid(uid);
  };
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

    await addPatient(data, data.code, puid, uuid).then(async()=>{
      await setdoc(uuid,uuid).then(async()=>{
        
        setupdate(!update);
      })
     
    })
  };

  const handleGetMemebers = async () => {
    // var code = document.getElementById("code-text").value;
    const p = await getPublicInfo(uid);
    console.log(p, "pppppppppppppppppppppppppppppppppppppppp");
    console.log(uid);
    await getMembers(p.uid).then((res) => {
      // console.log(res.farray,res.patient);
      setparray(res.farray);
      setmemberids(res.patient);
    });

    // console.log(parray,'parray');
  };
  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
  ];
  console.log(memberids, "hhemliiiiiiiiiiii");
  // var a=document.getElementById('').value;

  // const data2={};
  // const data3={}

   async function next(p) {
   
    if (p === 0) {
      var a = data;
      a.name = document.getElementById("name").value;
      a.imageURL = document.querySelector('input[type="file"]');
      a.email = document.getElementById("email").value;
      a.code=document.getElementById("code").value;
     
      console.log(a);
      setdata(a);
    }
    else if(p===1){
      var a=data;
      a.discheck=document.getElementById("disease-checkbox").value;
      setdata(a);


    }
    else if(p===2){
      var a=data;
      a.famInfocheck=document.getElementById("family-contact-info-checkbox").value;
      a.famInfo=document.getElementById('family-contact-info').value;
      setdata(a);
      if(member && member===1){
        handleAddMember();
      }
      else{
        handleAddUser()
      }

    }
   
    if (p < 2) {
      setActiveStep(p + 1);
    }

    console.log(data);
  }
  
  // console.log(document.getElementById('btn-check-outlined')?.value);
  const dis = ["diabetes", "COPD", "Heart Disease", "Cancer", "Stroke"];
  const dm = Array.from({ length: dis.length });
  dm.fill(0);
  const [dismap, setDisMap] = useState(dm);

  console.log(data);
  function disease(index) {
    var a = data;
    var t = dismap;
    t[index] = 1;
    setDisMap(t);

    a.disarr = dismap;
    setdata({ ...a });
  }
  function dcheck(index) {
    if (data && data.disarr[index]) {
      return data.disarr[index];
    }
  }

 
}
export default WriteContent;
