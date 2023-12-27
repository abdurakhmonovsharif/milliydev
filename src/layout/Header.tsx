import { Link, useLocation } from 'react-router-dom'
const Header = () => {
  const { pathname } = useLocation()
  return (
    <header className={`max-w-[1920px] mx-auto bg-white ${pathname.includes('my_intro') ? "border-b" : "border-none"}`}>
      <nav className='flex items-center justify-between px-[3%] py-5'>
        <div className='w-[90px] h-[60px]'>
          <Link to={"/"}>
            <img src="/favicon.ico" alt="icon" className='w-full h-full object-contain ' />
          </Link>
        </div>
        <div className='flex items-center gap-x-6'>
          <Link to={'/my_intro'} className='text-global_black70 text-base leading-[27px] no-underline '>My intro</Link>
          <button className='border-global_purpe border-2 lg:px-5 px-3 py-2.5 rounded-3xl'>
            <Link to={'#'} className='no-underline text-global_purpe text-[17px] leading-[27px]'>Say Hello</Link>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
