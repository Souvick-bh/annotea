import { Createcontentmodel } from "@/components/ui/CreateContentModel";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    // const [popUpContent, setPopUpContent] = useState("")
    // const [openPopUp, setOpenPopUp] = useState(false);
    // const [popUpType, setPopUpType] = useState("info")

    // useEffect(() => {
    //     if(localStorage.getItem("token") == "") {
    //         navigate("/login");
    //     }
    // }, []) 
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token || token === "null" || token === "undefined" || token.trim() === "") {
            navigate("/login");
        } else {
            axios.get(envFrontend.VITE_BACKEND_URL+"/v1/memory/getallmemory",{headers: {"Authorization": localStorage.getItem("token")}})
            .then((response) => {setContent(response.data.memory_list)})
        }
    },[])
    return (
        <div className="flex flex-row">
            <div className="top-0 left-0 h-screen w-28 sm:w-40 md:w-60 py-5 px-8 border-r-2 bg-[#F4EFE6] border-[#111111] flex flex-col items-center hover:cursor-pointer font-bold gap-4 text-[#030303]">  
                <button className="flex flex-row px-3 py-2 rounded-sm hover:cursor-pointer hover:text-[#F4EFE6] hover:bg-[#030303] gap-1" onClick={() => setContentModal(true)}>
                    NOTES
                    <div className="text-lg font-bold pt-1">
                        <IoMdAddCircleOutline />
                    </div>
                </button>
                <button className=" flex flex-row px-3 py-2 rounded-sm hover:cursor-pointer hover:text-[#F4EFE6] hover:bg-[#111111] gap-2" >
                    SHARE
                    <div className=" font-bold pt-1">
                        <FaShareAlt />
                    </div>
                </button>
            </div>
            <Createcontentmodel open={contentModal} onClose={() => setContentModal(false)}  />
            <Updatecontentmodel open={updatePopUp} onClose={() => setUpdatePopUp(false)} memory={selectedMemory}/>
            <div className="w-full py-5 px-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " >
                {content.map(({ucode,title,content}) => <Memcard key={ucode} ucode={ucode} title={title} content={content} 
                onEdit={() => {
                    setSelectedMemory({ucode, title, content});
                    setUpdatePopUp(true);
                }}/>)}
            </div>           
        </div>
    );
}
