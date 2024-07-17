import { redirect } from "react-router-dom";
import { UserValidation } from "../../utils/userSessionHandler";
import { getPokemonDetail } from "../../utils/axios.service";
import { PokemonDetailLocal } from "../../models/local";

export const DetailLoader= async( params:{id:string} ):Promise<PokemonDetailLocal | Response>=>{

    if(!UserValidation())
      return redirect("/login");

    return await getPokemonDetail(params.id);
}