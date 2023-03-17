import React, { useContext, createContext } from 'react';
import CryptoJS from "crypto-js";
import crypto from 'crypto-js'
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';





const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
 
    const address = useAddress();
    const connect = useMetamask();
    const { contract } = useContract('0x587586E033AC8Bc057D3f3B6814943D8a74DB2aa');
    const { mutateAsync: addPatient } = useContractWrite(contract, 'addPatient');

    const { mutateAsync: delPatient } = useContractWrite(contract, 'delPatient');
  

    const AddPatient=async (publicdata,privatedata,code,puuid,cuuid)=>{
        try{
         var codee=publicdata.code
         
          var a=publicdata;
          a.uid=puuid;
          a.code='';

          console.log(publicdata.code,'pleaseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

          console.log(publicdata,privatedata,codee);
         
          // const public_data=data;
          var publicText=JSON.stringify(a)
          var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(privatedata), codee).toString();
          console.log(ciphertext);
             await addPatient([ciphertext,publicText,puuid,cuuid])

        }
        catch{

        }
       
    }
   


    const getPatient = async(uid,code)=>{
      const patient = await contract.call('getPatient',uid);
      
      console.log(patient);
      
      
      var bytes  = CryptoJS?.AES?.decrypt(patient.info, code);
      
      if(bytes.toString(CryptoJS?.enc?.Utf8)===''){
        // alert('invalid key')
        return '';
      }
      else{
      var decryptedData = JSON.parse(bytes.toString(CryptoJS?.enc?.Utf8));
      return decryptedData;
         }
      
        


    
    
    }

    const getPublicInfo = async(uid)=>{
      console.log('waterrr',uid)
      const patient = await contract?.call('getPatient',uid);
      console.log('bottle')
      
      console.log(patient,'bottle patient');
      if(!patient){
        return '';
      }
      if(patient?.public_info!==''){
        var a=JSON.parse(patient?.public_info)
        return a;}

      else{
        return '';
      }
      
    
    }


    const getMembers = async(uuid)=>{
      const patient = await contract.call('getFamilyuid',uuid);
      
      console.log(patient);
      // var farray=[];
      const farray = await Promise.all(patient.map(async (uid)=>{
      const item =await getPublicInfo(uid);
      return item;
    
        
      }))
      return {farray,patient};

      
      

      
    
    }
    const addReport =async(uuid,code,rdata)=>{
      console.log('yjgccccccccccccccccccccccccccccccccccccccccccccccccccccccccc');
      var data= await getPatient(uuid,code);
      if(data===''){
        alert('invalid key')
        return;
      }
      if(data.pastReports){
        data.pastReports.push(rdata);
      }
      else{
        data.pastReports=[rdata];

      }
      var public_data=await getPublicInfo(uuid);
      public_data.code=code;
      console.log(data);



      await AddPatient(public_data,data,code,uuid,uuid);
      
     
     
      // return data;
     


    }
    

    const deletePatient=async(uid,code)=>{
      try{

        const patient = await contract.call('getPatient',uid);
      
        var bytes  = CryptoJS?.AES?.decrypt(patient.info, code);
      
      if(bytes.toString(CryptoJS?.enc?.Utf8)===''){
        
        return '';
      }
      else{
        await delPatient([uid])
        return 1;
         }
      
        
        
       
        
     
         
           

      
      }
      catch{

      }
    



    }


    
 

    return (
        <StateContext.Provider
          value={{ 
            address,
            contract,
            connect,
            addPatient: AddPatient,
           
            getPatient:getPatient,
            deletePatient:deletePatient,
            getMembers:getMembers,
            getPublicInfo:getPublicInfo,
            addReport:addReport
           
          }}
        >
          {children}
        </StateContext.Provider>
      )
}

export const useStateContext = () => useContext(StateContext);