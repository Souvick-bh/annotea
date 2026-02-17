import { envFrontend } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Memcard } from "@/components/ui/memcard";
import { type Memory } from "@/components/utils/types";


export function GetMemory() {
    const {ucode} = useParams<{ucode: string}>();
    const [content, setContent] = useState<Memory | null>(null)

    useEffect(() => {
        if(ucode) {
            axios.get(envFrontend.VITE_BACKEND_URL+"/v1/memory/"+ucode)
            .then((response) => setContent(response.data.memory));
        }
    },[ucode])
    

    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <Memcard ucode={content?.ucode} title={content?.title} content={content?.content} />
        </div>
    );
}
