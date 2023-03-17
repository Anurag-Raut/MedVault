import React, { useEffect, useRef } from "react";
import { useState } from "react";
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
import Navbar from "./navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Form from "./form/form.jsx";
import Delete from "./delete.jsx";
import ReadContent from "./readcontent.jsx";
import WriteContent from "./writecontent.jsx";
import { v4 as uuidv4 } from "uuid";
import RightPanel from "./rightpanel.jsx";
import Sidebar from "./sidebar.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useStateContext } from "../../context/ind.jsx";

async function getdoc(docRef) {
  const docSnap = await getDoc(docRef);
  return docSnap;
}

function LoggedInUser({}) {
  const { addPatient, getAllPatients, contract, getPatient, getPublicInfo } =
    useStateContext();
  // var uid=uuidv4();
  const [parray, setparray] = useState([]);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [uid, setuuid] = useState("");
  const [update, setupdate] = useState(0);
  var id = user?.sub?.substring(14);
  async function setdoc(id, uid) {
    await setDoc(doc(database, "users", id), {
      uid: uid,
    });
    const docRf = doc(database, "users", `${id}`);
    getdoc(docRf).then((df) => {
      setdocref(df);
      if (df._document) setbool(1);
    });
  }
  const [bool, setbool] = useState(0);
  const [docref, setdocref] = useState();
  const [muid, setmuid] = useState("");

  function dr() {
    // console.log(id);

    const docRef = doc(database, "users", `${id}`);
    const docf = getdoc(docRef).then(() => {
      // setdocref(docf);
    });

    // if(docf.exists){
    //     return 1;
    // }
    return docf;
  }

  useEffect(() => {
    const docRef = doc(database, "users", `${id}`);
    getdoc(docRef).then((docf) => {
      console.log(docf);
      if (docf._document) {
        setbool(1);
        setdocref(docf);
      }
    });
  }, [user]);

  useEffect(() => {
    const docRf = doc(database, "users", `${user?.sub?.substring(14)}`);
    getdoc(docRf).then((df) => {
      console.log(df.data());
      setuuid(df?.data()?.uid);
    });
  }, [user]);
  const [isread, setisread] = useState(1);

  const handleFindPublicInfo = async (uid) => {
    if (uid) {
    } else {
      return;
    }
    const obj = await getPublicInfo(uid);
    console.log(uid, obj, "hemlu");
    if (obj === "") {
    } else {
      setisread(0);
    }
  };
  useEffect(() => {
    console.log(uid);
    handleFindPublicInfo(uid);
  }, [uid]);
  useEffect(() => {
    console.log(uid);
    handleFindPublicInfo(uid);
  }, []);
  useEffect(() => {
    console.log(uid);
    handleFindPublicInfo(uid);
  }, [update]);
  //   console.log(id);

  //   setdocref(docf);

  return (
    <div>
      {isAuthenticated ? (
        bool === 0 ? (
          // setfirst(0);
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* <input type="text" /> */}
            <button
              style={{ height: "7vh" }}
              class="btn btn-primary"
              onClick={() => setdoc(id, uuidv4())}
            >
              create new user
            </button>
            <div>
              <input
                style={{ width: "20vw" }}
                class="form-control"
                type="text"
                id="already-user-id"
              />
              <button
                class="btn btn-primary"
                onClick={() =>
                  setdoc(id, document.getElementById("already-user-id").value)
                }
              >
                already have an userid?
              </button>
            </div>
          </div>
        ) : (
          <div class="d-flex" style={{ width: "100vw", justifyContent: "" }}>
            <Sidebar />
            <div style={{ display: "flex", flex: 1 }}>
              <Routes>
                <Route
                  path=""
                  element={
                    isread === 1 ? (
                      <Form
                        setisread={setisread}
                        member={0}
                        update={update}
                        setupdate={setupdate}
                      />
                    ) : (
                      <ReadContent />
                    )
                  }
                />
                <Route
                  path="/addmember"
                  element={
                    <Form
                      member={1}
                      setisread={setisread}
                      update={update}
                      setupdate={setupdate}
                    />
                  }
                />
                <Route path="/read" element={<ReadContent />} />
                <Route
                  path="/delete"
                  element={
                    <Delete
                      setisread={setisread}
                      update={update}
                      setupdate={setupdate}
                    />
                  }
                />
                <Route
                  path="/member"
                  element={
                    <ReadContent
                      member={1}
                      parray={parray}
                      setparray={setparray}
                      muid={muid}
                    />
                  }
                />
              </Routes>
            </div>
            {/* <RightPanel/> */}

            <RightPanel
              parray={parray}
              setparray={setparray}
              uid={uid}
              update={update}
              setupdate={setupdate}
              muid={muid}
              setmuid={setmuid}
            />
            {/* <WriteContent/> */}
          </div>
        )
      ) : (
        <button
          onClick={() => {
            loginWithRedirect({
              appState: {
                returnTo: window.location.href,
              },
            });
          }}
        >
          log in
        </button>
      )}
    </div>
  );
}
export default LoggedInUser;
