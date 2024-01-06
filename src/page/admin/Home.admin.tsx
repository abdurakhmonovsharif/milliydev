import { useDispatch, useSelector } from "react-redux";
import { setDark } from "../../redux/reducers/theme.reducer";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar.admin";
import { Outlet, useNavigate } from "react-router-dom";
import { setSidebarOpen } from "../../redux/reducers/sidebar.reducer";
import {
  MenuIconBlack,
  MenuIconWhite,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "../../helpers/Icons";
import { Button, Input } from "@nextui-org/react";
import { useTitle } from "../../helpers/useTitle";
import { useGetWorksByCaptionQuery } from "../../redux/api/work.api";
import { clearAll, setWorkState } from "../../redux/reducers/work.reducer";
import { useGetMeQuery } from "../../redux/api/user.api";
import { setUser } from "../../redux/reducers/user.reducer";
const Admin = () => {
  useTitle("Admin");
  const l_auth = localStorage.getItem("user_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dark } = useSelector((state: RootState) => state.theme);
  const { auth } = useSelector((state: RootState) => state.user);
  const { open } = useSelector((state: RootState) => state.sidebar);
  const { data: userData, isLoading } = useGetMeQuery(undefined, { skip: !(l_auth != null && auth == false) });
  const workState = useSelector((state: RootState) => state.work);
  useEffect(() => {
    if (userData) {
      dispatch(setUser({ user: userData.data, auth: true }))
    }
  }, [isLoading]);
  const [searchValue, setSearchValue] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  useEffect(() => {
    location.pathname === "/admin" && navigate("/admin/works");
    const dark_localstorege = localStorage.getItem("dark") || false;
    dispatch(
      setDark(
        dark_localstorege === "true"
          ? true
          : dark_localstorege == "false"
            ? false
            : false
      )
    );
  }, []);
  const toogleSidebar = () => {
    dispatch(setSidebarOpen(!open));
  };
  const setTheme = () => {
    dispatch(setDark(!dark));
    localStorage.setItem("dark", JSON.stringify(!dark));
  };
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.trim() === "") {
      return;
    }
    if (value == "") {
      dispatch(clearAll());
      return;
    }
    dispatch(
      setWorkState({
        ...workState,
        isSearching: !!value,
        isLoadingSearch: true,
      })
    );
    navigate("/admin/works/list")
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const newTimeout = setTimeout(() => {
      setSearchValue(value);
    }, 2500);

    setSearchTimeout(newTimeout);
  };
  const { data: workData, isFetching } = useGetWorksByCaptionQuery(
    { caption: searchValue },
    { skip: searchValue == "" }
  );

  useEffect(() => {
    dispatchWorkState()
  }, [isFetching]);
  const dispatchWorkState = () => {
    if (workData)
      dispatch(
        setWorkState({
          ...workState,
          searchedWorks: workData?.data,
          isLoadingSearch: false,
        })
      );
  }
  return (
    <main className={`${dark && "dark"} flex justify-between bg-default-50`}>
      <Sidebar />
      <div className="block w-full p-3">
        <nav className="flex  items-center justify-between gap-x-2 border-b dark:border-default-100 pb-5">
          <Button
            onClick={toogleSidebar}
            isIconOnly
            className="p-1.5 lg:hidden bg-default-100">
            {dark ? <MenuIconWhite /> : <MenuIconBlack />}
          </Button>
          <Input
            type="text"
            placeholder="Search for a job by title"
            labelPlacement="outside"
            onChange={handleSearch}
            startContent={<SearchIcon />}
          />
          <Button onClick={setTheme} isIconOnly className="bg-default-100">
            {dark ? <MoonIcon /> : <SunIcon />}
          </Button>
        </nav>
        <Outlet />
      </div>
    </main>
  );
};

export default Admin;
