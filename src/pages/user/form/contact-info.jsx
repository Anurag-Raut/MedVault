import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './form.css';
import { red } from "@mui/material/colors";
import { motion } from "framer-motion";
// import {faPlus} from "https://fontawesome.com/icons/plus?s=solid&f=sharp;"
function ContactInfo({privatedata,setprivatedata}){
    console.log(privatedata);
    const dummy=useRef();
   
        const [emergencyContact,setEC]=useState([]);
        useEffect(() => {
            var a=privatedata;
            a.emergencyContact=emergencyContact;
            setprivatedata({...a});
            dummy.current.scrollIntoView({ behavior: "smooth" });
          }, [emergencyContact]);
        console.log(emergencyContact);

        const [rotate, setRotate] = React.useState(false);
        return (

            <div
      style={{
        
        height: "70vh",
        margin: "10%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "space-around",
        flexDirection: "column",
      }}
    >
      <div style={{marginBottom:'50px'}}>
        <h3 class="label">Enter Your Mobile Number</h3>
        <TextField
          inputProps={{
            style: {
              height: "30px",
              width: "35vw",
              fontSize: "20px",
            },
          }}
          id="standard-basic"
          label="Mobile Number"
          variant="standard"
          onChange={(e)=>{var a=privatedata;a.contact=e.target.value;setprivatedata({...a})}}
        />
      </div>
      <div class='container' style={{overflowX:"auto",MaxHeight:'50vh',width:'45vw'}} >
        <h3 class="label">Add Emergency Contact Info</h3>
        
        

        

        {
            emergencyContact?.map(({val,relation},index)=>{
                return (
                    <div class='d-flex' style={{justifyContent:'space-between',alignItems:'center',marginTop:'30px'}}>
                        <div style={{display:'flex',justifyContent:"space-between",width:'35vw'}}>
        <TextField
          inputProps={{
            style: {
              height: "30px",
              width: "20vw",
              fontSize: "20px",
            },
          }}
          onChange={(e)=>{var a=emergencyContact;a[index].val=e.target.value;setEC([...a])}}
          id="standard-basic"
          label={`Mobile Number ${index+1}`}
          variant="standard"
        />
        <TextField id="outlined-basic" label="Relation" variant="outlined"  onChange={(e)=>{var a=emergencyContact;a[index].relation=e.target.value;setEC([...a])}} />
        

        </div>
          <FontAwesomeIcon icon={faTrash} onClick={()=>{var a=emergencyContact;a.splice(index, 1);setEC([...a])}} />
          

                    </div>
                    
        

                );
            })
            
        }
        
        <motion.div id="addEC" ref={dummy} onClick={()=>{console.log('hi');var a=emergencyContact;a.push({val:"",relation:''});setEC([...a]);}}
            className="box"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
           <h5> + Add contact </h5>
        </motion.div>
           {/* <FontAwesomeIcon icon={faPlus} ref={dummy} onClick={()=>{console.log('hi');var a=emergencyContact;a.push({val:"",relation:''});setEC([...a]);}}/> */}
      </div>
      
     
        
      
    </div>
        );

}
export default ContactInfo;

