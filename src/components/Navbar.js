import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";
import useUser from '../hooks/useUser';
import { getAuth, signOut } from "firebase/auth";

    function Navbar({ onSettingsClick }) {
        const navRef = useRef();
      
    
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const { user, isLoading } = useUser();

    const auth = getAuth();
    const signout = () => {
        signOut(auth)
        .then(() => {})
        .catch((error) => {
            console.log("logout error:" + error);
        });
    };


    return(
        <header className="navbar-header">
            <a href="/"><h3>Momentum</h3></a>
            <nav ref={navRef}>
                    <a href="/tracker">Tracker</a>
                    <a href="/music">Music</a>
                    <a href="#" onClick={onSettingsClick}>Setting</a>
                    {user ?  <button className="nav-logout-btn" onClick={signout}>Logout</button> : <a href="/login">Login</a>}
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
 