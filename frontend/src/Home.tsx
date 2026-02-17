import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import annotea from "./assets/images/annotea.png"

export function Home() {

    const [loggedIn, setLoggedIn] = useState("Log In");

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setLoggedIn("Sign Out");
        }
    },[]);


    //  const wrongUsArr = ['imp','she','love'];
    //  const wrongUsContent = "I know,I should have told her about my side.But I always feared she might be different from that very moment.That's the regret I will carry forever."
    //  const f1tags = ['rush']
    //  const f1Content = "Those cups are nothing but pieces of metals,what I earn is their respect."
    return (
        <div className='relative w-full min-h-screen'>
            

            <div className='h-50px w-full flex flex-row py-2 justify-center items-center border-b-2 border-[#111111]'>
                <div className='absolute left-16 w-30'>
                    <img src={annotea} alt="" />
                </div>
                <div className='flex flex-row px-3 py-2 rounded-xl hover:cursor-pointer hover:bg-[#111111] hover:text-[#FFF5F2] text-[#7c7c7c] text-lg font-bold gap-2'>
                    <Link to="/dashboard">Works</Link> 
                    <div className='object-bottom text-xs animate-pulse animation-duration-[3s] translate-y-2'>
                        <FaLocationArrow />
                    </div>
                </div>
                <div className='absolute right-16 flex flex-row text-lg hover:cursor-pointer font-bold gap-7 text-[#7c7c7c] '>
                    <div className='text-2xl px-3 py-2 rounded-full hover:cursor-pointer hover:text-[#FFF5F2] hover:bg-[#111111]'>
                        <FaGithub />
                    </div>
                    <div className='px-3 py-2 rounded-xl hover:cursor-pointer hover:text-[#FFF5F2] hover:bg-[#111111]'>
                        <Link to="/login">{loggedIn}</Link>
                    </div>
                </div>
            </div>

            <span className='h-1 w-full bg-[#ffffff]'></span>

            <div className='relative md:absolute md:top-10 md:right-0 '>
                
            </div>
        </div>
    );
}
