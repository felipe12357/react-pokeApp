import { PokemonService } from "../Infraestructure/dataSources/axios.service";
import { PokemonRepository } from "../Infraestructure/repositories/pokemon.repository";

const pokeService = new PokemonService();
export const pokeRepository = new PokemonRepository(pokeService);