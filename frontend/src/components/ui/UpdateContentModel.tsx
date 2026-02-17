import { useEffect, useState } from "react";
import { envFrontend } from "@/config";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { type Memory } from "../utils/types";

interface UpdateContentModelProp {
    open: boolean,
    onClose: () => void,
    memory: Memory | null
}

export function Updatecontentmodel({open, onClose, memory}: UpdateContentModelProp) {

    const [contentTitle, setContentTitle] = useState<string>('')
    const [content, setContent] = useState<string>('');

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
                alert("Memory updated successfully.")
            }
        } catch (error) {
            throw error;
        }
    }

    return (
            <div>
                {open && <div className="w-screen h-screen backdrop-blur-xs fixed top-0 left-0 flex justify-center items-center font-bold">
                        <div className="flex flex-col justify-center items-center">
                            <span className="relative w-fit h-fit bg-[#2a2a2a] opacity-100 rounded-2xl py-4 px-4 flex flex-col gap-5">
                                <div className="absolute top-4 right-5 p-1 rounded-full text-2xl hover:bg-[#474747] active:bg-[#676767]" onClick={onClose}><RxCross2 /></div>
                                    <input className="bg-[#111111] w-85 py-1 outline-0 rounded-xl  text-md text-center text-[#ffffff]" value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} type="text" placeholder="Title"/>
                                    <textarea className="bg-[#111111] w-100 h-50 py-1 outline-0 rounded-xl  text-md text-center text-[#ffffff]" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"/>
                                    {/* <input className="bg-[#111111] w-100 py-1 outline-0 rounded-xl  text-md text-center text-[#ffffff]" value={contentTags} onChange={(e) => setContentTags(...contentTags, e.target.value)} type="text" placeholder="imp , note"/> */}
                                    <button className="px-3 py-2 rounded-xl font-bold  hover:cursor-pointer text-[#7c7c7c] hover:text-[#FFF5F2] bg-[#151515] hover:bg-[#111111] " onClick={handleNoteUpdating}>Update</button>
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
