import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { StateContextProvider } from "./context/ind";
import { Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
// import  functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import ReadContent from "./pages/user/readcontent";
import App from "./App";
import Select from "./Select";
import LoggedInUser from "./pages/user/loggedIn";
import Admin from "./pages/admin/admin";
import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
  function change(){
    
  }
root.render(
  <Auth0Provider
    domain="dev-petrhms2thok1i1v.us.auth0.com"
    clientId="PZQFGDHie659askeNmFeexgpbhZgH98k"
    authorizationParams={{
      redirect_uri: window.location.href,
    }}
  >
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <Router>
        <StateContextProvider>
          {/* <Routes>
            <Route
              path="/"
              element={
                <div
                  style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Link to="user">user</Link>
                  <Link to="admin">admin</Link>
                </div>
              }
            />
            <Route path="/user/*" element={<LoggedInUser  />} />
            <Route path="/admin/*" element={<Admin  />} />
          </Routes> */}
          <App/>
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </Auth0Provider>
);
