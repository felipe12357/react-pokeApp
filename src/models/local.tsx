import { PokemonDTO } from "./dtos";

export type PokemonLocal = {
    name:string,
    url:string,
    isFavorite:boolean
}

export type PokemonDetailLocal = {
    name:string;
    types:string[];
    id:number;
    height:number;
    weight:number;
    habitat:string;
    flavor_text_entries:string[];
    abilities:string[]
}

export interface PokemonI {
    filterSearch: (searchText:string)=> Promise<PokemonDTO[] | undefined>;
    getPokemonList: (pageNumber:number)=> Promise<PokemonDTO[]>;
    getPokemonDetail: (id:string) => Promise<PokemonDetailLocal>
}