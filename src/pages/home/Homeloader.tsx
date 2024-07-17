import { redirect } from "react-router-dom";
import {UserValidation}  from "../../utils/userSessionHandler";
import { PokemonDTO } from "../../models/dtos";
import { pokeRepository } from "../../utils/pokemonService";

export const HomeLoader= async ():Promise<PokemonDTO[]  | Response>=>{
      if(!UserValidation())
        return redirect("/login");

      return await pokeRepository.getPokemonList(1);
}
