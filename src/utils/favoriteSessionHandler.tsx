import { PokemonLocal } from "../models/local";

export const GetFavoritesList = () =>{
    const favoriteString= sessionStorage.getItem('favoriteList');
    if(favoriteString) {
        const favorite: PokemonLocal[] = JSON.parse(favoriteString);
        return favorite;
    }
    return [];
}

export const UpdateFavoritesList = (newList:PokemonLocal[])=>{
    sessionStorage.setItem('favoriteList',JSON.stringify(newList));
}