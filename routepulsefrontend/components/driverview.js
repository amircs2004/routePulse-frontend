"use client";
import { useState, useEffect } from "react";
import BicycleIllustration from "./driver/BicycleIllustration";
import {getUser} from "../lib/api"; 

export default function DriverView() {

  {
    /*
    1- in this componanant i will build the overall view of the driver and  the route map and the order  route recomandation maybe ill create a sub folder to orginize all the compoonnet of the driver
    2- i need to get each user that their role is driver 
    3- create apis and backend so the driver can accept the order delievery or refuse it 
    4- create a map view 
    5- create a route recomandation system for the driver to get the best route to deliever the order
    6- ?
    */
  }

  //to keep the chnages dynamic we use useState to keep the driver data and the route data and the order data and the map data and the recomendation data and the status of the driver and the status of the order and the status of the route and the status of the map and the status of the recomendation
const [driver, setDriver] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    Car: "",
    status: "Offline"
  });

  const getUserInfos = async () => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error("No token found in sessionStorage");
            return;
        }
     const respose = await getUser();
     if (!respose.ok){
      console.error("error in getting the user data")
     }else {
        const data = await respose.json();
        setDriver({
          name : data.name , 
          email : data.email , 
          password : data.password , 
          Car : data.Car , 
          phoneNumber : data.phoneNumber
        });
     }
    }catch (error) {
        console.error("error in getting the user data", error)
    }
  }

  useEffect(() => {  
       getUserInfos ()  
  } , [] )
  return (
    <div>
    
      <div className="w-64 h-64">
        <p>{driver.name}</p>
        <p>{driver.email}</p>
        <p>{driver.phoneNumber}</p>

        <BicycleIllustration />
      </div>
    </div>
  );
}
