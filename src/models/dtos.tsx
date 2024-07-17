export type PokemonListDTO = {
    count:number;
    results:PokemonDTO[]
}

export type PokemonDTO = {
    name:string,
    url:string
}

export type PokemonDetailDTO = {
    name:string;
    types:{ type:{name:string} }[];
    id:number;
    height:number;
    weight:number;
    habitat:{name:string};
    flavor_text_entries:{flavor_text:string}[];
    abilities:{ability:{name:string}}[]
}