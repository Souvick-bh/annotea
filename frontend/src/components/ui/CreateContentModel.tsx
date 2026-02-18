import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import axios from "axios";
import { envFrontend } from "@/config";
import { Popup } from "./PopUp";

interface CreateContentModelProp {
    open: boolean,
    onClose: () => void,
}

export function Createcontentmodel({open, onClose} : CreateContentModelProp) {
    const [contentTitle, setContentTitle] = useState<string>('')
    const [content, setContent] = useState<string>('');
    const [popUpContent, setPopUpContent] = useState("")
    const [openPopUp, setOpenPopUp] = useState(false);
    const [popUpType, setPopUpType] = useState("info")

    async function handleNoteMaking() {
        if(!contentTitle || !content) {
            setPopUpType("warning");
            setPopUpContent("Fill The Title and Content")
            setOpenPopUp(true);
            onClose();
        };
        try {
            const response = await axios.post(envFrontend.VITE_BACKEND_URL+"/v1/memory/creatememory",{title:contentTitle, content:content},{headers: {"Authorization": localStorage.getItem("token")}});
            if(response) {
                setPopUpType("success");
                setPopUpContent("Memory Created Successfully")
                setOpenPopUp(true);
                onClose();
                setContentTitle("");
                setContent("");
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <div>
            <Popup message={popUpContent} messageType={popUpType} isOpen={openPopUp} onClose={() => setOpenPopUp(false)} duration={5000}/>
            {open && <div className="w-screen h-screen backdrop-blur-xs fixed top-0 left-0 flex justify-center items-center font-bold">
                    <div className="flex flex-col justify-center items-center">
                        <span className="relative w-fit h-fit bg-[#2a2a2a] opacity-100 rounded-2xl py-4 px-4 flex flex-col gap-5">
                            <div className="absolute top-4 right-5 p-1 rounded-full text-2xl hover:bg-[#474747] active:bg-[#676767]" onClick={onClose}><RxCross2 /></div>
                                <input className="bg-[#111111] w-85 py-1 outline-0 rounded-xl  text-md text-center text-[#ffffff]" value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} type="text" placeholder="Title"/>
                                <textarea className="bg-[#111111] w-100 h-50 py-1 outline-0 rounded-xl  text-md text-center text-[#ffffff]" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"/>
                                {/* <input className="bg-[#111111] w-100 py-1 outline-0 rounded-xl  text-md text-center text-[#ffffff]" value={contentTags} onChange={(e) => setContentTags(...contentTags, e.target.value)} type="text" placeholder="imp , note"/> */}
                                <button className="px-3 py-2 rounded-xl font-bold  hover:cursor-pointer text-[#7c7c7c] hover:text-[#FFF5F2] bg-[#151515] hover:bg-[#111111] " onClick={handleNoteMaking}>Add</button>
                        </span>
                    </div>
            </div>}
        </div>
    );
}
