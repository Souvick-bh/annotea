import { useEffect, useState } from "react";
import { envFrontend } from "@/config";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { type Memory } from "../utils/types";
import { Popup } from "./PopUp";

interface UpdateContentModelProp {
    open: boolean,
    onClose: () => void,
    memory: Memory | null
}

export function Updatecontentmodel({open, onClose, memory}: UpdateContentModelProp) {

    const [contentTitle, setContentTitle] = useState<string>('')
    const [content, setContent] = useState<string>('');
    const [popUpContent, setPopUpContent] = useState("")
    const [openPopUp, setOpenPopUp] = useState(false);
    const [popUpType, setPopUpType] = useState("info")

    useEffect(() => {
        if(memory) {
            setContentTitle(memory.title);
            setContent(memory.content);
        }
    }, [memory])

    async function handleNoteUpdating() {
        try {
            const response = await axios.put(envFrontend.VITE_BACKEND_URL+"/v1/memory/"+memory?.ucode,{title:contentTitle, content:content},{headers: {"Authorization": localStorage.getItem("token")}});
            if(response) {
                setPopUpType("info");
                setPopUpContent("Memory Updated Successfully")
                setOpenPopUp(true);
                onClose();
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
                            <span className="relative w-fit h-fit bg-[#F4EFE6] border-2 border-[#030303] rounded-lg py-4 px-4 flex flex-col gap-1">
                                <div className="absolute top-4 right-5 p-1 rounded-full text-2xl font-bold cursor-pointer hover:bg-[#030303] hover:text-[#F4EFE6] active:bg-[#050505]" onClick={onClose}><RxCross2 /></div>
                                    <input className=" w-85 py-1 outline-0 border-2 rounded-sm text-md text-start " value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} type="text" placeholder="Title"/>
                                    <textarea className="w-100 h-50 py-1 mt-2 outline-0 border-2 rounded-sm text-md text-start " value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"/>
                                    {/* <input className="bg-[#111111] w-100 py-1 outline-0 rounded-xl  text-md text-center text-[#ffffff]" value={contentTags} onChange={(e) => setContentTags(...contentTags, e.target.value)} type="text" placeholder="imp , note"/> */}
                                    <div className="flex justify-center items-center">
                                        <button className="w-fit font-bold text-xl hover:cursor-pointer mt-2 py-0.5 px-2 border-2 bg-[#E78FB3] hover:bg-[#e775a4] border-[#030303] rounded-md" onClick={handleNoteUpdating} >UPDATE</button>      
                                    </div> 
                            </span>
                        </div>
                </div>}
            </div>
        );return (
        <div>
            <h1>Updatecontentmodel</h1>
        </div>
    );
}
