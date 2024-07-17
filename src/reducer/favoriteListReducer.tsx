import { PokemonLocal } from '../models/local';
import { GetFavoritesList, UpdateFavoritesList } from '../utils/favoriteSessionHandler';
import { ACTION_TYPES_FAVORITE_ENUM, FavoriteListAction } from './favoriteListActions';

export interface FavoriteListState {
    favoriteList: PokemonLocal[];
}

export const defaultFavoriteListState: FavoriteListState = {
    favoriteList:GetFavoritesList(),
}


export const favoriteListReducer = (state:FavoriteListState,action:FavoriteListAction):FavoriteListState=>{
    switch(action.type){
        case ACTION_TYPES_FAVORITE_ENUM.SET_ELEMENT:
            if ('name' in action.payload){
                const favoriteList = [...state.favoriteList, action.payload];
                UpdateFavoritesList(favoriteList);
                return {...state,favoriteList:favoriteList};
            }
            return state;
        case ACTION_TYPES_FAVORITE_ENUM.REMOVE_ELEMENT:
            if ('name' in action.payload) {
                const name =action.payload.name;
                const favoriteList = state.favoriteList.filter(item => item.name !==name);
                UpdateFavoritesList(favoriteList);
                return {...state,favoriteList:favoriteList};
            }
            return state;
        case ACTION_TYPES_FAVORITE_ENUM.SET_ELEMENT_LIST:
            if (Array.isArray(action.payload)) 
                return { ...state, favoriteList: action.payload };
    
            return state;
        default:
            return state;
    }

}


