import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                 <img src={assets.logo} alt='' />
                 <p>it is a restaurent and bar where everyone are served with delicious meal</p>
                 <div className='footer-social-icon'>
                    <img src={assets.facebook_icon} alt='' />
                    <img src={assets.twitter_icon} alt='' />
                    <img src={assets.linkedin_icon} alt='' />
                 </div>
            </div>
            <div className='footer-content-center'>
                <h2>Company</h2>
                <ul>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>About Us</a></li>
                    <li><a href='#'>Delivery</a></li>
                    <li><a href='#'>Privacy Policy</a></li>
                </ul>
                
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+251952212209</li>
                    <li>wandut1998@gmail.com</li>
                </ul>
                
            </div>
        </div>
         <hr/>
         <p className="footer-copyright">Copyright 2025 &copy; Wandut.com-All Right Reserved</p>
    </div>
  )
}

export default Footer