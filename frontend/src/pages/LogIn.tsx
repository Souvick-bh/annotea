import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import annotea from "../assets/images/annotea.png"
import { envFrontend } from "@/config";
import { Link } from "react-router-dom";
   

export function Login() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');

    async function handleUserLogIn() {
        if (!userId || !userPassword) alert("Kindly fill the details to Sign-Up");
        try {
            const response = await axios.post(envFrontend.VITE_BACKEND_URL+"/v1/user/login", {userid: userId, password: userPassword})
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            navigate("/");
        } catch (error) {
            throw(error);
        }
    }

    return (
            <div className="min-h-screen w-full flex flex-col justify-center items-center rounded-4xl text-[#fff2e7] gap-3">
                
                <Link to="/">
                    <div className="w-60">
                        <img src={annotea} alt="" />
                    </div>
                </Link>
                
                <div className="w-100 py-1 mb-2 bg-[#2d2d2d] rounded-lg">
                    <label className="pl-5 pr-5">username :</label>
                    <input className="outline-0 text-center" value={userId} onChange={(e) => setUserId(e.target.value)} type="text" placeholder="snowden2013"/>
                </div>
                <div className="w-100 py-1 mb-2 bg-[#2d2d2d] rounded-lg">
                    <label className="pl-5 pr-5">password :</label>
                    <input className="outline-0 text-center" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type="text" placeholder="********"/>
                </div>

                <div className=" bg-gradient-to-r from-[#08CB00] to-[#008d7f] bg-clip-text text-transparent font-semibold animate-pulse animate-duration-[3s]">
                    <a className="" href="http://localhost:5173/signup">Didn't have a account ? Sign Up</a>
                </div>

                <button className="px-3 py-2 rounded-xl font-bold  hover:cursor-pointer hover:text-[#FFF5F2] bg-[#151515] hover:bg-[#111111] " onClick={handleUserLogIn} >Log In</button>
            </div>
        );
}
