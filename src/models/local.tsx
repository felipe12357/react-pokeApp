
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
