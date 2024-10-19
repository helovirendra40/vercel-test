import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
const Menu = () => {
  return (
    <>
     <ul className='mt-3'>
        <li className='d-flex gap-2 align-items-center'>
           <FaHome /> <Link to="/">Home</Link>
          </li>
          <li className='d-flex gap-2 align-items-center'>
          <MdDashboard /><Link to="/dashboard">Dashboard</Link>
          </li>
          <li className='d-flex gap-2 align-items-center'>
          <FaUser /><Link to="/login">Login</Link>
          </li>
        </ul> 
    </>
  )
}

export default Menu
