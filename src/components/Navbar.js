import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
    const navRef = useRef();
    
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return(
        <header>
            <h3>Momentum</h3>
            <nav ref={navRef}>
                <a href="/#">Tracker</a>
                <a href="/#">Music</a>
                <a href="/#">Login</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick = {showNavbar}>
                    <FaBars/>
            </button>
        </header>
    );
}
 
 export default Navbar;
 