import { Outlet } from "react-router-dom"
import { HeaderComponent } from "./header/HeaderComponent"
import { MenuComponent } from "./menu/MenuComponent"


export const MainLayout = () =>{
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <MenuComponent></MenuComponent>
            <Outlet ></Outlet> 
        </>
    )
}