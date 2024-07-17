import { PokemonLocal } from "../models/local";

export const ACTION_TYPES_FAVORITE_ENUM = {
    REMOVE_ELEMENT:"REMOVE_ELEMENT",
    SET_ELEMENT:"SET_ELEMENT",
    SET_ELEMENT_LIST:"SET_ELEMENT_LIST",
}


export type FavoriteListAction =
    | { type: typeof ACTION_TYPES_FAVORITE_ENUM.REMOVE_ELEMENT; payload:PokemonLocal }
    | { type: typeof ACTION_TYPES_FAVORITE_ENUM.SET_ELEMENT; payload:PokemonLocal }
    | { type: typeof ACTION_TYPES_FAVORITE_ENUM.SET_ELEMENT_LIST; payload: PokemonLocal[] };

