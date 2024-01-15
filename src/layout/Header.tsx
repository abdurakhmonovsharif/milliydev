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
        <button className='border-global_purpe border-2 lg:px-5 px-3 py-2.5 rounded-3xl'>
          <Link to={'/my_intro'} className='no-underline text-global_purpe text-[17px] leading-[27px]'>My intro</Link>
        </button>
      </nav>
    </header>
  )
}

export default Header
