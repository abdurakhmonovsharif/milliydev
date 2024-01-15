import { useTitle } from "../helpers/useTitle"


const MyIntro = () => {
  useTitle("My Into")
  return (
    <section className=" max-w-[1920px] mx-auto text-center p-10">
      <div className="border p-5 rounded-md border-default-200">
        <p className="text-[24px] px-5 text-justify">Hello! I'm Sharif Abdurahimovich Abdurakhmonov, proudly from the captivating city of Bukhara, Uzbekistan. With over 2 years of experience as a full-stack engineer and mentor, my journey in technology has been exhilarating.

          I began my academic exploration at Kagan School and College in Bukhara, specializing in the Automobile Master faculty. Fueled by dedication and a passion for innovation, I've continued my education at Tashkent University of Applied Sciences.

          My coding journey started during my second year in college, facing the challenge of not having a personal laptop. Undeterred, I frequented internet clubs, shaping me into the resilient individual I am today.

          Beyond personal achievements, mentoring over 50 students in the last two years has brought me immense joy. Additionally, I've expanded  my expertise into cyber security at Tashkent University of Applied Sciences.

          Notably, I honed my programming skills at Bukhara Shift Academy. This, coupled with my commitment to excellence, prepares me to contribute meaningfully to the dynamic landscape of technology.

          In essence, my story reflects not only a dedication to technology but also the unwavering spirit propelling me forward. As I evolve on this dynamic path, I remain committed to pushing boundaries, embracing challenges, and contributing to the ever-evolving tech landscape.</p>
      </div>
    </section>
  )
}

export default MyIntro
