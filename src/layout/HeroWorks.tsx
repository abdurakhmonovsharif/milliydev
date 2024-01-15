import { Link } from "react-router-dom"
import { Spinner } from "@nextui-org/react";
import { useGetWorksQuery } from "../redux/api/work.api";

const WorkCard = ({ caption, media_url, site_url }: Work) => {
    return <div className={`relative shadow-lg border border-black/20 rounded-md cursor-pointer h-[227px] group`} >
        <img src={media_url} alt={site_url} className=" object-cover rounded-md w-full h-full group-hover:blur-sm" />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-black/70  hidden group-hover:block border-global_purpe rounded-md border-2 max-w-min py-1 px-2">
            <a target="_blank" href={site_url} className="whitespace-nowrap text-white font-medium ">{caption}</a>
        </button>
    </div>
}
const HeroWorks = () => {
    const { data, isLoading } = useGetWorksQuery();
    const email = "sharifabduraxmonov@email.ru"
    return (
        <section className="px-[3%] py-5 max-w-[1920px] mx-auto">
            <div className="w-full text-center">
                <h1 className="text-global_black70 font-bold text-[29.375px]">My Recent Work</h1>
                <p className="text-global_black70 text-[18.281px]">
                    Here are a few past design projects I've worked on. Want to see more? <a className="underline text-blue-600" href={"mailto:" + email}>Email me</a>.
                </p>
            </div>
            {
                isLoading ? <div className="w-full flex justify-center items-center p-8">
                    <Spinner />
                </div> :
                    <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-2 py-8">
                        {
                            data?.map((work: any) => <WorkCard key={work.id} {...work} />)
                        }
                    </div>
            }
            <div className="w-full flex items-center justify-center ">
                <button className="py-2 px-6 5shadow  border-purple-700 border max-w-min rounded-full flex items-center justify-center gap-x-1.5">
                    <img src="/favicon.ico" alt="git_hub" width={30} height={30} className="object-contain" />
                    <Link target="_blank" to={'https://github.com/abdurakhmonovsharif'} className="whitespace-nowrap font-medium text-global_purpe"> More on Github</Link>
                </button>
            </div>
        </section>
    )
}

export default HeroWorks
