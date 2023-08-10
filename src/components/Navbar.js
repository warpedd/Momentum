import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";
import useUser from '../hooks/useUser';
import { getAuth, signOut } from "firebase/auth";
import Music from "../pages/Music";

function Navbar({ onSettingsClick }) {
    const navRef = useRef();
      
    
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const { user } = useUser();

    const auth = getAuth();
    const signout = () => {
        signOut(auth)
        .then(() => {})
        .catch((error) => {
            console.log("logout error:" + error);
        });
    };

    var current = window.location.pathname;

    const [showMusic, setShowMusic] = useState(false);

    if (current === '/') {
        return(
        <div>
            <header className="navbar-header">
            <a href="/" className="nav-logo"><h3>Momentum</h3></a>
            <nav ref={navRef}>
                    <a href="/tracker">Tracker</a>
                    <button className="nav-music-btn" onClick={() => setShowMusic(!showMusic)}>Music</button>
                    {showMusic && (<Music/>)}
                    <a href="#foo" className="nav-setting-btn" onClick={onSettingsClick}>Settings</a>
                    {user ?  <button className="nav-logout-btn" onClick={signout}>Logout</button> : <a href="/login">Login</a>}
                <button className="nav-button-generic nav-close-button-generic" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-button-generic" onClick = {showNavbar}>
                    <FaBars/>
            </button>
            </header>
        </div> 
        );
    } 
    else {
        return(
            <div>
            <header className="navbar-header">
            <a href="/" className="nav-logo"><h3>Momentum</h3></a>
            <nav ref={navRef}>
                    <a href="/tracker">Tracker</a>
                    <button className="nav-music-btn" onClick={() => setShowMusic(!showMusic)}>Music</button>
                    {showMusic && (<Music/>)}
                    {user ?  <button className="nav-logout-btn" onClick={signout}>Logout</button> : <a href="/login">Login</a>}
                <button className="nav-button-generic nav-close-button-generic" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-button-generic" onClick = {showNavbar}>
                    <FaBars/>
            </button>
            </header>
        </div> 
        );
    }

    // return(
        
        // <header className="navbar-header">
        //     <a href="/"><h3>Momentum</h3></a>
        //     <nav ref={navRef}>
        //             <a href="/tracker">Tracker</a>
        //             <button className="nav-music-btn">Music</button>
        //             {user ?  <button className="nav-logout-btn" onClick={signout}>Logout</button> : <a href="/login">Login</a>}
        //         <button className="nav-button-generic nav-close-button-generic" onClick={showNavbar}>
        //             <FaTimes/>
        //         </button>
        //     </nav>
        //     <button className="nav-button-generic" onClick = {showNavbar}>
        //             <FaBars/>
        //     </button>
        // </header>
    // );
}
 
 export default Navbar;
 