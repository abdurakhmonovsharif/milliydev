import { ReactNode } from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
const IsMenuDrawer=(
    {children,open,toogleSidebar}
    :{children:ReactNode|any,open:boolean,toogleSidebar:()=>void}
    )=>{
    if(open){
     return <Drawer
       open={open}
      onClose={toogleSidebar}
      direction='left'>
    <aside className=" lg:hidden  max-w-[280px] h-screen p-2.5 dark:bg-default-50 border-r dark:border-default-100">
    {children}
    </aside>
    </Drawer>
    }else{
     return <aside className=" lg:block hidden max-w-[280px] h-screen p-2.5 dark:bg-default-50 border-r dark:border-default-100">
     {children}
     </aside>;
    }
    }
export default IsMenuDrawer;