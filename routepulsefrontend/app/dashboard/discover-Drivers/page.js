"use client" 
import { useState, useEffect } from "react";
import { getAssignedDriverForClient } from '../../../lib/api'

  export  default function discoverDrivers() {
    const [driverInfos , setdriverInfos] = useState[null] 
   const handleFetchingDriverInfos = async () => {
     try {
       
       const result = await getAssignedDriverForClient()
       console.log(result)
       if(!result){
         console.log('error at loading driver');
       }
     } catch (error) {
         console.log('500');
       
     }
   } 

useEffect( () => {
   handleFetchingDriverInfos ()
})

return (
  <div>
   
  </div>
)

}
