"use client";
import { useState, useEffect } from "react";
import BicycleIllustration from "./driver/BicycleIllustration";
import TruckIllustration from "./driver/TruckIllustration";
import { getUser } from "../lib/api"; 

export default function DriverView() {
  const [driver, setDriver] = useState({
    name: "Loading...",
    email: "",
    phoneNumber: "",
    Car: "",
    status: "Offline"
  });

const getUserInfos = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) return;

      const response = await getUser();
      // Look inside response.data where the actual user fields live!
      if (response && response.data) {
        const userData = response.data;
        setDriver({
          name: userData.name,
          email: userData.email,
          Car: userData.Car,
          phoneNumber: userData.phoneNumber,
          status: userData.status || "Online"
        });
      }
    } catch (error) {
      console.error("error in getting the user data", error);
    }
  };

  useEffect(() => {   
    getUserInfos();   
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Driver Header Info Card */}
      <div className="bg-[#162B22] text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-black">HELLO DRIVER, {driver.name}! 👋</h1>
          <p className="text-stone-300">📧 Email: {driver.email} | 📱 Phone: {driver.phoneNumber}</p>
          <p className="text-stone-300">🚗 Vehicle: {driver.Car || "Bicycle Courier"}</p>
        </div>
        <div className="px-5 py-2 bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold rounded-full">
          Status: {driver.status}
        </div>
      </div>

      {/* Driver Workspace Container */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 space-y-6">
        
        {/* Workspace Title */}
        <div>
          <h2 className="text-2xl font-black text-stone-900">Driver Delivery Workspace</h2>
          <h1 className="text-stone-500 text-sm">Select your transit mode and review active routes below.</h1>
        </div>

        {/* Clean Side-by-Side Layout (No Outer Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          
          {/* Bicycle Mode Section */}
          <div className="space-y-3 group">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-bold tracking-wider uppercase text-stone-400">Eco-Transit Mode</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">Active</span>
            </div>
            <div className="w-full overflow-hidden rounded-3xl bg-[#FAFBF9] p-3 border border-stone-100 transition-all duration-300 group-hover:shadow-md">
              <BicycleIllustration className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>

          {/* Truck Mode Section */}
          <div className="space-y-3 group">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-bold tracking-wider uppercase text-stone-400">Heavy Cargo Mode</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-full">Standby</span>
            </div>
            <div className="w-full overflow-hidden rounded-3xl bg-[#FAFBF9] p-3 border border-stone-100 transition-all duration-300 group-hover:shadow-md">
              <TruckIllustration className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}