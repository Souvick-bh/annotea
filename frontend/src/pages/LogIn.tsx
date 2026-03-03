import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { envFrontend } from "@/config";
import { Popup } from "@/components/ui/PopUp";
import rough from 'roughjs'

export function Login() {
    // const canvasRef = useRef(null)

    const navigate = useNavigate();
    const [popUpContent, setPopUpContent] = useState("")
    const [openPopUp, setOpenPopUp] = useState(false);
    const [popUpType, setPopUpType] = useState("info")

    const [userId, setUserId] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');

    // useEffect(() => {
    //     const c1 = canvasRef.current;
    //     if(c1) {
    //         const rc = rough.canvas(c1);
    //         rc.rectangle(10,10,50,50)
    //     }
    // })

    async function handleUserLogIn() {
        if (!userId || !userPassword) {
            setPopUpType("warning");
            setPopUpContent("Kindly fill the details to Sign-Up")
            setOpenPopUp(true);
            return ;
        }
        try {
            const response = await axios.post(envFrontend.VITE_BACKEND_URL+"/v1/user/login", {userid: userId, password: userPassword})
            const token = response.data.token;
            localStorage.setItem("token",token);
            navigate("/");
        } catch (error) {
            throw(error);
        }
    }

    return (
            <div className="min-h-screen w-full flex justify-center items-center"> 
                <Popup message={popUpContent} messageType={popUpType} isOpen={openPopUp} onClose={() => setOpenPopUp(false)} duration={5000}/>
                {/* <canvas ref={canvasRef}/> */}
                <div id="" className="h-fit w-fit py-2 px-2 border-3 border-[#030303] rounded-lg bg-[#F4EFE6]">
                    <div className="bg-[#030303] text-[#F4EFE6] font-bold pl-8 text-2xl">LOGIN</div>
                    <div className="h-fit w-fit py-3 px-8 border-3 border-[#030303] flex flex-col gap-1">
                        <label className="font-bold mt-1 text-[#030303]">Username</label>
                        <input className="outline-0 border-2 rounded-sm text-start" value={userId} onChange={(e) => setUserId(e.target.value)} type="text" placeholder=""/>
                        <label className="font-bold mt-2 text-[#030303]">Password</label>
                        <input className="outline-0 border-2 rounded-sm text-start " value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type="password" placeholder=""/>
                        <div className="flex justify-center items-center">
                            <button className="w-fit font-bold text-xl hover:cursor-pointer mt-2 py-0.5 px-2 border-2 bg-[#F2C94C] hover:bg-[#e3b52b] border-[#030303] rounded-md" onClick={handleUserLogIn} >LOGIN</button>      
                        </div>         
                    </div>
                </div>
                
            </div>
        );
}
