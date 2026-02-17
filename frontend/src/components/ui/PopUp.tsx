import { useState } from "react";


export function Popup(props: any) {
    const [appear, setAppear] = useState<boolean>(true);
   
    setAppear(true);

    setTimeout(()=>setAppear(false),5000)
    return (
        <div className="absolute top-10 bg-[#2d2d2d] rounded-3xl">
            {appear ? (<p id="messagebar" className="border border-[#5f5f5f] text-[#7f7f7f] py-4 px-6 rounded-3xl">{props.message}</p>):null}
        </div>
    );
}
