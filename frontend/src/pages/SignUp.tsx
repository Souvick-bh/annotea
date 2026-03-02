import { envFrontend } from "@/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Popup } from "@/components/ui/PopUp";

export function Signup() {

    const navigate = useNavigate();
    const [popUpContent, setPopUpContent] = useState("")
    const [openPopUp, setOpenPopUp] = useState(false);
    const [popUpType, setPopUpType] = useState("info")

    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
   

    async function handleUserSignUp() {
        if(!userName || !userEmail || !userId || !userPassword ) {
            setPopUpType("warning");
            setPopUpContent("Fill The Sections Properly");
            setOpenPopUp(true);
            return ;
        }
        //const userbody = {name:userName, email:userEmail, userid:userId, password:userPassword};
        try {
            const response = await axios.post(envFrontend.VITE_BACKEND_URL+"/v1/user/signup",{name:userName, email:userEmail, userid:userId, password:userPassword});
            if (response) {
                setPopUpType("success");
                setPopUpContent("Your Account Created Successfully");
                setOpenPopUp(true);
                setTimeout(() => {
                    navigate("/");
                }, 5000)
            }
        } catch (error) {
            throw(error);
        }
    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <Popup message={popUpContent} messageType={popUpType} isOpen={openPopUp} onClose={() => setOpenPopUp(false)} duration={5000}/>
            <div className="h-fit w-fit py-2 px-2 border-3 border-[#030303] rounded-lg">
               <div className="bg-[#030303] text-[#F4EFE6] font-bold pl-8 text-2xl">SIGNUP</div>
                <div className="h-fit w-fit py-3 px-8 border-3 border-[#030303] flex flex-col gap-1">
                    <label className="font-bold mt-1 text-[#030303]">Name</label>
                    <input className="outline-0 border-2 rounded-sm text-start" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder=""/>
                    <label className="font-bold mt-2 text-[#030303]">Email</label>
                    <input className="outline-0 border-2 rounded-sm text-start" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="text" placeholder=""/>
                    <label className="font-bold mt-2 text-[#030303]">Username</label>
                    <input className="outline-0 border-2 rounded-sm text-start" value={userId} onChange={(e) => setUserId(e.target.value)} type="text" placeholder=""/>   
                    <label className="font-bold mt-2 text-[#030303]">Password</label>
                    <input className="outline-0 border-2 rounded-sm text-start" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type="password" placeholder=""/>
                     <div className="flex justify-center items-center">
                        <button className="w-fit font-bold text-xl hover:cursor-pointer mt-2 py-0.5 px-2 border-2 bg-[#E78FB3] hover:bg-[#e775a4] border-[#030303] rounded-md" onClick={handleUserSignUp} >SIGNUP</button>      
                    </div>   
                </div>    
            </div>    
        </div>
    );
}
