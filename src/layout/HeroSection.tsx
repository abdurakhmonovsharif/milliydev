import md_avatar from '/photo_2023-09-05_21-33-09.jpg'
import hero_devices from '../assets/hero-devices.svg'
const HeroSection = () => {
    return (
        <section className="px-[3%] pt-14 flex lg:gap-y-20  flex-col items-center">
            <div className='lg:h-[calc(100vh-220px)] mb-10 lg:max-h-[650px] flex flex-col gap-y-20  lg:justify-between items-center'>
                <div className="w-full  text-center space-y-3">
                    <h1 className="lg:text-[43px] text-[23px]  text-global_black70 lg:leading-[54px] leading-[27px] font-extrabold">Full Stack Engineer & Mentor</h1>
                    <p className="lg:text-[22.125px] text-[18px] text-global_black70 lg:leading-[36px] leading-[27px]">I design and code beautifully simple things, and I love what I do.</p>
                </div>
                <div className='lg:w-[220px]  lg:h-[220px] w-[180px] h-[180px] border border-global_purpe/75 shadow-md rounded-[50%]'>
                    <img src={md_avatar} alt="avatar" className='w-full h-full object-cover rounded-[50%]' />
                </div>
            </div>
            <div>
                <img src={hero_devices} alt="" />
            </div>
        </section>
    )
}

export default HeroSection
