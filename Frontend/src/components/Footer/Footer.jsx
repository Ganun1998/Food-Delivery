import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                 <img src={assets.logo} alt='' />
                 <p>It is a restaurant where everyone are served with delicious meal</p>
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
                <h2>CONTACT US</h2>
                <ul>
                    <li>+251952212209</li>
                    <li>gownaath@gmail.com</li>
                </ul>
                
            </div>
        </div>
         <hr/>
         <p className="footer-copyright">Copyright 2025 &copy; Gow Naath-All Right Reserved: Devoloped by Engineer Ganun</p>
    </div>
  )
}

export default Footer