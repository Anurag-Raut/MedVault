import { defaultAbiCoder } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ind";
function RightPanel({uid,update,setmuid,parray,setparray}){
    const {
        addPatient,
        getAllPatients,
        contract,
        getPatient,
        getMembers,
        getPublicInfo
      } = useStateContext();
   
    const [memberids, setmemberids] = useState([]);
    const { connect, address } = useStateContext();
    const handleGetMemebers = async () => {
        // var code = document.getElementById("code-text").value;
      
        const p = await getPublicInfo(uid);
       
        
        await getMembers(p?.uid).then((res) => {
          // console.log(res.farray,res.patient);
          setparray(res?.farray);
          setmemberids(res?.patient);
        });
    
        console.log(parray,'parray');
      };

      useEffect(()=>{
        console.log('hello');
        if(uid){
            handleGetMemebers();}
      },[update])
      useEffect(()=>{
        console.log('hello');
        if(uid){
            handleGetMemebers();}
      },[uid]);
      useEffect(()=>{
        console.log('hello');
        if(uid){
            handleGetMemebers();}
      },[address])
      setTimeout(()=>{
        if(parray===[]){
        handleGetMemebers();}
      },3000)

      

    return (
        <div style={{height:'100vh',width:'15vw',backgroundColor:'black',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{marginTop:'20px'}}>
            <button type="button" class="btn btn-primary" onClick={connect}>Connect to Wallet</button>
            </div>
            <div style={{height:'40vh'}} >
                <h1>
                    Members
                </h1>
            {
                parray.map((p,index)=>{
                    return(<Link to='member'> <h2 onClick={()=>{setmuid(memberids[index])}} style={{marginTop:'5vh'}}>{p.name}</h2> </Link> )

                })
            }

        </div>


        </div>
        

    );
}
export default RightPanel;