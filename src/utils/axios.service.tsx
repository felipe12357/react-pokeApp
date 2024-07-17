import axios from "axios";
import { PokemonListDTO,PokemonDTO, PokemonDetailDTO } from "../models/dtos";
import { PokemonDetailLocal, PokemonI } from "../models/local";

const pokemonAxiosInstance = axios.create({
    baseURL:'https://pokeapi.co/api/v2',
})

let pokemonList:PokemonDTO[]=[];
export const MAX_LIMIT:number =1025;
export const ELEMENTS_X_PAGE =20;

class PokemonService implements PokemonI {

    filterSearch = async(searchText:string):Promise<PokemonDTO[] | undefined>=>{
        try{
            if(pokemonList.length==0){
                const response = (await pokemonAxiosInstance.get<PokemonListDTO>(`/pokemon?limit=${MAX_LIMIT}`)).data;
                pokemonList = response.results;
            }
            return pokemonList.filter(({name}) => name.includes(searchText))
        }catch(error) {
            console.log('error during proccess',error);
        }
    }
    
    getPokemonList = async(pageNumber:number):Promise<PokemonDTO[]>=>{
        const offset = (pageNumber - 1) * ELEMENTS_X_PAGE;
        const response = (await pokemonAxiosInstance.get<PokemonListDTO>(`/pokemon/?offset=${offset}&limit=${ELEMENTS_X_PAGE}`)).data;
        return response.results;
    }
    
    getPokemonDetail = async(id:string):Promise<PokemonDetailLocal> =>{
    
        const response =  await axios.all([pokemonAxiosInstance.get(`/pokemon/${id}`),
                                    pokemonAxiosInstance.get(`/pokemon-species/${id}`)]);
        const dataResponse = response.map(req =>req.data); 
        const pokemonDetail ={...dataResponse[0],...dataResponse[1]} as PokemonDetailDTO
        return this. transformPokemonDetail(pokemonDetail);
    }
    
    private transformPokemonDetail = (data:PokemonDetailDTO):PokemonDetailLocal =>{
        const {name,types, id, height,weight,habitat,flavor_text_entries,abilities} = data;
    
        const typesTransformed = types.map(type =>type.type.name);
        const flavor_text_entriesTransformed =flavor_text_entries.map(text => text.flavor_text);
        const abilitiesTransformed = abilities.map(ability => ability.ability.name);
        const habitatTransformed = (habitat) ? habitat.name : 'Unknow';
        return {
            name,
            id,
            height,
            weight,
            habitat:habitatTransformed,
            types:typesTransformed,
            flavor_text_entries:flavor_text_entriesTransformed,
            abilities:abilitiesTransformed
        }
    
    }
    
}

export const pokeService = new PokemonService()
