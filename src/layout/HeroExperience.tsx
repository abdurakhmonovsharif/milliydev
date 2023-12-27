import { BookIcon, CodeIcon, ServerIcon } from "../helpers/Icons"
const toolsArray = [
    {
        rounded: "lg:rounded-s-xl lg:rounded-none rounded-xl",
        margin: "mt-[45px]",
        title: "Frontend Developer",
        icon: <CodeIcon />,
        paragraph: "I like to code things from scratch, and enjoy bringing ideas to life in the browser.",
        last_title: "Technologies I use:",
        langs: ["HTML", "CSS", "Sass", "React", "JavaScript", "Next Js", "Tailwind Css", "Bootstrap", "Material UI", "Vs Code", "Github", "Chakra UI", "Terminal", "TypeScript"]
    },
    {
        rounded: "lg:rounded-none lg:rounded-none rounded-xl",
        margin: "mt-5",
        title: "Backend Developer",
        icon: <ServerIcon />,
        paragraph: "I enjoy crafting code from the ground up and relish transforming concepts into reality on the server side.",
        last_title: "Technologies  I use:",
        langs: ["Java", "Node Js", "Express Js", "Spring Boot", "Spring", "Swagger UI", "Intellij Idea", "Socked io", "Mongo DB", "Postgres", "Database Design"]
    },
    {
        rounded: "lg:rounded-e-xl lg:rounded-none rounded-xl",
        margin: "mt-[73px]",
        title: "Mentor",
        icon: <BookIcon />,
        paragraph: "UX/UI, Product design, Freelancing",
        last_title: "Experiences I draw from:",
        langs: ["UX/UI", "Product design", "Freelancing", "1 bootcamps", "40+ students"]
    }
]
const HeroExperience = () => {
    return (
        <section className="grid lg:grid-cols-3 gap-y-3 md:grid-cols-1 grid-rows-1   relative -top-[3rem] z-10 px-[3%] max-w-[1344px]   mx-auto  ">
            {
                toolsArray.map((item, index) => <div key={index} className={`shadow-md min-w-min  ${item.rounded} } px-[30px] min-w-[300px] border bg-white max-h-[880px]  border-[#E6ECF8] py-[70px] flex items-center justify-between  flex-col `}>
                    <div className="flex flex-col items-center gap-[25px]">
                        <div className="bg-[#5BE9B9] w-[80px] h-[80px] rounded-full flex items-center justify-center">
                            {item.icon}
                        </div>
                        <h1 className="text-[21.188px] font-extrabold leading-[27px] text-global_black70 whitespace-nowrap">{item.title}</h1>
                        <p className="text-global_black70  text-[16.594px] leading-[27px] text-center">{item.paragraph}
                        </p>
                    </div>
                    <div className={`space-y-10 h-full w-full ${item.margin}`} >
                        <div>
                            <h5 className="text-global_purpe text-[16.313px] leading-[27px] font-medium text-center">{item.last_title}</h5>
                            {
                                item.langs.map((tool,index_2) => <p key={index_2} className="text-global_black70 font-medium mt-2 text-[16.594px] leading-[27px] text-center">{tool}</p>)
                            }
                        </div>
                    </div>
                </div>)
            }

        </section>
    )
}

export default HeroExperience
