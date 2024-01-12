import { Button } from "@nextui-org/react";
import { LogOutIcon } from "../../helpers/Icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";
import { setSidebarOpen } from "../../redux/reducers/sidebar.reducer";
import IsMenuDrawer from "../../helpers/Drawwer";
import { clearUser } from "../../redux/reducers/user.reducer";
const Sidebar = () => {
  const { open } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();
  const toogleSidebar = () => {
    dispatch(setSidebarOpen(false));
  }
  const navigate = useNavigate();
  const navigator = (path: string) => {
    navigate(path);
    toogleSidebar()
  }
  const logOut = () => {
    navigate("/login")
    dispatch(clearUser())
    localStorage.clear()
  }
  return (
    <IsMenuDrawer open={open} toogleSidebar={toogleSidebar} >
      <React.Fragment>
        <Link to="/admin/works/list">
          <div className="w-full flex items-center gap-x-4 justify-center">
            <img src="/favicon.ico" alt="icon" width={50} height={50} className="object-contain" />
            <span className="dark:text-white text-global_purpe text-2xl">Milliy Dev</span>
          </div>
        </Link>
        <div className="h-[calc(100vh-70px)]  justify-between flex flex-col gap-y-3 pt-6">
          <div className="space-y-4 ">
            <Button onClick={() => navigator("/admin/works/create")} className="w-full text-white bg-global_purpe">
              <span className="text-base"> <span className="text-xl">+</span> Create Work</span>
            </Button>
            <Button onClick={() => navigator("/admin/works/list")} className="w-full text-white bg-global_purpe">
              <span className="text-base">Works</span>
            </Button>
            <Button onClick={() => navigator("/admin/settings")} className="w-full text-white bg-global_purpe">
              <span className="text-base">Settings</span>
            </Button>
          </div>
          <Button onClick={logOut} className="w-full text-white bg-global_purpe">
            <LogOutIcon />
            <span className="text-base">Log out</span>
          </Button>
        </div>
      </React.Fragment>
    </IsMenuDrawer>
  )
}

export default Sidebar;
