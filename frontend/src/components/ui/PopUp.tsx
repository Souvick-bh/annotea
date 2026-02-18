import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


// export type MessageType = "info" | "warning" | "success" | "miscellaneous";

interface MessageProps {
    message: string,
    messageType: string,
    isOpen: boolean,
    onClose: () => void,
    duration: number
}

export function Popup({message, messageType, isOpen, onClose, duration}: MessageProps) {
    

    useEffect(() => {
        if(!isOpen) return
        setTimeout(() => {
            onClose()
        }, duration)
    }, [isOpen, duration, onClose])

    const messageVariant = {
        "info": "text-[#FFEDC7]",
        "success": "text-[#48A111]",
        "warning": "text-[#EB4C4C]",
        "miscellaneous": "text-[#3A9AFF]"
    }

    if(!isOpen) return null
    
    return (
        <div className={`absolute top-15 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-in-out ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="fixed top-6 left-1/2 -translate-x-1/2">
                        <div className=" bg-[#000000] py-2 px-2 min-w-100 text-center rounded-2xl border border-[#3C3D37]">
                            <div className="bg-[#2b2b2a] py-3 px-3 rounded-lg border border-[#000000]">
                                <div className={`font-semibold ${messageVariant[messageType as keyof typeof messageVariant]}`}>{message}</div>
                            </div>
                         </div>
                    </motion.div>
                 )}
            </AnimatePresence>
        </div>
    );
}
