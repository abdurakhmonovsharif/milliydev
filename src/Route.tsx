import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./page/Home";
import MyIntro from "./page/MyIntro";
import HeroSection from "./layout/HeroSection";
import HeroMiniAboutMe from "./layout/HeroMiniAboutMe";
import HeroExperience from "./layout/HeroExperience";
import HeroWorks from "./layout/HeroWorks";
import Works from "./page/admin/Works.admin";
import Settings from "./page/admin/Settings.admin";
import WorksActions from "./page/admin/Works.create.admin";
import WorksList from "./page/admin/Works.lists.admin";
import Login from "./page/auth/Login";
import React, { Suspense } from "react";
import NotFound from "./page/NotFound";
const Admin = React.lazy(() => import("./page/admin/Home.admin"))
const Route = () => {
  const routes = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />
    }
    ,
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: (
            <main>
              <HeroSection />
              <HeroMiniAboutMe />
              <HeroExperience />
              <HeroWorks />
            </main>
          ),
        },
        {
          path: "/my_intro",
          element: <MyIntro />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <Suspense fallback={"...Loading"}>
        <Admin />
      </Suspense>,
      children: [
        {
          path: "/admin/works",
          element: <Works />,
          children: [
            {
              path: "/admin/works/list",
              element: <WorksList />,
            },
            {
              path: "/admin/works/:path",
              element: <WorksActions />,
            },
          ],
        },
        {
          path: "/admin/settings",
          element: <Settings />,
        },
      ],
    },
  ]);
  return <RouterProvider fallbackElement={<Login />} router={routes} />;
};

export default Route;
