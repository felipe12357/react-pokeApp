import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './pokemonList.scss';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useContextAPIGlobal } from "../../context/GlobalContext";
import { ACTION_TYPES_FAVORITE_ENUM } from "../../reducer/favoriteListActions";

import { PokemonLocal } from "../../models/local";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PokemonListProps {
    pokemonList:PokemonLocal[]
};

export const PokemonListComponent:React.FC<PokemonListProps> = ({pokemonList})=>{

    const {dispatch} = useContextAPIGlobal();
    const [pokemonListToDisplay,setpokemonListToDisplay] = useState<PokemonLocal[]>([]);
    const navigate = useNavigate();
    useEffect(()=>{
        setpokemonListToDisplay(pokemonList);
    },[pokemonList])

    const getId =(data:string):string=>{
        const dataArray = data.split('/');
        const position=dataArray.length -2;
        return dataArray[position];
    }

    const handleFavorite =(pokemon:PokemonLocal)=>{

        (!pokemon.isFavorite) ?
            dispatch({type:ACTION_TYPES_FAVORITE_ENUM.SET_ELEMENT,payload:{...pokemon,isFavorite:true}})
        :  dispatch({type:ACTION_TYPES_FAVORITE_ENUM.REMOVE_ELEMENT,payload:pokemon})
 
        const position =pokemonListToDisplay.findIndex(({name})=>pokemon.name === name)
        const pokemonState = (pokemon.isFavorite) ?  {...pokemon,isFavorite:false} : {...pokemon,isFavorite:true};
        pokemonListToDisplay[position]=pokemonState;
        debugger
        setpokemonListToDisplay(pokemonListToDisplay);
    }

    const handleSelection =(name:string)=>{
        navigate(`/detail/${name}`);
    }

    return (<>
        {(pokemonListToDisplay.length===0) && <div className="message"><h3>There are not pokemon to display</h3></div>}
        <div className="list-container">
        { pokemonListToDisplay.map((pokemon)=>{
            const ida = getId(pokemon.url);
             return <div className="row-container" key={pokemon.name} onClick={()=>handleSelection(pokemon.name)}>
                <div>{ida}. {pokemon.name}</div>
                <div className="tooltip-container">
                    <div className='tooltip icon' >
                        <FontAwesomeIcon className={(pokemon.isFavorite)? "marked-favorite" : "unmarked"} icon={faStar as IconProp} size="xl" 
                            onClick={(e)=>{
                                    e.stopPropagation();
                                    handleFavorite(pokemon)}
                                }>
                        </FontAwesomeIcon>
                    </div>
                </div>
            </div>
        })}
    </div></>)
}
