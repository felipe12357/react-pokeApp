import { redirect } from "react-router-dom";
import {UserValidation}  from "../../utils/userSessionHandler";
import { getPokemonList } from "../../utils/axios.service";
import { PokemonDTO } from "../../models/dtos";

export const HomeLoader= async ():Promise<PokemonDTO[]  | Response>=>{
      if(!UserValidation())
        return redirect("/login");

      return await getPokemonList(1);
}
