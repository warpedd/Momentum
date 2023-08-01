import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";


    function Navbar({ onSettingsClick }) {
        const navRef = useRef();
      
    
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return(
        <header className="navbar-header">
            <a href="/"><h3>Momentum</h3></a>
            <nav ref={navRef}>
                    <a href="/tracker">Tracker</a>
                    <a href="/music">Music</a>
                    <a href="#" onClick={onSettingsClick}>Setting</a>
                    <a href="/login">Login</a>
                <button className="nav-button-generic nav-close-button-generic" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-button-generic" onClick = {showNavbar}>
                    <FaBars/>
            </button>
        </header>
    );
}
 
 export default Navbar;
 