import user from "../assets/user.png";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";

export default function Nav() {
  const [userData, setUserData] = useState()
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token)
      setUserData(decode)
    }
  }, [])


  const handleLogout = () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC`
    window.location.href = '/'
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="navbar bg-transparent px-3 sm:px-7 py-6 sm:py-7 ">
      <div className="flex-1">
        <a onClick={handleRefresh} className="btn btn-ghost text-white normal-case text-2xl sm:text-[35px]">Industrial</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end mr-1.5 sm:mr-0">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-9 sm:w-12 rounded-full">
              <img src={user} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40 sm:w-48 items-center">
            <p className="justify-center font-bold text-lg mb-4 mt-3">{userData?.role === "admin" ? "Admin" : userData?.username}</p>
            <p className="justify-center font-medium text-sm capitalize">Status : {userData?.role}</p>
            
            <button onClick={handleLogout} className="btn btn-sm logout text-white !text-sm w-28 mt-5 mb-3 capitalize font-normal">Logout</button>
          </ul>
        </div>
      </div>
    </div>
  );
}
