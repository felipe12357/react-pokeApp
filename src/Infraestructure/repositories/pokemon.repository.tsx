import { PokemonDTO } from "../../models/dtos";
import { PokemonDetailLocal } from "../../models/local";
import { PokemonServiceI } from "../dataSources/axios.service";

export abstract class PokemonRespositoryI {
    abstract  filterSearch(searchText:string):Promise<PokemonDTO[] | undefined>;
    abstract  getPokemonList: (pageNumber:number)=> Promise<PokemonDTO[]>;
    abstract  getPokemonDetail: (id:string) => Promise<PokemonDetailLocal>
}


export class PokemonRepository implements PokemonRespositoryI {

    constructor(private readonly porkemonDataSource:PokemonServiceI){

    }

    async filterSearch(searchText:string):Promise<PokemonDTO[] | undefined>{
        return this.porkemonDataSource.filterSearch(searchText);
    }

    async getPokemonList(pageNumber:number):Promise<PokemonDTO[]>{
        return this.porkemonDataSource.getPokemonList(pageNumber);
    }
    
    async getPokemonDetail(id:string):Promise<PokemonDetailLocal>{
        return this.porkemonDataSource.getPokemonDetail(id);
    }
    
}