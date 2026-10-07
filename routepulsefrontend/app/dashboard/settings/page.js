'use client' 
import { useAuth } from '../../../context/AuthProvider';

export default function setting () {
   const { user, loading } = useAuth(); 
  if (loading) {
    return (
      <div className="p-8 text-stone-500 text-sm">
        Loading profile settings...
      </div>
    );
  }
  const userRole = user?.role?.trim();
  return (
        <div>
          {userRole === "Customer" ? <p>Customer settings</p> : userRole === "Driver" ? <p>Driver settings</p> : <p>Invalid user role</p>}
        </div>
  )

}