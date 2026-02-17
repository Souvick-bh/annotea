import { envFrontend } from "@/config";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import annotea from "../assets/images/annotea.png"


export function Signup() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
   

    async function handleUserSignUp() {
        if(!userName || !userEmail || !userId || !userPassword ) alert("Kindly fill the details to Sign-Up");
        //const userbody = {name:userName, email:userEmail, userid:userId, password:userPassword};
        try {
            const response = await axios.post(envFrontend.VITE_BACKEND_URL+"/v1/user/signup",{name:userName, email:userEmail, userid:userId, password:userPassword});
            if (response) {
                alert("Profile created successfully")
                navigate("/");
            }
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
                <label className="pl-5 pr-5">name :</label>
                <input className="outline-0 text-center" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Edward Snowden"/>
            </div>

            <div className="w-100 py-1 mb-2 bg-[#2d2d2d] rounded-lg">
                <label className="pl-5 pr-5">email :</label>
                <input className="outline-0 text-center" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="text" placeholder="snowden@gmail.com"/>
            </div>

            <div className="w-100 py-1 mb-2 bg-[#2d2d2d] rounded-lg">
                <label className="pl-5 pr-5">username :</label>
                <input className="outline-0 text-center" value={userId} onChange={(e) => setUserId(e.target.value)} type="text" placeholder="snowden2013"/>
            </div>

            <div className="w-100 py-1 mb-2 bg-[#2d2d2d] rounded-lg">
                <label className="pl-5 pr-5">password :</label>
                <input className="outline-0 text-center" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type="password" placeholder="********"/>
            </div>

            <div className=" bg-gradient-to-r from-[#08CB00] to-[#008d7f] bg-clip-text text-transparent font-semibold animate-pulse animate-duration-[3s]">
                <a className="" href="https://annotea.vercel.app/login">Already have a account ? Log In</a>
            </div>

            <button className="px-3 py-2 rounded-xl font-bold hover:cursor-pointer hover:text-[#FFF5F2] bg-[#151515] hover:bg-[#111111] " onClick={handleUserSignUp} >Sign Up</button>
        </div>
    );
}
