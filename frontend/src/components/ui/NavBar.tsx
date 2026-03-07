import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

export function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token || token === "null" || token === "undefined" || token.trim() === "") {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    },[navigate]);
    
    function handleLogInSignOut() {
        if(!loggedIn) {
            navigate("/login");
        } else {
            localStorage.removeItem("token");
            setLoggedIn(false);
        }
    }

    return (
        <div className="flex flex-row gap-4 border-b-2 border-[#030303] font-bold bg-[#F4EFE6]">
            <Link to="/" className="py-1 px-2 hover:bg-[#030303] hover:text-[#F4EFE6] ">Home</Link>
            <Link to="/dashboard" className="py-1 px-2 hover:bg-[#030303] hover:text-[#F4EFE6] ">Notes</Link>
            <button className="py-1 px-2 hover:bg-[#030303] hover:text-[#F4EFE6] hover:cursor-pointer" onClick={handleLogInSignOut}>{loggedIn ? "Sign Out": "Log In"}</button>
            {loggedIn ? <span></span> : <Link to="/signup" className="py-1 px-2 hover:bg-[#030303] hover:text-[#F4EFE6] ">Sign Up</Link>}
        </div>
    );
}
