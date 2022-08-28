import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userState } from "../atoms/atoms";


function IfUserSignIn() {
    const [user, setUser] = useRecoilState(userState);
  
  return (
    !user ? <Outlet/>  : <Navigate to="/" />
  )
}

export default IfUserSignIn