import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

export function Navbar() {
    const [loggedIn, setLoggedIn] = useState("Log In");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token || token === "null" || token === "undefined" || token.trim() === "") {
            setLoggedIn("Log In");
        } else {
            setLoggedIn("Sign Out");
        }
    },[]);
    
    function handleLogInSignOut() {
        if(loggedIn == "Log In") {
            navigate("/login");
        } else {
            localStorage.removeItem("token");
            setLoggedIn("Log In");
        }
    }

    return (
        <div className="flex flex-row gap-4 border-2 border-[#030303] font-bold">
            <Link to="/" className="py-1 px-2 hover:bg-[#030303] hover:text-[#F4EFE6] ">Home</Link>
            <Link to="/dashboard" className="py-1 px-2 hover:bg-[#030303] hover:text-[#F4EFE6] ">Notes</Link>
            <button className="py-1 px-2 hover:bg-[#030303] hover:text-[#F4EFE6] hover:cursor-pointer" onClick={handleLogInSignOut}>{loggedIn}</button>
            <Link to="/signup" className="py-1 px-2 hover:bg-[#030303] hover:text-[#F4EFE6] ">Sign Up</Link>
        </div>
    );
}
