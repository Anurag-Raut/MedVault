import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import React from "react";
const steps = [
    {
      label: 'Basic Information',
      description: `Add your basic info and code (this information would be public).`,
    },
    {
      label: 'Contact Information',
      description:
        'Add contact information (Private)',
    },
    {
      label: 'Past Medical History',
      description: `Add your Past Medical History (Private).`,
    },
    
  ];

function FormBar({member,activeStep,setActiveStep,handleAddUser,handleAddMember}){
   
    const handleNext = () => {
        if(activeStep===3){
            if(member){
                handleAddMember();
            }
            else{
                handleAddUser();
            }
           
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        if(activeStep===0){
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    return(

        <div id='rem-div' style={{width:'15vw',height:'90vh',backgroundColor:"white",display:'flex',flexDirection:'column',justifyContent:"space-around"}}>
            <div style={{height:'50vh',display:'flex',flexDirection:'column',justifyContent:"space-around"}}>
            <Stepper  activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step  key={step.label}>
            <StepLabel
            
            >
                 <div style={{marginTop:'15px',marginBottom:'15px'}} >
                 {activeStep===index?<h3 >{step.label}</h3>:step.label}
                    </div>
              
            </StepLabel>
            <StepContent>
            <div style={{height:'60px',marginTop:'20px',marginBottom:'40px'}}>
              <h5 style={{marginBottom:'40px'}}>{step.description}</h5>
              </div>
              
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <div class='d-flex' style={{justifyContent:'space-around',marginTop:'40px'}}>
      <button type="button" class="btn btn-primary" onClick={handleBack}>Back</button>
      <button type="button" class="btn btn-primary" onClick={handleNext}>Next</button>

      </div>
            </div>
        </div>
    );



}
export default FormBar;

