import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import "./form.css";
const bg=['A+','A-','B+','B-','AB+','AB-','O+','O-'];
function BasicInfo({publicdata,setpublicdata,member}) {
    const [bgIndex,setBgIndex]=useState(0);
    console.log(publicdata);
  return (
    <div
    class='container'
      style={{

        height: "70vh",
        margin: "10%",
        
        flexDirection: "column",
        overflow:'auto'
      }}
    >
      <div>
        <h2 class="label" >Name</h2>
        <TextField
          inputProps={{
            style: {
                height: "30px",
                width: "35vw",
                fontSize: "20px",
             
            },
          }}
          className='textfield'
          id="standard-basic"
          label="Name"
          variant="standard"
          onChange={(e)=>{var a=publicdata;a.name=e.target.value;setpublicdata({...a})}}
        />
      </div>
      <div>
        <h2 class="label">code</h2>
        <TextField
          inputProps={{
            style: {
                height: "30px",
                width: "35vw",
                fontSize: "20px",
               
            },
          }}
          className='textfield'
          id="standard-basic"
          label="Enter Code"
          variant="standard"
          onChange={(e)=>{var a=publicdata;a.code=e.target.value;setpublicdata({...a})}}
        />
      </div>


{
member?
<div>
        <h2 class="label">Relation</h2>
        <TextField
          inputProps={{
            style: {
              height: "30px",
              width: "35vw",
              fontSize: "20px",
             
            },
          }}
          className='textfield'
          id="standard-basic"
          label="Relation"
          variant="standard"
          onChange={(e)=>{var a=publicdata;a.relation=e.target.value;setpublicdata({...a})}}
        />
      </div>

:
null




}

      <div>
        <h2 class="label">Email</h2>
        <TextField
          inputProps={{
            style: {
                height: "30px",
                width: "35vw",
                fontSize: "20px",
                
            },
          }}
          className='textfield'
          id="standard-basic"
          label="Email"
          variant="standard"
          onChange={(e)=>{var a=publicdata;a.email=e.target.value;setpublicdata({...a})}}
        />
      </div>

      <div>
        <h2 class="label">Upload Your Photo</h2>
        <div class="mb-3">
          <input class="form-control" type="file" id="formFile" />
        </div>
      </div>

      <div>
        <h2 class="label">Select Your Blood Group</h2>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={bg[bgIndex]}
          label="Age"
              
        >
        
          {
            bg.map((p,index)=>{
                return (<MenuItem onClick={()=>{var a=publicdata;a.bloodgroup=p;setpublicdata({...a});setBgIndex(index)}} value={p}>{p}</MenuItem>)
            })
          }
        </Select>
        
      </FormControl>
     
        
      </div>
    </div>
  );
}
export default BasicInfo;
