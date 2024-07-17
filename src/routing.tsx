import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Suspense } from "react";

import { LoginPage,HomePage,HomeLoader,FavoritesPage,FavoritesLoader, DetailPage, DetailLoader } from "./pages";
import { LoadingComponent, SingleErrorComponent } from "./components";
import { StartLoader } from "./utils/StartLoader";
import { ErrorComponent } from "./layout/error/ErrorComponent";


export const routes = createBrowserRouter([
    {
        path: "/",
        loader: StartLoader,
        errorElement:<ErrorComponent/>,
    },
    {
        path: "/",
        element: <MainLayout/>,
        errorElement:<ErrorComponent/>,
        children:[
            {
                path: "login",
                element:<Suspense fallback={<LoadingComponent/>}>
                        <LoginPage/>
                </Suspense>,
                errorElement:<SingleErrorComponent/>,
            },{
                path: "home", 
                element:<Suspense fallback={<LoadingComponent/>}>
                        <HomePage/>
                </Suspense>,
                errorElement:<SingleErrorComponent/>,
                loader: async () => await HomeLoader(),
            },{
                path: "favorites", 
                element:<Suspense fallback={<LoadingComponent/>}>
                        <FavoritesPage/>
                </Suspense>,
                errorElement:<SingleErrorComponent/>,
                loader: async () => await FavoritesLoader(),
            },{
                path: "detail/:id", 
                element:<Suspense fallback={<LoadingComponent/>}>
                            <DetailPage/>
                </Suspense>,
                errorElement:<SingleErrorComponent/>,
                loader: async ({params}) => await DetailLoader(params as {id:string}),
            }

        ]
    }
]);

