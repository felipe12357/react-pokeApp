import { redirect } from "react-router-dom";
import { UserValidation } from "./userSessionHandler";

export const StartLoader= async()=>{
    if(!UserValidation())
        return redirect("/login");
    return redirect("/home");
}

