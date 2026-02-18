import { envFrontend } from "@/config";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { Popup } from "./PopUp";

export function Memcard(props: any) {   

    const [popUpContent, setPopUpContent] = useState("")
    const [openPopUp, setOpenPopUp] = useState(false);
    const [popUpType, setPopUpType] = useState("info");
    const [shareLink, setShareLink] = useState("https://annotea.vercel.app/memory/"+props?.ucode);

    const ColorVariants = {
        'FF6D1F': 'text-[#FF6D1F]',
        'ABE0F0': 'text-[#ABE0F0]',
        '3B9797': 'text-[#3B9797]',
        'FB773C': 'text-[#FB773C]'
    };

    function handleEdit() {
        props.onEdit();
    }

    async function handleSharing() {
        const response = await axios.patch(envFrontend.VITE_BACKEND_URL+"/v1/memory/"+props.ucode, {},{headers: {"Authorization": localStorage.getItem("token")}});
        if(response) {
            await navigator.clipboard.writeText(shareLink);
            setPopUpType("info");
            setPopUpContent("Your Sharable Link Created & Copied "+shareLink);
            setOpenPopUp(true);
        }
    }

    async function handleDelete() {
        await axios.delete(envFrontend.VITE_BACKEND_URL+"/v1/memory/"+props.ucode,{headers: {"Authorization": localStorage.getItem("token")}});
        setPopUpType("miscellaneous");
        setPopUpContent("Your Memory Deleted Successfully")
        setOpenPopUp(true);
    }


    return (
        <div className="flex flex-col py-3 px-2 justify-center items-center border-dashed border rounded-4xl bg-transparent text-[#fff5f2] h-fit max-w-60">
            {/* <img src={props.src} alt="" className=" p-2 overflow-hidden rounded-t-4xl" /> */}
            <Popup message={popUpContent} messageType={popUpType} isOpen={openPopUp} onClose={() => setOpenPopUp(false)} duration={5000}/>
            <div className="flex gap-3 mb-2" >
                <div className="text-xs pt-1">
                    {props.ucode}
                </div>
                <div className="flex flex-row gap-2 text-lg">
                    <div className="hover:animate-pulse hover:cursor-pointer hover:text-[#dfdfdf]" onClick={handleEdit}><FaEdit /></div>
                    <div className="hover:animate-pulse hover:cursor-pointer hover:text-[#dfdfdf]" onClick={handleSharing}><FaShareAlt /></div>
                    <div className="hover:animate-pulse hover:cursor-pointer hover:text-[#dfdfdf]" onClick={handleDelete}><MdDelete /></div>
                </div>
            </div>
            <h1 className={`text-xl font-extrabold ${ColorVariants[props.titleColor as keyof typeof ColorVariants]}`}>{props.title}</h1>

            <div className="flex flex-row">
                {/* <div className={`text-[14px] p-2 font-bold ${ColorVariants[props.tagsColor as keyof typeof ColorVariants]}`}>
                    {props.tags.map((tag: string, index: number) => (<h3 key={index}>#{tag}</h3>))}
                </div> */}
                <div className="text-xs p-2 font-light">{props.content}</div>
            </div>
        </div>
    );
}




