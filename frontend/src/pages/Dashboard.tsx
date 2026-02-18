import { Createcontentmodel } from "@/components/ui/CreateContentModel";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import annotea from "../assets/images/annotea.png"
import { Link } from "react-router-dom";
import axios from "axios";
import { envFrontend } from "@/config";
import { Memcard } from "@/components/ui/memcard";
import { Updatecontentmodel } from "@/components/ui/UpdateContentModel";
import { type Memory } from "@/components/utils/types";


export function Dashboard() {
    const [contentModal, setContentModal] = useState<boolean>(false)
    const [content, setContent] = useState([])
    const [updatePopUp, setUpdatePopUp] = useState(false)
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
    // const [popUpContent, setPopUpContent] = useState("")
    // const [openPopUp, setOpenPopUp] = useState(false);
    // const [popUpType, setPopUpType] = useState("info")
    
    useEffect(() => {
        axios.get(envFrontend.VITE_BACKEND_URL+"/v1/memory/getallmemory",{headers: {"Authorization": localStorage.getItem("token")}})
        .then((response) => {setContent(response.data.memory_list)})
        
    },[content])
    return (
        <div className="flex flex-row">
            <div className="top-0 left-0 h-screen w-60 py-5 px-8 border-r-2 border-[#111111] flex flex-col items-center text-md hover:cursor-pointer font-semibold gap-4 text-[#7c7c7c]">

                <Link to="/">
                    <div className="w-30">
                        <img src={annotea} alt="" />
                    </div>
                </Link>

                <button className="flex flex-row px-3 py-2 rounded-xl hover:cursor-pointer hover:text-[#FFF5F2] hover:bg-[#111111] gap-1" onClick={() => setContentModal(true)}>
                    Add Content 
                    <div className="text-lg font-bold pt-1">
                        <IoMdAddCircleOutline />
                    </div>
                </button>

                <button className=" flex flex-row px-3 py-2 rounded-xl hover:cursor-pointer hover:text-[#FFF5F2] hover:bg-[#111111] gap-2" >
                    Share Brain
                    <div className=" font-bold pt-1">
                        <FaShareAlt />
                    </div>
                </button>
            </div>

            <Createcontentmodel open={contentModal} onClose={() => setContentModal(false)}  />
            <Updatecontentmodel open={updatePopUp} onClose={() => setUpdatePopUp(false)} memory={selectedMemory}/>

            <div className="py-5 px-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {content.map(({ucode,title,content}) => <Memcard key={ucode} ucode={ucode} title={title} content={content} 
                onEdit={() => {
                    setSelectedMemory({ucode, title, content});
                    setUpdatePopUp(true);
                }}/>)}
            </div>
            
        </div>
    );
}
