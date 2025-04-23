import React from 'react'
import './Navbar.css'
import { assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <h1>Admin Panel</h1>
        <img className='profile' src={assets.photo} alt="" />
        
      
    </div>
  )
}

export default Navbar