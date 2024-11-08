import { ACTION_TYPES_FAVORITE_ENUM, FavoriteListAction } from './favoriteListActions';
import {favoriteListReducer, FavoriteListState} from './favoriteListReducer';

/* const mockFavoriteListState:FavoriteListState = {
    favoriteList:[{
        name:'pika',
        url:'string',
        isFavorite:true
    },{
        name:'char',
        url:'string',
        isFavorite:true
    }]
} */

describe('favoriteListReducer',()=>{
    let mockFavoriteListState:FavoriteListState;
    beforeEach(()=>{
        mockFavoriteListState = {
            favoriteList:[{
                name:'pika',
                url:'string',
                isFavorite:true
            },{
                name:'char',
                url:'string',
                isFavorite:true
            }]
        }
    })
    test('should add element',()=>{
        const mockAction:FavoriteListAction = {
            type:ACTION_TYPES_FAVORITE_ENUM.SET_ELEMENT,
            payload:{name:'squrit',url:'nu',isFavorite:true}
        }
        const state =favoriteListReducer(mockFavoriteListState,mockAction);
        expect(state.favoriteList.length).toBe(3);
    })
    test('should remove element',()=>{
        const mockAction:FavoriteListAction = {
            type:ACTION_TYPES_FAVORITE_ENUM.REMOVE_ELEMENT,
            payload:{name:'pika',url:'string',isFavorite:true}
        }
        const state =favoriteListReducer(mockFavoriteListState,mockAction);
        expect(state.favoriteList.length).toBe(1);
    })
    test('should set elements',()=>{
        const mockAction:FavoriteListAction = {
            type:ACTION_TYPES_FAVORITE_ENUM.SET_ELEMENT_LIST,
            payload:[{name:'ata',url:'string',isFavorite:true}]
        }
        const state =favoriteListReducer(mockFavoriteListState,mockAction);
        expect(state.favoriteList.length).toBe(1);
        expect(state.favoriteList[0].name).toBe("ata");
    })
})