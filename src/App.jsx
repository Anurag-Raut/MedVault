import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Delete from "./pages/user/delete";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app, database, storage } from "./firebaseConfig.js";
import { useNavigate } from "react-router-dom";
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
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "./admin.json";
import animationData2 from "./user.json";
import Navbar from "./pages/user/navbar";
import ReadContent from "./pages/user/readcontent";
import WriteContent from "./pages/user/writecontent";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedInUser from "./pages/user/loggedIn";
import AdminDash from "./pages/admin/dashboard-admin";
import { Link } from "react-router-dom";
import Admin from "./pages/admin/admin";
import { display } from "@mui/system";

async function getdoc(docRef) {
  const docSnap = await getDoc(docRef);
  return docSnap;
}
async function setdoc(id) {
  await setDoc(doc(database, "users", id), {
    // id=
  });
}

function App() {
  const navigate = useNavigate();
  const [uid, setuid] = useState("");
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [docref, setdocref] = useState();
  // const [id,setid]=useState('');
  var id = "";
  if (isAuthenticated) {
    id = user?.sub?.substring(14);
    //  console
  }

  const [userbool, setuser] = useState(0);
  console.log(userbool);
  window.addEventListener("hashchange", function () {
    console.log(window.location.href);
    if (window.location.href == "http://localhost:3000") {
      logout();
    }
    if (
      window.location.href == "https://meddvault.netlify.app/admin" ||
      window.location.href == "http://localhost:3000/admin"
    ) {
      setuser(0);
    }
    if (
      window.location.href == "https://meddvault.netlify.app/user" ||
      window.location.href == "http://localhost:3000/admin"
    ) {
      setuser(1);
    }
  });
  useEffect(() => {
    if (window.location.href == "http://localhost:3000") {
      logout();
    }
    if (
      window.location.href == "https://meddvault.netlify.app/admin" ||
      window.location.href == "http://localhost:3000/admin"
    ) {
      setuser(0);
    }
    if (
      window.location.href == "https://meddvault.netlify.app/user" ||
      window.location.href == "http://localhost:3000/admin"
    ) {
      setuser(1);
    }
  }, [window.location.href]);
  const [run, setrun] = useState(0);
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    // hover:true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: false,
    animationData: animationData2,
    // hover:true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  console.log(run);
  useEffect(() => {}, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* {  isAuthenticated? */}

      <Routes>
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              userbool === 1 ? (
                <LoggedInUser />
              ) : (
                <Admin />
              )
            ) : (
              <div
              
                style={{
                  height: "100vh",
                  width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >

                
                <motion.div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100vh",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  transition={{duration:0.5}}
                  whileHover={{backgroundColor:"#8eded2"}}
                  onMouseEnter={() => {
                    setrun(0);
                  }}
                  onMouseLeave={() => {
                    setrun(1);
                  }}
                >
                  <div style={{height:'80vh',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
                  <motion.div animate={{height:run?'350px':'400px',width:run?'350px':'400px'}} >
                  <Lottie
                    options={defaultOptions2}
                  
                    isPaused={run}
                  />
                  </motion.div>
                 
                  <button
                    style={{ height: "60px" }}
                    type="button"
                    onClick={() => {
                      loginWithRedirect({
                        appState: {
                          returnTo: "http://localhost:3000/user",
                        },
                      });
                    }}
                    class="btn btn-primary btn-lg"
                  >
                    Login
                  </button>

                  </div>
                  
                </motion.div>

                <motion.div
                whileHover={{backgroundColor:"#8eded2"}}
                transition={{duration:0.5}}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100vh",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <div style={{height:'80vh',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}} >
                  <motion.div animate={{height:!run?'350px':'400px',width:!run?'350px':'400px'}}>
                    <Lottie options={defaultOptions} isPaused={!run} />
                  </motion.div>

                  <button
                    style={{ height: "60px" }}
                    type="button"
                    onClick={() => {
                      loginWithRedirect({
                        appState: {
                          returnTo: "http://localhost:3000/admin",
                        },
                      });
                    }}
                    class="btn btn-primary btn-lg"
                  >
                    Admin
                  </button>

                  </div>
                  
                </motion.div>
              </div>
            )
          }
        />

        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user/*" element={<LoggedInUser />} />
      </Routes>
    </div>
    // <AdminDash/>
  );
}

export default App;
