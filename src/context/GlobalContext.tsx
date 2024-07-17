import { createContext, JSXElementConstructor, ReactElement, ReactNode, useReducer, useContext, Dispatch } from "react";
import { defaultFavoriteListState, favoriteListReducer, FavoriteListState } from "../reducer/favoriteListReducer";
import { FavoriteListAction } from "../reducer/favoriteListActions";

interface ContextType {
    favoriteState: FavoriteListState;
    dispatch: Dispatch<FavoriteListAction>;
}

export const ContextAPIGlobalContext = createContext<ContextType>({
    favoriteState: defaultFavoriteListState,
    dispatch: () => {},
});

export const useContextAPIGlobal = () => useContext(ContextAPIGlobalContext);


export const ContextAPIGlobalProvider = (props: { children: ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> }) => {
   
    const [favoriteState,dispatch] = useReducer(favoriteListReducer,defaultFavoriteListState);
    return (
        <ContextAPIGlobalContext.Provider value={{favoriteState,dispatch}}>
           {props.children}
        </ContextAPIGlobalContext.Provider>
    )
}