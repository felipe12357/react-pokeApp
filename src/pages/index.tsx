import { lazy } from "react";

export const HomePage = lazy(()=>import("./home/HomePage")); 
export const LoginPage = lazy(()=>import("./login/LoginPage")); 
export const FavoritesPage = lazy(()=>import("./favorites/FavoritesPage")); 
export const DetailPage = lazy(()=>import("./detail/DetailPage")); 
export {HomeLoader} from "./home/Homeloader";
export {FavoritesLoader} from "./favorites/FavoritesLoader";
export {DetailLoader} from "./detail/DetailLoader";
