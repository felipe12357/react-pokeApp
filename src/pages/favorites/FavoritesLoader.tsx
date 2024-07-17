import { redirect } from "react-router-dom";
import { UserValidation } from "../../utils/userSessionHandler";

export const FavoritesLoader = ()=>{
    if(!UserValidation())
      return redirect("/login");

    return null;
}