import { useState } from "react";
import { useContextAPIGlobal } from "../../context/GlobalContext";
import { ELEMENTS_X_PAGE } from "../../Infraestructure/dataSources/axios.service";
import { PaginatorComponent, PokemonListComponent } from "../../components";
import './favorites.scss';

const FavoritesPage = ()=>{
    const {favoriteState} = useContextAPIGlobal();
    const [elementsToDisplay,setElements]=useState(favoriteState.favoriteList.slice(0,ELEMENTS_X_PAGE));

    const updatePage = (numb:number)=>{
        const endingPosition = ELEMENTS_X_PAGE*numb -1;
        const initialPosition = endingPosition-ELEMENTS_X_PAGE+1;
        setElements(favoriteState.favoriteList.slice(initialPosition,endingPosition+1));
    }
    
    return (<div className="favorites-container">
       <PokemonListComponent pokemonList={elementsToDisplay}></PokemonListComponent>
        { (elementsToDisplay.length>20) &&
            <PaginatorComponent numOfElements={favoriteState.favoriteList.length} currentPage={1} updatePage={updatePage}></PaginatorComponent>
        }
    </div>)
}
export default FavoritesPage;