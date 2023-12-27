import { useTitle } from "../helpers/useTitle"


const MyIntro = () => {
  useTitle("My Into")
  return (
    <section className="h-96 max-w-[1920px] mx-auto text-center p-10">
      <h1 className="font-semibold text-[48px]">Hi I'm Abdurakhmonov Sharif </h1>
    </section>
  )
}

export default MyIntro
