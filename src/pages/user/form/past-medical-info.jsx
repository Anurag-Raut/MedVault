import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./form.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const dis = [
  "Cancer",
  "dsv",
  "arberb",
  "abab",
  "aergaerg",
  "aasg",
  "agawg",
  "rsgva",
  "asga",
  "arga",
];

function PastMedInfo({privatedata,setprivatedata,disarr}) {
    const dummy=useRef();
    
    const [pastData, setpastData] = useState([{}]);
    console.log(privatedata);
    useEffect(()=>{
        var a=privatedata;
        a.pastdata=pastData;
        setprivatedata({...a});
        dummy.current.scrollIntoView({ behavior: "smooth" });

    },[pastData])
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  console.log(privatedata);
  var disarr=Array.from({length:10});
    disarr.fill(false);
 
  return (
    <div
    class='container'
      style={{
        height: "70vh",
        // margin: "10%",
        width: "100%",
        // display: "flex",
        // justifyContent: "space-around",
        // alignItems: "space-around",
        // flexDirection: "column",
        overflow: "auto",
      }}
    >
      <div style={{ width: "100%",marginBottom:'50px' }}>
        <h2 style={{  }}>Select Disease</h2>

        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          {dis.map((p, index) => {
            return (
              <Grid item xs={4}>
                <input
                  style={{ width: "50px" }}
                  type="checkbox"
                  class="btn-check"
                  id={`btn-check-outlined${index}`}
                  autocomplete="off"
                  onChange={(e)=>{var a=privatedata ;
                    if(a.disarr){
                        a.disarr[index]=e.target.checked;
                    }
                    else{
                        a.disarr=disarr;
                        a.disarr[index]=e.target.checked;


                    }
                    setprivatedata({...a});
                
                }}
                />
                <label
                  class="btn btn-outline-primary"
                  for={`btn-check-outlined${index}`}
                >
                  {p}
                </label>
                <br />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div style={{width: "100%"}}>
        <h2 style={{ marginBottom: "50px" }}>Add Extra Information</h2>
        <div style={{height:'100%',width: "100%"}}>
          {pastData.map((p, index) => {
            return (
              <div class="d-flex" style={{justifyContent:'space-around',marginBottom:'40px'}}>
                <div>
                  <div>
                    <h3 class="label">Enter the name of Disease</h3>
                    <TextField
                      inputProps={{
                        style: {
                          height: "30px",
                          width: "35vw",
                          fontSize: "20px",
                        },
                      }}
                      id="standard-basic"
                      label="Name"
                      variant="standard"
                      onChange={(e) => {
                        console.log(e.target.value);
                        var a = pastData;
                        a[index].name = e.target.value;
                        setpastData([...a]);
                      }}
                    />
                  </div>
                  <div>
                    <h3 class="label">Are You Still Suffering from it?</h3>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        ?
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="hello"
                        value={
                          "" + pastData[index]?.suff ? pastData[index].suff : ""
                        }
                        label={
                          "" + pastData[index]?.suff ? pastData[index].suff : ""
                        }
                      >
                        <MenuItem
                          onClick={() => {
                            var a = pastData;
                            a[index].suff = "Yes";
                            setpastData([...a]);
                          }}
                          value="Yes"
                        >
                          {"Yes"}
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            console.log("No");
                            var a = pastData;
                            a[index].suff = "No";
                            setpastData([...a]);
                          }}
                          value="No"
                        >
                          {"No"}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <FontAwesomeIcon icon={faTrash} onClick={()=>{var a=pastData;a.splice(index, 1);setpastData([...a])}}/>
              </div>
            );
          })}
          <div
            onClick={() => {
              var a = pastData;
              a.push({});
              setpastData([...a]);
            }}
            ref={dummy}
          >
            add Info
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastMedInfo;
