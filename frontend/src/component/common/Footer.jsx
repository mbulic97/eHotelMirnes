import React from "react";
import './Footer.css'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-social">

                <a href="https://github.com/mbulic97" target="_blank" rel="noreferrer">
                    <FaGithub /> My Profile
                </a>

                <a href="https://github.com/mbulic97/eHotelMirnes" target="_blank" rel="noreferrer">
                    <FaGithub /> Project
                </a>

                <a href="https://www.linkedin.com/in/mirnes-buli%C4%87-0b74771a4/" target="_blank" rel="noreferrer">
                    <FaLinkedin /> LinkedIn
                </a>

                <a href="mailto:mirnes-bulic@hotmail.com">
                    <FaEnvelope /> Email
                </a>

            </div>
            <div className="footer-bottom">
                <p>May 2026 eHotelMirnes. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;