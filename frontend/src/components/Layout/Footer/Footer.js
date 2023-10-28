import React from 'react';
import styles from './Footer.module.css'; // Import the CSS Module
import { Link } from 'react-router-dom';
import { BiLogoGmail, BiLogoLinkedin, BiLogoFacebook, BiLogoGithub } from "react-icons/bi";
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* <div className={styles.footerLogo}> */}
                {/* <img src="/logo.png" alt="Questify Logo" /> */}
                {/* </div> */}
                <div className={styles.footerLinks}>

                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/admin/dashboard">Admin Panel</Link>

                </div>
                <div className={styles.footerSocial}>
                    <Link to="mailto:rk4740779@gmail.com"><BiLogoGmail style={{ fontSize: "1.5rem" }} /></Link>
                    <Link to="https://github.com/Rohit-Yadavv" target="_blank" rel="noopener noreferrer"><BiLogoGithub style={{ fontSize: "1.5rem" }} /></Link>
                    <Link to="https://www.linkedin.com/in/rohit-yadav-240448255" target="_blank" rel="noopener noreferrer"><BiLogoLinkedin style={{ fontSize: "1.5rem" }} /></Link>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; 2023 Questify. All rights reserved.</p>
            </div>
        </footer>

    );
};

export default Footer;
