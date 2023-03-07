import React from "react";

function Basicinfo({data,member}){
    return (

        <div
        style={{
          height: "60vh",
          margin: "10%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "space-around",
          flexDirection: "column",
        }}
      >
        <div>
          <h2 class="label">Name</h2>
          <h3>{data?.name}</h3>
        </div>
        
  
  
  {
  member?
  <div>
          <h2 class="label">Relation</h2>
          <h3>{data?.relation}</h3>
        </div>
  
  :
  null
  
  
  
  
  }
         <img style={{width:'90px',height:'90px'}} src={`${data?.profile}`} alt="kat gaya" />
        <div>
          <h2 class="label">Email</h2>
          <h3>{data?.email}</h3>
        </div>
  
        {/* <div>
          <h2 class="label">Upload Your Photo</h2>
          <div class="mb-3">
            <input class="form-control" type="file" id="formFile" />
          </div>
        </div> */}
  
        <div>
          <h2 class="label">Select Your Blood Group</h2>
          <h3>{data?.bloodgroup}</h3>
       
          
        </div>
      </div>

    );


}
export default Basicinfo;