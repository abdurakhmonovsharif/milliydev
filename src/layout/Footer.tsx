import { Link } from "react-router-dom"
import { C_icon } from "../helpers/Icons"

const social_mediaArray = [
    {
        link: "https://linkedin.com/abdurakhmonovsharif",
        image_url: "/in.svg"
    },
    {
        link: "https://github.com/abdurakhmonovsharif",
        image_url: "/github.png"
    },
    {
        link: "https://instagram.com/abdurakhmonov.fd",
        image_url: "/instagram.png",
    },
    {
        link: "sharifabduraxmonov@mail.ru",
        image_url: "/mail.svg",
        mail: true
    }
]
const Footer = () => {
    return (
        <footer className='space-y-5 bg-global_purpe w-full py-[20px]'>
            <div className="w-full grid place-content-center place-items-center gap-y-4">
                <div className='w-[90px] h-[60px]'>
                    <img src="/favicon_white.png" alt="icon" className='w-full h-full object-contain' />
                </div>
                <h1 className='lg:text-[21.9px] text-[18px] text-white leading-[28.8px] text-center '>Living, learning, & leveling up <br />
                    one day at a time.</h1>
                <div className="w-full flex items-center justify-center gap-x-4 ">
                    {
                        social_mediaArray.map(item => <Link key={item.link} to={item.mail ? `mailto:${item.link}` : item.link}>
                            <div className="w-[45px] h-[45px] p-2 border  rounded-full">
                                <img src={item.image_url} alt="#404" className="w-full h-full object-contain" />
                            </div>
                        </Link>)
                    }
                </div>
            </div>
            <div className="w-full grid place-content-center place-items-center">
                <span className="flex  items-center w-full mt-5 text-white gap-x-1.5 text-[16.734px] leading-[27px]">Handcrafted by me <C_icon /> Abdurakhmonov</span>
            </div>
        </footer>
    )
}

export default Footer
