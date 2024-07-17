import { redirect } from "react-router-dom";
import { UserValidation } from "../../utils/userSessionHandler";

import { PokemonDetailLocal } from "../../models/local";
import { pokeRepository } from "../../utils/pokemonService";

export const DetailLoader= async( params:{id:string} ):Promise<PokemonDetailLocal | Response>=>{

    if(!UserValidation())
      return redirect("/login");

    return await pokeRepository.getPokemonDetail(params.id);
}