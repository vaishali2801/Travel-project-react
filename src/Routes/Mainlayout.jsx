import React from 'react'
import NavbarCom from "../components/ui/NavbarCom";
import { Outlet } from 'react-router-dom';

const Mainlayout = () => {
  return (
    <>
        <NavbarCom/>
        <Outlet/>
    </>
  )
}

export default Mainlayout
